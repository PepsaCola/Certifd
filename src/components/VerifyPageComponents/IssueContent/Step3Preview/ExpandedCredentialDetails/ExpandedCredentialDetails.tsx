const Title = ({ children }: { children: any }) => (
    <span className="text-[11px] text-brand-secondary uppercase tracking-tight mb-2.5 block">
        {children}
    </span>
);

export const ExpandedCredentialDetails = ({ cred, isExpanded }: { cred: any, isExpanded: boolean }) => {

    const getKeyValueRow = (label: string, value: string, fontmenlo = false) => (
        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_2fr] gap-1 sm:gap-4 py-2 border-b border-[#D9DEE7] last:border-0">
            <span className="text-[13px] text-brand-secondary font-medium">{label}</span>
            <span className={`text-[13px] break-words ${fontmenlo ? "font-menlo text-[#2880B9]" : "text-brand-dark"}`}>
                {value}
            </span>
        </div>
    );

    return (
        <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
                <div className="bg-[#FAFBFC] px-4 md:px-10 py-4 md:py-6 border-b border-[#E5E7EB]">
                    <div className="flex flex-col gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-8">
                            <div>
                                <Title>Recipient Information</Title>
                                <div className="flex flex-col pr-0 md:pr-4">
                                    {getKeyValueRow("Recipient Name", cred.name)}
                                    {getKeyValueRow("Recipient ID", cred.recId, true)}
                                    {getKeyValueRow("Email", cred.email)}
                                    {getKeyValueRow("Date of Birth", cred.dob)}
                                    {getKeyValueRow("Nationality", cred.nationality)}
                                </div>
                            </div>
                            <div>
                                <Title>Issuance Details</Title>
                                <div className="flex flex-col">
                                    {getKeyValueRow("Graduation Date", cred.gradDate)}
                                    {getKeyValueRow("Completion Date", cred.compDate)}
                                    {getKeyValueRow("Study Mode", cred.studyMode)}
                                    {getKeyValueRow("ECTS Credits", cred.ects)}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Title>Credential Information</Title>
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-8">
                                <div className="flex flex-col pr-0 md:pr-4">
                                    {getKeyValueRow("Credential Type", cred.type)}
                                    {getKeyValueRow("Program", cred.program)}
                                    {getKeyValueRow("Major", cred.major)}
                                    {getKeyValueRow("Faculty", cred.faculty)}
                                </div>
                                <div className="flex flex-col">
                                    {getKeyValueRow("Department", cred.dept)}
                                    {getKeyValueRow("Honors", cred.honors)}
                                    {getKeyValueRow("GPA", cred.gpa)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};