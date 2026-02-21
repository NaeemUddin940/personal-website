"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import AddShippingAddress from "./add-shipping-address-form";
import EmptyAddressCard from "./empty-address-card";

export default function AddressTab() {
  const [active, setActive] = useState("address1");
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectAddressId, setSelectAddressId] = useState<string | null>("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-card-foreground">
            Address Book
          </h3>
          <p className="text-muted-foreground">
            Your saved shipping and billing addresses.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground p-2 rounded-full hover:opacity-90 transition-opacity">
          <ChevronRight className="rotate-90 md:rotate-0 size-5" />
        </button>
      </div>

      {/* Address Grid */}
      {addresses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={cn(
                  "p-5 border rounded-2xl relative transition-all cursor-pointer hover:shadow-sm",
                  active === address.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/50",
                )}
                onClick={() => {
                  setActive(address.id);
                  handleAddressAction(
                    "put",
                    `update-shipping-address/${address.id}`,
                    { isDefault: true },
                  );
                }}
              >
                {/* Top Row: Address Type & Default Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border">
                    {address.addressType || "Home"}
                  </span>
                  {address.isDefault && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase font-extrabold shadow-sm">
                      Default
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-base flex items-center gap-2">
                    {address.fullName}
                  </h4>

                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <p className="line-clamp-1">{address.addressLine1}</p>
                    {address.addressLine2 && (
                      <p className="line-clamp-1">{address.addressLine2}</p>
                    )}
                    <p className="font-medium text-foreground/80">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-xs uppercase tracking-tight">
                      {address.country}
                    </p>
                  </div>

                  {/* Phone Number with subtle styling */}
                  <div className="mt-3 pt-3 border-t border-dashed border-border">
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        Phone:
                      </span>
                      {address.phone}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex gap-2">
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-lg h-9 text-xs font-semibold hover:bg-primary hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectAddressId(address.id);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 rounded-lg h-9 text-xs font-semibold text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      handleAddressAction(
                        "delete",
                        `delete-shipping-address/${address.id}`,
                      );
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Dialog
            open={openDialog}
            onOpenChange={(open) => {
              setOpenDialog(open);
              if (!open) setSelectedAddress(null); // ডায়ালগ বন্ধ হলে ডাটা ক্লিয়ার করে দিন
            }}
          >
            <DialogTrigger>
              <Button variant="primary">+ Add New Address</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <AddShippingAddress
                selectedAddressId={selectAddressId}
                setOpenDialog={setOpenDialog}
              />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <EmptyAddressCard
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
    </div>
  );
}
