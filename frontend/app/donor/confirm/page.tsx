"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
    const [donationData, setDonationData] = useState<any>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const data = localStorage.getItem('donationData');
        if (data) {
            setDonationData(JSON.parse(data));
        } else {
            router.push('/donor/dashboard');
        }
    }, [router]);

    const handleConfirm = async () => {
        setIsConfirming(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        localStorage.setItem('donationSuccess', 'true');
        localStorage.removeItem('donationData');
        router.push('/donor/dashboard');
    };

    if (!donationData) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Processing...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200 py-4 px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-[#c42d7a]">Donor3</h1>
                    </div>
                    <div className="flex-1"></div>
                </div>
                
                <div className="absolute top-4 right-6 flex items-center space-x-3">
                    <div className="relative group">
                        <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#c42d7a] focus:border-transparent transition-all duration-200">
                            <span>Payment Methods</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Connected Payment Methods</h3>
                                
                                {/* PayPal */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">P</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">PayPal</p>
                                            <p className="text-xs text-gray-500">demo@donor3.com</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-600">Connected</p>
                                        <p className="text-xs text-gray-500">$3,278.91</p>
                                    </div>
                                </div>
                                
                                {/* Ethereum */}
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">E</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Ethereum</p>
                                            <p className="text-xs text-gray-500">0x1234...5678</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-600">Connected</p>
                                        <p className="text-xs text-gray-500">2.5 ETH</p>
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

            <div className="max-w-3xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-[#c42d7a] mb-4">Confirm Your Donation</h1>
                <p className="text-base text-gray-700 mb-6">{donationData.summary}</p>

                <div className="mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">Payment Method</h3>
                            <p className="text-sm text-gray-600 capitalize">{donationData.user_payout_method || 'paypal'}</p>
                            <p className="text-xs text-green-600 mt-1">
                                <span className="font-medium">{donationData.account_status || 'Connected'}</span> • {donationData.user_account || 'demo@donor3.com'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Balance: <span className="font-medium">US${donationData.user_balance?.toLocaleString() || '3,278.91'}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-base font-semibold text-gray-800">Total Amount</h3>
                            <p className="text-xl font-bold text-[#c42d7a]">
                                {donationData.currency === 'USD' ? 'US$' : donationData.currency}{donationData.amount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {donationData.organizations.map((org: any) => (
                        <div key={org.id} className="bg-white border-2 border-[#c42d7a] rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
                            <h2 className="text-xl font-semibold text-[#c42d7a] mb-3">{org.name}</h2>
                            <p className="text-base text-gray-600 mb-4">{org.description}</p>
                            <div className="text-right">
                                <div className="text-lg font-bold text-[#c42d7a]">
                                    {donationData.currency === 'USD' ? 'US$' : donationData.currency}{org.amount}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => router.push('/donor/dashboard')}
                        className="flex-1 hover:cursor-pointer bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 font-medium text-base transition-all duration-200 hover:scale-105"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isConfirming}
                        className="flex-1 bg-[#c42d7a] text-white px-6 py-3 rounded-xl hover:bg-[#a6246a] hover:cursor-pointer hover:scale-105 font-medium text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                    >
                        {isConfirming ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}