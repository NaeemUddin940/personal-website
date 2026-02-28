"use client";
import { MenuItem } from "@/@types/admin/sidebar";
import {
  BarChart,
  Box,
  CreditCard,
  Home,
  Layers2,
  Settings,
  Settings2,
  ShoppingCart,
  Tag,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

export const menuData: MenuItem[] = [
  {
    id: "1",
    title: "Dashboard",
    icon: Home,
    link: "/admin/dashboard",
  },
  {
    id: "2",
    title: "Products",
    icon: Box,
    children: [
      { id: "2-1", title: "All Products", link: "/admin/products" },
      { id: "2-2", title: "Add Product", link: "/admin/products/add" },
      { id: "2-5", title: "Inventory", link: "/admin/inventory" },
    ],
  },
  {
    id: "2-3",
    title: "Categories",
    icon: Layers2,
    link: "/admin/categories",
    children: [
      {
        id: "2-3-1",
        title: "Create",
        link: "/admin/categories/create",
      },
      {
        id: "2-3-2",
        title: "Clothing",
        link: "/admin/categories/clothing",
        children: [
          { id: "2-3-2-1", title: "Men's Wear", link: "/admin/cat/men" },
          {
            id: "2-3-2-2",
            title: "Women's Wear",
            link: "/admin/cat/women",
          },
        ],
      },
    ],
  },
  {
    id: "3-attr",
    title: "Attributes",
    icon: Settings2,
    children: [
      {
        id: "3-1",
        title: "Create Attribute",
        link: "/admin/attributes/create",
      },
      { id: "3-2", title: "All Attributes", link: "/admin/attributes/all" },
    ],
  },
  {
    id: "3-orders",
    title: "Orders",
    icon: ShoppingCart,
    children: [
      { id: "3-1-o", title: "All Orders", link: "/admin/orders" },
      { id: "3-2-o", title: "Pending Orders", link: "/admin/orders/pending" },
    ],
  },
  {
    id: "4",
    title: "Customers",
    icon: Users,
    children: [
      { id: "4-1", title: "All Customers", link: "/admin/customers" },
      { id: "4-2", title: "Customer Reviews", link: "/admin/reviews" },
    ],
  },
  {
    id: "5",
    title: "Brands",
    icon: Tag,
    children: [
      { id: "5-1", title: "All Brands", link: "/admin/brands" },
      { id: "5-2", title: "Add Brand", link: "/admin/brands/add" },
    ],
  },
  {
    id: "6",
    title: "Marketing",
    icon: TrendingUp,
    children: [
      { id: "6-1", title: "Coupons", link: "/admin/coupons" },
      { id: "6-2", title: "Discounts", link: "/admin/discounts" },
    ],
  },
  {
    id: "7",
    title: "Payments",
    icon: CreditCard,
    children: [
      { id: "7-1", title: "Methods", link: "/admin/payment-methods" },
      { id: "7-2", title: "Transactions", link: "/admin/transactions" },
    ],
  },
  {
    id: "8",
    title: "Reports",
    icon: BarChart,
    children: [
      { id: "8-1", title: "Sales Report", link: "/admin/reports/sales" },
    ],
  },
  {
    id: "9",
    title: "Team & Roles",
    icon: UserCheck,
    children: [
      { id: "9-1", title: "Members", link: "/admin/team" },
      { id: "9-2", title: "Permissions", link: "/admin/roles" },
    ],
  },
  {
    id: "10",
    title: "System Settings",
    icon: Settings,
    children: [
      {
        id: "10-1",
        title: "General Settings",
        link: "/admin/settings/general",
      },
    ],
  },
];
