import type { NextAuthOptions } from "next-auth"

declare module "next-auth" {
  interface AuthOptions {
    /**
     * Explicitly set trusted hosts to prevent callback issues
     * This is a valid runtime option in NextAuth.js v4.24.5 but not included in the type definitions
     */
    trustHost?: boolean
  }
}