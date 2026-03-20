"use client";

import { ResultCard, ResultHeader, SectionTitle, DetailRow, StatusRow, ResultFooter } from "./SharedResultComponents";
import Image from "next/image";

interface ErrorStateProps {
    type: "revoked" | "invalid";
    onReset: () => void;
}

export const ErrorState = ({ type, onReset }: ErrorStateProps) => {

    if (type === "revoked") {
        return (
            <ResultCard>
                <ResultHeader
                    variant="revoked"
                    icon={
                        <img src="/icons/error.svg" height={32} width={32} alt=""/>
                    }
                    title="Credential Revoked"
                    desc="This credential was revoked by the issuing institution and is no longer valid."
                />

                <div className="p-8 sm:p-10">
                    <SectionTitle>Credential Details</SectionTitle>
                    <div className="flex flex-col gap-4 sm:gap-5">
                        <DetailRow label="Recipient Name" value="John Doe" />
                        <DetailRow label="Credential Type" value="Master of Science in Data Analytics" />
                        <DetailRow label="Institution" value="Demo University" />
                        <DetailRow label="Issued" value="12 June 2026" />
                        <DetailRow label="Revoked" value="20 January 2027" valueClass="text-[#EF4444]" />

                        <StatusRow status="Revoked" dotBgClass="bg-[#EF4444]" textClass="text-[#EF4444]" />

                        <DetailRow label="Reason" value="Academic misconduct finding" />
                    </div>
                </div>

                <ResultFooter onReset={onReset} />
            </ResultCard>
        );
    }

    return (
        <ResultCard>
            <ResultHeader
                variant="invalid"
                icon={
                    <img src="/icons/error-sign.svg" alt=""/>
                }
                title="Credential Could Not Be Verified"
                desc="The credential file is invalid, corrupted, or the signature could not be verified."
            />

            <div className="p-8 sm:p-10 flex flex-col gap-8">
                <div>
                    <SectionTitle>Possible Reasons</SectionTitle>
                    <div className="flex flex-col gap-4">
                        <ReasonItem icon="shield" title="Invalid digital signature"
                                    text="— the cryptographic proof is malformed or does not match the credential content."/>
                        <ReasonItem icon="file" title="Unsupported credential format"
                                    text="— the file does not conform to W3C VC 1.1 or W3C VC 2.0."/>
                        <ReasonItem icon="code" title="Corrupted credential file"
                                    text="— the file may have been altered, truncated, or is not a valid JSON document."/>
                    </div>
                </div>


            </div>
            <div className="border-t border-neutral-100 px-[40px] py-[32px]">
                <SectionTitle>What to do</SectionTitle>
                <ul className="list-disc pl-5 text-sm font-normal text-brand-secondary space-y-3 ">
                    <li>Ensure you have downloaded the original credential file from the issuing institution's portal.
                    </li>
                    <li>Check that the file has not been renamed or modified after download.</li>
                    <li>Contact the institution's Registrar Office if the problem persists.</li>
                </ul>
            </div>
            <ResultFooter onReset={onReset} buttonText={<p className={'flex items-center justify-center gap-[8px]'}>
                <img src="/icons/try-again.svg" alt=""/> Try Again
            </p>}/>
        </ResultCard>
    );
};

const ReasonItem = ({icon, title, text}: { icon: "shield" | "file" | "code", title: string, text: string }) => (
    <div className="flex gap-3 ">
        <div className="min-w-[28px] h-[28px] flex box-border align-center justify-center border border-[#FEE685] bg-[#FFFBEB]  ">
            {icon === "shield" &&
                <Image className={'block'} width={14} height={14} src="/icons/invalid-digital-signature.svg" alt=""/>
            }
            {icon === "file" &&
                <Image className={'block'} width={14} height={14} src="/icons/unsupported-credential-format.svg" alt=""/>
            }
            {icon === "code" &&
                <Image className={'block'} width={14} height={14} src="/icons/corrupted-credential-file.svg" alt=""/>
            }
        </div>
        <p className="text-sm font-normal text-brand-dark leading-relaxed">
            {title} {text}
        </p>
    </div>
);