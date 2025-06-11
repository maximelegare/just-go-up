import { Page } from '@payload-types'

export type OptionsBar = Extract<Page['layout'][0], { blockType: 'itemsList' }>['optionsBar']

export type SectionWithoutString = Exclude<OptionsBar['data'], string>

export type Section = SectionWithoutString['links'][0]['contextSections'][0]
