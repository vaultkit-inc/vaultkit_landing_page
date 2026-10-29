import "server-only"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/** The client, or why there isn't one, in words fit for the server log. Never includes the key. */
export type LeadsClient = { client: SupabaseClient; problem?: never } | { client?: never; problem: string }

let cached: SupabaseClient | null = null

/** Service-role client for the ARI leads store. Server only: the key never reaches the browser. */
export function leadsClient(): LeadsClient {
  if (cached) return { client: cached }

  // Pasted values often carry a trailing newline or space.
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  const missing = [!url && "SUPABASE_URL", !key && "SUPABASE_SERVICE_ROLE_KEY"].filter(Boolean)
  if (missing.length) return { problem: `${missing.join(" and ")} ${missing.length > 1 ? "are" : "is"} not set` }

  if (!isHttpUrl(url!)) {
    return { problem: "SUPABASE_URL is not a valid URL. Use the Project URL, e.g. https://<project-ref>.supabase.co, without quotes" }
  }

  try {
    cached = createClient(url!, key!, { auth: { persistSession: false } })
    return { client: cached }
  } catch (error) {
    return { problem: `Couldn't create the Supabase client: ${error instanceof Error ? error.message : String(error)}` }
  }
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === "https:" || protocol === "http:"
  } catch {
    return false
  }
}
