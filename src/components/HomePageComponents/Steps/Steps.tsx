import { Section } from "@/components/HomePageComponents/Section/Section";
import { SectionTitle } from "@/components/HomePageComponents/SectionTitle/SectionTitle";

// Дані для кроків.
// Властивість 'active' визначає, чи буде крок підсвічений зеленим.
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
        <>
            <SectionTitle style="text-center mb-16">
                From upload to verified — in 3 steps
            </SectionTitle>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {stepsData.map((step, index) => (
                    <div key={index} className="flex flex-col">

                        <div className="flex flex-col items-center -mb-[6px] z-1">
                            <div className={`
                                px-4 py-1.5 text-sm font-medium border
                                ${step.active
                                ? "bg-[#00D1A0] text-white border-[#00D1A0]" 
                                : "bg-white text-brand-dark border-brand-secondary/30" 
                            }
                            `}>
                                {step.stepLabel}
                            </div>
                            <div className={`w-[12px] h-[6px] mt-[28px] ${step.active ? "bg-[#00D1A0]" : "bg-brand-secondary/30"}`}></div>
                        </div>

                        <div className="bg-neutral-50/70 border border-brand-secondary/10 p-6 sm:p-[28px] flex flex-col h-full  !pb-0">
                            <h3 className="text-xl font-semibold text-brand-dark mb-3">
                                {step.title}
                            </h3>
                            <p className="text-sm text-brand-secondary mb-8 leading-relaxed">
                                {step.description}
                            </p>

                            <div className=" bg-white align-bottom overflow-hidden mt-auto">
                                <img src={`${step.image}`} alt=""/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};