"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthInput, AuthSelect, AuthButton, StepIndicator } from "@/components/ui/AuthComponents";
import {useRouter} from "next/navigation";

export default function SignUpPage() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        institutionName: "",
        domain: "",
        country: "",
        institutionType: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setStep(2);
    };

    const router = useRouter();

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Submitting final data to API:", formData);

        localStorage.setItem("registeredEmail", formData.email);

        alert(`Account Created successfully for ${formData.institutionName}! Redirecting to login...`);

        router.push("/login");
    };

    return (
        <section className="min-h-screen flex flex-col bg-[#F8F9FA]">

            <div className="w-full bg-white border-b border-brand-section-border/40 py-5 px-6 sm:px-12 flex items-center justify-between z-10 relative">
                <Link href={'/'} className="flex items-center gap-[8px]">
                    <img src="/icons/logo.svg" width='28' height='28' alt="logo"/>
                    <span className="text-2xl font-normal font-serif text-brand-dark">certifd</span>
                </Link>
                <div className="font-sans text-[13px]">
                    <span className="text-brand-secondary">Already have an account? </span>
                    <Link href="/login" className="text-[#00AA73] font-medium underline">
                        Sign In
                    </Link>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center bg-[#F8F9FA] justify-center p-4 relative overflow-hidden">

                <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1000px] mx-auto opacity-50">
                    <div className="w-full h-full border-x border-[#D9E0EA] mx-auto"></div>
                    <div className="w-full h-full border-r border-[#D9E0EA] mx-auto"></div>
                </div>

                <div className="w-full max-w-[480px] bg-white border border-brand-section-border/40 p-8 sm:p-12 relative z-10">

                    <StepIndicator current={step} total={2} />

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-left-8 zoom-in-95 duration-500 ease-out">
                            <div className="mb-8">
                                <h1 className="font-serif text-2xl font-normal text-brand-dark mb-2">
                                    Administrator account setup
                                </h1>
                                <p className="font-sans text-sm font-normal text-brand-secondary">
                                    Enter your details to create your administrator account.
                                </p>
                            </div>

                            <form onSubmit={handleNextStep} className="flex flex-col gap-5">
                                <AuthInput
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="John Smith"
                                    required
                                />
                                <AuthInput
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="name@institution.edu"
                                    required
                                />
                                <AuthInput
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />
                                <AuthInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                />

                                <div className="pt-2">
                                    <AuthButton type="submit">
                                        Continue
                                    </AuthButton>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-8 zoom-in-95 duration-500 ease-out">
                            <div className="mb-8">
                                <h1 className="font-serif text-[26px] font-normal text-brand-dark mb-2">
                                    Institution information
                                </h1>
                                <p className="font-sans text-sm text-brand-secondary">
                                    Provide details about your institution.
                                </p>
                            </div>

                            <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
                                <AuthInput
                                    label="Institution Name"
                                    name="institutionName"
                                    value={formData.institutionName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter institution name..."
                                    required
                                />
                                <AuthInput
                                    label="Institution Website / Domain"
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleChange}
                                    type="url"
                                    placeholder="https://www.institution.edu"
                                    required
                                />

                                <AuthSelect
                                    label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    options={[
                                        { value: "us", label: "United States" },
                                        { value: "uk", label: "United Kingdom" },
                                        { value: "ua", label: "Ukraine" },
                                        { value: "pl", label: "Poland" },
                                    ]}
                                    placeholder="Select country"
                                />

                                <AuthSelect
                                    label="Institution Type (Optional)"
                                    name="institutionType"
                                    value={formData.institutionType}
                                    onChange={handleChange}
                                    options={[
                                        { value: "university", label: "University" },
                                        { value: "college", label: "College" },
                                        { value: "academy", label: "Academy" },
                                        { value: "other", label: "Other" },
                                    ]}
                                    placeholder="Select type"
                                />

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="cursor-pointer flex-1 border border-brand-section-border text-brand-dark font-medium text-[15px] py-3 hover:bg-neutral-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <div className="flex-[2]">
                                        <AuthButton type="submit">
                                            Create Account
                                        </AuthButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>

        </section>
    );
}