"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/app/components/ui/resizable-navbar";
import { useState } from "react";

export function HomeNavbar() {
  const navItems = [
    {
      name: "Home",
      link: "#features",
    },
    {
      name: "About",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="hidden lg:flex h-16 bg-[#0f172a]/90 text-gray-100 items-center justify-between px-4">

          <NavbarLogo />
          <NavItems
            items={navItems}
            className="absolute inset-0 h-full w-full rounded-full bg-[#0f172a]/90 text-gray-100"
          />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="h-16 bg-[#0f172a]/90 text-gray-100 flex items-center justify-between px-4 lg:hidden">
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-200 hover:text-white"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
