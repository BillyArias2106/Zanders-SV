"use client";

import { ArrowUpRight } from "lucide-react";

import type {
  CardsPageBlock,
  CTAPageBlock,
  HeroPageBlock,
  ImageTextPageBlock,
  LogoStripPageBlock,
  PageBlock,
  StatsPageBlock,
  TestimonialsPageBlock,
} from "@/lib/cms";

import { RenderBlocks } from "./render-blocks";

type VisualEditUpdate = {
  path: string;
  value: unknown;
};

type EditableRenderBlocksProps = {
  blocks: PageBlock[];
};

const postVisualUpdates = (updates: VisualEditUpdate[]) => {
  window.parent?.postMessage(
    {
      type: "cms-visual-edit",
      updates,
    },
    "*",
  );
};

export function EditableText({
  as: Component,
  children,
  className,
  path,
  placeholder,
}: {
  as: "h1" | "h2" | "h3" | "p" | "span";
  children?: string | null;
  className?: string;
  path: string;
  placeholder?: string;
}) {
  const fallbackText = placeholder ?? "Editar texto";
  const text = children && children.trim().length > 0 ? children : fallbackText;

  return (
    <Component
      className={`${className ?? ""} rounded-sm outline outline-1 outline-transparent transition focus:bg-cyan-200/10 focus:outline-cyan-200/50`}
      contentEditable
      onBlur={(event) => {
        const value = event.currentTarget.textContent?.trim() ?? "";

        if (value !== children) {
          postVisualUpdates([{ path, value }]);
        }
      }}
      suppressContentEditableWarning
      title="Editar texto"
    >
      {text}
    </Component>
  );
}

function EditableButton({
  className,
  label,
  labelPath,
  urlPath,
}: {
  className: string;
  label?: string | null;
  labelPath: string;
  urlPath: string;
}) {
  const hasLabel = Boolean(label);

  if (!hasLabel) {
    return (
      <button
        className={className}
        onClick={() =>
          postVisualUpdates([
            { path: labelPath, value: "Nuevo botón" },
            { path: urlPath, value: "#" },
          ])
        }
        type="button"
      >
        Agregar botón
      </button>
    );
  }

  return (
    <span className={className}>
      <EditableText as="span" path={labelPath}>
        {label}
      </EditableText>
    </span>
  );
}

