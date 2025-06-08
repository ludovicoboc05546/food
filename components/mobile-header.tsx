"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Package, AlertTriangle } from "lucide-react"
import { CATEGORY_CONFIG } from "@/lib/types"
import type { Food } from "@/lib/supabase"
import { getExpirationStatus } from "@/lib/utils"

interface MobileHeaderProps {
  foods: Food[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileHeader({ foods, activeTab, onTabChange }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const categorizedFoods = {
    all: foods,
    ...Object.keys(CATEGORY_CONFIG).reduce(
      (acc, key) => {
        acc[key] = foods.filter((food) => food.category === key)
        return acc
      },
      {} as Record<string, Food[]>,
    ),
  }

  const inStockFoods = foods.filter((food) => food.in_stock)
  const expiredCount = inStockFoods.filter((food) => getExpirationStatus(food.expiration_date) === "expired").length
  const warningCount = inStockFoods.filter((food) => getExpirationStatus(food.expiration_date) === "warning").length

  const handleTabSelect = (tab: string) => {
    onTabChange(tab)
    setIsOpen(false)
  }

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold">🏠 EstoqueCasa</h1>
          {(expiredCount > 0 || warningCount > 0) && (
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <Badge variant="destructive" className="text-xs">
                {expiredCount + warningCount}
              </Badge>
            </div>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Categorias
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              <Button
                variant={activeTab === "all" ? "default" : "ghost"}
                className="w-full justify-between"
                onClick={() => handleTabSelect("all")}
              >
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Todos os Itens
                </div>
                <Badge variant="secondary">{categorizedFoods.all.length}</Badge>
              </Button>

              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <Button
                  key={key}
                  variant={activeTab === key ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => handleTabSelect(key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{config.icon}</span>
                    <span className="text-sm">{config.label}</span>
                  </div>
                  <Badge variant="secondary">{categorizedFoods[key]?.length || 0}</Badge>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
