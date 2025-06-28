'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DonorLogin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/donor/dashboard')
    }
  }, [session, status, router])

  const handleGoogleSignIn = () => {
    signIn('google', { 
      callbackUrl: '/donor/dashboard?role=donor'
    })
  }

  return (
    <div>
      <h1>Donor Login</h1>
      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
      <p>
        Don't have an account? <a href="/donor/signup">Sign up here</a>
      </p>
    </div>
  )
}
