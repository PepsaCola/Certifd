"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown/NotificationDropdown";

interface HeaderProps {
    activeTab?: "issue" | "verify";
    onTabChange?: (tab: "issue" | "verify") => void;
}

export const Header = ({ activeTab = "issue", onTabChange }: HeaderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const closeMenu = () => setIsMobileMenuOpen(false);

    if (isAuthenticated) {
        return (
            <header className="w-full bg-white border-b border-[#D9E0EA] font-sans top-0 z-50">
                <div className="flex items-center justify-between px-4 sm:px-6  sm:py-0 sm:h-[72px] max-w-[1440px] mx-auto gap-2">

                    <div className="flex-1 flex items-center justify-start">
                        <button
                            onClick={() => router.back()}
                            className="cursor-pointer flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-dark transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span className="hidden sm:block">Go Back</span>
                        </button>
                    </div>

                    <div className="flex shrink-0 items-center justify-center">
                        <Link href={'/dashboard'} className="flex items-center gap-[6px] sm:gap-[8px]">
                            <img src="/icons/logo.svg" className="w-6 h-6 sm:w-7 sm:h-7" alt="logo"/>
                            <span className="text-xl sm:text-2xl font-normal font-serif text-brand-dark">certifd</span>
                        </Link>
                    </div>

                    <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img src="/img/avatar-placeholder.png" className="w-8 h-8 sm:w-[32px] sm:h-[32px] rounded-full shrink-0" alt="Avatar"/>
                            <div className="hidden sm:flex flex-col text-left">
                                <span className="text-sm font-medium text-brand-dark leading-tight whitespace-nowrap">John Smith</span>
                                <span className="text-[10px] font-normal font-ibm text-brand-secondary uppercase tracking-wide mt-0.5 whitespace-nowrap">Oxford Univ.</span>
                            </div>
                        </div>
                        <NotificationDropdown />
                    </div>
                </div>

                <div className="flex justify-center gap-2 sm:gap-12 border-t border-[#D9E0EA] px-2 sm:px-0">
                    <button
                        onClick={() => onTabChange && onTabChange('issue')}
                        className={`flex items-center justify-center gap-2 py-3 sm:py-4 px-2 sm:px-4 text-[13px] sm:text-sm font-medium border-b-2 transition-colors w-1/2 sm:w-auto ${
                            activeTab === "issue"
                                ? "text-brand-dark border-brand-btn"
                                : "text-brand-secondary border-transparent hover:text-brand-dark"
                        }`}
                    >
                        <img src="/icons/issue-certificates.svg" alt="" className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${activeTab === "issue" ? "" : "opacity-70 grayscale"}`}/>
                        <span className="whitespace-nowrap">Issue Certificates</span>
                    </button>

                    <button
                        onClick={() => onTabChange && onTabChange('verify')}
                        className={`flex items-center justify-center gap-2 py-3 sm:py-4 px-2 sm:px-4 text-[13px] sm:text-sm font-medium border-b-2 transition-colors w-1/2 sm:w-auto ${
                            activeTab === "verify"
                                ? "text-brand-dark border-brand-btn"
                                : "text-brand-secondary border-transparent hover:text-brand-dark"
                        }`}
                    >
                        <img src="/icons/verify-certificate.svg" alt="" className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${activeTab === "verify" ? "" : "opacity-70 grayscale"}`}/>
                        <span className="whitespace-nowrap">Verify Certificate</span>
                    </button>
                </div>
            </header>
        );
    }

    return (
        <header className="top-0 left-0 right-0 z-50 w-full border-b border-[#D9E0EA] py-0 sm:py-[20px] text-brand-dark bg-white relative">
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-[1248px]">

                <Link href={'/'} className="flex items-center gap-[8px] relative z-50 shrink-0" onClick={closeMenu}>
                    <img src="/icons/logo.svg" width='28' height='28' alt="logo"/>
                    <span className="text-2xl font-normal font-serif">certifd</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-brand-dark shrink-0">
                    <Link href="#product" className="hover:text-brand-dark/70 transition-colors">Product</Link>
                    <Link href="#solutions" className="hover:text-brand-dark/70 transition-colors">How it works</Link>
                    <Link href="#pricing" className="hover:text-brand-dark/70 transition-colors">Security</Link>
                    <Link href="#use-cases" className="hover:text-brand-dark/70 transition-colors">Use Cases</Link>
                    <Link href="#api" className="hover:text-brand-dark/70 transition-colors">Pricing</Link>
                    <Link href="/public-verify" className="hover:text-brand-dark/70 transition-colors">Verify Certificate</Link>
                </nav>

                <div className="hidden lg:flex items-center gap-4 text-sm font-medium relative z-50 shrink-0">
                    <Link href="/login" className="hover:text-brand-dark/70 transition-colors">
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="border border-brand-dark px-[16px] py-[10px] hover:bg-neutral-50 rounded-sm transition-colors whitespace-nowrap"
                    >
                        Sign up
                    </Link>
                </div>

                <button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 relative z-50 shrink-0"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-[2px] bg-brand-dark transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block w-6 h-[2px] bg-brand-dark transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`block w-6 h-[2px] bg-brand-dark transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>

            </div>

            <div
                className={`fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 pb-8 lg:hidden transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <nav className="flex flex-col gap-6 text-lg font-medium text-brand-dark mb-10 overflow-y-auto">
                    <Link href="#product" onClick={closeMenu}>Product</Link>
                    <Link href="#solutions" onClick={closeMenu}>How it works</Link>
                    <Link href="#pricing" onClick={closeMenu}>Security</Link>
                    <Link href="#use-cases" onClick={closeMenu}>Use Cases</Link>
                    <Link href="#api" onClick={closeMenu}>Pricing</Link>
                    <Link href="/public-verify" onClick={closeMenu}>Verify Certificate</Link>
                </nav>

                <div className="mt-auto flex flex-col gap-4">
                    <Link
                        href="/login"
                        onClick={closeMenu}
                        className="w-full text-center py-3 text-brand-dark border border-transparent hover:bg-neutral-50 transition-colors rounded-sm font-medium"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        onClick={closeMenu}
                        className="w-full text-center border border-brand-dark px-4 py-3 hover:bg-neutral-50 transition-colors rounded-sm font-medium"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
};