'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OrganizationLogin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/organization/dashboard')
    }
  }, [session, status, router])

  const handleGoogleSignIn = () => {
    signIn('google', { 
      callbackUrl: '/organization/dashboard?role=organization'
    })
  }

  return (
    <div>
      <h1>Organization Login</h1>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <p>
        Don't have an account? <a href="/organization/signup">Sign up here</a>
      </p>
    </div>
  )
}
