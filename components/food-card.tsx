"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Trash2, Check, X, Package, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Food } from "@/lib/supabase"
import { getExpirationStatus, getStatusColor, formatDate, getDaysUntilExpiration } from "@/lib/utils"
import { CATEGORY_CONFIG, SUBCATEGORY_CONFIG, getSubcategoriesForCategory } from "@/lib/types"

interface FoodCardProps {
  food: Food
  onUpdate: (id: string, updates: any) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onToggleStock: (id: string) => Promise<void>
}

export function FoodCard({ food, onUpdate, onDelete, onToggleStock }: FoodCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: food.name,
    quantity: food.quantity.toString(),
    expiration_date: food.expiration_date,
    subcategory: food.subcategory || "default",
  })

  const status = getExpirationStatus(food.expiration_date)
  const statusColor = getStatusColor(status)
  const daysUntil = getDaysUntilExpiration(food.expiration_date)
  const categoryConfig = CATEGORY_CONFIG[food.category]
  const subcategoryConfig = food.subcategory
    ? SUBCATEGORY_CONFIG[food.subcategory as keyof typeof SUBCATEGORY_CONFIG]
    : null

  const handleSave = async () => {
    try {
      await onUpdate(food.id, {
        name: editData.name,
        quantity: Number.parseInt(editData.quantity),
        expiration_date: editData.expiration_date,
        subcategory: editData.subcategory === "default" ? undefined : editData.subcategory,
      })
      setIsEditing(false)
    } catch (error) {
      console.error("Erro ao atualizar:", error)
    }
  }

  const handleCancel = () => {
    setEditData({
      name: food.name,
      quantity: food.quantity.toString(),
      expiration_date: food.expiration_date,
      subcategory: food.subcategory || "default",
    })
    setIsEditing(false)
  }

  const getStatusMessage = () => {
    if (status === "expired") return "Vencido"
    if (status === "warning")
      return `${daysUntil} dia${daysUntil !== 1 ? "s" : ""} restante${daysUntil !== 1 ? "s" : ""}`
    return `${daysUntil} dias restantes`
  }

  const getDisplayIcon = () => {
    if (subcategoryConfig) return subcategoryConfig.icon
    return categoryConfig.icon
  }

  const cardOpacity = food.in_stock ? "opacity-100" : "opacity-60"
  const cardBorder = food.in_stock ? "" : "border-dashed"
  const availableSubcategories = getSubcategoriesForCategory(food.category)

  return (
    <Card className={`${statusColor} ${cardOpacity} ${cardBorder} transition-all duration-200 hover:shadow-md`}>
      <CardContent className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xl md:text-2xl flex-shrink-0">{getDisplayIcon()}</span>
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {categoryConfig.label}
                </Badge>
                {!food.in_stock && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    Fora de Estoque
                  </Badge>
                )}
              </div>
              {subcategoryConfig && (
                <Badge variant="outline" className="text-xs w-fit">
                  {subcategoryConfig.label}
                </Badge>
              )}
            </div>
          </div>

          {/* Mobile: Dropdown menu, Desktop: Individual buttons */}
          <div className="flex gap-1 flex-shrink-0">
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(food.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="hidden md:flex gap-1">
              {!isEditing ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(food.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Nome
              </Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantidade
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={editData.quantity}
                  onChange={(e) => setEditData((prev) => ({ ...prev, quantity: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="expiration" className="text-sm font-medium">
                  Vencimento
                </Label>
                <Input
                  id="expiration"
                  type="date"
                  value={editData.expiration_date}
                  onChange={(e) => setEditData((prev) => ({ ...prev, expiration_date: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            {categoryConfig.hasSubcategories && availableSubcategories.length > 0 && (
              <div>
                <Label htmlFor="subcategory" className="text-sm font-medium">
                  Subcategoria
                </Label>
                <Select
                  value={editData.subcategory}
                  onValueChange={(value) => setEditData((prev) => ({ ...prev, subcategory: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione a subcategoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Sem especificação</SelectItem>
                    {availableSubcategories.map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {SUBCATEGORY_CONFIG[subcat as keyof typeof SUBCATEGORY_CONFIG].icon}{" "}
                        {SUBCATEGORY_CONFIG[subcat as keyof typeof SUBCATEGORY_CONFIG].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Mobile: Action buttons for editing */}
            <div className="flex gap-2 md:hidden">
              <Button onClick={handleSave} size="sm" className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">{food.name}</h3>
            <div className="space-y-1 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <p>
                  <span className="font-medium">Qtd:</span> {food.quantity}
                </p>
                {subcategoryConfig && (
                  <p className="truncate">
                    <span className="font-medium">Tipo:</span> {subcategoryConfig.label}
                  </p>
                )}
              </div>
              <p className="text-xs">
                <span className="font-medium">Comprado:</span> {formatDate(food.purchase_date)}
              </p>
              <p className="text-xs">
                <span className="font-medium">Vence:</span> {formatDate(food.expiration_date)}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Badge
                variant={status === "expired" ? "destructive" : status === "warning" ? "default" : "secondary"}
                className="text-xs"
              >
                {getStatusMessage()}
              </Badge>
            </div>
          </>
        )}

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Checkbox id={`stock-${food.id}`} checked={food.in_stock} onCheckedChange={() => onToggleStock(food.id)} />
            <Label htmlFor={`stock-${food.id}`} className="text-sm font-medium cursor-pointer flex items-center gap-1">
              <Package className="h-3 w-3" />
              {food.in_stock ? "Em estoque" : "Fora de estoque"}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
