"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/uiStore"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { Button } from "@/components/ui/Button"

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "المتجر", href: "/shop" },
  { name: "وصلنا حديثاً", href: "/shop?category=new-arrivals" },
  { name: "التخفيضات", href: "/shop?category=sale" },
]

export function Navbar() {
  const pathname = usePathname()
  const { toggleCart, toggleMobileMenu, isMobileMenuOpen, openSearch } = useUIStore()
  const cartItemsCount = useCartStore((state) => state.totalItems)
  const wishlistItemsCount = useWishlistStore((state) => state.items.length)

  return (
    <header className="sticky top-0 z-80 w-full bg-background/80 backdrop-blur-md border-b">
      <nav className="luxury-container flex items-center justify-between h-20">
        {/* Logo - Stays at start (Right in RTL) */}
        <Link href="/" className="text-2xl font-bold tracking-[0.25em] uppercase hover:opacity-70 transition-opacity">
          دوكان هدوم
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-black/60",
                pathname === link.href ? "text-primary border-b border-primary pb-1" : "text-black/50"
              )}
            >
              <span className="mx-5">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Icons & Mobile Toggle - Grouped at end (Left in RTL) */}
        <div className="flex items-center space-x-1 md:space-x-3 ">
          <button onClick={openSearch} className="p-2 hover:bg-accent transition-colors hidden md:block">
            <Search className="w-5 h-5" />
          </button>

          <Link href="/account" className="p-2 hover:bg-accent transition-colors hidden md:block">
            <User className="w-5 h-5" />
          </Link>

          <Link href="/wishlist" className="p-2 hover:bg-accent transition-colors relative">
            <Heart className="w-5 h-5" />
            {wishlistItemsCount > 0 && (
              <span className="absolute top-1 inset-inline-end-1 w-4 h-4 bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center rounded-full">
                {wishlistItemsCount}
              </span>
            )}
          </Link>

          <button onClick={toggleCart} className="p-2 hover:bg-accent transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1 inset-inline-end-1 w-4 h-4 bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle - Now at the end */}
          <button
            className="lg:hidden p-2 hover:bg-accent transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-79 animate-in fade-in slide-in-from-top-4">
          <div className="luxury-container py-8 flex flex-col space-y-6 bg-white/90 ">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={toggleMobileMenu}
                className="text-2xl font-medium tracking-widest uppercase hover:bg-primary hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border" />
            <Link href="/account" onClick={toggleMobileMenu} className="text-lg font-medium tracking-widest uppercase flex items-center">
              <User className="me-3 w-5 h-5" /> الحساب
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
