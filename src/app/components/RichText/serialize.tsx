import { CallToActionBlock } from '@app/blocks/layouts/CallToAction'
import { CodeBlock, CodeBlockProps } from '@app/blocks/layouts/Code'
import { MediaBlock } from '@app/blocks/layouts/MediaBlock'
import React, { Fragment, JSX } from 'react'
import { CMSLink } from 'src/app/components/Link'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
  ELEMENT_FORMAT_TO_TYPE,
  ELEMENT_FORMAT_TYPE
} from './nodeFormat'

import type { Page } from '../../../payload-types'
import { parseCSSStylesString } from '@app/utilities/parseCSSStylesString'
import { ImageMedia } from '../Media/ImageMedia'
import { cn } from '@app/utilities/cn'

// type WithStyle<T> = T & { style?: React.CSSProperties }

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | Extract<Page['layout'][0], { blockType: 'cta' }>
      | Extract<Page['layout'][0], { blockType: 'mediaBlock' }>
      | CodeBlockProps
    >

type Props = {
  nodes: NodeTypes[]
  textClassName?: string
}








export function serializeLexical({ nodes, textClassName }: Props): JSX.Element {

  const getAlignmentClass = (format: ELEMENT_FORMAT_TYPE | number | undefined): string => {
    let alignType:ELEMENT_FORMAT_TYPE

    if (typeof format === 'number'){
      alignType = ELEMENT_FORMAT_TO_TYPE[format]
    }
    else{
      alignType = format
    }

    switch (alignType) {
      case 'center':
        return 'text-center'
      case 'end':
        return 'text-end'
      case 'justify':
        return 'text-justify'
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'start':
        return 'text-start'
      default:
        return ''
    }
  }



  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
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
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
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
            <span key={index} style={{ ...parseCSSStylesString(node.style) }}>
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
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        if (node.type === 'upload') {
          return (
            <ImageMedia
              className="col-start-1 col-span-3 w-full h-auto"
              imgClassName="m-0 w-full h-full max-w-[350px] rounded-xl "
              key={index}
              resource={{ ...(node.value as any) }}
            />
          )
        }

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  className="col-start-1 col-span-3 w-[100px] h-[100px]"
                  imgClassName="m-0 w-[100px] h-[100px]"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                />
              )
            case 'code':
              return <CodeBlock className="col-start-2" key={index} {...block} />
            default:
              return null
          }
        } else {
          switch (node.type) {
            case 'linebreak': {
              return <br className="col-start-2" key={index} />
            }
            case 'paragraph': {
              
              const alignClass = getAlignmentClass(node.format)
              return (
                <p className={cn('col-start-2', textClassName, alignClass)} key={index}>
                  {serializedChildren}
                </p>
              )
            }
            case 'heading': {
              const Tag = node?.tag
              const alignClass = getAlignmentClass(node.format)

              console.log("node:", node)

              console.log("alignClass", alignClass)

              return (
                <Tag className={cn("col-start-2", alignClass)} key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case 'list': {
              const Tag = node?.tag
              return (
                <Tag className="list col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case 'listitem': {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? 'true' : 'false'}
                    className={` ${node.checked ? '' : ''}`}
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
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }
            case 'quote': {
              const alignClass = getAlignmentClass(node.format)

              return (
                <blockquote className={cn("col-start-2", alignClass)} key={index}>
                  {serializedChildren}
                </blockquote>
              )
            }
            case 'link': {
              const fields = node.fields

              return (
                <CMSLink
                  currentUrl=""
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  reference={fields.doc as any}
                  type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                  url={fields.url}
                >
                  {serializedChildren}
                </CMSLink>
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
