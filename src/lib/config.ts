/**
 * Runtime configuration read from Vite env vars.
 *
 * The n8n webhook lives here rather than inline at the two call sites because:
 *  - it can be rotated without touching component code, and
 *  - a public repo should not ship a live, unauthenticated write endpoint that
 *    anyone cloning it inherits.
 *
 * Note this is a `VITE_`-prefixed var, so it IS bundled into the client build and
 * visible in the shipped JS. That is unavoidable for a browser-submitted form —
 * the env var protects the source repo, not the deployed page. The real defence
 * for the endpoint itself is rate limiting and payload validation inside n8n.
 */
export const N8N_WEBHOOK_URL: string | undefined = import.meta.env
  .VITE_N8N_BOOKING_WEBHOOK;

/**
 * Fail loudly in development if the webhook is missing, but let production render.
 * A misconfigured deploy should still serve the site; only the form should break,
 * and it should break visibly rather than silently swallowing submissions.
 */
export function requireWebhookUrl(): string {
  if (!N8N_WEBHOOK_URL) {
    throw new Error(
      "VITE_N8N_BOOKING_WEBHOOK is not set. Copy .env.example to .env.local and fill it in."
    );
  }
  return N8N_WEBHOOK_URL;
}
