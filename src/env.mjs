import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URI: z.string(),
    PAYLOAD_SECRET: z.string(),
    PAYLOAD_PUBLIC_SERVER_URL: z.string(),
    PAYLOAD_PUBLIC_DRAFT_SECRET: z.string(),
    REVALIDATION_KEY: z.string(),
    // UPLOADTHING_TOKEN: z.string(),
    // SENTRY_AUTH_TOKEN: z.string(),
    // SMTP_HOST: z.string(),
    // SMTP_USER: z.string(),
    // SMTP_PASS: z.string(),
    // SMTP_PORT: z.string(),
    // SMTP_DEFAULT_FROM_NAME:z.string(),
    // SMTP_DEFAULT_FROM:z.string()
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string(),
    NEXT_PUBLIC_IS_LIVE: z.string().optional(),
    NEXT_PRIVATE_REVALIDATION_KEY: z.string(),
    NEXT_PRIVATE_DRAFT_SECRET: z.string(),
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN:z.string()
  }, 
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
    PAYLOAD_PUBLIC_DRAFT_SECRET: process.env.PAYLOAD_PUBLIC_DRAFT_SECRET,
    REVALIDATION_KEY: process.env.REVALIDATION_KEY,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_IS_LIVE: process.env.NEXT_PUBLIC_IS_LIVE,
    NEXT_PRIVATE_REVALIDATION_KEY: process.env.NEXT_PRIVATE_REVALIDATION_KEY,
    NEXT_PRIVATE_DRAFT_SECRET: process.env.NEXT_PRIVATE_DRAFT_SECRET,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN:process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
    // UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    // SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    // SMTP_HOST: process.env.SMTP_HOST,
    // SMTP_USER: process.env.SMTP_USER,
    // SMTP_PASS: process.env.SMTP_PASS,
    // SMTP_PORT: process.env.SMTP_PORT,
    // SMTP_DEFAULT_FROM_NAME:process.env.SMTP_DEFAULT_FROM_NAME,
    // SMTP_DEFAULT_FROM:process.env.SMTP_DEFAULT_FROM
  },
})
