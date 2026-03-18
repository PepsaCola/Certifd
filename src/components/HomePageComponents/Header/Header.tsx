import Link from "next/link";

export const Header = ()=>{
    return (
        <header className="absolute top-0 left-0 right-0 z-50 w-full border-b-white/25 py-[20px] text-brand-white ">
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-[1248px]">
                <div className="flex items-center gap-[8px]">
                    <img src="/icons/logo.svg" width='28' height='28' alt="logo"/>
                    <span className="text-brand-white text-2xl font-normal font-serif">certifd</span>
                </div>
                <nav className=" md:flex items-center gap-8 text-sm font-medium text-brand-white">
                    <Link href="#product" className="hover:text-brand-white transition-colors">Product</Link>
                    <Link href="#solutions" className="hover:text-brand-white transition-colors">How it works</Link>
                    <Link href="#pricing" className="hover:text-brand-white transition-colors">Security</Link>
                    <Link href="#use-cases" className="hover:text-brand-white transition-colors">Use Cases</Link>
                    <Link href="#api" className="hover:text-brand-white transition-colors">Pricing</Link>
                    <Link href="/public-verify" className="hover:text-brand-white transition-colors">Verify Certificate</Link>
                </nav>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <Link href="/login" className="hover:text-brand-white transition-colors">
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="border border-brand-white/50 px-[16px] py-[10px] hover:bg-white/10 transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    )
}