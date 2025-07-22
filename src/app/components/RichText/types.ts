import { CodeBlockProps } from "@app/blocks/layouts/Code"
import { Page } from "@payload-types"
import { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical"

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | Extract<Page["layout"][0], { blockType: "cta" }>
      | Extract<Page["layout"][0], { blockType: "mediaBlock" }>
      | CodeBlockProps
    >
  | {
      type: "table"
      children: NodeTypes[]
      colWidths?: number[]
      [key: string]: any
    }
  | {
      type: "tablerow"
      children: NodeTypes[]
      [key: string]: any
    }
  | {
      type: "tablecell"
      children: NodeTypes[]
      headerState?: number
      rowSpan?: number
      colSpan?: number
      [key: string]: any
    }
