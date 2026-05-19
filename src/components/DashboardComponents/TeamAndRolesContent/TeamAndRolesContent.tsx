"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { DashboardTitle } from "@/components/DashboardComponents/DashboardTitle/DashboardTitle";
import { DashboardSubtitle } from "@/components/DashboardComponents/DashboardSubtitle/DashboardSubtitle";
import { Pagination } from "@/components/common/Pagination";
import { RoleSidebar } from "./RoleSidebar";
import {
    mockTeamMembers,
    TeamMembersTable
} from "@/components/DashboardComponents/TeamAndRolesContent/TeamMembersTable/TeamMembersTable";
import { RolesTable } from "@/components/DashboardComponents/TeamAndRolesContent/RolesTable/RolesTable";
import { mockRolesData } from "@/components/DashboardComponents/TeamAndRolesContent/RolesTable/RolesTable";

export const TeamAndRolesContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("subtab") || "Team Members";
    const roleFilter = searchParams.get("role") || "All Members";
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 10;

    const [isRoleSidebarOpen, setIsRoleSidebarOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<any | null>(null);

    const handleCreateRole = () => {
        setEditingRole(null);
        setIsRoleSidebarOpen(true);
    };

    const handleEditRole = (roleId: string) => {
        const roleToEdit = mockRolesData.find((r) => r.id === roleId);
        setEditingRole(roleToEdit || null);
        setIsRoleSidebarOpen(true);
    };

    const updateUrl = (updates: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) params.delete(key);
            else params.set(key, String(value));
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const getFilteredMembers = () => {
        let filtered = mockTeamMembers;

        if (roleFilter !== "All Members" && roleFilter !== "All Roles") {
            filtered = filtered.filter((m) => m.role === roleFilter);
        }

        return filtered;
    };

    const filteredMembers = getFilteredMembers();
    const totalItems = filteredMembers.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

    const totalLabel =
        activeTab === "Team Members" ? `${totalItems} members` : "3 roles";

    return (
        <>
            <div className="mb-5 sm:mb-6">
                <DashboardTitle>Team</DashboardTitle>
                <DashboardSubtitle>
                    Manage staff members and access permissions for your institution.
                </DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">
                <div className="flex border-b border-[#E5E7EB] overflow-x-auto custom-scrollbar">
                    <div className="flex w-max min-w-full sm:min-w-0">
                        {["Team Members", "Roles"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() =>
                                    updateUrl({
                                        subtab: tab,
                                        role: tab === "Roles" ? "All Roles" : "All Members",
                                        page: 1,
                                    })
                                }
                                className={`py-4 px-4 sm:px-5 text-[14px] font-medium relative transition-colors flex items-center whitespace-nowrap shrink-0 ${
                                    activeTab === tab
                                        ? "text-brand-dark"
                                        : "text-brand-secondary hover:text-brand-dark"
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B9F75] rounded-t-sm"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-[#E5E7EB] gap-4">
                    <div className="flex flex-col gap-3 w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="relative w-full sm:w-[200px]">
                                <select
                                    value={roleFilter}
                                    onChange={(e) => updateUrl({ role: e.target.value, page: 1 })}
                                    className="w-full appearance-none border border-[#E5E7EB] px-3 py-2 text-[13px] font-medium text-brand-dark focus:outline-none focus:border-brand-btn bg-white cursor-pointer pr-9"
                                >
                                    {activeTab === "Team Members" ? (
                                        <>
                                            <option value="All Members">All Members</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Reviewer">Reviewer</option>
                                            <option value="Approver">Approver</option>
                                        </>
                                    ) : (
                                        <option value="All Roles">All Roles</option>
                                    )}
                                </select>

                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>

                            <div className="text-[12px] sm:text-[13px] text-brand-secondary">
                                Total: <span className="text-brand-dark font-medium">{totalLabel}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => (activeTab === "Roles" ? handleCreateRole() : null)}
                        className="bg-brand-btn hover:bg-brand-btn/90 text-white text-xs font-medium px-3 py-2 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
                    >
                        <img src="/icons/plus.svg" alt="" />
                        {activeTab === "Team Members" ? "New Member" : "Create Role"}
                    </button>
                </div>

                {activeTab === "Team Members" ? (
                    <TeamMembersTable
                        currentItems={currentItems}
                        filteredItems={filteredMembers}
                    />
                ) : (
                    <RolesTable onEditRole={handleEditRole} />
                )}
            </div>

            {activeTab === "Team Members" && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => updateUrl({ page })}
                />
            )}

            <RoleSidebar
                isOpen={isRoleSidebarOpen}
                onClose={() => setIsRoleSidebarOpen(false)}
                role={editingRole}
            />
        </>
    );
};