import { SectionTitle } from "@/components/HomePageComponents/SectionTitle/SectionTitle";
import { SectionSubTitle } from "@/components/HomePageComponents/SectionSubTitle/SectionSubTitle";

const casesData = [
    {
        title: "Bulk Credential Issuance",
        description: "Upload a CSV with hundreds of graduates and issue all digital credentials in one click. Perfect for end-of-year graduations.",
        image: "/img/case-1.png",
        reverse: false,
    },
    {
        title: "Analytics Dashboard",
        description: "Track issuance volume, verify geography, and credential shares in one unified place. Gain actionable insights.",
        image: "/img/case-2.png",
        reverse: true,
    },
    {
        title: "Instant Verification",
        description: "QR codes, URLs, or API — choose how you let third parties instantly check validity without contacting your staff.",
        image: "/img/case-3.png",
        reverse: false,
    }
];

export const Cases = () => {
    return (
        <>
            <div className="mb-16 md:mb-20 ">
                <SectionTitle style="text-center mb-4 mt-[128px]">
                    Everything your institution needs
                </SectionTitle>
                <SectionSubTitle style="text-center max-w-[663px] mx-auto">
                    A complete platform for the full credential lifecycle — from issuance to verification to revocation.
                </SectionSubTitle>
            </div>

            <div className="flex flex-col w-full gap-20 md:gap-0">
                {casesData.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row w-full md:items-stretch gap-5 md:gap-0 ${
                            item.reverse ? "md:flex-row-reverse" : ""
                        }`}
                    >
                        <div className="flex flex-col justify-center flex-1 w-full gap-4 px-[80px] ">
                            <h3 className="font-serif text-3xl font-bold text-brand-dark">
                                {item.title}
                            </h3>
                            <p className="font-sans text-lg text-brand-secondary leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex flex-1 w-full items-center justify-center">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full max-w-[480px] h-auto object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};