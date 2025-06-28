"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function DonorLandingPage() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push("/donor/dashboard");
        }
    }, [session, router]);
    
    return (
        <div>
            <h1>Donor3 for Donors - donate with ease——any time, anywhere</h1>
            <h2>Create an account or log in to get started</h2>
            <Link href="/donor/login">Login</Link>
            <Link href="/donor/signup">Signup</Link>
        </div>
    );
}