"use client"

import { useState, useEffect } from "react"
import { supabase, type Food } from "@/lib/supabase"
import { calculateExpirationDate, type FoodInput } from "@/lib/utils"

export function useFoods() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("foods").select("*").order("expiration_date", { ascending: true })

      if (error) throw error
      setFoods(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar alimentos")
    } finally {
      setLoading(false)
    }
  }

  const addFood = async (foodInput: FoodInput) => {
    try {
      const purchaseDate = foodInput.purchaseDate || new Date().toISOString().split("T")[0]
      const expirationDate = foodInput.expirationDate || calculateExpirationDate(foodInput.category, purchaseDate)

      const { data, error } = await supabase
        .from("foods")
        .insert([
          {
            name: foodInput.name,
            quantity: foodInput.quantity,
            category: foodInput.category,
            subcategory: foodInput.subcategory || null,
            purchase_date: purchaseDate,
            expiration_date: expirationDate,
            in_stock: foodInput.inStock !== undefined ? foodInput.inStock : true,
          },
        ])
        .select()

      if (error) throw error
      if (data) {
        setFoods((prev) =>
          [...prev, ...data].sort(
            (a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime(),
          ),
        )
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao adicionar alimento")
    }
  }

  const updateFood = async (id: string, updates: Partial<FoodInput & { in_stock?: boolean }>) => {
    try {
      const { data, error } = await supabase
        .from("foods")
        .update({
          ...updates,
          subcategory: updates.subcategory || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()

      if (error) throw error
      if (data) {
        setFoods((prev) =>
          prev
            .map((food) => (food.id === id ? { ...food, ...data[0] } : food))
            .sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime()),
        )
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao atualizar alimento")
    }
  }

  const toggleStock = async (id: string) => {
    try {
      const food = foods.find((f) => f.id === id)
      if (!food) return

      const { data, error } = await supabase
        .from("foods")
        .update({
          in_stock: !food.in_stock,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()

      if (error) throw error
      if (data) {
        setFoods((prev) =>
          prev
            .map((food) => (food.id === id ? { ...food, ...data[0] } : food))
            .sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime()),
        )
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao atualizar status do estoque")
    }
  }

  const markAllAsInStock = async (inStock: boolean) => {
    try {
      const { data, error } = await supabase
        .from("foods")
        .update({
          in_stock: inStock,
          updated_at: new Date().toISOString(),
        })
        .neq("id", "00000000-0000-0000-0000-000000000000") // Update all
        .select()

      if (error) throw error
      if (data) {
        setFoods((prev) =>
          prev
            .map((food) => ({ ...food, in_stock: inStock }))
            .sort((a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime()),
        )
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao atualizar status do estoque")
    }
  }

  const deleteFood = async (id: string) => {
    try {
      const { error } = await supabase.from("foods").delete().eq("id", id)

      if (error) throw error
      setFoods((prev) => prev.filter((food) => food.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao excluir alimento")
    }
  }

  const clearAllFoods = async () => {
    try {
      const { error } = await supabase.from("foods").delete().neq("id", "00000000-0000-0000-0000-000000000000") // Delete all

      if (error) throw error
      setFoods([])
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao limpar dados")
    }
  }

  const importFoods = async (foodsData: FoodInput[]) => {
    try {
      const foodsToInsert = foodsData.map((food) => {
        const purchaseDate = food.purchaseDate || new Date().toISOString().split("T")[0]
        const expirationDate = food.expirationDate || calculateExpirationDate(food.category, purchaseDate)

        return {
          name: food.name,
          quantity: food.quantity,
          category: food.category,
          subcategory: food.subcategory || null,
          purchase_date: purchaseDate,
          expiration_date: expirationDate,
          in_stock: food.inStock !== undefined ? food.inStock : true,
        }
      })

      const { data, error } = await supabase.from("foods").insert(foodsToInsert).select()

      if (error) throw error
      if (data) {
        setFoods((prev) =>
          [...prev, ...data].sort(
            (a, b) => new Date(a.expiration_date).getTime() - new Date(b.expiration_date).getTime(),
          ),
        )
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Erro ao importar alimentos")
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  return {
    foods,
    loading,
    error,
    addFood,
    updateFood,
    deleteFood,
    clearAllFoods,
    importFoods,
    toggleStock,
    markAllAsInStock,
    refetch: fetchFoods,
  }
}
