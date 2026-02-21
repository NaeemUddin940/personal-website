"use client";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * Mock data for the wishlist items.
 * In a real app, this would come from your backend or state manager.
 */
const INITIAL_WISHLIST = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 349.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 159.0,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.5,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 79.5,
    originalPrice: 99.0,
    image:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    rating: 4.2,
    reviews: 56,
    inStock: false,
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 450.0,
    originalPrice: 520.0,
    image:
      "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?w=500&q=80",
    rating: 4.9,
    reviews: 210,
    inStock: true,
  },
];

export default function WishlistTab() {
  const [items, setItems] = useState(INITIAL_WISHLIST);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    // Implement cart logic here
    console.log("Added to cart:", item.name);
  };

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            My Wishlist{" "}
            <span className="text-primary text-xl">({items.length})</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Keep track of items you love and want to buy later.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-6 py-2.5 rounded-full font-medium transition-colors">
          <ShoppingBag size={18} />
          Add All to Cart
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-16/11 overflow-hidden bg-muted">
              <Image
                height={500}
                width={500}
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Floating Badges */}
              {item.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                  SALE
                </div>
              )}
              {!item.inStock && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                  <span className="bg-destructive/10 text-destructive border border-destructive/20 text-xs font-bold px-3 py-1 rounded-full">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              {/* Quick Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-md text-muted-foreground hover:text-destructive rounded-full shadow-sm hover:shadow-md transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                title="Remove from wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
              <div className="mb-auto">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-foreground">
                    {item.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({item.reviews})
                  </span>
                </div>
                <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors cursor-pointer">
                  {item.name}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-foreground">
                  ${item.price}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-2 grid grid-cols-1 gap-2">
                <button
                  disabled={!item.inStock}
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="sm:hidden flex items-center justify-center gap-2 w-full bg-muted/50 text-muted-foreground py-2.5 rounded-xl font-medium"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Empty State Component
 */
function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 animate-bounce duration-1000">
        <Heart size={40} className="text-muted-foreground/40" />
      </div>
      <h2 className="text-2xl font-bold text-foreground">
        Your wishlist is empty
      </h2>
      <p className="text-muted-foreground mt-2 max-w-sm">
        Looks like you haven&apos;t added anything to your wishlist yet. Start
        exploring our amazing collection!
      </p>
      <button className="mt-8 flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-xl shadow-primary/25 hover:scale-105 transition-transform">
        Explore Products
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
