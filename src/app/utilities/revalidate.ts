import type { Payload } from 'payload'

export const revalidateCollection = async (args: {
  collection: string
  slug: string
  payload: Payload
}): Promise<void> => {
  const { collection, slug, payload } = args

  try {
    const res = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`,
    )

    if (res.ok) {
      payload.logger.info(`Revalidated page '${slug}' in collection '${collection}'`)
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${res}`,
      )
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`,
    )
  }
}

export const revalidateGlobals = async () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate-globals`
  try {
    const res = await fetch(url)

    if (res.ok) {
      console.info(`Revalidated globals`)
    } else {
      console.error(`Error revalidating globals`)
    }
  } catch (err: unknown) {
    console.error(`Error hitting '/revalidate-globals': ${err}`)
  }
}
