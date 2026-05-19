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
        <Section id="product" bTop={true} bg="bg-[#F8F9FA]">
            <SectionTitle style="mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0">
                A modern credential <br className="hidden sm:block" /> infrastructure for universities
            </SectionTitle>

            <SectionSubTitle style="mb-10 md:mb-12 max-w-3xl mx-auto md:mx-0">
                Certifd provides secure credential issuance, automated approval workflows,
                and instant verification — built entirely on W3C open standards.
            </SectionSubTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-[#E5E7EB] overflow-hidden bg-white flex flex-col transition-shadow hover:shadow-sm"
                    >
                        <div className="flex items-stretch h-[48px] md:h-[56px]">
                            <div className="w-[48px] md:w-[56px] bg-white flex items-center justify-center shrink-0 border-r border-b border-[#E5E7EB]">
                                <img src={feature.icon} alt={feature.title} className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div className="flex-1 bg-[#F8F9FA] border-b border-[#E5E7EB]"></div>
                        </div>

                        <div className="p-6 md:p-8 flex bg-white flex-col gap-2.5">
                            <h5 className="text-[15px] md:text-base font-semibold text-brand-dark">
                                {feature.title}
                            </h5>
                            <p className="text-[13px] md:text-sm font-normal text-brand-secondary leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};