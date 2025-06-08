"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react"
import { useFoods } from "@/hooks/use-foods"
import { FoodCard } from "@/components/food-card"
import { AddFoodForm } from "@/components/add-food-form"
import { ImportExport } from "@/components/import-export"
import { StockControls } from "@/components/stock-controls"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { getExpirationStatus } from "@/lib/utils"
import { CATEGORY_CONFIG } from "@/lib/types"

export default function HomePage() {
  const {
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
  } = useFoods()
  const [activeTab, setActiveTab] = useState("all")
  const [showOutOfStock, setShowOutOfStock] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showImportExport, setShowImportExport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const filteredFoods = showOutOfStock ? foods : foods.filter((food) => food.in_stock)

  const categorizedFoods = {
    all: filteredFoods,
    pereciveis: filteredFoods.filter((food) => food.category === "pereciveis"),
    legumes: filteredFoods.filter((food) => food.category === "legumes"),
    graos: filteredFoods.filter((food) => food.category === "graos"),
    temperos_condimentos: filteredFoods.filter((food) => food.category === "temperos_condimentos"),
    padaria_confeitaria: filteredFoods.filter((food) => food.category === "padaria_confeitaria"),
    enlatados_conservas: filteredFoods.filter((food) => food.category === "enlatados_conservas"),
    bebidas: filteredFoods.filter((food) => food.category === "bebidas"),
    produtos_limpeza: filteredFoods.filter((food) => food.category === "produtos_limpeza"),
    higiene_pessoal: filteredFoods.filter((food) => food.category === "higiene_pessoal"),
  }

  // Only count in-stock items for alerts
  const inStockFoods = foods.filter((food) => food.in_stock)
  const expiredCount = inStockFoods.filter((food) => getExpirationStatus(food.expiration_date) === "expired").length
  const warningCount = inStockFoods.filter((food) => getExpirationStatus(food.expiration_date) === "warning").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader foods={foods} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Desktop Header */}
      <div className="hidden md:block container mx-auto px-4 py-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">🏠 Gerenciador de Estoque Doméstico</h1>
          <p className="text-muted-foreground">Gerencie todos os produtos da sua casa de forma inteligente</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20 md:pb-6 max-w-7xl">
        {/* Alerts */}
        {(expiredCount > 0 || warningCount > 0) && (
          <Alert className="mb-4 md:mb-6 mx-0">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Alertas para itens em estoque:</strong>
              {expiredCount > 0 && (
                <span className="text-red-600 font-medium ml-2">
                  {expiredCount} item{expiredCount !== 1 ? "s" : ""} vencido{expiredCount !== 1 ? "s" : ""}
                </span>
              )}
              {expiredCount > 0 && warningCount > 0 && " • "}
              {warningCount > 0 && (
                <span className="text-yellow-600 font-medium">
                  {warningCount} item{warningCount !== 1 ? "s" : ""} vencendo em breve
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4 md:mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Desktop Add Form */}
        <div className="hidden md:block">
          <AddFoodForm onAdd={addFood} />
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:block">
          <StockControls foods={foods} onMarkAllAsInStock={markAllAsInStock} />
        </div>

        {/* Filter Toggle */}
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <Button
            onClick={() => setShowOutOfStock(!showOutOfStock)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {showOutOfStock ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {showOutOfStock ? "Ocultar Fora de Estoque" : "Mostrar Fora de Estoque"}
            </span>
            <span className="sm:hidden">{showOutOfStock ? "Ocultar" : "Mostrar"}</span>
          </Button>
        </div>

        {/* Tabs - Desktop */}
        <div className="hidden md:block">
          <div className="flex gap-6">
            {/* Sidebar com categorias */}
            <div className="w-64 flex-shrink-0">
              <Card className="sticky top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categorias</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    <Button
                      variant={activeTab === "all" ? "default" : "ghost"}
                      className="w-full justify-between h-auto py-3 px-4"
                      onClick={() => setActiveTab("all")}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">📦</span>
                        <span className="font-medium">Todos os Itens</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {categorizedFoods.all.length}
                      </Badge>
                    </Button>

                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                      <Button
                        key={key}
                        variant={activeTab === key ? "default" : "ghost"}
                        className="w-full justify-between h-auto py-3 px-4"
                        onClick={() => setActiveTab(key)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{config.icon}</span>
                          <span className="font-medium text-sm">{config.label}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {categorizedFoods[key as keyof typeof categorizedFoods].length}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 min-w-0">
              <div className="space-y-6">
                {categorizedFoods[activeTab as keyof typeof categorizedFoods].length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="text-6xl mb-4">
                        {activeTab === "all" ? "📦" : CATEGORY_CONFIG[activeTab as keyof typeof CATEGORY_CONFIG]?.icon}
                      </div>
                      <p className="text-muted-foreground text-center">
                        {activeTab === "all"
                          ? showOutOfStock
                            ? "Nenhum item cadastrado ainda"
                            : "Nenhum item em estoque"
                          : showOutOfStock
                            ? `Nenhum item na categoria ${CATEGORY_CONFIG[activeTab as keyof typeof CATEGORY_CONFIG]?.label}`
                            : `Nenhum item em estoque na categoria ${CATEGORY_CONFIG[activeTab as keyof typeof CATEGORY_CONFIG]?.label}`}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {categorizedFoods[activeTab as keyof typeof categorizedFoods].map((food) => (
                      <FoodCard
                        key={food.id}
                        food={food}
                        onUpdate={updateFood}
                        onDelete={deleteFood}
                        onToggleStock={toggleStock}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="md:hidden">
          <div className="space-y-4">
            {categorizedFoods[activeTab as keyof typeof categorizedFoods].length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-6xl mb-4">
                    {activeTab === "all" ? "📦" : CATEGORY_CONFIG[activeTab as keyof typeof CATEGORY_CONFIG]?.icon}
                  </div>
                  <p className="text-muted-foreground text-center text-sm">
                    {activeTab === "all"
                      ? showOutOfStock
                        ? "Nenhum item cadastrado ainda"
                        : "Nenhum item em estoque"
                      : showOutOfStock
                        ? `Nenhum item na categoria ${CATEGORY_CONFIG[activeTab as keyof typeof CATEGORY_CONFIG]?.label}`
                        : `Nenhum item em estoque na categoria ${CATEGORY_CONFIG[activeTab as keyof typeof CATEGORY_CONFIG]?.label}`}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categorizedFoods[activeTab as keyof typeof categorizedFoods].map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onUpdate={updateFood}
                    onDelete={deleteFood}
                    onToggleStock={toggleStock}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Import/Export */}
        <div className="hidden md:block mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Importar/Exportar Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <ImportExport foods={foods} onImport={importFoods} onClearAll={clearAllFoods} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Add Form Sheet */}
      <Sheet open={showAddForm} onOpenChange={setShowAddForm}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Adicionar Novo Item</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <AddFoodForm onAdd={addFood} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Import/Export Sheet */}
      <Sheet open={showImportExport} onOpenChange={setShowImportExport}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Importar/Exportar Dados</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ImportExport foods={foods} onImport={importFoods} onClearAll={clearAllFoods} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Settings Sheet */}
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Configurações</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <StockControls foods={foods} onMarkAllAsInStock={markAllAsInStock} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Navigation */}
      <MobileNavigation
        onAddItem={() => setShowAddForm(true)}
        onImportExport={() => setShowImportExport(true)}
        onSettings={() => setShowSettings(true)}
      />
    </div>
  )
}
