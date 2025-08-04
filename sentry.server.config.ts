// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

let DNS: string | undefined

if (process.env.NODE_ENV === "production") {
  DNS =
    "https://e0d61b91a8c9909da1e7418a36fa2b27@o4508508818374656.ingest.us.sentry.io/4509787420229632"
}

Sentry.init({
  dsn: DNS,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
