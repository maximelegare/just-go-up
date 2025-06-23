'use client'

import * as React from 'react'

import { cn } from '@app/utilities/cn'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuOverlay,
  NavigationMenuTrigger,
} from '@app/components/ui/navigation-menu'
import { CMSLink } from '@app/components/Link'
import { usePathname } from 'next/navigation'

// import useDetectScroll, { Axis } from '@smakss/react-scroll-direction'

import { GetInTouch, Header as HeaderType } from '@payload-types'

import { Section } from './types'
import { SocialMediaList } from '../SocialMediaList'
import { useClientSideUrl } from '@app/utilities/useClientSideUrl'

export const NavigationMenuClient: React.FC<{ header: HeaderType; getInTouch: GetInTouch }> = ({
  header,
  getInTouch,
}) => {
  const { links } = header
  // const TOP_PX = 50

  const pathname = usePathname()
  // const [showHeaderBackground, setShowHeaderBackground] = React.useState(false)
  const [showOverlay, setShowOverlay] = React.useState(false)
  const fullPath = useClientSideUrl()
  const [selectedLink, setSelectedLink] = React.useState<string | null>(null)

  // const {
  //   scrollPosition: { top },
  // } = useDetectScroll({ axis: Axis.Y })

  // React.useEffect(() => {
  //   if (top > TOP_PX) setShowHeaderBackground(true)
  //   else setShowHeaderBackground(false)
  // }, [top])

  const toggleOverlay = (value: string) => {
    if (value) setShowOverlay(true)
    else setShowOverlay(false)
  }

  const getSectionContent = (section: Section) => {
    switch (section.sectionType) {
      case 'links': {
        return (
          <>
            <h5 className="whitespace-nowrap">{section.sectionTitle}</h5>
            {section?.sectionLinks?.map(({ link }, idx) => (
              <CMSLink currentUrl={fullPath} key={idx} {...link} appearance="text" />
            ))}
          </>
        )
      }
      case 'socialMedia': {
        return (
          <>
            <h5 className="whitespace-nowrap">{section.sectionTitle}</h5>
            <SocialMediaList getInTouch={getInTouch} />
          </>
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <React.Fragment>
      {/* <Background show={showHeaderBackground} className="h-16" /> */}

      <NavigationMenu
        onValueChange={toggleOverlay}
        // // onMouseEnter={() => setShowHeaderBackground(true)}
        // onMouseLeave={() => {
        //   if (top < TOP_PX) setShowHeaderBackground(false)
        //   setSelectedLink(null)
        // }}
      >
        <NavigationMenuList>
          {links.map(
            ({ textTrigger, linkTrigger, triggerType, link, linkType, contextSections }, idx) => {
              if (linkType === 'link' && typeof link !== 'string') {
                return (
                  <NavigationMenuItem
                    key={idx}
                    onMouseEnter={() => setSelectedLink(link.link.label.toLowerCase())}
                    onMouseLeave={() => setSelectedLink(null)}
                  >
                    <div>
                      <CMSLink key={idx} currentUrl={fullPath} {...link.link} />
                    </div>
                  </NavigationMenuItem>
                )
              } else {
                return (
                  <NavigationMenuItem key={idx}>
                    {triggerType === 'link' && typeof linkTrigger === 'object' && (
                      <NavigationMenuTrigger
                        onMouseEnter={() =>
                          setSelectedLink(linkTrigger.link.label.toLowerCase() as string)
                        }
                        name={linkTrigger.link.label.toLowerCase() as string}
                      >
                        {
                          <CMSLink
                            currentUrl={fullPath}
                            {...linkTrigger.link}
                            isCurrentlySelected={
                              selectedLink === linkTrigger.link.label.toLowerCase()
                            }
                          />
                        }
                      </NavigationMenuTrigger>
                    )}
                    {triggerType === 'text' && (
                      <NavigationMenuTrigger
                        name={textTrigger.toLowerCase() as string}
                        onMouseEnter={() =>
                          setSelectedLink(textTrigger.toLocaleLowerCase() as string)
                        }
                      >
                        {
                          <CMSLink
                            currentUrl={fullPath}
                            label={textTrigger as string}
                            url={pathname}
                            appearance="link"
                            isCurrentlySelected={selectedLink === textTrigger.toLowerCase()}
                          />
                        }
                      </NavigationMenuTrigger>
                    )}
                    <NavigationMenuContent>
                      <ul className="flex gap-7 p-0 ml-[48px] mb-4 mt-1 sm:flex-grow">
                        {contextSections?.map((section, idx) => (
                          <section
                            key={idx}
                            className={cn(
                              'flex  flex-col items-start h-full min-w-[150px] max-w-[250px]', // Default: grow on smaller devices
                            )}
                          >
                            {getSectionContent(section)}
                          </section>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )
              }
            },
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenuOverlay show={showOverlay} />
    </React.Fragment>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li className="list-none ">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none  space-y-1 rounded-md  leading-none no-underline outline-none transition-colors hover:bg-accent text-accent-foreground focus:bg-accent',
              className,
            )}
            {...props}
          >
            <h5 className="text-sm font-medium leading-none">{title}</h5>
            <p className="line-clamp-2 text-sm leading-snug">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
