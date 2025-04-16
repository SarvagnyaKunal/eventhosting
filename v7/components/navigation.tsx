"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/use-auth"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-provider"
import { Badge } from "@/components/ui/badge"

export default function Navigation() {
  const { user, login, logout } = useAuth()
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-pixel text-xl md:text-2xl neon-text">
          TECHTONIC&apos;25
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-pixel text-sm hover:text-secondary transition-colors">
            Home
          </Link>
          <Link href="/events" className="font-pixel text-sm hover:text-secondary transition-colors">
            Events
          </Link>
          <Link href="#gallery" className="font-pixel text-sm hover:text-secondary transition-colors">
            Gallery
          </Link>
          <Link href="#faq" className="font-pixel text-sm hover:text-secondary transition-colors">
            FAQ
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5 hover:text-secondary transition-colors" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>
              <span className="text-xs font-pixel truncate max-w-[120px]">{user.email}</span>
              <Button variant="outline" size="sm" className="pixel-button text-xs" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" className="pixel-button text-xs" onClick={() => login()}>
              Login
            </Button>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-t-2 border-primary">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="font-pixel text-sm py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/events"
              className="font-pixel text-sm py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="#gallery"
              className="font-pixel text-sm py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="#faq"
              className="font-pixel text-sm py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>

            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/cart"
                  className="font-pixel text-sm py-2 hover:text-secondary transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="ml-2">Cart</span>
                    {totalItems > 0 && <Badge className="ml-2 bg-primary text-white">{totalItems}</Badge>}
                  </div>
                </Link>
                <span className="text-xs font-pixel truncate">{user.email}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="pixel-button text-xs w-full"
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="pixel-button text-xs w-full"
                onClick={() => {
                  login()
                  setIsMenuOpen(false)
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
