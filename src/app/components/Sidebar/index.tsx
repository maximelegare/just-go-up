import { Button } from '@app/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@app/components/ui/sheet'
import { getCachedGlobal } from '@app/utilities/getGlobals'
import { Sidebar as SidebarType } from '@payload-types'

import { Menu } from 'lucide-react'
import { Locale } from 'ROOT/locales/locales'
import { CMSLink } from '@app/components/Link'

import { Logo } from '@app/components/Logo/Official'
import Link from 'next/link'
import { Separator } from '../ui/seperator'
import { getServerSideURL } from '@app/utilities/getServerSideURL'

type SidebarProps = {
  locale: Locale
}

export async function Sidebar({ locale }: SidebarProps) {
  const { sidebarSections }: SidebarType = await getCachedGlobal('sidebar', 3, locale)()

  const fullPath = await getServerSideURL('fullpath')

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="iconOnly" className="z-[60]">
          <Menu size={40} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader className="mt-3">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-grow">
          {sidebarSections?.map(({ links }, idx: number) => (
            <div key={idx} className={`${idx === sidebarSections.length - 1 ? 'flex-grow' : ''}`}>
              <Separator className="my-2" />
              <nav className="flex flex-col gap-2 items-start h-full">
                {links.map(({ link }, linkIdx: number) => (
                  <SheetClose key={linkIdx} asChild>
                    <CMSLink
                      className="text-white"
                      size="sm"
                      currentUrl={fullPath}
                      {...link}
                    ></CMSLink>
                  </SheetClose>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-auto mb-8">
          <Link href="/" className="place-self-end">
            <SheetClose className="flex flex-col items-center">
              <Logo />
              <div className="w-1 h-1 mt-4 bg-accent rounded-full"></div>
            </SheetClose>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
