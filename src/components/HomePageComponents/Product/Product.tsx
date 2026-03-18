import { Section } from "@/components/HomePageComponents/Section/Section";
import { SectionTitle } from "@/components/HomePageComponents/SectionTitle/SectionTitle";
import { SectionSubTitle } from "@/components/HomePageComponents/SectionSubTitle/SectionSubTitle";

const features = [
    {
        title: "Bulk Issuance",
        description: "Issue hundreds of credentials from a single CSV upload.",
        icon: "/icons/clock.svg"
    },
    {
        title: "Approval Workflows",
        description: "Custom multi-step sign-off pipelines per faculty.",
        icon: "/icons/clock.svg"
    },
    {
        title: "Multi-Institution Signing",
        description: "Co-sign credentials across departments and partner bodies.",
        icon: "/icons/clock.svg"
    }
];

export const Product = () => {
    return (
        <Section bTop={true} bg={'bg-[#F8F9FA]'}>
            <SectionTitle style="mb-[20px] max-w-2xl">
                A modern credential <br className="hidden sm:block" /> infrastructure for universities
            </SectionTitle>

            <SectionSubTitle style="mb-[40px] max-w-3xl">
                Certifd provides secure credential issuance, automated approval workflows,
                and instant verification — built entirely on W3C open standards.
            </SectionSubTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-[#D9DEE7] overflow-hidden bg-brand-white  flex flex-col"
                    >
                        <div className="flex items-stretch h-[48px]">
                            <div className="w-[48px] bg-brand-white flex items-center justify-center shrink-0">
                                <img src={feature.icon} alt={feature.title} width={24} height={24}  />
                            </div>
                            <div className="flex-1 border-l bg-[#F8F9FA] border-b border-brand-secondary/20"></div>
                        </div>

                        <div className="p-5 flex bg-brand-white flex-col gap-2">
                            <h5 className="text-base font-semibold text-brand-dark">
                                {feature.title}
                            </h5>
                            <p className="text-sm font-normal text-brand-secondary leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </Section>
    );
};