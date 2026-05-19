"use client";

import { useState, useEffect } from "react";

interface RoleSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    role?: any | null;
}

const ALL_PERMISSIONS = [
    { id: 'view_certs', title: 'View certificates', desc: 'Read-only access to credential records and their status.' },
    { id: 'issue_certs', title: 'Issue certificates', desc: 'Create and send new credentials to recipients.' },
    { id: 'approve_reqs', title: 'Approve requests', desc: 'Review and approve pending signing requests in the workflow.' },
    { id: 'sign_certs', title: 'Sign certificates', desc: 'Add a final digital signature — available for final-step roles only.' },
    { id: 'revoke_certs', title: 'Revoke certificates', desc: 'Permanently invalidate previously issued certificates.' },
    { id: 'archive_certs', title: 'Archive issued credentials', desc: 'Available archive any unnecessary credentials that have been issued.' },
    { id: 'part_pipeline', title: 'Participate in approval pipeline', desc: 'This role can be assigned to pipeline approval steps.', hasDivider: true },
    { id: 'manage_team', title: 'Manage team members', desc: 'Invite, deactivate, and assign roles to team members.', hasDivider: true },
    { id: 'manage_roles', title: 'Manage roles', desc: 'Create, edit, and delete custom roles and their permissions.' },
    { id: 'manage_settings', title: 'Manage settings', desc: 'Configure institution profile, branding, and integrations.' },
    { id: 'view_analytics', title: 'View analytics', desc: 'Access credential issuance metrics and activity dashboards.', hasDivider: true },
    { id: 'export_data', title: 'Export data', desc: 'Download credential data, reports, and audit logs.' },
];

export const RoleSidebar = ({ isOpen, onClose, role }: RoleSidebarProps) => {
    const [permissions, setPermissions] = useState<{id: string, checked: boolean}[]>([]);
    const [roleName, setRoleName] = useState("");

    const isEditMode = !!role;
    const isSystemRole = role?.isSystem === true;
    const isDefaultRole = role?.isDefault === true;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            setRoleName(role?.name || "");
            setPermissions(
                ALL_PERMISSIONS.map(p => ({
                    id: p.id,
                    checked: role?.permissionIds?.includes(p.id) || false
                }))
            );
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, role]);

    const togglePermission = (id: string) => {
        if (isSystemRole) return;
        setPermissions(permissions.map(p => p.id === id ? { ...p, checked: !p.checked } : p));
    };

    const title = isEditMode ? "Edit Role" : "Create Role";

    let inputHint = "This is a custom role. You can rename and customize it freely.";
    if (isSystemRole) {
        inputHint = "This is a system role. You can't rename and customize.";
    } else if (isEditMode && isDefaultRole) {
        inputHint = "This is a default role. You can rename and customize it freely.";
    } else if (!isEditMode) {
        inputHint = "";
    }

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="absolute inset-0 bg-[#0F172A]/20 backdrop-blur-[2px] transition-opacity" onClick={onClose}></div>

            <div className={`relative w-full max-w-[500px] bg-white h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

                <div className="flex items-start justify-between px-7 py-5 border-b border-[#E5E7EB] shrink-0">
                    <div>
                        <h2 className="text-xl font-medium text-brand-dark">{title}</h2>
                        <p className="text-xs text-brand-secondary mt-1">Define what this role can do and where.</p>
                    </div>
                    <button onClick={onClose} className="text-brand-dark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-7 py-5 flex flex-col gap-6 custom-scrollbar">
                    <div>
                        <label className="block text-xs font-medium font-ibm text-brand-dark mb-2">Role Name</label>
                        <input
                            type="text"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="e.g. External Auditor"
                            disabled={isSystemRole}
                            className="w-full border border-[#E5E7EB]  p-3  text-sm text-brand-dark focus:outline-none focus:border-brand-btn transition-colors disabled:bg-neutral-50 disabled:text-brand-secondary"
                        />
                        {inputHint && <p className="text-[11px] text-[#8C9BB0] mt-2">{inputHint}</p>}
                    </div>

                    <div className="flex flex-col gap-5 mt-2">
                        {ALL_PERMISSIONS.map((perm) => {
                            const isChecked = permissions.find(p => p.id === perm.id)?.checked || false;

                            return (
                                <div key={perm.id} className="flex flex-col">
                                    {perm.hasDivider && <div className="w-full h-px bg-[#E5E7EB] mb-5 mt-1"></div>}
                                    <label className="flex items-start gap-3.5 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={isChecked}
                                                onChange={() => togglePermission(perm.id)}
                                                disabled={isSystemRole}
                                            />
                                            <div className={`w-[16px] h-[16px] border transition-colors flex items-center justify-center ${
                                                isSystemRole
                                                    ? (isChecked ? "border-[#00C48C] bg-[#00C48C] opacity-70" : "border-[#E5E7EB] bg-neutral-50")
                                                    : "border-[#C4CCD6] bg-white peer-checked:bg-[#00C48C] peer-checked:border-[#00C48C] group-hover:border-[#00C48C]/50"
                                            }`}>
                                                <svg className={`w-3.5 h-3.5 text-white transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                        </div>
                                        <div className={`flex flex-col gap-0.5 ${isSystemRole ? "opacity-80" : ""}`}>
                                            <p className="text-sm font-medium text-brand-dark select-none">{perm.title}</p>
                                            <p className="text-xs text-brand-secondary leading-snug select-none">{perm.desc}</p>
                                        </div>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="px-7 py-5 border-t border-[#E5E7EB] bg-[#F8F9FA] shrink-0 bg-white flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-2.5 border border-[#E5E7EB] text-brand-dark font-medium text-[13px]  hover:bg-neutral-50 transition-colors">
                        Cancel
                    </button>
                    <button className="flex-1 px-6 py-2.5 bg-brand-btn hover:bg-brand-btn/90 text-white font-medium text-[13px]  transition-colors">
                        {isEditMode ? "Save Changes" : "Create Role"}
                    </button>
                </div>
            </div>
        </div>
    );
};