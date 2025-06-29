"use client"

import { AuroraText } from "@/components/magicui/aurora-text";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPaypal, FaEthereum } from "react-icons/fa";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function DonorDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/donor");
        }
    }, [status, router]);

    useEffect(() => {
        const donationSuccess = localStorage.getItem('donationSuccess');
        if (donationSuccess === 'true') {
            setShowSuccess(true);
            localStorage.removeItem('donationSuccess');
            
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:8000/api/donor/donate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message,
                }),
            });

            const data = await res.json();

            if (res.ok && !data.error) {
                localStorage.setItem("donationData", JSON.stringify(data));
                router.push("/donor/confirm");
            } else {
                setError(data.error || "Unknown error occurred");
            }
        } catch (error) {
            console.error("network error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-[#b51669] text-2xl">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-200 py-4 px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-[#de1d81]">
                            Donor3
                        </h1>
                    </div>
                    <div className="flex-1"></div>
                </div>
                
                <div className="absolute top-4 right-6 flex items-center space-x-3">
                    <div className="relative group">
                        <button
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <span>Payment Methods</span>
                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Connected Payment Methods</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <FaPaypal className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-800">PayPal</p>
                                                <p className="text-sm text-gray-500 truncate">tamperejohannes@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-3">
                                            <p className="text-sm text-green-600 font-medium">Connected</p>
                                            <p className="text-xs text-gray-500">USD 3,278.91</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <FaEthereum className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-800">Ethereum Wallet</p>
                                                <p className="text-sm text-gray-500 truncate">0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-3">
                                            <p className="text-sm text-green-600 font-medium">Connected</p>
                                            <p className="text-xs text-gray-500">12.5 ETH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 cursor-pointer border border-gray-200">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {showSuccess && (
                <div className="bg-green-50 border-b border-green-200 py-3 px-6 relative">
                    <div className="max-w-4xl mx-auto flex items-center justify-center">
                        <p className="text-green-700 font-medium">
                            Thank you for helping! Your donation was successful.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowSuccess(false)}
                        className="absolute top-1/2 right-6 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[calc(100vh-120px)]">
                <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-[#de1d81] mb-4">
                    <AuroraText>Make a difference in seconds.</AuroraText>
                </h2>
                <div className="text-xl text-gray-700">
                <TextAnimate animation="slideUp" by="word">Just tell us how you want to help — we will handle the rest.</TextAnimate>
                </div>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white border border-white rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., I want to donate $100 to help cats"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b51669] focus:border-transparent"
                                disabled={isLoading}
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="bg-[#de1d81] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#b51669] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:cursor-pointer transition-colors duration-200"
                            >
                                {isLoading ? "Processing..." : "Send"}
                            </button>
                        </form>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-gray-700 mb-4">Inspiration:</p>
                        <div className="flex flex-wrap gap-2 justify-center cursor-pointer">
                            {[
                                "Donate $100 to help cats.",
                                "Give 0.1 ETH to Ukrainian hospitals.",
                                "I wanna give CAD $550 to earthquake victims.",
                                "I wanna get rid of all my ethereum. Send 12.5 ETH to hospitals in Toronto!"
                            ].map((example, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMessage(example)}
                                    className="bg-gray-100 hover:cursor-pointer hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors hover:scale-105 duration-200"
                                >
                                    {example}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}