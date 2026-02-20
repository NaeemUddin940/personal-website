"use client";

import { HelpCircle, Settings, Truck } from "lucide-react";
import CustomLink from "../common/custom-link";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../ui/dropdown";
import { Option, Select } from "../ui/select";
import Separator from "../ui/separator";
import TypewriterTitle from "../ui/type-writer";

export default function TopHeader() {
  return (
    <section className="w-full bg-muted border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-1 px-3 sm:px-5">
        {/* Left Side */}
        <div className="flex items-center justify-center sm:justify-start gap-4 offer w-full">
          <div className="flex gap-4 text-[11px] sm:text-xs font-medium tracking-tight whitespace-nowrap">
            {/* Pulse Spread Circle Container */}
            <div className="relative flex items-center justify-center h-6 w-6 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-linear-to-r from-pink-500 via-red-500 to-orange-500 opacity-40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>

              <span className="absolute inline-flex h-full w-full rounded-full bg-linear-to-r from-pink-500 via-red-500 to-orange-500 opacity-20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_400ms]"></span>

              <span className="relative inline-flex rounded-full h-3 w-3 bg-linear-to-r from-pink-500 via-red-500 to-orange-500 shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                <span className="absolute inset-0 rounded-full bg-white/30 blur-[0.5px]"></span>
              </span>
            </div>
          </div>

          <div className="font-medium text-left animate-slide-in-top delay-300">
            <TypewriterTitle />
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden sm:flex items-center justify-between gap-2">
          {/* Desktop Quick Links */}
          <nav className="hidden md:hidden lg:flex items-center gap-1">
            <CustomLink
              path="/help-center"
              className="py-2 px-3 rounded-2xl"
              icon={<HelpCircle size={14} />}
              text="Help Center"
            />
            <Separator orientation="vertical" />
            <CustomLink
              path="/order-tracking"
              className="py-2 px-3 rounded-2xl"
              icon={<Truck size={14} />}
              text="Order Tracking"
            />
          </nav>

          {/* Small device Quick Links */}
          <div className="flex sm:flex lg:hidden">
            <Dropdown side="left" animationVariant="slide">
              <DropdownTrigger className="px-4 py-2 whitespace-nowrap rounded-lg shadow-sm text-sm font-medium transition-all">
                Quick Links
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem
                  icon={<HelpCircle size={18} />}
                  title="Help Center"
                  label="Get instant support"
                />
                <DropdownItem
                  icon={<Truck size={18} />}
                  title="Tracking"
                  label="Check order status"
                />
                <div className="h-1px bg-slate-100 my-1 mx-2" />
                <DropdownItem
                  icon={<Settings size={18} />}
                  title="Settings"
                  label="Go to settings."
                />
              </DropdownContent>
            </Dropdown>
          </div>

          {/* Language & Currency */}
          <Select name="language" showChevron={false}>
            <Option value="en" defaultSelect>
              English
            </Option>
            <Option value="bd">Bangladesh</Option>
            <Option value="es">Spanish</Option>
            <Option value="fr">French</Option>
          </Select>
        </div>
      </div>
    </section>
  );
}
