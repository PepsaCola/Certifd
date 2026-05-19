"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthInput, AuthButton } from "@/components/ui/AuthComponents";

export default function LoginPage() {
    const router = useRouter();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem("registeredEmail");
        if (savedEmail) {
            setLoginData(prev => ({ ...prev, email: savedEmail }));
            localStorage.removeItem("registeredEmail");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", loginData.email);

        router.push("/");
    };

    return (
        <section className="min-h-screen flex">

            <div className="hidden lg:flex w-[38%] flex-col relative p-12 overflow-hidden bg-[#F8FAFC]">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat mix-blend-luminosity "
                    style={{ backgroundImage: "url('/img/login-bg.png')" }}
                ></div>

                <Link href={'/'} className="relative z-10 flex items-center gap-[8px]">
                    <img src="/icons/logo.svg" width='28' height='28' alt="logo"/>
                    <span className="text-2xl font-normal font-serif text-brand-dark">certifd</span>
                </Link>

                <div className="relative z-10 flex-1/2 w-px bg-[#BEC9DA] ml-[14px] my-6 opacity-70"></div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="font-serif text-3xl font-normal leading-tight text-brand-dark mb-4">
                        Digital Credentials for Academic Excellence
                    </h1>
                    <p className="font-sans text-base font-normal text-brand-secondary leading-relaxed">
                        A secure platform for universities and institutions to issue, verify, and manage official digital diplomas and certificates.
                    </p>
                </div>

                <div className="relative z-10 flex-1/6 w-px bg-[#BEC9DA] ml-[14px] my-6 opacity-70"></div>

                <div className="relative z-10 font-sans text-[13px] font-normal text-brand-secondary">
                    © 2026 Certifd. All rights reserved.
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white">
                <div className="w-full max-w-[400px]">

                    <div className="mb-8">
                        <h2 className="font-serif text-2xl font-normal text-brand-dark mb-2">Sign In</h2>
                        <p className="font-sans text-sm font-normal text-brand-secondary">
                            Access your institutional account
                        </p>
                    </div>

                    <button className="cursor-pointer w-full flex items-center justify-center gap-3 py-2.5 border border-brand-dark hover:bg-neutral-50 transition-colors font-sans text-[15px] font-medium text-brand-dark">
                        <img src="/icons/google.svg" width="18" height="18" alt="Google" />
                        Sign In with Google
                    </button>

                    <div className="flex items-center gap-4 my-[24px]">
                        <div className="flex-1 h-px bg-neutral-100"></div>
                        <span className="font-sans text-xs text-brand-secondary">or</span>
                        <div className="flex-1 h-px bg-neutral-100"></div>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4 font-sans">
                        <AuthInput
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="name@institution.edu"
                            required
                        />
                        <AuthInput
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Enter your password"
                            required
                        />

                        <div className="flex items-center justify-between mt-1 mb-2">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 appearance-none cursor-pointer border border-brand-section-border bg-white group-hover:border-brand-btn/50 focus:outline-none focus:ring-brand-btn/30 focus:ring-offset-1 checked:bg-brand-btn checked:border-brand-btn checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23fff%22%20stroke-width=%224%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><polyline%20points=%2220%206%209%2017%204%2012%22></polyline></svg>')] checked:bg-center checked:bg-no-repeat checked:bg-[size:10px_10px] transition-all duration-150"
                                />
                                <span className="text-sm font-sans text-brand-dark">Remember me</span>
                            </label>

                            <Link href="/forgot-password" className="text-sm text-[#00AA73] font-medium underline">
                                Forgot password?
                            </Link>
                        </div>

                        <AuthButton type="submit">
                            Sign In
                        </AuthButton>
                    </form>

                    <div className="text-center mt-6">
                        <span className="text-sm text-brand-secondary">Don't have an account? </span>
                        <Link href="/signup" className="text-sm text-[#00AA73] font-medium underline">
                            Register your institution
                        </Link>
                    </div>

                    <div className="mt-8 bg-[#F4F9FF] p-4  flex gap-3 items-start">
                        <div className="mt-0.5 text-[#026AA2]">
                            <img src="/icons/login-note.svg" width={20} height={20} alt=""/>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-[#2880B9] mb-1">Institutional Access Only</h4>
                            <p className="text-xs text-brand-secondary leading-relaxed">
                                This system is restricted to authorized educational institutions and administrators.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}