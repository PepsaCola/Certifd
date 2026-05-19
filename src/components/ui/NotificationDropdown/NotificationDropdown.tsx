"use client";

import { useState, useRef, useEffect } from "react";

const mockNotifications = {
    actionRequired: [
        { id: '1', type: 'review', title: 'Your turn to review', desc: 'graduates_june_2026.csv', time: '2 hours ago' },
        { id: '2', type: 'approval', title: 'New approval request', desc: 'mba_completions_2026.csv', time: '2 hours ago' },
        { id: '3', type: 'signing', title: 'Signing request received', desc: 'phd_thesis_batch_Q1.csv', time: '3 hours ago' },
    ],
    updates: [
        { id: '4', type: 'approved', title: 'Batch approved', desc: 'undergrad_dec_2025.csv', time: '5 hours ago' },
        { id: '5', type: 'rejected', title: 'Batch rejected', desc: 'law_faculty_2026_test.csv', time: 'Yesterday' },
    ],
    completed: [
        { id: '6', type: 'completed', title: 'All signatures collected', desc: 'nursing_2025.csv', time: '3 days ago' },
    ]
};

export const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hasNewNotifications = mockNotifications.actionRequired.length > 0;

    return (
        <div className="relative h-full flex" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`border-l sm:border-x border-[#D9E0EA] h-full px-4 py-3 sm:px-[26px] sm:py-[26px] transition-colors relative flex items-center justify-center
                    ${isOpen ? 'bg-neutral-50 text-brand-dark' : 'text-brand-secondary hover:bg-neutral-50 hover:text-brand-dark'}
                `}
            >
                <div className="relative flex items-center justify-center">
                    <img src="/icons/notification.svg" alt="Notifications" className="w-5 h-5 sm:w-6 sm:h-6" />

                    {hasNewNotifications && (
                        <span className="absolute -top-0.5 -right-0.5 sm:top-[2px] sm:-right-[2px] w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full -right-4 sm:right-0 w-[300px] sm:w-[360px] bg-white border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-50 rounded-b-sm flex flex-col max-h-[80vh] overflow-hidden cursor-default">

                    <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                        <h3 className="text-[15px] font-semibold text-brand-dark">Notifications</h3>
                        <button className="text-[13px] font-medium text-brand-secondary hover:text-brand-dark transition-colors">
                            Clear all
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">

                        {mockNotifications.actionRequired.length > 0 && (
                            <>
                                <div className="bg-[#F8FAFC] px-4 py-2 border-b border-[#E5E7EB] flex items-center gap-2">
                                    <span className="text-[11px] font-medium text-brand-secondary uppercase leading-4 tracking-tight">Action Required</span>
                                    <span className="w-[18px] h-[18px] rounded-full border border-brand-secondary/50 flex items-center justify-center text-[10px] font-bold text-brand-secondary">
                                        {mockNotifications.actionRequired.length}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    {mockNotifications.actionRequired.map((item, idx) => (
                                        <NotificationItem key={item.id} data={item} isLast={idx === mockNotifications.actionRequired.length - 1} />
                                    ))}
                                </div>
                            </>
                        )}

                        {mockNotifications.updates.length > 0 && (
                            <>
                                <div className="bg-[#F8FAFC] px-4 py-2 border-y border-[#E5E7EB] flex items-center gap-2">
                                    <span className="text-[11px] font-medium text-brand-secondary uppercase leading-4 tracking-tight">Updates</span>
                                    <span className="w-[18px] h-[18px] rounded-full border border-brand-secondary/50 flex items-center justify-center text-[10px] font-bold text-brand-secondary">
                                        {mockNotifications.updates.length}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    {mockNotifications.updates.map((item, idx) => (
                                        <NotificationItem key={item.id} data={item} isLast={idx === mockNotifications.updates.length - 1} />
                                    ))}
                                </div>
                            </>
                        )}

                        {mockNotifications.completed.length > 0 && (
                            <>
                                <div className="bg-[#F8FAFC] px-4 py-2 border-y border-[#E5E7EB] flex items-center gap-2">
                                    <span className="text-[11px] font-medium text-brand-secondary uppercase leading-4 tracking-tight">Completed</span>
                                    <span className="w-[18px] h-[18px] rounded-full border border-brand-secondary/50 flex items-center justify-center text-[10px] font-bold text-brand-secondary">
                                        {mockNotifications.completed.length}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    {mockNotifications.completed.map((item, idx) => (
                                        <NotificationItem key={item.id} data={item} isLast={idx === mockNotifications.completed.length - 1} />
                                    ))}
                                </div>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
};

const NotificationItem = ({ data, isLast }: { data: any, isLast: boolean }) => {
    const colorClass = getIconColorClass(data.type);

    return (
        <div className={`flex items-start gap-4 p-4 hover:bg-neutral-50 transition-colors cursor-pointer ${!isLast ? 'border-b border-[#E5E7EB]' : ''}`}>

            <div className={` w-7 h-7 rounded-sm flex items-center justify-center shrink-0 ${colorClass}`}>
                {getNotificationIconSvg(data.type)}
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-medium text-brand-dark leading-tight">{data.title}</h4>
                <p className="text-[13px] font-normal text-brand-secondary mt-1 truncate">{data.desc}</p>
                <p className="text-xs font-normal text-brand-secondary mt-1.5">{data.time}</p>
            </div>
        </div>
    );
};

const getIconColorClass = (type: string) => {
    switch (type) {
        case 'review':
        case 'approval':
        case 'signing':
            return 'bg-[#FFF7ED] text-[#F97316]';
        case 'rejected':
            return 'bg-[#EFF6FF] text-[#3B82F6]';
        case 'approved':
        case 'completed':
            return 'bg-[#ECFDF5] text-[#10B981]';
        default:
            return 'bg-neutral-100 text-neutral-500';
    }
};

const getNotificationIconSvg = (type: string) => {
    switch (type) {
        case 'review':
            return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.58789 13.9875C2.58789 14.3654 2.73802 14.7279 3.00526 14.9951C3.2725 15.2624 3.63496 15.4125 4.01289 15.4125C4.39082 15.4125 4.75328 15.2624 5.02052 14.9951C5.28776 14.7279 5.43789 14.3654 5.43789 13.9875C5.43789 13.6096 5.28776 13.2471 5.02052 12.9799C4.75328 12.7126 4.39082 12.5625 4.01289 12.5625C3.63496 12.5625 3.2725 12.7126 3.00526 12.9799C2.73802 13.2471 2.58789 13.6096 2.58789 13.9875Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.9875 5.43749C14.3654 5.43749 14.7279 5.28736 14.9951 5.02012C15.2624 4.75288 15.4125 4.39043 15.4125 4.01249C15.4125 3.63456 15.2624 3.27211 14.9951 3.00487C14.7279 2.73763 14.3654 2.58749 13.9875 2.58749C13.6096 2.58749 13.2471 2.73763 12.9799 3.00487C12.7126 3.27211 12.5625 3.63456 12.5625 4.01249C12.5625 4.39043 12.7126 4.75288 12.9799 5.02012C13.2471 5.28736 13.6096 5.43749 13.9875 5.43749Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.2877 13.9875H12.2064C12.8678 13.9875 13.5021 13.7248 13.9698 13.2571C14.4375 12.7894 14.7002 12.1551 14.7002 11.4938C14.7002 10.8324 14.4375 10.1981 13.9698 9.73042C13.5021 9.26275 12.8678 9.00001 12.2064 9.00001H6.50645C5.84506 9.00001 5.21077 8.73728 4.7431 8.26961C4.27543 7.80194 4.0127 7.16765 4.0127 6.50626C4.0127 5.84488 4.27543 5.21058 4.7431 4.74291C5.21077 4.27525 5.84506 4.01251 6.50645 4.01251H9.7127" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        case 'approval':
            return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.57539 15.4125V10.7813C7.57539 10.1199 7.31266 9.48558 6.84499 9.01791C6.37732 8.55024 5.74302 8.28751 5.08164 8.28751M5.08164 8.28751C4.42026 8.28751 3.78596 8.55024 3.31829 9.01791C2.85062 9.48558 2.58789 10.1199 2.58789 10.7813V15.4125H15.4129V11.1375C15.4129 10.3816 15.1126 9.65673 14.5781 9.12225C14.0437 8.58777 13.3188 8.28751 12.5629 8.28751H5.08164Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 8.28749V2.58749H11.85L13.275 4.01249L11.85 5.43749H9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.72461 11.1375H5.43711" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        case 'signing':
            return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.58789 12.5625C4.96265 10.1877 6.15039 8.28751 6.15039 6.86251C6.15039 4.72501 5.43789 4.72501 4.72539 4.72501C4.01289 4.72501 3.27759 5.49807 3.30039 6.86251C3.32462 8.32171 4.48172 10.3374 5.08164 11.1375C6.15039 12.5625 6.86289 12.9188 7.57539 11.85L9.00039 9.71251C9.23765 11.6127 9.95015 12.5625 11.1379 12.5625C11.5155 12.5625 13.0182 11.1375 13.2754 11.1375C13.6438 11.1375 14.3563 11.6127 15.4129 12.5625" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        case 'approved':
        case 'completed':
            return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.0127 9L7.5752 12.5625L14.7002 5.4375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        case 'rejected':
            return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.2746 4.725L4.72461 13.275" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.72461 4.725L13.2746 13.275" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        default:
            return null;
    }
};