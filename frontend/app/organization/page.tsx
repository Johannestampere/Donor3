"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function OrganizationLandingPage() {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push("/organization/dashboard");
        }
    }, [session, router]);

    return (
        <div>
            <h1>Donor3 for Charities - manage donations with ease</h1>
            <h2>Create an account or log in to get started</h2>
            <Link href="/organization/login">Login</Link>
            <Link href="/organization/signup">Signup</Link>
        </div>
    );
}