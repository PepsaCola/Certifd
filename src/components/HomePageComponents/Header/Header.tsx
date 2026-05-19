"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        setIsAuthenticated(false);
        router.push("/");
    };

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

    return (
        <header className="absolute top-0 left-0 right-0 z-50 w-full border-b border-white/25 py-[20px] text-brand-white">
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-[1248px]">

                <Link href="/" className="flex items-center gap-[8px] relative z-50" onClick={closeMenu}>
                    <img src="/icons/logo.svg" width='28' height='28' alt="logo"/>
                    <span className="text-brand-white text-2xl font-normal font-serif">certifd</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-brand-white">
                    <Link href="#product" className="hover:text-white/80 transition-colors">Product</Link>
                    <Link href="#how-it-work" className="hover:text-white/80 transition-colors">How it works</Link>
                    <Link href="#security" className="hover:text-white/80 transition-colors">Security</Link>
                    <Link href="#use-cases" className="hover:text-white/80 transition-colors">Use Cases</Link>
                    <Link href="#pricing" className="hover:text-white/80 transition-colors">Pricing</Link>
                    <Link href="/certificates?tab=verify" className="hover:text-white/80 transition-colors">Verify Certificate</Link>
                </nav>

                <div className="hidden lg:flex items-center gap-4 text-sm font-medium relative z-50">
                    {isAuthenticated ? (
                        <Link
                            href="/dashboard"
                            className="border border-brand-white/50 bg-white/10 px-[16px] py-[10px] hover:bg-white/20 transition-colors rounded-sm flex items-center gap-2"
                        >
                            Go to Dashboard
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-white/80 transition-colors">
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="border border-brand-white/50 px-[16px] py-[10px] hover:bg-white/10 transition-colors rounded-sm"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 relative z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>

            </div>

            <div
                className={`fixed inset-0 bg-[#060D1A] z-40 flex flex-col pt-24 px-6 pb-8 lg:hidden transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <nav className="flex flex-col gap-6 text-lg font-medium text-white mb-10">
                    <Link href="#product" onClick={closeMenu}>Product</Link>
                    <Link href="#how-it-work" onClick={closeMenu}>How it works</Link>
                    <Link href="#security" onClick={closeMenu}>Security</Link>
                    <Link href="#use-cases" onClick={closeMenu}>Use Cases</Link>
                    <Link href="#pricing" onClick={closeMenu}>Pricing</Link>
                    <Link href="/certificates?tab=verify" onClick={closeMenu}>Verify Certificate</Link>
                </nav>

                <div className="mt-auto flex flex-col gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link
                                href="/dashboard"
                                onClick={closeMenu}
                                className="w-full text-center border border-white/50 bg-white/10 px-4 py-3 hover:bg-white/20 transition-colors rounded-sm flex items-center justify-center gap-2"
                            >
                                Go to Dashboard
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={closeMenu}
                                className="w-full text-center py-3 text-white border border-transparent hover:bg-white/5 transition-colors rounded-sm"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                onClick={closeMenu}
                                className="w-full text-center border border-white/50 px-4 py-3 hover:bg-white/10 transition-colors rounded-sm"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};