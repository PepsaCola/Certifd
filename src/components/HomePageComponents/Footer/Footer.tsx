import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-[#060D1A] py-[21px] border-t border-t-white/10">
            <div className="mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between max-w-[1248px] gap-4 md:gap-0">

                <div className="flex items-center gap-[8px]">
                    <img src="/icons/logo.svg" width="16" height="16" alt="logo" />
                    <span className="text-brand-white text-[15px] font-normal font-serif leading-[22.50px]">certifd</span>
                    <span className="text-brand-white/20 text-xs font-normal ml-[12px]">
                        © 2026 Certifd Ltd.
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-[13px] font-normal text-brand-white/40">
                    <Link href="#product" className="hover:text-brand-white transition-colors">Product</Link>
                    <Link href="#security" className="hover:text-brand-white transition-colors">Security</Link>
                    <Link href="#documentation" className="hover:text-brand-white transition-colors">Documentation</Link>
                    <Link href="#pricing" className="hover:text-brand-white transition-colors">Pricing</Link>
                </nav>

                <div className="flex items-center gap-4 text-xs font-normal">
                    <Link href="/privacy" className="text-brand-white/25 hover:text-brand-white transition-colors">
                        Privacy
                    </Link>
                    <Link href="/terms" className="text-brand-white/25 hover:text-brand-white transition-colors">
                        Terms
                    </Link>
                    <Link href="/contact" className="text-brand-white/25 hover:text-brand-white transition-colors">
                        Contact
                    </Link>
                </div>

            </div>
        </footer>
    );
};