"use client";

import { useState } from "react";
import { DashboardTitle } from "@/components/DashboardComponents/DashboardTitle/DashboardTitle";
import { DashboardSubtitle } from "@/components/DashboardComponents/DashboardSubtitle/DashboardSubtitle";
import {FormInput, FormLabel, FormSectionTitle} from "@/components/DashboardComponents/SettingsContent/FormElements";

const PasswordInput = ({ label }: { label: string }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full">
            <FormLabel>{label}</FormLabel>
            <div className="relative">
                <FormInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8C9BB0] hover:text-brand-dark transition-colors p-1"
                >
                    {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export const SecuritySettings = () => {
    return (
        <div className="flex flex-col w-full">

            <div className="mb-4 sm:mb-6">
                <DashboardTitle>Security</DashboardTitle>
                <DashboardSubtitle>Handle your password management.</DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">

                <div className="p-4 sm:p-8 md:p-10 flex flex-col gap-5 sm:gap-6 max-w-[800px]">

                    <FormSectionTitle>
                        Change Password
                    </FormSectionTitle>

                    <PasswordInput label="Current Password" />
                    <PasswordInput label="New Password" />
                    <PasswordInput label="Confirm New Password" />

                </div>

                <div className="px-4 sm:px-5 py-4 border-t border-[#E5E7EB] bg-[#FAFBFC] flex items-center justify-end">
                    <button className="w-full sm:w-auto bg-brand-btn hover:bg-brand-btn/90 text-white font-medium text-[13px] px-8 py-2.5 transition-colors">
                        Update Password
                    </button>
                </div>

            </div>
        </div>
    );
};