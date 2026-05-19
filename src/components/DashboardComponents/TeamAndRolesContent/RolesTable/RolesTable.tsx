"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { ActionMenu } from "@/components/common/ActionMenu";

const PERMISSION_TITLES: Record<string, string> = {
    view_certs: "View certificates", issue_certs: "Issue certificates", approve_reqs: "Approve requests",
    sign_certs: "Sign certificates", revoke_certs: "Revoke certificates", archive_certs: "Archive issued credentials",
    part_pipeline: "Participate in approval pipeline", manage_team: "Manage team members", manage_roles: "Manage roles",
    manage_settings: "Manage settings", view_analytics: "View analytics", export_data: "Export data",
};

type MemberStatus = "Active" | "Inactive";

interface RoleMember { id: string; name: string; email: string; role: string; status: MemberStatus; lastActive: string; }
interface RoleData { id: string; name: string; membersCount: number; status: MemberStatus; created: string; isSystem: boolean; isDefault: boolean; permissionIds: string[]; members: RoleMember[]; }

export const mockRolesData: RoleData[] = [
    { id: "1", name: "Administrator", membersCount: 1, status: "Active", created: "01 Sept 2025", isSystem: true, isDefault: true, permissionIds: ["view_certs", "issue_certs", "approve_reqs", "sign_certs", "revoke_certs", "archive_certs", "part_pipeline", "manage_team", "manage_roles", "manage_settings", "view_analytics", "export_data"], members: [{ id: "m1", name: "John Smith", email: "s.mitchell@demo.edu", role: "Admin", status: "Active", lastActive: "3 hours ago" }] },
    { id: "2", name: "Reviewer", membersCount: 2, status: "Active", created: "01 Sept 2025", isSystem: false, isDefault: true, permissionIds: ["view_certs", "approve_reqs", "part_pipeline", "view_analytics"], members: [{ id: "m2", name: "Priya Kapoor", email: "p.kapoor@demo.edu", role: "Reviewer", status: "Active", lastActive: "4 hours ago" }, { id: "m3", name: "James Hartley", email: "j.hartley@demo.edu", role: "Reviewer", status: "Active", lastActive: "20 hours ago" }] },
    { id: "3", name: "Approver", membersCount: 1, status: "Active", created: "01 Sept 2025", isSystem: false, isDefault: true, permissionIds: ["view_certs", "approve_reqs", "sign_certs", "part_pipeline", "view_analytics"], members: [{ id: "m4", name: "David Okonkwo", email: "d.okonkwo@demo.edu", role: "Approver", status: "Active", lastActive: "2 days ago" }] },
    { id: "4", name: "Custom Role", membersCount: 1, status: "Active", created: "01 Sept 2025", isSystem: false, isDefault: true, permissionIds: ["view_certs", "approve_reqs", "sign_certs"], members: [{ id: "m5", name: "David Okonkwo", email: "d.okonkwo@demo.edu", role: "Approver", status: "Active", lastActive: "2 days ago" }] },
];

const GRID_COLUMNS = "grid-cols-[2.5fr_3fr_1.5fr_1.5fr_20px]";

interface RolesTableProps { onEditRole: (roleId: string) => void; }

