import { CallToActionBlock } from "@app/blocks/layouts/CallToAction"
import { CodeBlock } from "@app/blocks/layouts/Code"
import { MediaBlock } from "@app/blocks/layouts/MediaBlock"
import React, { Fragment, JSX } from "react"
import { CMSLink } from "src/app/components/Link"

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
  ELEMENT_FORMAT_TO_TYPE,
  ELEMENT_FORMAT_TYPE,
} from "./nodeFormat"

import type { Media } from "../../../payload-types"
import { parseCSSStylesString } from "@app/utilities/parseCSSStylesString"
import { ImageMedia } from "../Media/ImageMedia"
import { cn } from "@app/utilities/cn"
import { Separator } from "../ui/separator"
import { MediaCaption } from "../Media/MediaCaption"

import { NodeTypes } from "./types"

type Props = {
  nodes: NodeTypes[]
  textClassName?: string
}

export function serializeLexical({ nodes, textClassName }: Props): JSX.Element {
  const getAlignmentClass = (format: ELEMENT_FORMAT_TYPE | number | undefined): string => {
    let alignType: ELEMENT_FORMAT_TYPE

    if (typeof format === "number") {
      alignType = ELEMENT_FORMAT_TO_TYPE[format]
    } else {
      alignType = format
    }

    switch (alignType) {
      case "center":
        return "text-center"
      case "end":
        return "text-end"
      case "justify":
        return "text-justify"
      case "left":
        return "text-left"
      case "right":
        return "text-right"
      case "start":
        return "text-start"
      default:
        return ""
    }
  }

  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === "text") {
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>
          if (node.format & IS_BOLD) {
            text = (
              <strong className="not-prose font-bold" key={index}>
                {text}
              </strong>
            )
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: "line-through" }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: "underline" }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          return (
            <span
              key={index}
              style={{ ...parseCSSStylesString(node.style) }}
              className={textClassName}
            >
              {text}
            </span>
          )
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node.children == null) {
            return null
          } else {
            if (node?.type === "list" && node?.listType === "check") {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = "children" in node ? serializedChildrenFn(node) : ""

        if (node.type === "upload") {
          const value = node.value as Media

          return (
            <div key={index} className="py-8">
              <ImageMedia
                className="col-start-1 col-span-3 w-full h-auto"
                imgClassName="m-0 w-full h-full rounded-xl"
                resource={{ ...value }}
              />
              <MediaCaption caption={value.caption} />
            </div>
          )
        }

        if (node.type === "block") {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case "cta":
              return <CallToActionBlock key={index} {...block} />
            case "mediaBlock":
              return (
                <MediaBlock
                  className="col-start-1 col-span-3 "
                  imgClassName="m-0 w-[100px] h-[100px]"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                />
              )
            case "code":
              return <CodeBlock className="col-start-2" key={index} {...block} />
            default:
              return null
          }
        } else {
          switch (node.type) {
            case "linebreak": {
              return <br className="col-start-2" key={index} />
            }
            case "paragraph": {
              const alignClass = getAlignmentClass(node.format)
              return (
                <p className={cn("col-start-2", alignClass, textClassName)} key={index}>
                  {serializedChildren}
                </p>
              )
            }
            case "heading": {
              const Tag = node?.tag
              const alignClass = getAlignmentClass(node.format)

              return (
                <Tag className={cn("col-start-2", alignClass, textClassName)} key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case "list": {
              const Tag = node?.tag
              const alignClass = getAlignmentClass(node.format)
              return (
                <Tag className={cn("list col-start-2", alignClass, textClassName)} key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case "listitem": {
              const alignClass = getAlignmentClass(node.format)

              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? "true" : "false"}
                    className={cn(`${node.checked ? "" : ""}`, alignClass, textClassName)}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                )
              } else {
                return (
                  <li className={cn(alignClass, textClassName)} key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }
            case "quote": {
              const alignClass = getAlignmentClass(node.format)

              return (
                <blockquote className={cn("col-start-2", alignClass)} key={index}>
                  {serializedChildren}
                </blockquote>
              )
            }
            case "link": {
              const fields = node.fields
              return (
                <CMSLink
                  size="sm"
                  currentUrl=""
                  className="p-0 m-0"
                  appearance="underline"
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  reference={fields.doc as any}
                  type={fields.linkType === "internal" ? "reference" : "custom"}
                  url={fields.url}
                >
                  {serializedChildren}
                </CMSLink>
              )
            }
            case "horizontalrule": {
              return <Separator type="dots" key={index} />
            }
            case "table": {
              const headRows = node.children.filter((row) =>
                row.children?.every(
                  (cell: any) => cell.type === "tablecell" && cell.headerState > 0,
                ),
              )
              const bodyRows = node.children.filter((row) => !headRows.includes(row))

              return (
                <div
                  className="overflow-auto border-2 border-solid border-border rounded-xl"
                  key={index}
                >
                  <table className="w-full table-auto border-hidden border-spacing-0 border-collapse text-sm text-left shadow-sm not-prose">
                    {headRows.length > 0 && (
                      <thead className="bg-muted">
                        {headRows.map((row, i) => (
                          <React.Fragment key={`thead-${i}`}>
                            {serializeLexical({ nodes: [row] })}
                          </React.Fragment>
                        ))}
                      </thead>
                    )}
                    <tbody>
                      {bodyRows.map((row, i) => (
                        <React.Fragment key={`tbody-${i}`}>
                          {serializeLexical({ nodes: [row] })}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }

            case "tablerow": {
              return (
                <tr
                  className="even:bg-muted/30 px-4 py-3 border-b border-border  text-foreground"
                  key={index}
                >
                  {serializedChildren}
                </tr>
              )
            }

            case "tablecell": {
              const isHeader = node.headerState > 0
              const CellTag = isHeader ? "th" : "td"
              const cellContent = serializeLexical({ nodes: node.children as NodeTypes[] })
              const getClassName =
                CellTag === "td"
                  ? "px-4 py-3 border-b border-gray-200 text-gray-800"
                  : "px-4 py-3 border-b border-gray-300 font-semibold text-gray-700"
              return (
                <CellTag
                  key={index}
                  colSpan={node.colSpan}
                  rowSpan={node.rowSpan}
                  className={getClassName}
                >
                  {cellContent}
                </CellTag>
              )
            }
            default:
              return null
          }
        }
      })}
    </Fragment>
  )
}
