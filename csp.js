const policies = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://maps.googleapis.com",
    "https://plausible.io",
  ],
  "child-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "img-src": ["'self'", "https://www.gravatar.com", "https://raw.githubusercontent.com", "data:"],
  "font-src": ["'self'"],
  "frame-src": ["'self'"],
  "connect-src": ["'self'", "https://maps.googleapis.com", "https://plausible.io"],
}

export default Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(" ")}`
    }
    return ""
  })
  .join("; ")
