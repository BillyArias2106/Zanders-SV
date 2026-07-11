"use client";

import { useEffect, useMemo, useState } from "react";

import { normalizeLivePreviewPage, type PageBuilderPage } from "@/lib/cms";

import { EditableRenderBlocks, EditableText } from "./editable-render-blocks";

type PageLivePreviewCanvasProps = {
  initialPage: PageBuilderPage;
};

type PayloadLivePreviewMessage = {
  collectionSlug?: string;
  data?: Record<string, unknown>;
  type?: string;
};

const isPayloadLivePreviewMessage = (
  value: unknown,
): value is PayloadLivePreviewMessage =>
  Boolean(
    value &&
    typeof value === "object" &&
    "type" in value &&
    (value as PayloadLivePreviewMessage).type === "payload-live-preview",
  );

export function PageLivePreviewCanvas({
  initialPage,
}: PageLivePreviewCanvasProps) {
  const [livePage, setLivePage] = useState(initialPage);
  const renderedPage = useMemo(() => livePage, [livePage]);

  useEffect(() => {
    window.parent?.postMessage(
      {
        ready: true,
        type: "payload-live-preview",
      },
      "*",
    );

    const handleMessage = (event: MessageEvent) => {
      if (!isPayloadLivePreviewMessage(event.data)) {
        return;
      }

      if (event.data.collectionSlug && event.data.collectionSlug !== "pages") {
        return;
      }

      if (!event.data.data) {
        return;
      }

      setLivePage(normalizeLivePreviewPage(event.data.data, initialPage));
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [initialPage]);

  return (
    <main
      className="min-h-screen bg-deep-950 text-silver-50"
      data-cms-preview-canvas="true"
    >
      {renderedPage.content.length > 0 ? (
        <EditableRenderBlocks blocks={renderedPage.content} />
      ) : (
        <section className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:px-8">
          <EditableText
            as="p"
            className="font-heading text-sm font-bold uppercase text-cyan-200"
            path="slug"
          >
            {renderedPage.slug}
          </EditableText>
          <EditableText
            as="h1"
            className="mt-5 font-heading text-5xl font-bold uppercase leading-none text-silver-50"
            path="title"
          >
            {renderedPage.title}
          </EditableText>
          <EditableText
            as="p"
            className="mt-6 text-base leading-8 text-silver-300"
            path="excerpt"
            placeholder="Resumen corto"
          >
            {renderedPage.excerpt}
          </EditableText>
        </section>
      )}
    </main>
  );
}
