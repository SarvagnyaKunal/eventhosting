import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center py-12">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground max-w-md">
          Thank you for your purchase. We've sent a confirmation email with all the details.
        </p>
        <div className="mt-8 space-y-2">
          <p className="font-medium">What's next?</p>
          <ul className="text-muted-foreground space-y-1">
            <li>Check your email for order confirmation</li>
            <li>Save the event dates to your calendar</li>
            <li>Prepare for an amazing experience at TechFest 2024!</li>
          </ul>
        </div>
        <div className="flex gap-4 mt-8">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
          <Link href="/events">
            <Button variant="outline">Browse More Events</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
