"use client";

import { useState } from "react";

const integrationsData = [
    {
        id: "oracle",
        name: "Oracle PeopleSoft",
        description: "Integrate with PeopleSoft Campus Solutions for automated credential workflows and student record sync.",
        icon: '/img/oracle.png',
        active: false
    },
    {
        id: "ellucian",
        name: "Ellucian Banner",
        description: "Sync student and credential data directly from your Student Information System with Ellucian Banner.",
        icon: '/img/ellucian.png',
        active: false
    }
];

export const ApiSettings = () => {
    const [integrations, setIntegrations] = useState(integrationsData);

    const toggleIntegration = (id: string) => {
        setIntegrations(integrations.map(integration =>
            integration.id === id
                ? { ...integration, active: !integration.active }
                : integration
        ));
    };

    return (
        <div className="flex flex-col w-full">

            <div className="mb-4 sm:mb-6">
                <h2 className="text-[18px] sm:text-[20px] font-semibold text-brand-dark">API & Integrations</h2>
                <p className="text-[12px] sm:text-[13px] text-brand-secondary mt-1">Connect Certifd with your institution systems</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] min-h-[auto] md:min-h-[430px] flex flex-col p-1 sm:p-2 md:p-6">

                <div className="flex flex-col">
                    {integrations.map((integration, index) => (
                        <div
                            key={integration.id}
                            className={`flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:p-6 ${
                                index !== integrations.length - 1 ? "border-b border-[#E5E7EB]" : ""
                            }`}
                        >

                            <div className="flex items-start gap-3 sm:gap-6 flex-1 min-w-0">
                                <div className="shrink-0 mt-1">
                                    <img className="w-10 h-10 sm:w-[52px] sm:h-[52px]" src={integration.icon} alt={integration.name}/>
                                </div>
                                <div className="flex flex-col gap-1 pr-2 sm:pr-4 min-w-0">
                                    <h3 className="text-[13px] sm:text-[14px] font-medium text-brand-dark truncate sm:whitespace-normal">
                                        {integration.name}
                                    </h3>
                                    <p className="text-[11px] sm:text-[13px] text-brand-secondary leading-snug sm:max-w-[500px]">
                                        {integration.description}
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 mt-1 sm:mt-0">
                                <label className="relative flex items-center cursor-pointer scale-90 sm:scale-100 origin-right">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={integration.active}
                                        onChange={() => toggleIntegration(integration.id)}
                                    />
                                    <div className="w-[40px] sm:w-[44px] h-[22px] sm:h-[24px] bg-[#E5E7EB] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#C4CCD6] after:border after:rounded-full after:h-[18px] sm:after:h-[20px] after:w-[18px] sm:after:w-[20px] after:transition-all peer-checked:bg-[#00C48C] peer-checked:after:border-[#00C48C]"></div>
                                </label>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};