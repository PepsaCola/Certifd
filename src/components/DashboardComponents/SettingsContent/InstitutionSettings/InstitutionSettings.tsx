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

export const InstitutionSettings = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="mb-5 md:mb-6">
                <DashboardTitle>Institution</DashboardTitle>
                <DashboardSubtitle>
                    Configure your institution&apos;s information and branding.
                </DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">
                <div className="p-4 md:p-10 flex flex-col gap-8 max-w-[800px]">
                    <div className="flex flex-col gap-4 border-b border-[#E5E7EB] pb-8">
                        <FormSectionTitle>
                            Institution Logo
                        </FormSectionTitle>

                        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
                            <div className="w-[70px] h-[70px] bg-[#FAFBFC] border rounded-sm border-[#E5E7EB] flex items-center justify-center shrink-0">
                                <img src="/img/institution-placeholder.png" alt="" />
                            </div>

                            <div className="flex flex-col gap-2.5 w-full md:w-auto">
                                <button className="w-full md:w-fit justify-center md:justify-start px-4 py-2 border border-[#E5E7EB] text-[13px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors flex items-center gap-2">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M5.4375 13.2749C4.5485 13.2749 3.6959 12.9371 3.06728 12.3359C2.43867 11.7346 2.08551 10.919 2.08551 10.0687C2.08551 9.21835 2.43867 8.40282 3.06728 7.80153C3.6959 7.20025 4.5485 6.86245 5.4375 6.86245C5.64746 5.92706 6.26169 5.10505 7.14507 4.57726C8.02844 4.04946 9.1086 3.8591 10.1479 4.04807C11.1872 4.23704 12.1006 4.78985 12.687 5.58488C13.2735 6.37992 13.485 7.35206 13.275 8.28745H13.9875C14.6489 8.28745 15.2832 8.55018 15.7508 9.01785C16.2185 9.48552 16.4812 10.1198 16.4812 10.7812C16.4812 11.4426 16.2185 12.0769 15.7508 12.5445C15.2832 13.0122 14.6489 13.2749 13.9875 13.2749H13.275"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6.86249 11.1375L8.99999 9L11.1375 11.1375"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M9 9V15.4125"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Upload Photo
                                </button>

                                <p className="text-xs text-brand-secondary">
                                    PNG or JPG · max 2 MB · square recommended
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 border-b border-[#E5E7EB] pb-8">
                        <FormSectionTitle className="mb-1">
                            Institution Details
                        </FormSectionTitle>

                        <div>
                            <FormLabel>Institution Name</FormLabel>
                            <FormInput
                                type="text"
                                defaultValue="Oxford University"
                            />
                        </div>

                        <div>
                            <FormLabel>Institution Website / Domain</FormLabel>
                            <FormInput
                                type="text"
                                defaultValue="oxford.edu"
                            />
                        </div>

                        <div>
                            <FormLabel>Country</FormLabel>
                            <FormSelect>
                                <option>United Kingdom</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Australia</option>
                            </FormSelect>
                        </div>

                        <div>
                            <FormLabel>Institution Type (Optional)</FormLabel>
                            <FormSelect>
                                <option>University</option>
                                <option>College</option>
                                <option>High School</option>
                                <option>Corporate</option>
                            </FormSelect>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <FormSectionTitle>
                            Verifiable Credentials
                        </FormSectionTitle>

                        <div>
                            <div className="relative flex items-center gap-1.5 w-fit mb-2 group">
                                <label className="block text-[13px] font-medium text-brand-dark cursor-help">
                                    Issuer DID
                                </label>

                                <div className="text-[#00C48C] cursor-help">
                                    <img src="/icons/help.svg" alt="" />
                                </div>

                                <div className="hidden md:flex absolute bottom-full left-8 mb-2 w-[340px] bg-white border border-[#E5E7EB] z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 flex-col gap-3 text-sm text-brand-dark font-normal cursor-default">
                                    <div className="flex flex-col gap-2 px-4 py-3">
                                        <div className="absolute -bottom-2 left-0 w-full h-2 bg-transparent"></div>

                                        <p>This DID is generated automatically based on your domain.</p>

                                        <p className="leading-relaxed text-brand-secondary">
                                            To enable verification, your organization must host a DID document at:
                                            <br />
                                            <a
                                                href="#"
                                                className="text-[#00AA73] hover:underline break-all mt-0.5 inline-block"
                                            >
                                                https://your-domain/.well-known/did.json
                                            </a>
                                        </p>

                                        <p className="text-brand-secondary">
                                            Contact your IT team or see documentation for setup instructions.
                                        </p>
                                    </div>

                                    <div className="px-4 py-3 border-t border-[#D9DEE7] bg-[#FAFBFC]">
                                        <a
                                            href="#"
                                            className="text-[#00AA73] text-sm font-medium hover:underline mt-1 w-fit"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="md:hidden mb-3 p-3 border border-[#E5E7EB] bg-[#FAFBFC] text-[12px] text-brand-secondary leading-relaxed">
                                This DID is generated automatically based on your domain.
                                <br />
                                Your organization must host a DID document at:
                                <br />
                                <span className="text-[#00AA73] break-all">
                                    https://your-domain/.well-known/did.json
                                </span>
                            </div>

                            <FormInput
                                type="text"
                                defaultValue="did:web:oxford.edu"
                                disabled
                                className="font-menlo text-xs"
                            />

                            <FormHelperText>
                                Your W3C Decentralised Identifier - generated automatically. Contact support to update.
                            </FormHelperText>
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-5 py-4 border-t border-[#E5E7EB] bg-[#FAFBFC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-[13px] text-brand-secondary">
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