import { ContentBlock } from "@app/blocks/layouts/Content"
import { CallToActionBlock } from "@app/blocks/layouts/CallToAction"
import { FormBlock } from "@app/blocks/layouts/Form"
import { MediaBlock } from "@app/blocks/layouts/MediaBlock"
import { ItemsListBlock } from "@app/blocks/layouts/ItemsListBlock"
import { DynamicContentBlock } from "@app/blocks/layouts/DynamicContent"
import { TitleSectionBlock } from "@app/blocks/layouts/TitleSectionBlock"

export const blockComponentsMap = {
  content: ContentBlock,
  dynamicContent: DynamicContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  itemsList: ItemsListBlock,
  titleSection: TitleSectionBlock,
}
