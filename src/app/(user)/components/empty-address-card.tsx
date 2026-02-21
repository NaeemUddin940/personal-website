import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import AddShippingAddress from "./add-shipping-address-form";

export default function EmptyAddressCard({
  openDialog,
  setOpenDialog,
}: {
  openDialog;
  setOpenDialog: (boolean) => void;
}) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-border rounded-3xl bg-card/50 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse" />
          <div className="relative p-6 bg-background rounded-full border border-border shadow-sm">
            <MapPin className="size-10 text-primary/40" />
          </div>
        </div>

        <h4 className="text-xl font-bold text-foreground mb-2">
          No addresses saved yet
        </h4>
        <p className="text-muted-foreground max-w-62.5 mb-8">
          Add a shipping address to enjoy a faster and smoother checkout
          experience.
        </p>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="primary">+ Add Your First Address</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <AddShippingAddress setOpenDialog={setOpenDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
