"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { FoodInput } from "@/lib/utils"
import { CATEGORY_CONFIG, SUBCATEGORY_CONFIG, getSubcategoriesForCategory } from "@/lib/types"

interface AddFoodFormProps {
  onAdd: (food: FoodInput) => Promise<void>
}

export function AddFoodForm({ onAdd }: AddFoodFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FoodInput>({
    name: "",
    quantity: 1,
    category: "pereciveis",
    subcategory: undefined,
    purchaseDate: "",
    expirationDate: "",
    inStock: true,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      setLoading(true)
      await onAdd(formData)
      setFormData({
        name: "",
        quantity: 1,
        category: "pereciveis",
        subcategory: undefined,
        purchaseDate: "",
        expirationDate: "",
        inStock: true,
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Erro ao adicionar alimento:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (value: any) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
      // Reset subcategory when changing category
      subcategory: undefined,
    }))
  }

  const categoryConfig = CATEGORY_CONFIG[formData.category]
  const showSubcategories = categoryConfig.hasSubcategories
  const availableSubcategories = getSubcategoriesForCategory(formData.category)

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full mb-6" size="lg">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Item
      </Button>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Adicionar Novo Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Item</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Leite integral, Detergente, Shampoo..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 1 }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.icon} {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showSubcategories && availableSubcategories.length > 0 && (
            <div>
              <Label htmlFor="subcategory">Subcategoria (opcional)</Label>
              <Select
                value={formData.subcategory || "sem-especificacao"}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    subcategory: value === "sem-especificacao" ? undefined : value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a subcategoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sem-especificacao">Sem especificação</SelectItem>
                  {availableSubcategories.map((subcat) => (
                    <SelectItem key={subcat} value={subcat}>
                      {SUBCATEGORY_CONFIG[subcat as keyof typeof SUBCATEGORY_CONFIG].icon}{" "}
                      {SUBCATEGORY_CONFIG[subcat as keyof typeof SUBCATEGORY_CONFIG].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.subcategory && (
                <p className="text-sm text-muted-foreground mt-1">
                  {SUBCATEGORY_CONFIG[formData.subcategory as keyof typeof SUBCATEGORY_CONFIG].description}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="purchaseDate">Data de Compra (opcional)</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="expirationDate">Data de Vencimento (opcional)</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, expirationDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={formData.inStock}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, inStock: !!checked }))}
            />
            <Label
              htmlFor="inStock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Presente no estoque (aparecerá nos alertas de vencimento)
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adicionando..." : "Adicionar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
