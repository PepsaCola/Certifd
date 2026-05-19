"use client";

import { DashboardTitle } from "@/components/DashboardComponents/DashboardTitle/DashboardTitle";
import { DashboardSubtitle } from "@/components/DashboardComponents/DashboardSubtitle/DashboardSubtitle";
import {
    FormHelperText,
    FormInput,
    FormLabel,
    FormSectionTitle,
    FormSelect
} from "@/components/DashboardComponents/SettingsContent/FormElements";


export const ProfileSettings = () => {
    return (
        <div className="flex flex-col w-full">

            <div className="mb-4 sm:mb-6">
                <DashboardTitle>Profile</DashboardTitle>
                <DashboardSubtitle>Update your personal account information.</DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">

                <div className="p-4 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 max-w-[800px]">

                    <FormSectionTitle>
                        Account Information
                    </FormSectionTitle>

                    <div>
                        <FormLabel>Full Name</FormLabel>
                        <FormInput
                            type="text"
                            defaultValue="John Smith"
                        />
                    </div>

                    <div>
                        <FormLabel>Email Address</FormLabel>
                        <FormInput
                            type="email"
                            defaultValue="j.smith@oxford.edu"
                        />
                    </div>

                    <div>
                        <FormLabel>Role</FormLabel>
                        <FormSelect disabled>
                            <option>Administrator</option>
                        </FormSelect>
                        <FormHelperText>
                            Your role is assigned by your institution administrator.
                        </FormHelperText>
                    </div>

                    <div>
                        <FormLabel>Institution</FormLabel>
                        <FormInput
                            type="text"
                            defaultValue="Oxford University"
                            disabled
                        />
                    </div>

                </div>

                <div className="px-4 sm:px-8 py-4 sm:py-5 border-t border-[#E5E7EB] bg-[#FAFBFC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-[12px] sm:text-[13px] text-brand-secondary">
                        Unsaved changes will be lost if you navigate away.
                    </p>
                    <button className="bg-brand-btn hover:bg-brand-btn/90 text-white font-medium text-[13px] px-8 py-2.5 transition-colors w-full sm:w-auto">
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};