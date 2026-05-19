"use client";

import { useState } from "react";
import { OverviewHeader } from "./OverviewHeader";
import { StatCardsGrid } from "./StatCardsGrid";
import { ChartsRow } from "./ChartsRow";
import { ActivityRow } from "./ActivityRow";

export const DashboardOverviewContent = () => {
    const [activePeriod, setActivePeriod] = useState("30d");

    return (
        <div className="flex flex-col animate-in fade-in duration-300">
            <OverviewHeader
                activePeriod={activePeriod}
                onPeriodChange={setActivePeriod}
            />
            <StatCardsGrid period={activePeriod} />
            <ChartsRow period={activePeriod} />
            <ActivityRow />
        </div>
    );
};