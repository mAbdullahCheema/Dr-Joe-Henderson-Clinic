/// <reference types="vite/client" />

/**
 * Declaring each var explicitly (rather than relying on Vite's catch-all index
 * signature) means a typo in the variable name is a compile error instead of a
 * silent `undefined` at runtime.
 */
interface ImportMetaEnv {
  /** n8n webhook receiving booking + newsletter submissions. See .env.example. */
  readonly VITE_N8N_BOOKING_WEBHOOK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
