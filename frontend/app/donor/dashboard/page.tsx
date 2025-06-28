"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DonorDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/donor");
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsLoading(true);
        setResponse("");

        try {
            const res = await fetch("http://localhost:8000/api/donor/donate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });
            
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("donationData", JSON.stringify(data));
                router.push("/donor/confirm");
            } else {
                setResponse("Error processing your request. Please try again.");
            }
            
        } catch (error) {
            setResponse("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-[#9D6381] text-xl">Loading...</div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white border-b border-gray-200 py-4 px-6">
                <div className="max-w-4xl mx-auto flex justify-center items-center">
                    <h1 className="text-2xl text-[#9D6381]">donor3</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center min-h-[calc(100vh-120px)]">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#9D6381] mb-4">
                        hi, Johannes. let's help those in need
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        tell us what you'd like to donate and we'll find the perfect charities for you
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., I want to donate $100 to help cats"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D6381] focus:border-transparent"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="bg-[#9D6381] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#8a5a6f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Send
                            </button>
                        </form>
                    </div> 

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 mb-4">Try these examples:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                "I want to donate $100 to help cats",
                                "I wanna donate 0.1 BTC to Ukrainian hospitals",
                                "Donate $50 to environmental causes",
                                "Help children in need with $200"
                            ].map((example, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMessage(example)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors duration-200"
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