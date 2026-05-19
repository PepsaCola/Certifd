"use client";

interface StepProgressProps {
    currentStep: number;
    totalSteps?: number;
}

export const StepProgress = ({ currentStep, totalSteps = 4 }: StepProgressProps) => {
    return (
        <div className=" w-[240px]">
            <p className="text-[12px] font-medium text-brand-secondary mb-2.5">
                Step {currentStep} of {totalSteps}
            </p>
            <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 flex-1 transition-colors duration-300 ${
                            index < currentStep ? "bg-[#00C48C]" : "bg-[#E5E7EB]"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};