"use client";

import React, { useState } from "react";
import { Menu, MenuItem } from "@/app/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <div className="relative w-screen flex items-center justify-center">
      <NavbarDemo />
    </div>
  );
}

function NavbarDemo({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-4 md:top-6 inset-x-0 flex justify-center z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home" />
        <MenuItem setActive={setActive} active={active} item="Services" />
        <MenuItem setActive={setActive} active={active} item="Products" />
        <MenuItem setActive={setActive} active={active} item="Pricing" />
        <MenuItem setActive={setActive} active={active} item="Contact" />
      </Menu>
    </div>
  );
}
