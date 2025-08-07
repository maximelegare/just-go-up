import { Button } from "@app/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@app/components/ui/sheet"
// import { getCachedGlobal } from "@app/utilities/getGlobals"
import { SideDrawer as SideDrawerType } from "@payload-types"

import { Locale } from "ROOT/locales/locales"

import { Logo } from "@app/components/Logo/Official"
import Link from "next/link"
import { Icon } from "../Icon"
import { getGlobal } from "@app/utilities/getGlobals"
import { Blocks } from "../Blocks"
import { getMeUser } from "@app/utilities/getMeUser"

type SideDrawerProps = {
  locale: Locale
}

export async function SideDrawer({ locale }: SideDrawerProps) {
  const { body }: SideDrawerType = await getGlobal("sideDrawer", 3, locale)

  const meUser = await getMeUser()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="iconOnly" className="z-[60]">
          <Icon name="radix/hamburger-menu" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div style={{ marginTop: meUser.user ? 15 : 0 }} className="flex flex-col h-full">
          <SheetHeader className="">
            <SheetTitle hidden>Menu</SheetTitle>
          </SheetHeader>
          <Blocks blocks={body?.content?.layout} params={{ locale }} />
          <div className="w-full flex justify-center mt-auto mb-8">
            <Link href="/" className="place-self-end mb-8">
              <SheetClose className="flex flex-col items-center">
                <Logo />
              </SheetClose>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
