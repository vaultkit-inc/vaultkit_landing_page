/**
 * Fixed-window, per-key rate limiter held in memory. On serverless this is
 * per instance, so it's a speed bump for scripted spam, not a hard quota.
 */
type Window = { count: number; resetAt: number }

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const windows = new Map<string, Window>()

  return function allow(key: string, now = Date.now()): boolean {
    const current = windows.get(key)
    if (!current || current.resetAt <= now) {
      windows.set(key, { count: 1, resetAt: now + windowMs })
      if (windows.size > 10_000) {
        for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k)
      }
      return true
    }
    current.count += 1
    return current.count <= limit
  }
}
