import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">TechFest 2024</h3>
            <p className="text-sm text-muted-foreground">
              The biggest technical event of the year, organized by students for students.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                Events
              </Link>
              <Link href="/brochures" className="text-sm text-muted-foreground hover:text-foreground">
                Brochures
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground">
                Refund Policy
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Connect With Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Email: techfest@college.edu
              <br />
              Phone: +1 (123) 456-7890
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TechFest. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ❤️ by College Students</p>
        </div>
      </div>
    </footer>
  )
}
