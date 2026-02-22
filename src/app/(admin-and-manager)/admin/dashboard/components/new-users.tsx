import { MoreVertical } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const deviceData = [
  { name: "Mobile", value: 4500, color: "#6366f1" }, // Indigo-500
  { name: "Desktop", value: 3200, color: "#8b5cf6" }, // Violet-500
  { name: "Tablet", value: 1300, color: "#ec4899" }, // Pink-500
];

const newUsers = [
  {
    name: "Zayan Malik",
    email: "zayan@tech.com",
    initials: "ZM",
    joined: "Today",
  },
  {
    name: "Nabila Karim",
    email: "nab@xyz.com",
    initials: "NK",
    joined: "Yesterday",
  },
  {
    name: "Ishraq Ali",
    email: "ishraq@dev.io",
    initials: "IA",
    joined: "2 days ago",
  },{
    name: "Ishraq Ali",
    email: "ishraq@dev.io",
    initials: "IA",
    joined: "2 days ago",
  },{
    name: "Ishraq Ali",
    email: "ishraq@dev.io",
    initials: "IA",
    joined: "2 days ago",
  },
];
export default function NewUsers() {
  return (
    <div className="bg-card rounded-2xl custom-hover custom-shadow border border-border p-3">
      <div className="px-6 py-4 border-b  border-border flex items-center justify-between">
        <h3 className="font-bold text-foreground">New Customer Base</h3>
        <button className="text-primary text-xs font-bold hover:underline">
          View All
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-3 w-full">
          {newUsers.map((user, idx) => (
            <div
              key={idx}
              className="flex items-center hover:bg-muted hover:shadow-md hover:shadow-muted transition-all duration-300 rounded-xl px-3 py-2 justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center font-bold text-primary text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                  {user.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-medium text-muted-foreground block">
                  {user.joined}
                </span>
                <button className="text-primary p-1 hover:bg-accent rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="h-50 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
