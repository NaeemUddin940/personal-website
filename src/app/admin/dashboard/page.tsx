"use client";
import FinancialStats from "./components/financial-stats";
import NewUsers from "./components/new-users";
import RecentOrders from "./components/recent-orders";
import RevenueAndLossAnalyticsChart from "./components/revenue-and-loss-analytics-chart";
import { StatsCardPremium } from "./components/stats-card";
import StockReport from "./components/stock-inventory-report";
import TopProducts from "./components/top-products";
import { statsData } from "./data/stats-data";

export default function DashboardPage() {
  return (
    <div className="p-5 space-y-5 w-full">
      <div className="grid grid-cols-5 gap-5">
        {Object.keys(statsData).map((key) => (
          <StatsCardPremium
            key={key}
            title={statsData[key].title}
            timeframes={statsData[key].timeframes}
            icon={statsData[key].icon}
            colorClass={statsData[key].color}
            glowColor={statsData[key].glow}
            subtext={statsData[key].subtext}
            badgeText={statsData[key].badge}
          />
        ))}

        {/* Detailed Financial Stats */}
        <div className="col-span-3 space-y-4 row-span-4 col-start-4 row-start-1">
          <FinancialStats />
          <NewUsers />
        </div>
        {/* Revenue Analytics Card */}
        <div className="col-span-3 row-start-3">
          <TopProducts />
        </div>
      </div>

      {/* <RecentTransactions /> */}
      <RecentOrders />
      <div className="flex items-center gap-5">
        <StockReport />
        <RevenueAndLossAnalyticsChart />
      </div>
    </div>
  );
}
