"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-7xl font-bold text-[#9D6381] mb-6 tracking-tight drop-shadow-lg">Donor3</h1>
        <h2 className="text-xl text-gray-500 mb-16 font-light">Charity made easy</h2>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Link 
            href="/donor"
            className="w-full sm:w-72 bg-[#9D6381] text-white font-medium py-5 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white hover:text-[#9D6381] hover:border-2 hover:border-[#9D6381] transform hover:scale-105 transition-all duration-300 ease-in-out no-underline text-lg"
            style={{ textDecoration: 'none' }}
          >
            For Donors
          </Link>
          <Link 
            href="/organization"
            className="w-full sm:w-72 bg-white border-2 border-[#9D6381] text-[#9D6381] font-medium py-5 px-10 rounded-2xl shadow-md hover:shadow-lg hover:bg-[#9D6381] hover:text-white transform hover:scale-105 transition-all duration-300 ease-in-out no-underline text-lg"
            style={{ textDecoration: 'none' }}
          >
            For Organizations
          </Link>
        </div>
      </div>
    </div>
  );
}