"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmDonation() {
    const router = useRouter();
    const [donationData, setDonationData] = useState<any>(null);

    useEffect(() => {
        const raw = localStorage.getItem("donationData");
        if (!raw) {
            router.push("/donor");
            return;
        }

        setDonationData(JSON.parse(raw));
    }, [router]);

    if (!donationData) return null;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-[#9D6381] mb-6">Confirm Your Donation</h1>
            <p className="text-lg text-gray-700 mb-4">{donationData.summary}</p>

            <div className="grid gap-4 md:grid-cols-2">
                {donationData.organizations.map((org: any) => (
                    <div key={org.id} className="border p-4 rounded-lg shadow-sm bg-white">
                        <h2 className="text-xl font-semibold text-[#9D6381]">{org.name}</h2>
                        <p className="text-sm text-gray-600 mb-2">{org.description}</p>
                        <p className="text-sm">
                            <strong>Amount:</strong> {donationData.currency} {org.amount}
                        </p>
                        <p className="text-sm">
                            <strong>Payout Method:</strong> {org.preferred_payout_method}
                        </p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => alert("Confirmed"}
                className="mt-8 bg-[#9D6381] text-white px-6 py-3 rounded-xl hover:bg-[#8a5a6f]"
            >
                Confirm Donation
            </button>
        </div>
    );
}