import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    style?: string;
    bTop?: boolean;
    bg?: string;
    id?: string;
}

export const Section = ({ children, style = "", bTop, bg = "",id }: SectionProps) => {
    return (
        <section id={id} className={`${bTop ? 'border-t' : ''} border-brand-section-border ${bg}`}>
            <div
                className={`max-w-[1080px] mx-auto py-16 md:py-24 lg:py-[128px] px-4 sm:px-8 md:px-[80px] border-x border-brand-section-border flex flex-col ${style}`}
            >
                {children}
            </div>
        </section>
    );
};