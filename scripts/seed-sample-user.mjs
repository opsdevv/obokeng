/**
 * Creates a confirmed demo user via Supabase Auth Admin API.
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Run: npm run seed:user
 */
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8")
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq < 1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (!process.env[key]) process.env[key] = val
    }
  } catch {
    console.error("Missing .env.local — copy from .env.example and fill values.")
    process.exit(1)
  }
}

loadEnv()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRole) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const DEMO_EMAIL = "demo@obokeng.tools"
const DEMO_PASSWORD = "ObokengDemo2026!"

const endpoint = `${url.replace(/\/$/, "")}/auth/v1/admin/users`

const res = await fetch(endpoint, {
  method: "POST",
  headers: {
    apikey: serviceRole,
    Authorization: `Bearer ${serviceRole}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    email_confirm: true,
    user_metadata: { display_name: "Demo Workspace" },
  }),
})

const body = await res.text()
if (!res.ok) {
  if (res.status === 422 && body.includes("already been registered")) {
    console.log("User already exists. Credentials unchanged:")
    console.log("  Email:", DEMO_EMAIL)
    console.log("  Password:", DEMO_PASSWORD)
    process.exit(0)
  }
  console.error("Failed:", res.status, body)
  process.exit(1)
}

console.log("Created sample user:")
console.log("  Email:", DEMO_EMAIL)
console.log("  Password:", DEMO_PASSWORD)
