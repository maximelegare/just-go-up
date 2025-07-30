import canUseDOM from "./canUseDOM"

export function doesCookieExist(cookieName: string): boolean {
  if (canUseDOM) {
    return document.cookie.split("; ").some((cookie) => cookie.startsWith(`${cookieName}=`))
  } else {
    throw new Error("Cannot use [doesCookieExist] function server-side")
  }
}
