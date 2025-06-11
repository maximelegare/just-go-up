import { ContentBlock } from '@app/blocks/layouts/Content'
import { CallToActionBlock } from '@app/blocks/layouts/CallToAction'
import { FormBlock } from '@app/blocks/layouts/Form'
import { MediaBlock } from '@app/blocks/layouts/MediaBlock'
import { ItemsListBlock } from '@app/blocks/layouts/ItemsListBlock'

export const blockComponentsMap = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  itemsList: ItemsListBlock,
}
