import { Button } from "@app/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@app/components/ui/sheet"
// import { getCachedGlobal } from "@app/utilities/getGlobals"
// import { SideDrawer as SideDrawerType } from "@payload-types"

import { Locale } from "ROOT/locales/locales"
import { CMSLink } from "@app/components/Link"

import { Logo } from "@app/components/Logo/Official"
import Link from "next/link"
import { Separator } from "../ui/separator"
import { getServerSideURL } from "@app/utilities/getServerSideURL"
import { Icon } from "../Icon"

type SideDrawerProps = {
  locale: Locale
}

export async function SideDrawer({}: SideDrawerProps) {
  // const { sections }: SideDrawerType = await getCachedGlobal("sideDrawer", 3, locale)()

  const fullPath = await getServerSideURL("fullpath")

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="iconOnly" className="z-[60]">
          <Icon name="radix/hamburger-menu" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        {/* <SheetHeader className="">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader> */}

        <div className="flex flex-col">
          <Separator />
          <CMSLink
            justifyContent="left"
            className="rounded-none"
            size="clear"
            currentUrl={fullPath}
            appearance="sideDrawer"
            label="Test"
            url="tets"
          ></CMSLink>
          <Separator />
          <CMSLink
            justifyContent="left"
            className="rounded-none"
            size="clear"
            currentUrl={fullPath}
            appearance="sideDrawer"
            label="Test"
            url="tets"
          ></CMSLink>
          <Separator />
          <CMSLink
            justifyContent="left"
            className="rounded-none"
            size="clear"
            currentUrl={fullPath}
            appearance="sideDrawer"
            label="Test"
            url="tets"
          ></CMSLink>
          <Separator />
          <CMSLink
            justifyContent="left"
            className="rounded-none"
            size="clear"
            currentUrl={fullPath}
            appearance="sideDrawer"
            label="Test"
            url="tets"
          ></CMSLink>
          <Separator />

          <CMSLink
            justifyContent="left"
            className="rounded-none"
            size="clear"
            currentUrl={fullPath}
            appearance="sideDrawer"
            label="Test"
            url="tets"
          ></CMSLink>
          <Separator />
        </div>

        {/* <div className="flex flex-col flex-grow">
          {sections?.map(({ links }, idx: number) => (
            <div key={idx} className={`${idx === sections.length - 1 ? "flex-grow" : ""}`}>
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
        </div> */}

        <div className="w-full flex justify-center mt-auto mb-8">
          <Link href="/" className="place-self-end">
            <SheetClose className="flex flex-col items-center">
              <Logo />
            </SheetClose>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
