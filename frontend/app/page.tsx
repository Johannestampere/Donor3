"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDonorClick = () => {
    if (session) {
      router.push('/donor/dashboard');
    } else {
      router.push('/donor/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-start justify-center px-6"
      style={{ backgroundImage: "url('/pic.png')" }}
    >
      <div className="p-8 text-left max-w-4xl ml-16">
        <h1 className="text-6xl font-bold mb-6 tracking-tight text-white">
          <AuroraText>Donor3</AuroraText>
        </h1>
        <h2 className="text-2xl text-black mb-8 font-medium">Donating made easy</h2>
        <p className="text-lg text-black mb-16 max-w-2xl leading-relaxed">
          Donor3 helps generous people give effortlessly and lets verified organizations receive funds without the hassle. Just type your intent—we'll handle the rest.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <button 
            onClick={handleDonorClick}
            className="w-full sm:w-80 bg-[#FF0066] hover:cursor-pointer text-white font-medium py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#8a1254] hover:scale-105 transition-all duration-200 text-lg"
          >
            For Donors
          </button>
          <Link 
            href="/organization"
            className="w-full sm:w-80 bg-[#FF0066] text-white font-medium py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#8a1254] hover:scale-105 transition-all duration-200 no-underline text-lg text-center"
            style={{ textDecoration: 'none' }}
          >
            For Organizations
          </Link>
        </div>
      </div>
    </div>
  );
}
