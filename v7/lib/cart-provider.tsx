"use client"

import { createContext, useState, useContext, useEffect } from "react"
import type { ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import type { CartItem, Event } from "@/lib/types"
import { useAuth } from "@/lib/use-auth"

type CartContextType = {
  items: CartItem[]
  addToCart: (event: Event) => void
  removeFromCart: (eventId: string) => void
  updateQuantity: (eventId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()
  const { user } = useAuth()

  // Load cart from localStorage when component mounts
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`techtonic_cart_${user.id}`)
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to parse saved cart:", error)
        }
      }
    } else {
      // Clear cart when user logs out
      setItems([])
    }
  }, [user])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`techtonic_cart_${user.id}`, JSON.stringify(items))
    }
  }, [items, user])

  const addToCart = (event: Event) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.event.id === event.id)

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }
        return updatedItems
      } else {
        // Item doesn't exist, add new item
        return [...prevItems, { event, quantity: 1 }]
      }
    })

    toast({
      title: "Added to cart",
      description: `${event.title} has been added to your cart.`,
    })
  }

  const removeFromCart = (eventId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.event.id !== eventId))

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  const updateQuantity = (eventId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(eventId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.event.id === eventId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = items.reduce((total, item) => total + item.event.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
