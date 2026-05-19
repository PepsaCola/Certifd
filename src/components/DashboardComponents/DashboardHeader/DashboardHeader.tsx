import Link from "next/link";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown/NotificationDropdown";

export const DashboardHeader = () => {
    return (
    <header className="bg-white border-b border-[#E5E7EB] px-4 md:px-10 z-50 relative">

        <div className="flex items-center justify-between max-w-[1248px] m-auto h-[64px] md:h-[76px]">

            <div className="flex items-center flex-1 gap-4 md:gap-6">
                <Link href={'/'} className="flex items-center gap-[6px] md:gap-[8px] min-w-auto md:min-w-[120px] shrink-0">
                    <img src="/icons/logo.svg" className="w-6 h-6 md:w-7 md:h-7" alt="logo"/>
                    <span className="text-xl md:text-2xl font-normal font-serif text-brand-dark">certifd</span>
                </Link>

                <div className="flex-1 max-w-[482px] hidden md:block">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary">
                            <img src="/icons/loop.svg" alt=""/>
                        </div>
                        <input
                            type="text"
                            placeholder="Search certificates..."
                            className="w-full bg-[#F3F4F6] text-brand-dark text-sm rounded-[999px] pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-brand-btn transition-colors placeholder:text-neutral-400"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center h-full shrink-0">

                <div className="flex items-center gap-2 md:gap-3 px-3 md:px-8">
                    <img src="/img/avatar-placeholder.png" className="w-8 h-8 md:w-[32px] md:h-[32px] rounded-full shrink-0" alt="Avatar"/>

                    <div className="hidden sm:flex flex-col text-left">
                        <span className="text-sm font-medium text-brand-dark leading-tight whitespace-nowrap">John Smith</span>
                        <span className="text-[10px] font-normal font-ibm text-brand-secondary uppercase tracking-wide mt-0.5 whitespace-nowrap">
                                Oxford University
                            </span>
                    </div>
                </div>

                <NotificationDropdown />

            </div>
        </div>
    </header>
);
};