'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function SignOut() {
  useEffect(() => {
    // Sign out and redirect to signin page
    signOut({ redirect: true, callbackUrl: '/auth/signin' })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Signing out...</h1>
        <p className="mt-2 text-gray-600">You are being redirected to the sign-in page.</p>
      </div>
    </div>
  )
}