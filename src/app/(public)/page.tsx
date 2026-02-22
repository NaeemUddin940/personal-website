"use client";

import { DataTable } from "@/components/common/data-table";
import { useState } from "react";

export default function HomePage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchUsers = async (params: FetchParams) => {
    console.log("🚀 API Call Initiated with Params:", params);

    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockTotal = 150;
    const items = Array.from({ length: params.limit }, (_, i) => ({
      id: `USR-${(params.page - 1) * params.limit + i + 1}`,
      name: params.search
        ? `${params.search} ${i + 1}`
        : `User ${(params.page - 1) * params.limit + i + 1}`,
      email: `user${(params.page - 1) * params.limit + i + 1}@example.com`,
      role: i % 2 === 0 ? "Admin" : "Editor",
      status: i % 3 === 0 ? "Inactive" : "Active",
      lastLogin: "2024-02-21",
    }));
    return { data: items, total: mockTotal };
  };

  const columns: Column<any>[] = [
    { header: "ID", accessor: "id", visible: true },
    { header: "Name", accessor: "name", sortable: true, visible: true },
    { header: "Email", accessor: "email", sortable: true, visible: true },
    { header: "Role", accessor: "role", visible: true },
    {
      header: "Status",
      accessor: "status",
      visible: true,
      render: (val) => (
        <span
          className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            val === "Active"
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-rose-500/10 text-rose-500"
          }`}
        >
          {val}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">
              Nexus CRM
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Data Management Dashboard
            </p>
          </div>
        </div>

        <DataTable
          title="User Management"
          columns={columns}
          fetchData={fetchUsers}
          refreshKey={refreshTrigger}
          onBulkDelete={(ids) => {
            console.log("Bulk Delete:", ids);
            setRefreshTrigger((p) => p + 1);
            alert(`${ids.length} records deleted successfully!`);
          }}
          onView={(u) => alert(`Viewing: ${u.name}`)}
          onEdit={(u) => alert(`Editing: ${u.name}`)}
          onDelete={(u) => alert(`Deleting: ${u.name}`)}
        />
      </div>
    </div>
  );
}