function EditableHeroBlock({
  block,
  index,
}: {
  block: HeroPageBlock;
  index: number;
}) {
  const path = `content.${index}`;
  const media = block.backgroundMedia;
  const videoUrl = media?.mimeType?.startsWith("video/") ? media.url : null;
  const imageUrl = media?.mimeType?.startsWith("image/") ? media.url : null;

  return (
    <section className="relative min-h-[72svh] overflow-hidden pt-12">
      {videoUrl ? (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover opacity-[0.36]"
          loop
          muted
          playsInline
          src={videoUrl}
        />
      ) : imageUrl ? (
        <img
          alt={media?.alt ?? ""}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
          src={imageUrl}
        />
      ) : null}
      <div className="app-hero-shade-x absolute inset-0 z-10" />
      <div className="app-hero-shade-y absolute inset-0 z-10" />
      <div className="relative z-20 mx-auto flex min-h-[72svh] max-w-7xl items-center px-5 py-16 sm:px-8">
        <div className="max-w-3xl">
          <EditableText
            as="p"
            className="font-heading text-sm font-bold uppercase text-cyan-200"
            path={`${path}.eyebrow`}
            placeholder="Texto pequeño"
          >
            {block.eyebrow}
          </EditableText>
          <EditableText
            as="h1"
            className="mt-5 font-heading text-5xl font-bold uppercase leading-[0.94] text-silver-50 sm:text-7xl"
            path={`${path}.title`}
          >
            {block.title}
          </EditableText>
          <EditableText
            as="p"
            className="mt-5 font-heading text-2xl font-semibold uppercase text-silver-100"
            path={`${path}.subtitle`}
            placeholder="Subtítulo"
          >
            {block.subtitle}
          </EditableText>
          <EditableText
            as="p"
            className="mt-6 max-w-2xl text-base leading-8 text-silver-200"
            path={`${path}.description`}
            placeholder="Descripción"
          >
            {block.description}
          </EditableText>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EditableButton
              className="inline-flex items-center justify-center border border-cyan-200 bg-cyan-200 px-5 py-3 font-heading text-sm font-bold uppercase text-deep-950 transition hover:bg-transparent hover:text-cyan-200"
              label={block.primaryButton?.label}
              labelPath={`${path}.primaryButtonLabel`}
              urlPath={`${path}.primaryButtonUrl`}
            />
            <EditableButton
              className="inline-flex items-center justify-center border border-cyan-200/45 px-5 py-3 font-heading text-sm font-bold uppercase text-cyan-200 transition hover:bg-cyan-200/10"
              label={block.secondaryButton?.label}
              labelPath={`${path}.secondaryButtonLabel`}
              urlPath={`${path}.secondaryButtonUrl`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableImageTextBlock({
  block,
  index,
}: {
  block: ImageTextPageBlock;
  index: number;
}) {
  const imageFirst = block.imagePosition === "left";
  const path = `content.${index}`;

  return (
    <section className="bg-deep-950 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <figure
          className={`${imageFirst ? "" : "lg:order-2"} min-h-[360px] overflow-hidden border border-cyan-200/18 bg-deep-900`}
        >
          {block.image?.url ? (
            <img
              alt={block.image.alt ?? block.title}
              className="h-full min-h-[360px] w-full object-cover"
              src={block.image.url}
            />
          ) : null}
        </figure>
        <div className={imageFirst ? "" : "lg:order-1"}>
          <EditableText
            as="h2"
            className="font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-5xl"
            path={`${path}.title`}
          >
            {block.title}
          </EditableText>
          <EditableText
            as="p"
            className="mt-5 text-base leading-8 text-silver-300"
            path={`${path}.description`}
            placeholder="Descripción"
          >
            {block.description}
          </EditableText>
          <div className="mt-8">
            <EditableButton
              className="inline-flex border border-cyan-200 px-5 py-3 font-heading text-sm font-bold uppercase text-cyan-200 transition hover:bg-cyan-200 hover:text-deep-950"
              label={block.button?.label}
              labelPath={`${path}.buttonLabel`}
              urlPath={`${path}.buttonUrl`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableCardsBlock({
  block,
  index,
}: {
  block: CardsPageBlock;
  index: number;
}) {
  const path = `content.${index}`;

  return (
    <section className="border-y border-cyan-200/12 bg-deep-900/70 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-9 max-w-3xl">
          <EditableText
            as="h2"
            className="font-heading text-4xl font-bold uppercase leading-none text-silver-50"
            path={`${path}.sectionTitle`}
            placeholder="Título de sección"
          >
            {block.sectionTitle}
          </EditableText>
          <EditableText
            as="p"
            className="mt-4 text-base leading-8 text-silver-300"
            path={`${path}.sectionDescription`}
            placeholder="Descripción de sección"
          >
            {block.sectionDescription}
          </EditableText>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {block.cards.map((card, cardIndex) => (
            <article
              className="group h-full border border-cyan-200/14 bg-white/[0.035] p-5 transition hover:border-cyan-200/55"
              key={`${card.title}-${cardIndex}`}
            >
              <div className="flex items-start gap-4">
                {card.media?.url ? (
                  <img
                    alt={card.media.alt ?? card.title}
                    className="h-12 w-12 shrink-0 object-contain"
                    src={card.media.url}
                  />
                ) : (
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-cyan-200/40 bg-cyan-200/10 text-cyan-200">
                    <ArrowUpRight
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.7}
                    />
                  </span>
                )}
                <div>
                  <EditableText
                    as="h3"
                    className="font-heading text-2xl font-bold uppercase text-silver-50"
                    path={`${path}.cards.${cardIndex}.title`}
                  >
                    {card.title}
                  </EditableText>
                  <EditableText
                    as="p"
                    className="mt-2 text-sm leading-7 text-silver-300"
                    path={`${path}.cards.${cardIndex}.description`}
                    placeholder="Descripción"
                  >
                    {card.description}
                  </EditableText>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditableLogoStripBlock({
  block,
  index,
}: {
  block: LogoStripPageBlock;
  index: number;
}) {
  const path = `content.${index}`;

  return (
    <section className="border-y border-[#07164b]/10 bg-[#eef3ff] py-12 text-[#07164b]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-7 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <EditableText
            as="h2"
            className="font-heading text-2xl font-bold uppercase leading-none sm:text-3xl"
            path={`${path}.sectionTitle`}
            placeholder="Título corto"
          >
            {block.sectionTitle}
          </EditableText>
          <EditableText
            as="p"
            className="max-w-3xl text-sm leading-7 text-[#07164b]/70 lg:ml-auto"
            path={`${path}.sectionDescription`}
            placeholder="Descripción corta"
          >
            {block.sectionDescription}
          </EditableText>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {block.items.map((item, itemIndex) => (
            <div
              className="flex min-h-28 items-center justify-center border border-[#07164b]/10 bg-white px-5 py-6 text-center"
              key={item.id ?? item.name}
            >
              {item.image?.url ? (
                <img
                  alt={item.image.alt ?? item.name}
                  className="max-h-12 max-w-36 object-contain"
                  src={item.image.url}
                />
              ) : (
                <EditableText
                  as="span"
                  className="font-heading text-xl font-bold uppercase leading-none text-[#07164b]"
                  path={`${path}.items.${itemIndex}.name`}
                >
                  {item.name}
                </EditableText>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditableStatsBlock({
  block,
  index,
}: {
  block: StatsPageBlock;
  index: number;
}) {
  const path = `content.${index}`;

  return (
    <section className="border-y border-[#07164b]/10 bg-[#f7f8fb] py-16 text-[#07164b]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-end">
          <div>
            <EditableText
              as="p"
              className="font-heading text-sm font-bold uppercase text-[#07164b]"
              path={`${path}.eyebrow`}
              placeholder="Texto pequeño"
            >
              {block.eyebrow}
            </EditableText>
            <EditableText
              as="h2"
              className="mt-4 font-heading text-4xl font-bold uppercase leading-none sm:text-5xl"
              path={`${path}.title`}
              placeholder="Título"
            >
              {block.title}
            </EditableText>
            <EditableText
              as="p"
              className="mt-5 max-w-2xl text-base leading-8 text-[#07164b]/70"
              path={`${path}.description`}
              placeholder="Descripción"
            >
              {block.description}
            </EditableText>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {block.items.map((item, itemIndex) => (
              <article
                className="min-h-48 border border-[#07164b]/10 bg-white p-5"
                key={item.id ?? `${item.value}-${item.label}`}
              >
                <EditableText
                  as="p"
                  className="font-heading text-5xl font-bold uppercase leading-none text-[#07164b]"
                  path={`${path}.items.${itemIndex}.value`}
                >
                  {item.value}
                </EditableText>
                <EditableText
                  as="h3"
                  className="mt-4 font-heading text-xl font-bold uppercase leading-none"
                  path={`${path}.items.${itemIndex}.label`}
                >
                  {item.label}
                </EditableText>
                <EditableText
                  as="p"
                  className="mt-4 text-sm leading-7 text-[#07164b]/70"
                  path={`${path}.items.${itemIndex}.description`}
                  placeholder="Detalle"
                >
                  {item.description}
                </EditableText>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditableTestimonialsBlock({
  block,
  index,
}: {
  block: TestimonialsPageBlock;
  index: number;
}) {
  const path = `content.${index}`;

  return (
    <section className="border-y border-cyan-200/12 bg-deep-950 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <EditableText
            as="h2"
            className="font-heading text-4xl font-bold uppercase leading-none text-silver-50 sm:text-5xl"
            path={`${path}.sectionTitle`}
            placeholder="Título de sección"
          >
            {block.sectionTitle}
          </EditableText>
          <EditableText
            as="p"
            className="max-w-3xl text-base leading-8 text-silver-300 lg:ml-auto"
            path={`${path}.sectionDescription`}
            placeholder="Descripción de sección"
          >
            {block.sectionDescription}
          </EditableText>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {block.items.map((item, itemIndex) => (
            <article
              className="flex min-h-72 flex-col justify-between border border-cyan-200/14 bg-white/[0.035] p-6"
              key={item.id ?? item.name}
            >
              <EditableText
                as="p"
                className="text-base leading-8 text-silver-200"
                path={`${path}.items.${itemIndex}.quote`}
              >
                {item.quote}
              </EditableText>
              <div className="mt-8">
                <EditableText
                  as="p"
                  className="font-heading text-lg font-bold uppercase text-silver-50"
                  path={`${path}.items.${itemIndex}.name`}
                >
                  {item.name}
                </EditableText>
                <EditableText
                  as="p"
                  className="mt-1 text-sm leading-6 text-silver-300"
                  path={`${path}.items.${itemIndex}.role`}
                  placeholder="Cargo o empresa"
                >
                  {item.role}
                </EditableText>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditableCTABlock({
  block,
  index,
}: {
  block: CTAPageBlock;
  index: number;
}) {
  const path = `content.${index}`;

  return (
    <section className="py-16 bg-deep-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <EditableText
            as="h2"
            className="font-heading text-4xl font-bold uppercase leading-none text-silver-50"
            path={`${path}.title`}
          >
            {block.title}
          </EditableText>
          <EditableText
            as="p"
            className="mt-4 max-w-2xl text-base leading-8 text-silver-300"
            path={`${path}.description`}
            placeholder="Descripción"
          >
            {block.description}
          </EditableText>
        </div>
        <EditableButton
          className="inline-flex shrink-0 justify-center border border-cyan-200 bg-cyan-200 px-6 py-3 font-heading text-sm font-bold uppercase text-deep-950 transition hover:bg-transparent hover:text-cyan-200"
          label={block.button?.label}
          labelPath={`${path}.buttonLabel`}
          urlPath={`${path}.buttonUrl`}
        />
      </div>
    </section>
  );
}

export function EditableRenderBlocks({ blocks }: EditableRenderBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.type}-${index}`;

        switch (block.type) {
          case "hero":
            return <EditableHeroBlock block={block} index={index} key={key} />;
          case "logoStrip":
            return (
              <EditableLogoStripBlock block={block} index={index} key={key} />
            );
          case "stats":
            return <EditableStatsBlock block={block} index={index} key={key} />;
          case "imageText":
            return (
              <EditableImageTextBlock block={block} index={index} key={key} />
            );
          case "cards":
            return <EditableCardsBlock block={block} index={index} key={key} />;
          case "testimonials":
            return (
              <EditableTestimonialsBlock
                block={block}
                index={index}
                key={key}
              />
            );
          case "cta":
            return <EditableCTABlock block={block} index={index} key={key} />;
          default:
            return <RenderBlocks blocks={[block]} key={key} />;
        }
      })}
    </>
  );
}
