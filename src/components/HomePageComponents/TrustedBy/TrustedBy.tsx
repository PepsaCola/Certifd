import { Section } from "@/components/HomePageComponents/Section/Section";

const logos = [
    "/icons/trustedby-1.svg",
    "/icons/trustedby-2.svg",
    "/icons/trustedby-3.svg",
    "/icons/trustedby-4.svg",
    "/icons/trustedby-5.svg",
    "/icons/trustedby-6.svg",
];

export const TrustedBy = () => {
    return (
        <Section id={'pricing'} style="!py-10 md:!py-12 px-4 sm:px-8 md:px-[80px] lg:px-[128px] flex flex-col items-center gap-6 md:gap-8">
            <h3 className="text-center text-brand-secondary text-[10px] md:text-xs font-semibold uppercase tracking-widest">
                Trusted by forward-thinking institutions
            </h3>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {logos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Trusted institution ${index + 1}`}
                        className="h-6 sm:h-8 md:h-9 lg:h-10 w-auto object-contain mix-blend-multiply"
                    />
                ))}
            </div>
        </Section>
    );
};