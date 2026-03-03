import { ChevronRight } from "lucide-react";

export default function RecentTransactions() {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="font-semibold text-lg text-foreground">
          Recent Transactions
        </h2>
        <button className="text-sm font-medium text-primary flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary text-muted-foreground text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              {
                name: "Alex Johnson",
                email: "alex@example.com",
                status: "Completed",
                amount: "$450.00",
                date: "Oct 24, 2023",
              },
              {
                name: "Sarah Miller",
                email: "sarah@example.com",
                status: "Pending",
                amount: "$1,200.00",
                date: "Oct 23, 2023",
              },
              {
                name: "David Smith",
                email: "david@example.com",
                status: "Completed",
                amount: "$82.50",
                date: "Oct 22, 2023",
              },
            ].map((row, i) => (
              <tr
                key={i}
                className="hover:bg-muted/60 hover:shadow-lg duration-300 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-xs text-primary">
                      {row.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">
                        {row.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {row.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full shadow-md text-[10px] font-bold uppercase ${
                      row.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-primary">
                  {row.amount}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
