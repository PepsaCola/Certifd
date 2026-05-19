import { SectionTitle } from "@/components/HomePageComponents/SectionTitle/SectionTitle";

const stepsData = [
    {
        stepLabel: "Step 1",
        title: "Upload",
        description: "Upload your graduate list as a CSV file. Review the records and prepare them for credential issuance.",
        image: "/img/step-1.png",
        active: true,
    },
    {
        stepLabel: "Step 2",
        title: "Issue",
        description: "Credentials are cryptographically signed using your institution's digital identity.",
        image: "/img/step-2.png",
        active: false,
    },
    {
        stepLabel: "Step 3",
        title: "Verify",
        description: "Anyone can scan a QR code to instantly verify the authenticity of the credential.",
        image: "/img/step-3.png",
        active: false,
    }
];

export const Steps = () => {
    return (
        <div id={'how-it-work'} className="flex flex-col px-4 sm:px-8 md:px-[80px] pb-16 md:pb-24">

            <SectionTitle style="text-center mb-10 md:mb-16">
                From upload to verified — in 3 steps
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
                {stepsData.map((step, index) => (
                    <div key={index} className="flex flex-col">

                        <div className="flex flex-col items-center -mb-[6px] relative z-10">
                            <div className={`
                                px-4 py-1.5 text-[13px] md:text-sm font-medium border
                                ${step.active
                                ? "bg-[#00D1A0] text-white border-[#00D1A0]"
                                : "bg-white text-brand-dark border-[#E5E7EB]"
                            }
                            `}>
                                {step.stepLabel}
                            </div>
                            <div className={`w-[12px] h-[6px] mt-4 md:mt-[28px] ${step.active ? "bg-[#00D1A0]" : "bg-[#E5E7EB]"}`}></div>
                        </div>

                        <div className="bg-[#FAFBFC] border border-[#E5E7EB] p-6 md:p-8 flex flex-col h-full !pb-0 transition-shadow hover:shadow-sm">
                            <h3 className="text-lg md:text-xl font-semibold text-brand-dark mb-2 md:mb-3 text-center md:text-left">
                                {step.title}
                            </h3>
                            <p className="text-[13px] md:text-sm text-brand-secondary mb-8 leading-relaxed text-center md:text-left">
                                {step.description}
                            </p>

                            <div className="bg-white align-bottom overflow-hidden mt-auto border-t border-[#E5E7EB]">
                                <img src={step.image} alt={step.title} className="w-full h-auto block object-cover" />
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};