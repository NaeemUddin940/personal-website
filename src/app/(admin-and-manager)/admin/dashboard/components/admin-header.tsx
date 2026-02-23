import LogoutButton from "@/components/common/logout-button";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/utils/auth-client";
import { Search, Settings, User } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
  const { data: session } = authClient.useSession();

  return (
    <header className="sticky bg-card h-fit top-0 z-500 w-full border-b border-border shadow-sm px-4 md:px-6 py-3">
      <div className="mx-auto flex items-center justify-between gap-4">
        {/* Page Title in Desktop */}
        <div className="h-10 md:hidden w-10">
          <Image
            src="/PollenPop.png"
            alt="pollenpop"
            height={100}
            width={100}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Middle: Search Bar */}
        <div className="flex flex-1 max-w-md relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={20} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search anything..."
            className="w-full bg-muted border placeholder:text-muted-foreground border-border rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
          />
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          <button className="relative p-2 rounded-xl bg-muted cursor-pointer transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
          </button>
          <div className="h-8 w-px mx-1" />
          <Dropdown triggerMode="click">
            <DropdownTrigger hideChevron>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium leading-none text-foreground">
                    {session?.user?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-semibold uppercase tracking-wider">
                    {session?.user?.role === "admin"
                      ? "Administrator"
                      : session?.user?.role}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-all">
                  <Image
                    height={30}
                    width={30}
                    src={
                      session?.user
                        ? session?.user?.image
                        : "/avatar-default.svg"
                    }
                    alt="Avatar"
                    className="objec-cover h-full w-full"
                  />
                </div>
              </div>
            </DropdownTrigger>
            <DropdownContent width="70">
              <div className="space-y-2 w-50">
                <Button
                  size="sm"
                  variant="default"
                  className="hover:bg-primary"
                  fullWidth
                  icon={<User size={20} />}
                >
                  Profile
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="hover:bg-primary"
                  fullWidth
                  icon={<Settings size={20} />}
                >
                  Settings
                </Button>

                <LogoutButton size="sm" />
              </div>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
