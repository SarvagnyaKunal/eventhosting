export type User = {
  id: string
  name: string
  email: string
  phoneNumber?: string
  rollNumber?: string
  collegeName?: string
  ticketId?: string
}

export type Event = {
  id: string
  title: string
  description: string
  price: number
  category: "cat1" | "cat2" | "cat3"
  image: string
  formUrl?: string
}

export type CartItem = {
  event: Event
  quantity: number
}

export type BillingInfo = {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: CartItem[]
  totalAmount: number
  paymentScreenshot?: string
  paymentStatus: "pending" | "completed"
  createdAt: string
}
