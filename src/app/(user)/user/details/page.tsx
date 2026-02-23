"use client";

import { UniversalImageUploader } from "@/components/common/universal-image-uploader";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/utils/auth-client";
import {
  Heart,
  MapPin,
  Shield,
  ShoppingBag,
  ShoppingCart,
  UserCircle,
} from "lucide-react";
import AddressTab from "../../components/address-tab";
import CartListsTab from "../../components/cart-lists-tab";
import OrdersTab from "../../components/orders-tab";
import ProfileTab from "../../components/profile-tab";
import SecurityTab from "../../components/security-tab";
import WishlistTab from "../../components/wishlist-tab";

export default function UserDetails() {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-fit bg-background p-4 md:p-10">
      <section className="max-w-7xl mx-auto h-full">
        <Tabs defaultValue="profile" variant="fill" orientation="vertical">
          <Card className="px-1 flex flex-row">
            <CardContent className="space-y-3">
              <div className=" rounded-xl px-3 py-2 shadow-md border border-border flex flex-col items-center text-center">
                <UniversalImageUploader
                  variant="avatar"
                  maxFile={1}
                  maxFileSize={2}
                />
                <h2 className="mt-4 font-bold text-lg text-card-foreground">
                  {session?.user?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
              <TabsList className="flex flex-col h-fit w-full bg-card shadow-xl p-4 gap-2 justify-start items-stretch">
                <TabsTrigger
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all text-sm"
                  value="profile"
                >
                  <UserCircle size={18} /> My Profile
                </TabsTrigger>
                <TabsTrigger
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all text-sm"
                  value="wishlists"
                >
                  <Heart size={18} /> My Wishlists
                </TabsTrigger>
                <TabsTrigger
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all text-sm"
                  value="orders"
                >
                  <ShoppingBag size={18} /> My Orders
                </TabsTrigger>
                <TabsTrigger
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all text-sm"
                  value="cart-lists"
                >
                  <ShoppingCart size={18} /> My Cart Lists
                </TabsTrigger>
                <TabsTrigger
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all text-sm"
                  value="address"
                >
                  <MapPin size={18} /> My Address
                </TabsTrigger>
                <TabsTrigger
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all text-sm"
                  value="security"
                >
                  <Shield size={18} /> Security
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          <Card className="w-5xl">
            <CardContent>
              <TabsContent value="profile">
                <ProfileTab />
              </TabsContent>
              <TabsContent value="wishlists">
                <WishlistTab />
              </TabsContent>
              <TabsContent value="orders">
                <OrdersTab />
              </TabsContent>
              <TabsContent value="cart-lists">
                <CartListsTab />
              </TabsContent>
              <TabsContent value="address">
                <AddressTab />
              </TabsContent>{" "}
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </section>
    </div>
  );
}
