"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download, Upload, Settings } from "lucide-react"

interface MobileNavigationProps {
  onAddItem: () => void
  onImportExport: () => void
  onSettings: () => void
}

export function MobileNavigation({ onAddItem, onImportExport, onSettings }: MobileNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2" onClick={onAddItem}>
          <Plus className="h-5 w-5" />
          <span className="text-xs">Adicionar</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2"
          onClick={onImportExport}
        >
          <Upload className="h-5 w-5" />
          <span className="text-xs">Importar</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2"
          onClick={onImportExport}
        >
          <Download className="h-5 w-5" />
          <span className="text-xs">Exportar</span>
        </Button>

        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2" onClick={onSettings}>
          <Settings className="h-5 w-5" />
          <span className="text-xs">Config</span>
        </Button>
      </div>
    </div>
  )
}
