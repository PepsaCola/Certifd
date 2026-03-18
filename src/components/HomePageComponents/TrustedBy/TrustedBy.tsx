import { Section } from "@/components/HomePageComponents/Section/Section";

// Масив шляхів до логотипів
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
        <Section style="!py-12 px-[80px] md:px-[128px] flex flex-col items-center gap-6 ">
            <h3 className="text-center text-brand-secondary text-xs font-normal  uppercase tracking-wider">
                Trusted by forward-thinking institutions
            </h3>


            <div className="flex flex-wrap items-center justify-center gap-[20px] md:gap-[40px]">
                {logos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Trusted institution ${index + 1}`}
                        className=" w-auto object-contain mix-blend-multiply"
                    />
                ))}
            </div>
        </Section>
    );
};