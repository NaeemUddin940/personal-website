import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { useState } from "react";

export default function CartListsTab() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      variant: "Color: Space Gray | Size: One Size",
      price: 299.0,
      quantity: 1,
      stock: "In Stock",
      image: null,
    },
    {
      id: 2,
      name: "Premium Wireless Headphones",
      variant: "Color: Space Gray | Size: One Size",
      price: 299.0,
      quantity: 1,
      stock: "In Stock",
      image: null,
    },
    {
      id: 3,
      name: "Mechanical Gaming Keyboard",
      variant: "Switch: Blue | RGB: Per-key",
      price: 149.0,
      quantity: 2,
      stock: "Only 3 left",
      image: null,
    },
  ]);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Item Count */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4">
        <div>
          <h3 className="text-2xl font-bold text-card-foreground">
            My Shopping Cart
          </h3>
          <p className="text-muted-foreground">
            You have{" "}
            <span className="text-primary font-bold">{items.length} items</span>{" "}
            in your cart
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
          <Truck size={14} />
          <span>Congrats! You get free shipping</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-border rounded-2xl bg-card hover:border-primary/30 transition-all shadow-sm"
            >
              {/* Product Image */}
              <div className="relative w-full sm:w-28 h-28 bg-muted rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                <ShoppingBag
                  size={32}
                  className="text-muted-foreground opacity-20"
                />
                <div className="absolute top-1 left-1 bg-primary backdrop-blur-sm text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-border">
                  {item.stock}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground">{item.variant}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-lg font-black text-foreground">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs text-muted-foreground">
                      (${(item.price * item.quantity).toFixed(2)} total)
                    </span>
                  )}
                </div>

                {/* Actions: Save for later & Remove */}
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    icon={<Heart size={14} />}
                    className="hover:bg-pink-600 hover:text-black text-pink-500 transition-colors uppercase tracking-tight"
                  >
                    Save for later
                  </Button>
                  <Button
                    variant="danger"
                    requireAreYouSure
                    areYouSureDescription="Are you sure you want to remove this item from your cart?"
                    size="sm"
                    icon={<Trash2 size={14} />}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              {/* Quantity Controller */}
              <div className="flex sm:flex-col items-center gap-2 self-center sm:self-auto bg-muted/50 p-1 sm:p-1.5 rounded-xl border border-border">
                <Button variant="overlay" size="sm">
                  <Plus size={16} />
                </Button>
                <span className="font-bold text-sm min-w-6 text-center">
                  {item.quantity}
                </span>
                <Button variant="overlay" size="sm">
                  <Minus size={16} />
                </Button>
              </div>
            </div>
          ))}

          {/* Trust Badge */}
          <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-2xl border border-dashed border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <ShieldCheck size={16} className="text-primary" />
              Secure Checkout
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <Truck size={16} className="text-primary" />
              Fast Delivery
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
            <h4 className="font-bold text-lg text-card-foreground">
              Order Summary
            </h4>

            {/* Promo Code */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Have a coupon?
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all uppercase font-bold"
                />
                <Button
                  variant="primary"
                  className="absolute right-2 top-2 "
                  size="sm"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal ({items.length} items)
                </span>
                <span className="font-bold text-card-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Shipping</span>
                  <Tag size={12} className="text-green-600" />
                </div>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-bold text-card-foreground">$0.00</span>
              </div>

              <div className="pt-4 border-t border-border space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-card-foreground">
                    Total
                  </span>
                  <span className="text-2xl font-black text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[10px] text-center text-muted-foreground italic">
                  Available installment starting from $45/month
                </p>
              </div>
            </div>

            <Button
              icon={
                <CreditCard
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
              }
              variant="primary"
              size="lg"
              fullWidth
              className="w-full rounded-2xl shadow-xl shadow-primary/20"
            >
              Proceed to Checkout
            </Button>

            {/* Support */}
            <p className="text-center text-xs text-muted-foreground">
              Need help?{" "}
              <button className="text-primary font-bold hover:underline">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
