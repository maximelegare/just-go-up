import { cn } from "@app/utilities/cn"
import React, { ReactNode } from "react"

import type { ItemsListBlockProps } from "@app/blocks/layouts/ItemsListBlock"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselImages,
  CarouselItem,
} from "@app/components/ui/Carousel"

import { ScrollArea } from "@app/components/ui/scroll-area"
import { cardComponentsMap } from "@app/_Map/cards.map"
import { PrerendedCard } from "@app/components/Prerenderer/Card"
import { Separator } from "@app/components/ui/separator"
import { CardVariant } from "../config"
import { Category, Media } from "@payload-types"
import { CMSLinkType } from "@app/components/Link"

export type RelationTo = ItemsListBlockProps["relationTo"] | "media"
export type Item = Category | Media

export type Props<T> = {
  items: T[]
  layout: ItemsListBlockProps["layout"]
  relationTo: RelationTo
  cardClassName?: string
  containerClassName?: string
  imageSelector?: "dots" | "images"
  isPrerendered?: boolean
  cardVariant: CardVariant
}

export const ItemsList = <T extends Item>(props: Props<T>) => {
  const {
    items,
    layout,
    relationTo,
    cardClassName,
    imageSelector,
    containerClassName,
    cardVariant,
    isPrerendered = true,
  } = props

  function getCard(
    Card: React.FC<{ doc: unknown; relationTo?: string; className?: string }>,
    props: { doc: unknown; relationTo?: string; className?: string },
    idx: number,
  ) {
    if (!props.doc) return null

    switch (layout) {
      case "carousel":
        return (
          <CarouselItem key={idx} isPrerendered={isPrerendered}>
            <PrerendedCard isPrerendered={isPrerendered}>
              <Card {...props} />
            </PrerendedCard>
          </CarouselItem>
        )

      case "verticalList":
        return (
          <React.Fragment key={idx}>
            {idx === 0 && <Separator />}
            <Card {...props} />
            <Separator />
          </React.Fragment>
        )

      case "horizontalWrap":
        return <Card key={idx} {...props} />

      case "grid":
      case "horizontalScroll":
      default:
        return (
          <PrerendedCard isPrerendered={isPrerendered} key={idx}>
            <Card {...props} />
          </PrerendedCard>
        )
    }
  }

  const mapCards = (cardVariant: CardVariant, cardClassName: string): ReactNode[] =>
    items?.map((result, index) => {
      if (typeof result !== "object" || result === null) return null

      const Card = cardComponentsMap[cardVariant]

      if (cardVariant === "link") {
        return (
          // @ts-ignore
          <Card
            key={index}
            className="rounded-none"
            justifyContent="left"
            size="clear"
            // @ts-ignore
            {...(result.link as CMSLinkType)}
          />
        )
      }

      return getCard(
        Card as React.FC<{ doc: unknown; relationTo?: string; className?: string }>,
        {
          doc: result,
          relationTo,
          className: cardClassName,
        },
        index,
      )
    }) ?? []

  const getContainer = (
    layout: ItemsListBlockProps["layout"],
    cardClassName?: string,
    containerClassName?: string,
  ) => {
    switch (layout) {
      case "carousel": {
        return (
          <Carousel className={cn("w-full", containerClassName)}>
            <CarouselContent isPrerendered={isPrerendered} className="w-full">
              {mapCards(cardVariant, cardClassName)}
            </CarouselContent>
            {imageSelector === "dots" && <CarouselDots />}
            {imageSelector === "images" && <CarouselImages images={items as any} />}
          </Carousel>
        )
      }
      case "horizontalScroll": {
        return (
          <ScrollArea
            orientation="horizontal"
            thumb={{ className: "bg-accent", width: "thin", length: "1/2" }}
          >
            <div className="grid grid-flow-col gap-8">
              {mapCards(cardVariant, "w-[15rem] sm:w-[18rem] lg:w-[21rem]")}{" "}
            </div>
          </ScrollArea>
        )
      }
      case "verticalList": {
        return <div className="flex flex-col gap-4">{mapCards(cardVariant, "w-full")}</div>
      }
      case "horizontalWrap": {
        return (
          <React.Fragment>
            <Separator className="mb-3" />
            <div className="flex flex-wrap gap-2">{mapCards(cardVariant, "")}</div>
          </React.Fragment>
        )
      }
      case "grid":
      default: {
        return <div className="flex flex-wrap gap-4">{mapCards(cardVariant, "w-full")}</div>
      }
    }
  }

  return (
    <div className={cn("w-full")}>{getContainer(layout, cardClassName, containerClassName)}</div>
  )
}
