"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Upload, FileText, Trash2 } from "lucide-react"
import type { Food } from "@/lib/supabase"
import type { FoodInput } from "@/lib/utils"
import { CATEGORY_CONFIG, SUBCATEGORY_CONFIG, getSubcategoriesForCategory } from "@/lib/types"

interface ImportExportProps {
  foods: Food[]
  onImport: (foods: FoodInput[]) => Promise<void>
  onClearAll: () => Promise<void>
}

export function ImportExport({ foods, onImport, onClearAll }: ImportExportProps) {
  const [importText, setImportText] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateExampleJSON = () => {
    const example = [
      // Perecíveis
      {
        name: "Leite Integral",
        quantity: 2,
        category: "pereciveis",
        subcategory: "laticinios",
        purchaseDate: "2025-06-08",
        inStock: true,
      },
      {
        name: "Peito de Frango",
        quantity: 1,
        category: "pereciveis",
        subcategory: "carnes",
        inStock: true,
      },
      // Temperos e Condimentos
      {
        name: "Orégano",
        quantity: 1,
        category: "temperos_condimentos",
        subcategory: "ervas_secas",
        inStock: true,
      },
      {
        name: "Molho de Tomate",
        quantity: 2,
        category: "temperos_condimentos",
        subcategory: "molhos_e_pastas",
        expirationDate: "2025-12-08",
        inStock: true,
      },
      // Padaria e Confeitaria
      {
        name: "Pão de Forma",
        quantity: 1,
        category: "padaria_confeitaria",
        subcategory: "paes",
        inStock: true,
      },
      // Enlatados e Conservas
      {
        name: "Atum em Lata",
        quantity: 3,
        category: "enlatados_conservas",
        subcategory: "pescados_enlatados",
        inStock: true,
      },
      // Bebidas
      {
        name: "Café em Pó",
        quantity: 1,
        category: "bebidas",
        subcategory: "cafes_chas_e_achocolatados",
        inStock: true,
      },
      // Produtos de Limpeza
      {
        name: "Detergente",
        quantity: 2,
        category: "produtos_limpeza",
        subcategory: "limpeza_de_cozinha",
        inStock: false,
      },
      // Higiene Pessoal
      {
        name: "Shampoo",
        quantity: 1,
        category: "higiene_pessoal",
        subcategory: "cuidados_com_o_cabelo",
        inStock: true,
      },
      // Categorias sem subcategorias
      {
        name: "Cenoura",
        quantity: 1,
        category: "legumes",
        inStock: true,
      },
      {
        name: "Arroz Branco",
        quantity: 3,
        category: "graos",
        expirationDate: "2025-12-08",
        inStock: false,
      },
    ]
    setImportText(JSON.stringify(example, null, 2))
  }

  const validateJSON = (jsonData: any[]): FoodInput[] => {
    if (!Array.isArray(jsonData)) {
      throw new Error("JSON deve ser um array de itens")
    }

    return jsonData.map((item, index) => {
      if (!item.name || typeof item.name !== "string") {
        throw new Error(`Item ${index + 1}: Nome é obrigatório e deve ser texto`)
      }
      if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0) {
        throw new Error(`Item ${index + 1}: Quantidade deve ser um número maior que zero`)
      }

      // Validate category
      if (!item.category || !Object.keys(CATEGORY_CONFIG).includes(item.category)) {
        throw new Error(
          `Item ${index + 1}: Categoria '${item.category}' não é válida. Categorias válidas: ${Object.keys(CATEGORY_CONFIG).join(", ")}`,
        )
      }

      // Validate subcategory if provided
      if (item.subcategory) {
        const validSubcategories = getSubcategoriesForCategory(item.category)
        if (validSubcategories.length === 0) {
          throw new Error(`Item ${index + 1}: A categoria '${item.category}' não suporta subcategorias`)
        }
        if (!validSubcategories.includes(item.subcategory)) {
          throw new Error(
            `Item ${index + 1}: Subcategoria '${item.subcategory}' não é válida para a categoria '${item.category}'`,
          )
        }
      }

      // Validate inStock if provided
      if (item.inStock !== undefined && typeof item.inStock !== "boolean") {
        throw new Error(`Item ${index + 1}: inStock deve ser true ou false`)
      }

      return {
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        subcategory: item.subcategory,
        purchaseDate: item.purchaseDate,
        expirationDate: item.expirationDate,
        inStock: item.inStock,
      }
    })
  }

  const handleImport = async () => {
    if (!importText.trim()) {
      setError("Por favor, insira o JSON para importar")
      return
    }

    try {
      setLoading(true)
      setError("")

      const jsonData = JSON.parse(importText)
      const validatedFoods = validateJSON(jsonData)

      await onImport(validatedFoods)
      setImportText("")
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar JSON")
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const exportData = foods.map((food) => ({
      name: food.name,
      quantity: food.quantity,
      category: food.category,
      ...(food.subcategory && { subcategory: food.subcategory }),
      purchaseDate: food.purchase_date,
      expirationDate: food.expiration_date,
      inStock: food.in_stock,
    }))

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = `estoque-domestico-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setImportText(content)
    }
    reader.readAsText(file)
  }

  const handleClearAll = async () => {
    if (window.confirm("Tem certeza que deseja excluir todos os itens? Esta ação não pode ser desfeita.")) {
      try {
        setLoading(true)
        await onClearAll()
      } catch (error) {
        setError("Erro ao limpar dados")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleExport} disabled={foods.length === 0} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar JSON
        </Button>

        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Importar Arquivo
        </Button>

        <Button onClick={generateExampleJSON} variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Exemplo JSON
        </Button>

        <Button onClick={handleClearAll} disabled={foods.length === 0 || loading} variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar Dados
        </Button>
      </div>

      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileImport} className="hidden" />

      <Card>
        <CardHeader>
          <CardTitle>Importar JSON</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Campos disponíveis:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <code>name</code> (obrigatório): Nome do item
              </li>
              <li>
                <code>quantity</code> (obrigatório): Quantidade numérica
              </li>
              <li>
                <code>category</code> (obrigatório): Categoria do item
              </li>
              <li>
                <code>subcategory</code> (opcional): Subcategoria específica
              </li>
              <li>
                <code>purchaseDate</code> (opcional): Data de compra YYYY-MM-DD
              </li>
              <li>
                <code>expirationDate</code> (opcional): Data de vencimento YYYY-MM-DD
              </li>
              <li>
                <code>inStock</code> (opcional): true/false - se está em estoque (padrão: true)
              </li>
            </ul>

            <p>
              <strong>Categorias disponíveis:</strong>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span className="font-mono text-xs">{key}</span>
                </div>
              ))}
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer font-medium">Ver todas as subcategorias disponíveis</summary>
              <div className="mt-2 pl-4 space-y-4">
                {Object.entries(CATEGORY_CONFIG)
                  .filter(([_, config]) => config.hasSubcategories)
                  .map(([category, config]) => (
                    <div key={category}>
                      <p className="font-medium">
                        {config.icon} {config.label}:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pl-4 mt-1">
                        {getSubcategoriesForCategory(category as any).map((subcat) => (
                          <div key={subcat} className="flex items-center gap-2">
                            <span>{SUBCATEGORY_CONFIG[subcat as keyof typeof SUBCATEGORY_CONFIG].icon}</span>
                            <span className="font-mono text-xs">{subcat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </details>
          </div>

          <Textarea
            placeholder="Cole aqui o JSON com os itens para importar..."
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={12}
            className="font-mono text-sm"
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleImport} disabled={!importText.trim() || loading} className="w-full">
            {loading ? "Importando..." : "Importar Itens"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
