"use client";

import { DataTable } from "@/components/common/DataTable";
import { ActionMenu } from "@/components/common/ActionMenu";

export interface TeamMemberData {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    lastActive: string;
}

export const mockTeamMembers: TeamMemberData[] = [
    { id: "1", name: "John Smith", email: "s.mitchell@demo.edu", role: "Administrator", status: "Active", lastActive: "3 hours ago" },
    { id: "2", name: "Priya Kapoor", email: "p.kapoor@demo.edu", role: "Reviewer", status: "Active", lastActive: "4 hours ago" },
    { id: "3", name: "James Hartley", email: "j.hartley@demo.edu", role: "Reviewer", status: "Active", lastActive: "20 hours ago" },
    { id: "4", name: "David Okonkwo", email: "d.okonkwo@demo.edu", role: "Approver", status: "Active", lastActive: "2 days ago" },
    { id: "5", name: "Elena Vasquez", email: "e.vasquez@demo.edu", role: "Approver", status: "Active", lastActive: "2 days ago" },
    { id: "6", name: "Thomas Brennan", email: "t.brennan@demo.edu", role: "Approver", status: "Inactive", lastActive: "50 days ago" },
];

interface TeamMembersTableProps {
    currentItems: TeamMemberData[];
    filteredItems: TeamMemberData[];
}

const GRID_COLUMNS = "grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_20px]";

export const TeamMembersTable = ({
                                     currentItems,
                                     filteredItems,
                                 }: TeamMembersTableProps) => {
    const totalItems = filteredItems.length;
    const activeCount = filteredItems.filter((m) => m.status === "Active").length;
    const inactiveCount = filteredItems.filter((m) => m.status === "Inactive").length;

    return (
        <DataTable
            gridClass={GRID_COLUMNS}
            items={currentItems}
            emptyMessage="No members found for this filter."
            headerContent={
                <>
                    <div>Name</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Last Active</div>
                    <div></div>
                </>
            }
            renderRow={(member) => (
                <TeamMemberRow key={member.id} data={member} gridClass={GRID_COLUMNS} />
            )}
            footerLeft={
                <span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">
                    {totalItems} members
                </span>
            }
            footerRight={
                <span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">
                    {activeCount} active · {inactiveCount} inactive
                </span>
            }
        />
    );
};

const StatusBadge = ({ status }: { status: TeamMemberData["status"] }) => {
    if (status === "Active") {
        return (
            <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-[12px] font-medium bg-[#E7FFF7] text-[#10B981]  leading-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0"></span>
                Active
            </span>
        );
    }

    return (
        <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-[12px] font-medium bg-[#FEF2F2] text-[#EF4444] rounded-sm leading-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0"></span>
            Inactive
        </span>
    );
};

const RoleBadge = ({ role }: { role: string }) => (
    <span className="inline-flex border border-[#E5E7EB] bg-[#F8FAFC] text-brand-secondary text-[12px] font-medium px-2.5 py-1 rounded-sm">
        {role}
    </span>
);

const MobileMetaItem = ({
                            label,
                            value,
                        }: {
    label: string;
    value: string;
}) => (
    <div className=" bg-[#FAFBFC] border border-[#E5E7EB] p-3">
        <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">
            {label}
        </p>
        <p className="text-[13px] text-brand-dark break-words">
            {value}
        </p>
    </div>
);

const TeamMemberRow = ({
                           data,
                           gridClass,
                       }: {
    data: TeamMemberData;
    gridClass: string;
}) => {
    return (
        <>
            <div
                className={`hidden lg:grid ${gridClass} gap-4 items-center p-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white`}
            >
                <div className="min-w-0">
                    <p className="text-[13px] font-medium text-brand-dark break-words">
                        {data.name}
                    </p>
                    <p className="text-[12px] text-brand-secondary mt-0.5 break-all">
                        {data.email}
                    </p>
                </div>

                <div>
                    <RoleBadge role={data.role} />
                </div>

                <div>
                    <StatusBadge status={data.status} />
                </div>

                <div className="text-[13px] text-brand-secondary">
                    {data.lastActive}
                </div>

                <div className="flex justify-end">
                    <ActionMenu
                        type="member"
                        infoId={data.id}
                        onEdit={() => console.log(`Edit member ${data.id}`)}
                        onRemove={() => console.log(`Remove member ${data.id}`)}
                    />
                </div>
            </div>

            <div className="lg:hidden px-4 py-4 sm:px-5 sm:py-5 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium text-brand-dark break-words">
                            {data.name}
                        </p>
                        <p className="text-[13px] text-brand-secondary mt-1 break-all">
                            {data.email}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <ActionMenu
                            type="member"
                            infoId={data.id}
                            onEdit={() => console.log(`Edit member ${data.id}`)}
                            onRemove={() => console.log(`Remove member ${data.id}`)}
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <RoleBadge role={data.role} />
                    <StatusBadge status={data.status} />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MobileMetaItem label="Last active" value={data.lastActive} />
                </div>
            </div>
        </>
    );
};