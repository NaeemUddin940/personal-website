import { DataTable } from "@/components/common/data-table";
import { Calendar, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function TopProducts() {
  // const [refreshTrigger, setRefreshTrigger] = useState(0);
  const fetchProducts = async (params: FetchParams) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockTotal = 240;
    const categories = ["Electronics", "Fashion", "Home", "Sports", "Beauty"];

    let items = Array.from({ length: params.limit }, (_, i) => {
      const idNumber = (params.page - 1) * params.limit + i + 1;

      const price = Math.floor(Math.random() * 500) + 20;
      const sales = Math.floor(Math.random() * 1000);
      const growth = Math.floor(Math.random() * 40 - 20); // -20% to +20%
      const stock = Math.floor(Math.random() * 120);
      const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0

      const createdDate = new Date(Date.now() - Math.random() * 10000000000);

      return {
        id: `PRD-${idNumber}`,
        name: params.search
          ? `${params.search} ${idNumber}`
          : `Product ${idNumber}`,
        category: categories[idNumber % categories.length],
        image: `https://picsum.photos/seed/${idNumber}/200/200`,
        price,
        sales,
        growth,
        stock,
        rating: Number(rating),
        createdAt: createdDate.toISOString().split("T")[0],
      };
    });

    // 🔎 Search filter (frontend mock)
    if (params.search) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(params.search!.toLowerCase()),
      );
    }

    // 🔽 Sorting mock
    if (params.sortBy) {
      items.sort((a: any, b: any) => {
        const dir = params.sortOrder === "desc" ? -1 : 1;

        if (a[params.sortBy] < b[params.sortBy]) return -1 * dir;
        if (a[params.sortBy] > b[params.sortBy]) return 1 * dir;
        return 0;
      });
    }

    return { data: items, total: mockTotal };
  };
  const productColumns: Column<Product>[] = [
    {
      header: "Product",
      accessor: "name",
      sortable: true,
      visible: true,
      render: (_, row) => (
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Image
              height={100}
              width={100}
              src={row.image}
              alt={row.name}
              className="w-12 h-12 rounded-xl object-cover border border-border"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-primary/70">
              {row.category}
            </span>
            <span className="text-sm font-bold text-foreground">
              {row.name}
            </span>
            <span className="text-[11px] text-muted-foreground">#{row.id}</span>
          </div>
        </div>
      ),
    },

    {
      header: "Revenue",
      accessor: "sales",
      sortable: true,
      visible: true,
      render: (_, row) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold">
            ${(row.sales * row.price).toLocaleString()}
          </span>
          <span
            className={`text-[10px] font-bold ${
              row.growth >= 0 ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {row.growth >= 0 ? "+" : ""}
            {row.growth}%
          </span>
        </div>
      ),
    },

    {
      header: "Stock",
      accessor: "stock",
      visible: true,
      render: (value) => {
        const percentage = Math.min(value, 100);

        return (
          <div className="flex flex-col gap-1.5 w-40">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-muted-foreground">Remaining</span>
              <span
                className={
                  value > 50
                    ? "text-emerald-500"
                    : value > 20
                      ? "text-yellow-500"
                      : "text-rose-500"
                }
              >
                {value} left
              </span>
            </div>

            <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  value > 50
                    ? "bg-emerald-500"
                    : value > 20
                      ? "bg-yellow-500"
                      : "bg-rose-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      },
    },

    {
      header: "Rating",
      accessor: "rating",
      sortable: true,
      visible: true,
      render: (value) => (
        <div className="flex items-center justify-center gap-1 font-bold">
          <span className="text-amber-500">★</span>
          {value}
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        title="Top Products"
        description="Performance analysis based on recent sales data"
        columns={productColumns}
        fetchData={fetchProducts}
        onBulkDelete={(ids) => {
          console.log("Bulk Delete:", ids);
          setRefreshTrigger((p) => p + 1);
          alert(`${ids.length} records deleted successfully!`);
        }}
        onView={(u) => alert(`Viewing: ${u.name}`)}
        onEdit={(u) => alert(`Editing: ${u.name}`)}
        onDelete={(u) => alert(`Deleting: ${u.name}`)}
        // expandableContent={(item) => (
        //   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        //     <div className="md:col-span-2 space-y-6">
        //       <div className="space-y-2">
        //         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
        //           Master Description
        //         </h4>
        //         <p className="text-sm font-medium text-slate-600 leading-relaxed">
        //           {item.description}
        //         </p>
        //       </div>
        //       <div className="grid grid-cols-2 gap-4">
        //         <div className="bg-white p-5 rounded-3xl border border-border shadow-sm">
        //           <h5 className="text-[9px] font-black text-muted-foreground uppercase mb-3">
        //             Core Features
        //           </h5>
        //           <div className="flex flex-wrap gap-2">
        //             {/* {item.map((f) => (
        //               <span
        //                 key={f}
        //                 className="text-[10px] font-bold px-3 py-1 bg-secondary rounded-lg border border-border"
        //               >
        //                 {f}
        //               </span>
        //             ))} */}
        //           </div>
        //         </div>
        //         <div className="bg-white p-5 rounded-3xl border border-border shadow-sm flex items-center justify-between">
        //           <div>
        //             <h5 className="text-[9px] font-black text-muted-foreground uppercase mb-1">
        //               Created At
        //             </h5>
        //             <p className="text-xs font-black">{item.createdAt}</p>
        //           </div>
        //           <Calendar className="text-primary/20 w-8 h-8" />
        //         </div>
        //       </div>
        //     </div>
        //     <div className="bg-primary p-8 rounded-[2rem] text-white shadow-2xl shadow-primary/30 space-y-4">
        //       <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
        //         <TrendingUp className="w-6 h-6" />
        //       </div>
        //       <h4 className="text-xl font-black">Performance</h4>
        //       <p className="text-xs font-bold text-white/70">
        //         This product is currently performing{" "}
        //         <span className="text-white underline decoration-2 font-black">
        //           better than 85%
        //         </span>{" "}
        //         of your inventory in the {item.category} segment.
        //       </p>
        //       <button className="w-full py-3 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest mt-4">
        //         View Full Analytics
        //       </button>
        //     </div>
        //   </div>
        // )}
      />
    </div>
  );
}
