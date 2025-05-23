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
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

interface HomeNavbarProps {
  scrollToHome: () => void;
  scrollToProduct: () => void;
  scrollToContact: () => void;
}

export function HomeNavbar({
  scrollToHome,
  scrollToProduct,
  scrollToContact,
}: HomeNavbarProps) {
  const navItems = [
    { name: "Home", link: "#home", action: scrollToHome },
    { name: "Product", link: "#product", action: scrollToProduct },
    { name: "Contact", link: "#contact", action: scrollToContact },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="hidden lg:flex h-16 bg-[#0f172a]/90 text-gray-100 items-center justify-between px-4">
          <NavbarLogo />
          <NavItems
            items={navItems.map((item) => ({
              name: item.name,
              link: item.link,
              onClick: () => item.action()
            }))}
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
              <button
                key={`mobile-link-${idx}`}
                onClick={() => {
                  item.action();
                }}
                className="relative text-left w-full px-4 py-2 text-neutral-200 hover:text-white"
              >
                <span className="block">{item.name}</span>
              </button>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
