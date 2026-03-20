"use client";

import { ResultCard, ResultHeader, SectionTitle, DetailRow, StatusRow, ResultFooter } from "./SharedResultComponents";

interface SuccessStateProps {
    onReset: () => void;
}

export const SuccessState = ({ onReset }: SuccessStateProps) => {
    return (
        <ResultCard>
            <ResultHeader
                variant="success"
                icon={
                    <div className="w-[32px] h-[32px] bg-[#00D1A0] rounded-full flex items-center justify-center">
                        <img src="/icons/verified-end.svg" width={18} height={18} alt=""/>
                    </div>
                }
                title="Credential Verified"
                desc="This credential is valid and was issued by a trusted institution."
            />

            <div className="p-8 sm:p-10">
                <SectionTitle>Credential Details</SectionTitle>

                <div className="flex flex-col gap-4 sm:gap-5">
                    <DetailRow label="Recipient Name" value="John Doe"/>
                    <DetailRow label="Credential Type" value="Master of Science in Data Analytics"/>
                    <DetailRow label="Institution" value="Demo University"/>
                    <DetailRow label="Issued" value="12 June 2026"/>

                    <StatusRow status="Valid" dotBgClass="bg-[#00D1A0]" textClass="text-[#00D1A0]" />

                    <DetailRow label="Standard" value="W3C Verifiable Credential v2.0" isLink/>
                    <DetailRow label="Signature" value="ECDSA-SD-2023" isLink/>
                    <DetailRow label="Issuer DID" value="did:web:certs.demo-university.edu" isLink/>
                </div>
            </div>

            <ResultFooter onReset={onReset} />
        </ResultCard>
    );
};