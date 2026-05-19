import React from "react";
import { Header } from "@/components/VerifyPageComponents/Header/Header";

export const VerifyLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Header />

            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    );
};