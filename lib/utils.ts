import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CATEGORY_CONFIG, type FoodCategory } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateExpirationDate(category: FoodCategory, purchaseDate: string): string {
  const purchase = new Date(purchaseDate)
  const defaultDays = CATEGORY_CONFIG[category].defaultDays
  const expiration = new Date(purchase)
  expiration.setDate(expiration.getDate() + defaultDays)
  return expiration.toISOString().split("T")[0]
}

export function getExpirationStatus(expirationDate: string): "expired" | "warning" | "good" {
  const today = new Date()
  const expiration = new Date(expirationDate)
  const diffTime = expiration.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return "expired"
  if (diffDays <= 3) return "warning"
  return "good"
}

export function getStatusColor(status: "expired" | "warning" | "good"): string {
  switch (status) {
    case "expired":
      return "bg-red-100 border-red-300 text-red-800"
    case "warning":
      return "bg-yellow-100 border-yellow-300 text-yellow-800"
    case "good":
      return "bg-green-100 border-green-300 text-green-800"
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR")
}

export function getDaysUntilExpiration(expirationDate: string): number {
  const today = new Date()
  const expiration = new Date(expirationDate)
  const diffTime = expiration.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Reexportamos FoodInput para manter compatibilidade com código existente
export type { FoodInput } from "./types"
