import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // In a real application, you would fetch the user from your database
          // and compare the hashed password
          const response = await fetch(`/api/auth/register`);
          const users = await response.json();
          
          const user = users.find((user: any) => user.email === credentials.email);
          
          // This is a simplified version for demonstration
          // In a real app, you would use proper password hashing and verification
          if (user) {
            // Check if this is the demo user with hardcoded credentials
            if (credentials.email === "user@example.com" && credentials.password === "password") {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
              };
            }
            
            // For other users, we would verify against our API
            // In a real app, this would be a proper password verification
            const isValidPassword = await fetch(`/api/auth/verify-password`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            }).then(res => res.json()).then(data => data.valid).catch(() => false);
            
            if (isValidPassword) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
              };
            }
          }
        } catch (error) {
          console.error("Auth error:", error);
        }
        
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}

