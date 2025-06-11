import { revalidateTag } from 'next/cache'

import { type PayloadHandler } from 'payload'

export const revalidateGlobalsHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/posts/[id]" this should be "/posts/1"
    revalidateTag('global_footer')
    revalidateTag('global_header')
    revalidateTag('global_sidebar')
    payload.logger.info("Revalidated 'footer', 'header' & 'sidebar' globals")
    return Response.json({})
  } catch (err: unknown) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    payload.logger.error("Error revalidating 'footer', 'header' & 'sidebar'", err)
    return Response.json({})
  }
}
