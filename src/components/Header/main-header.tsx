"use client";
import { Heart, ShoppingCart, Truck, User } from "lucide-react";
import Link from "next/link";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import Image from "next/image";
import { Badge } from "../common/badge";
import { Button } from "../ui/button";
import SearchBox from "../common/search-box";
import Separator from "../ui/separator";
import { ThemeToggle } from "../ui/theme-toggle";
import HeaderLogo from "./header-logo";

export default function MainHeader() {
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: "$999",
      rating: 4.8,
    },
    {
      id: 2,
      name: "MacBook Air M2",
      category: "Electronics",
      price: "$1199",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Sony Headphones",
      category: "Audio",
      price: "$349",
      rating: 4.7,
    },
  ];
  // const [searchResult, setSearchResult] = useState("");
  const session = null; // Replace with actual session logic (e.g., from authClient.useSession())
  // const { data: session } = authClient.useSession();
  return (
    <header className="border-b bg-card border-border">
      <div className="flex items-center justify-between container mx-auto px-4 py-2">
        <HeaderLogo />

        <div className="lg:block flex-1 hidden max-w-2xl lg:max-xl mx-4 md:mx-8">
          <SearchBox
            className="w-full flex-1 mx-4"
            data={products}
            // onSearch={(value) => setSearchResult(value)}
            placeholder="Search your product...."
            storageKey="Product_search"
          />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <div className="hidden sm:block">
            {session ? (
              <Dropdown animationVariant="expand">
                <DropdownTrigger className="rounded-md">
                  <div className="h-8 w-8">
                    <Image
                      src={session?.user?.image}
                      alt={session.user.name}
                      height={100}
                      width={100}
                      className="h-full w-full rounded-full border-2 border-primary cursor-pointer object-cover"
                    />
                  </div>
                  <div>
                    <p className="uppercase">{session.user.name}</p>
                    <p className="text-sm">{session.user.email}</p>
                  </div>
                </DropdownTrigger>
                <DropdownContent className="w-50">
                  <DropdownItem
                    title="My Profile"
                    link="/my-details"
                    icon={<User />}
                  />
                  <DropdownItem
                    title="My Wishlists"
                    link="/my-wishlists"
                    icon={<Heart />}
                  />
                  <DropdownItem
                    title="My Orders"
                    link="/my-orders"
                    icon={<Truck />}
                  />
                  <DropdownItem
                    title="My Cart Lists"
                    link="/my-cart-lists"
                    icon={<ShoppingCart />}
                  />
                  <DropdownItem>
                    {/* <LogoutButton size="sm" fullWidth className="text-black" /> */}
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            ) : (
              <div className="flex items-center justify-between space-x-3">
                <Link href="/auth/login">
                  <Button size="sm" variant="overlay">
                    Login
                  </Button>
                </Link>
                <Separator orientation="vertical" className="py-3" />
                <Link href="/auth/register">
                  <Button size="sm" variant="overlay">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between space-x-5">
            <Badge isOverlay color="indigo" value="4">
              <div className="p-2 active:scale-105 bg-accent cursor-pointer transition-all duration-200 rounded-full">
                <Heart size={20} className="text-accent-foreground" />
              </div>
            </Badge>
            <Badge isOverlay color="indigo" value="4">
              <div className="p-2 active:scale-105 bg-accent cursor-pointer transition-all duration-200 rounded-full">
                <ShoppingCart size={20} className="text-accent-foreground" />
              </div>
            </Badge>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