export const RolesTable = ({ onEditRole }: RolesTableProps) => {
    const totalRoles = mockRolesData.length;
    const activeRoles = mockRolesData.filter((r) => r.status === "Active").length;
    const inactiveRoles = totalRoles - activeRoles;

    return (
        <DataTable
            gridClass={GRID_COLUMNS}
            items={mockRolesData}
            emptyMessage="No roles found."
            headerContent={<><div>Name</div><div>Permissions</div><div>Status</div><div>Created</div><div></div></>}
            renderRow={(role) => <RoleRow key={role.id} data={role} gridClass={GRID_COLUMNS} onEdit={() => onEditRole(role.id)} />}
            footerLeft={<span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">{totalRoles} roles</span>}
            footerRight={<span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">{activeRoles} active · {inactiveRoles} inactive</span>}
        />
    );
};

const StatusBadge = ({ status }: { status: MemberStatus }) => {
    const isAct = status === "Active";
    return (
        <span className={`inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-[12px] font-medium  leading-4 ${isAct ? 'bg-[#E7FFF7] text-[#10B981]' : 'bg-[#FEF2F2] text-[#EF4444]'}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isAct ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`}></span>{status}
        </span>
    );
};

const PermissionChip = ({ children }: { children: string }) => (
    <span className="inline-flex border border-[#E5E7EB] bg-[#F8FAFC] text-brand-secondary text-[12px] font-medium px-2.5 py-1 ">{children}</span>
);

const MetaItem = ({ label, value }: { label: string; value: string; }) => (
    <div className=" bg-[#FAFBFC] border border-[#E5E7EB] p-3">
        <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">{label}</p>
        <p className="text-[13px] text-brand-dark break-words">{value}</p>
    </div>
);

const MemberRow = ({ member }: { member: RoleMember }) => {
    return (
        <>
            <div className="hidden md:grid grid-cols-[2.5fr_2fr_1.5fr_1.5fr_20px] gap-4 items-center px-4 py-3 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors">
                <div className="min-w-0"><p className="text-[13px] font-medium text-brand-dark break-words">{member.name}</p><p className="text-[12px] text-brand-secondary mt-0.5 break-all">{member.email}</p></div>
                <div><PermissionChip>{member.role}</PermissionChip></div>
                <div><StatusBadge status={member.status} /></div>
                <div className="text-[13px] text-brand-secondary">{member.lastActive}</div>
                <div className="flex justify-end"><ActionMenu type="member" /></div>
            </div>

            <div className="md:hidden px-4 py-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1"><p className="text-[14px] font-medium text-brand-dark break-words">{member.name}</p><p className="text-[13px] text-brand-secondary mt-1 break-all">{member.email}</p></div>
                    <div className="shrink-0"><ActionMenu type="member" /></div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2"><PermissionChip>{member.role}</PermissionChip><StatusBadge status={member.status} /></div>
                <div className="mt-4 grid grid-cols-1 gap-3"><MetaItem label="Last active" value={member.lastActive} /></div>
            </div>
        </>
    );
};

const RoleRow = ({ data, gridClass, onEdit }: { data: RoleData; gridClass: string; onEdit: () => void; }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFullyExpanded, setIsFullyExpanded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            const timer = setTimeout(() => setIsFullyExpanded(true), 300);
            return () => clearTimeout(timer);
        }
        setIsFullyExpanded(false);
    }, [isExpanded]);

    const translatedPermissions = data.permissionIds?.map((id) => PERMISSION_TITLES[id] || id) || [];
    const visiblePermissions = translatedPermissions.slice(0, 3);
    const hiddenCount = translatedPermissions.length > 3 ? translatedPermissions.length - 3 : 0;

    return (
        <div className={`flex flex-col border-b border-[#E5E7EB] last:border-b-0 bg-white relative ${isExpanded || isMenuOpen ? "z-20" : "z-0"}`}>

            <div className={`hidden lg:grid ${gridClass} gap-4 items-start p-4 cursor-pointer hover:bg-neutral-50/50 transition-colors`} onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-start gap-4 min-w-0">
                    <button className={`mt-0.5 text-brand-dark transition-transform duration-300 ease-in-out shrink-0 ${isExpanded ? "rotate-180" : ""}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div className="min-w-0"><p className="text-[13px] font-medium text-brand-dark break-words">{data.name}</p><p className="text-[12px] text-brand-secondary mt-0.5">{data.membersCount} member(s)</p></div>
                </div>
                <div className="flex flex-col gap-1.5 text-[13px] text-brand-dark mt-0.5 min-w-0">
                    {visiblePermissions.map((perm, idx) => <span key={idx} className="leading-tight break-words">{perm}</span>)}
                    {hiddenCount > 0 && <span className="text-[#00C48C] font-medium text-[12px] mt-0.5">+{hiddenCount} more</span>}
                </div>
                <div className="mt-0.5"><StatusBadge status={data.status} /></div>
                <div className="text-[13px] text-brand-secondary mt-1">{data.created}</div>
                <div onClick={(e) => e.stopPropagation()} className="mt-0.5 flex justify-center shrink-0">
                    <ActionMenu type="role" onEdit={onEdit} onToggle={(open) => setIsMenuOpen(open)} />
                </div>
            </div>

            <div className="lg:hidden px-4 py-4 sm:px-5 sm:py-5 cursor-pointer hover:bg-neutral-50/50 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2.5">
                            <div className="pt-[2px] text-brand-dark shrink-0">
                                <svg className={`transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                            <div className="min-w-0 flex-1"><p className="text-[14px] font-medium text-brand-dark break-words">{data.name}</p><p className="text-[13px] text-brand-secondary mt-1">{data.membersCount} member(s)</p></div>
                        </div>
                    </div>
                    <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                        <ActionMenu type="role" onEdit={onEdit} onToggle={(open) => setIsMenuOpen(open)} />
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2"><StatusBadge status={data.status} /></div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"><MetaItem label="Created" value={data.created} /><MetaItem label="Permissions" value={`${translatedPermissions.length}`} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {visiblePermissions.map((perm, idx) => <PermissionChip key={idx}>{perm}</PermissionChip>)}
                    {hiddenCount > 0 && <span className="inline-flex items-center text-[#00C48C] font-medium text-[12px] px-1">+{hiddenCount} more</span>}
                </div>
            </div>

            <div className={`grid transition-all duration-300 ease-in-out bg-[#FAFBFC] border-t border-[#E5E7EB] ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className={isFullyExpanded ? "overflow-visible" : "overflow-hidden"}>
                    <div className="mx-4 sm:mx-5 lg:ml-[48px] lg:mr-5 mb-5 mt-4 border border-[#E5E7EB] bg-white">
                        <div className="px-4 py-3 border-b border-[#E5E7EB] bg-neutral-50/50"><p className="text-[11px] text-brand-secondary uppercase leading-4 tracking-tight">Assigned Members</p></div>
                        <div className="hidden md:grid grid-cols-[2.5fr_2fr_1.5fr_1.5fr_20px] gap-4 px-4 py-3 border-b border-[#E5E7EB] text-[11px] text-brand-secondary uppercase leading-4 tracking-tight">
                            <div>Name</div><div>Role</div><div>Status</div><div>Last Active</div><div></div>
                        </div>
                        <div className="flex flex-col">
                            {data.members?.map((member) => <MemberRow key={member.id} member={member} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};