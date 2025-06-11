import { Locale } from 'ROOT/locales/locales'

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTitle,
  MenubarTrigger,
} from '@app/components/ui/menubar'
import { CMSLink } from '../Link'
import { OptionsBar as OptionsBarType, Section } from './types'
import { cn } from '@app/utilities/cn'
import { getServerSideURL } from '@app/utilities/getServerSideURL'
import { getSearchParams, getSearchParamsFromURL } from '@app/utilities/searchParams'

type FilterAndSortBarProps = {
  locale: Locale
  className?: string
  data: OptionsBarType
}

export async function OptionsBar({ data }: FilterAndSortBarProps) {
  const fullPath = await getServerSideURL('fullpath')

  const { enable, data: optionBarData } = data
  if (!enable) return

  const getSectionContent = (section: Section) => {
    switch (section.sectionType) {
      case 'links': {
        return (
          <>
            <MenubarTitle>{section.sectionTitle}</MenubarTitle>
            {section?.sectionLinks?.map(({ link }, idx) => {
              /*
                Renders the checkbox based on the currentURL
              */
              let searchParamsObj: Record<string, string> = {}
              let isActive = false
              if (typeof link === 'object') {
                const { params: linkParams } = getSearchParams({
                  url: fullPath,
                  params: link.searchParams.params,
                })

                searchParamsObj = linkParams

                const urlParams = getSearchParamsFromURL(fullPath)

                isActive = Object.entries(searchParamsObj).every(
                  ([key, value]) => urlParams.get(key) === value,
                )
              }

              return (
                <MenubarCheckboxItem checked={isActive} key={idx}>
                  <CMSLink
                    currentUrl={fullPath}
                    className="w-full pl-0 flex justify-start items-center"
                    size="xs"
                    {...link}
                  />
                </MenubarCheckboxItem>
              )
            })}
          </>
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <Menubar>
      {typeof optionBarData === 'object' &&
        optionBarData.links.map(
          ({ textTrigger, linkTrigger, triggerType, link, linkType, contextSections }, idx) => {
            if (linkType === 'link' && typeof link !== 'string') {
              return (
                <MenubarMenu key={idx}>
                  <CMSLink
                    key={idx}
                    {...link.link}
                    appearance="menu"
                    currentUrl={fullPath}
                    // isActive={pathname.includes(link.title.toLowerCase())}
                  />
                </MenubarMenu>
              )
            } else {
              return (
                <MenubarMenu key={idx}>
                  {triggerType === 'link' && typeof linkTrigger === 'object' && (
                    <MenubarTrigger name={linkTrigger.link.label.toLowerCase() as string}>
                      {<CMSLink currentUrl={fullPath} {...linkTrigger.link} />}
                    </MenubarTrigger>
                  )}
                  {triggerType === 'text' && <MenubarTrigger>{textTrigger}</MenubarTrigger>}
                  <MenubarContent className="pb-3">
                    <ul className="flex gap-4 p-0 sm:flex-grow">
                      {contextSections?.map((section, idx) => (
                        <section
                          key={idx}
                          className={cn(
                            'flex flex-col gap-2 items-start h-full w-full', // Default: grow on smaller devices
                          )}
                        >
                          {getSectionContent(section)}
                        </section>
                      ))}
                    </ul>
                  </MenubarContent>
                </MenubarMenu>
              )
            }
          },
        )}
    </Menubar>
    //   {/* <MenubarMenu>
    //     <CMSLink appearance="menu" label="Variantes" url="/" />
    //   </MenubarMenu>
    //   <MenubarMenu>
    //     <CMSLink appearance="menu" label="Produits" url="/" />
    //   </MenubarMenu> */}
    //   <MenubarMenu>
    //     <MenubarTrigger>Filtrer</MenubarTrigger>
    //     <MenubarContent>
    //       <MenubarTitle>Categories</MenubarTitle>
    //       <MenubarCheckboxItem checked>Manches</MenubarCheckboxItem>
    //       <MenubarCheckboxItem>Jupes</MenubarCheckboxItem>
    //       <MenubarCheckboxItem>Étoles</MenubarCheckboxItem>
    //       <MenubarSeparator />
    //       <MenubarTitle>Matériaux</MenubarTitle>
    //       <MenubarCheckboxItem>Canvas</MenubarCheckboxItem>
    //     </MenubarContent>
    //   </MenubarMenu>
    //   <MenubarMenu>
    //     <MenubarTrigger>Trier</MenubarTrigger>
    //     <MenubarContent>
    //       <MenubarCheckboxItem>Matériaux</MenubarCheckboxItem>
    //       <MenubarCheckboxItem checked>Prix</MenubarCheckboxItem>
    //     </MenubarContent>
    //   </MenubarMenu>
    // </Menubar >
  )
}
