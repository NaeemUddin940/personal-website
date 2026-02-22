import { DataTable } from "@/components/common/data-table";
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
      />
    </div>
  );
}
