import Link from "next/link";

export const Header = ()=>{
    return (
        <header className="top-0 left-0 right-0 z-50 w-full border border-b-[#D9E0EA] py-[20px] text-brand-dark ">
            <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between max-w-[1248px]">
                <Link href={'/'} className="flex items-center gap-[8px]">
                    <img src="/icons/logo.svg" width='28' height='28' alt="logo"/>
                    <span className=" text-2xl font-normal font-serif">certifd</span>
                </Link>
                <nav className=" md:flex items-center gap-8 text-sm font-medium text-brand-dark">
                    <Link href="#product" >Product</Link>
                    <Link href="#solutions" >How it works</Link>
                    <Link href="#pricing" >Security</Link>
                    <Link href="#use-cases" >Use Cases</Link>
                    <Link href="#api" >Pricing</Link>
                    <Link href="/public-verify" >Verify Certificate</Link>
                </nav>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <Link href="/login" >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="border border-brand-dark px-[16px] py-[10px] hover:bg-brand-dark/10 transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    )
}