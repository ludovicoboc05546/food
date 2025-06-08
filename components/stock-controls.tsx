"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, PackageX, CheckSquare, Square } from "lucide-react"
import type { Food } from "@/lib/supabase"

interface StockControlsProps {
  foods: Food[]
  onMarkAllAsInStock: (inStock: boolean) => Promise<void>
}

export function StockControls({ foods, onMarkAllAsInStock }: StockControlsProps) {
  const inStockCount = foods.filter((food) => food.in_stock).length
  const outOfStockCount = foods.length - inStockCount

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Controle de Estoque
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-100 text-green-800">
                <Package className="h-3 w-3 mr-1" />
                Em estoque: {inStockCount}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-gray-600">
                <PackageX className="h-3 w-3 mr-1" />
                Fora de estoque: {outOfStockCount}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onMarkAllAsInStock(true)}
            variant="outline"
            size="sm"
            disabled={foods.length === 0}
            className="flex items-center gap-2"
          >
            <CheckSquare className="h-4 w-4" />
            Marcar Todos em Estoque
          </Button>
          <Button
            onClick={() => onMarkAllAsInStock(false)}
            variant="outline"
            size="sm"
            disabled={foods.length === 0}
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            Marcar Todos Fora de Estoque
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
