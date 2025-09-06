"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  BarChart,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // 🔑 yeh import karna

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  const pathname = usePathname(); // ✅ current route
  const links = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/articles/create", label: "Articles", icon: FileText },
    { href: "/dashboard/comments", label: "Comments", icon: MessageCircle },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center pb-5">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/the-diary-logo.png"
            alt="The Diary Logo"
            width={80}
            height={60}
            className="h-auto w-auto"
          />
        </Link>
      </div>

      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href; // check kar current route
          return (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  isActive
                    ? "bg-yellow-500 text-white hover:bg-yellow-600" // 🔥 Active Golden Theme
                    : ""
                }`}
                onClick={closeSheet}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
