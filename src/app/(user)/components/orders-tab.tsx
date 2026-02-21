import { Button } from "@/components/ui/button";
import { Option, Select } from "@/components/ui/select";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

export default function OrdersTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-card-foreground">
            Order History
          </h3>
          <p className="text-muted-foreground">
            Manage and track your recent purchases.
          </p>
        </div>
        <div className="flex gap-2">
          <Select name="timeframe" align="right" className="w-40">
            <Option value="today" defaultSelect>
              Today
            </Option>
            <Option value="one-month-ago">One Month Ago</Option>
            <Option value="six-months-ago">Six Months Ago</Option>
            <Option value="one-year-ago">One Year Ago</Option>
            <Option value="two-years-ago">Two Years Ago</Option>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {[
          {
            id: "ORD-294021",
            date: "Oct 24, 2023",
            total: 598.0,
            status: "Delivered",
            icon: <CheckCircle2 className="text-green-500" size={18} />,
            items: 2,
          },
          {
            id: "ORD-183920",
            date: "Oct 12, 2023",
            total: 129.5,
            status: "In Transit",
            icon: <Truck className="text-blue-500" size={18} />,
            items: 1,
          },
          {
            id: "ORD-092182",
            date: "Sep 28, 2023",
            total: 45.0,
            status: "Processing",
            icon: <Clock className="text-amber-500" size={18} />,
            items: 3,
          },
        ].map((order) => (
          <div
            key={order.id}
            className="border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-card"
          >
            {/* Order Header */}
            <div className="bg-muted/30 p-4 border-b border-border flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-6">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Order Placed
                  </p>
                  <p className="text-sm font-bold text-card-foreground">
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Total
                  </p>
                  <p className="text-sm font-bold text-card-foreground">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                    Ship To
                  </p>
                  <p className="text-sm font-bold text-card-foreground">
                    Alex Thompson
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                  Order ID
                </p>
                <p className="text-sm font-mono font-medium text-card-foreground">
                  #{order.id}
                </p>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4 w-full">
                <div className="relative">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <Package className="text-muted-foreground/50" />
                  </div>
                  {order.items > 1 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-card">
                      +{order.items - 1}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {order.icon}
                    <span
                      className={`text-xs font-bold uppercase tracking-wide ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : order.status === "In Transit"
                            ? "text-blue-600"
                            : "text-amber-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-card-foreground text-sm">
                    Package details and tracking available
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimated delivery:{" "}
                    {order.status === "Delivered" ? "Completed" : "By Oct 30"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="primary">Track Order</Button>
                <Button variant="outline">Order Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
