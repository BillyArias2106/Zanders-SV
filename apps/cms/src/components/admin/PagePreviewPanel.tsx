"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useForm, useFormFields, useTranslation } from "@payloadcms/ui";
import { reduceFieldsToValues } from "payload/shared";

import "./page-preview-panel.css";

type VisualEditUpdate = {
  path: string;
  value: unknown;
};

const isVisualEditUpdate = (value: unknown): value is VisualEditUpdate =>
  Boolean(
    value &&
    typeof value === "object" &&
    "path" in value &&
    typeof value.path === "string",
  );

const formatSlug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");

const getPublicBaseUrl = () => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_WEB_PUBLIC_URL ?? process.env.NEXT_PUBLIC_WEB_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (typeof window === "undefined") {
    return "http://localhost:3000";
  }

  const publicUrl = new URL(window.location.href);

  if (publicUrl.port === "3001") {
    publicUrl.port = "3000";
  }

  publicUrl.pathname = "";
  publicUrl.search = "";
  publicUrl.hash = "";

  return publicUrl.toString().replace(/\/$/, "");
};

const getPagePath = (slugValue: unknown, titleValue: unknown) => {
  const explicitSlug = typeof slugValue === "string" ? slugValue : "";
  const fallbackSlug = typeof titleValue === "string" ? titleValue : "";
  const slug = formatSlug(explicitSlug || fallbackSlug);

  if (!slug || slug === "home" || slug === "inicio") {
    return "/";
  }

  return `/${slug}`;
};

const getCanvasPreviewUrl = (baseUrl: string, pagePath: string) => {
  const previewUrl = new URL(pagePath, baseUrl);

  previewUrl.searchParams.set("cmsPreview", "page");

  return previewUrl.toString();
};

export function PagePreviewPanel() {
  const { i18n } = useTranslation();
  const language = i18n.language === "en" ? "en" : "es";
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setModified } = useForm();
  const dispatchField = useFormFields(([, dispatch]) => dispatch);
  const livePreviewData = useFormFields(([fields]) =>
    reduceFieldsToValues(fields, true),
  ) as Record<string, unknown>;
  const formValues = useMemo(() => {
    return {
      slug: livePreviewData.slug,
      status: livePreviewData.status,
      title: livePreviewData.title,
    };
  }, [livePreviewData]);
  const publicBaseUrl = useMemo(() => getPublicBaseUrl(), []);
  const pagePath = getPagePath(formValues.slug, formValues.title);
  const pageUrl = getCanvasPreviewUrl(publicBaseUrl, pagePath);
  const isDraft = formValues.status !== "published";

  useEffect(() => {
    setIframeReady(false);
  }, [pageUrl]);

  useEffect(() => {
    if (!iframeReady || !iframeRef.current?.contentWindow) {
      return;
    }

    iframeRef.current.contentWindow.postMessage(
      {
        collectionSlug: "pages",
        data: livePreviewData,
        type: "payload-live-preview",
      },
      new URL(pageUrl).origin,
    );
  }, [iframeReady, livePreviewData, pageUrl]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(pageUrl).origin) {
        return;
      }

      if (
        !event.data ||
        typeof event.data !== "object" ||
        event.data.type !== "cms-visual-edit"
      ) {
        return;
      }

      const updates = Array.isArray(event.data.updates)
        ? event.data.updates
        : [];

      updates.forEach((update: unknown) => {
        if (!isVisualEditUpdate(update)) {
          return;
        }

        dispatchField({
          path: update.path,
          type: "UPDATE",
          value: update.value,
        });
      });

      if (updates.length > 0) {
        setModified(true);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dispatchField, pageUrl, setModified]);

  return (
    <section
      className={[
        "app-page-preview",
        isEditorCollapsed ? "app-page-preview--editor-focus" : "",
        isFullscreen ? "app-page-preview--fullscreen" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        aria-label={
          isEditorCollapsed
            ? language === "en"
              ? "Show editor"
              : "Mostrar editor"
            : language === "en"
              ? "Collapse editor"
              : "Contraer editor"
        }
        className="app-page-preview__split-toggle"
        onClick={() => setIsEditorCollapsed((current) => !current)}
        title={
          isEditorCollapsed
            ? language === "en"
              ? "Show editor"
              : "Mostrar editor"
            : language === "en"
              ? "Collapse editor"
              : "Contraer editor"
        }
        type="button"
      >
        <span aria-hidden="true">{isEditorCollapsed ? ">" : "<"}</span>
      </button>
      <div className="app-page-preview__header">
        <div>
          <p className="app-page-preview__eyebrow">
            {language === "en" ? "Live canvas" : "Lienzo en vivo"}
          </p>
          <h2>{language === "en" ? "Preview" : "Vista previa"}</h2>
        </div>
        <div className="app-page-preview__actions">
          <button
            onClick={() => setIsFullscreen((current) => !current)}
            type="button"
          >
            {isFullscreen
              ? language === "en"
                ? "Exit"
                : "Salir"
              : language === "en"
                ? "Fullscreen"
                : "Pantalla completa"}
          </button>
          <a href={pageUrl} rel="noopener noreferrer" target="_blank">
            {language === "en" ? "Open" : "Abrir"}
          </a>
        </div>
      </div>
      <div className="app-page-preview__meta">
        <span className="app-page-preview__status">
          {isDraft
            ? language === "en"
              ? "Draft"
              : "Borrador"
            : language === "en"
              ? "Published"
              : "Publicado"}
        </span>
        <span>
          {language === "en"
            ? "Click text to edit it"
            : "Haz clic en un texto para editarlo"}
        </span>
      </div>
      <div className="app-page-preview__frame-wrap">
        <iframe
          allow="clipboard-read; clipboard-write"
          allowFullScreen
          className="app-page-preview__frame"
          key={pageUrl}
          onLoad={() => setIframeReady(true)}
          ref={iframeRef}
          src={pageUrl}
          title={language === "en" ? "Page preview" : "Vista previa de página"}
        />
      </div>
    </section>
  );
}
