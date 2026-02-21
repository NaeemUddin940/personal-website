import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      Home Page
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
    </div>
  );
}
