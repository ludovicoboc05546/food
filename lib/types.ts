export type FoodCategory =
  | "pereciveis"
  | "legumes"
  | "graos"
  | "temperos_condimentos"
  | "padaria_confeitaria"
  | "enlatados_conservas"
  | "bebidas"
  | "produtos_limpeza"
  | "higiene_pessoal"

export type PerishableSubcategory =
  | "carnes"
  | "frutos_do_mar"
  | "laticinios"
  | "frutas"
  | "vegetais"
  | "ovos"
  | "alimentos_cozidos"

export type TemperoCondimentoSubcategory =
  | "ervas_secas"
  | "especiarias"
  | "molhos_e_pastas"
  | "sais_e_acucares"
  | "caldos_e_bases"
  | "vinagres_e_azeites"

export type PadariaConfeitariaSubcategory =
  | "paes"
  | "bolos_e_tortas"
  | "biscoitos_e_salgadinhos"
  | "farinhas_e_fermentos"

export type EnlatadosConservasSubcategory = "legumes_enlatados" | "frutas_em_calda" | "pescados_enlatados" | "outros"

export type BebidasSubcategory = "sucos_e_refrigerantes" | "cafes_chas_e_achocolatados" | "aguas"

export type ProdutosLimpezaSubcategory = "limpeza_de_cozinha" | "limpeza_de_roupas" | "limpeza_geral"

export type HigienePessoalSubcategory = "higiene_bucal" | "cuidados_com_o_cabelo" | "cuidados_com_o_corpo"

export type AllSubcategories =
  | PerishableSubcategory
  | TemperoCondimentoSubcategory
  | PadariaConfeitariaSubcategory
  | EnlatadosConservasSubcategory
  | BebidasSubcategory
  | ProdutosLimpezaSubcategory
  | HigienePessoalSubcategory

export interface Food {
  id: string
  name: string
  quantity: number
  category: FoodCategory
  subcategory?: AllSubcategories
  purchase_date: string
  expiration_date: string
  in_stock: boolean
  created_at: string
  updated_at: string
}

export interface FoodInput {
  name: string
  quantity: number
  category: FoodCategory
  subcategory?: AllSubcategories
  purchaseDate?: string
  expirationDate?: string
  inStock?: boolean
}

export const SUBCATEGORY_CONFIG = {
  // Perecíveis
  carnes: {
    label: "Carnes",
    icon: "🥩",
    description: "Carne vermelha, frango, peru, bacon, etc.",
  },
  frutos_do_mar: {
    label: "Frutos do Mar",
    icon: "🐟",
    description: "Peixes, camarão, lagosta, mariscos, etc.",
  },
  laticinios: {
    label: "Laticínios",
    icon: "🥛",
    description: "Leite, manteiga, queijo, iogurte, creme, etc.",
  },
  frutas: {
    label: "Frutas",
    icon: "🍓",
    description: "Frutas sem casca dura, morangos, bananas, etc.",
  },
  vegetais: {
    label: "Vegetais",
    icon: "🥬",
    description: "Legumes frescos, folhas verdes, etc.",
  },
  ovos: {
    label: "Ovos",
    icon: "🥚",
    description: "Ovos frescos",
  },
  alimentos_cozidos: {
    label: "Alimentos Cozidos",
    icon: "🍽️",
    description: "Salmão ou outros peixes cozidos, etc.",
  },

  // Temperos e Condimentos
  ervas_secas: {
    label: "Ervas Secas",
    icon: "🌿",
    description: "Orégano, manjericão, alecrim, tomilho",
  },
  especiarias: {
    label: "Especiarias",
    icon: "🌶️",
    description: "Pimenta do reino, cominho, colorau, açafrão, canela em pó",
  },
  molhos_e_pastas: {
    label: "Molhos e Pastas",
    icon: "🍅",
    description: "Molho de tomate, mostarda, ketchup, maionese, shoyu, extrato de tomate",
  },
  sais_e_acucares: {
    label: "Sais e Açúcares",
    icon: "🧂",
    description: "Sal refinado, sal grosso, açúcar branco, açúcar mascavo",
  },
  caldos_e_bases: {
    label: "Caldos e Bases",
    icon: "🍲",
    description: "Caldo de galinha, caldo de legumes, caldo de carne",
  },
  vinagres_e_azeites: {
    label: "Vinagres e Azeites",
    icon: "🫒",
    description: "Vinagre de maçã, vinagre de álcool, azeite de oliva, óleo de soja",
  },

  // Padaria e Confeitaria
  paes: {
    label: "Pães",
    icon: "🍞",
    description: "Pão de forma, pão francês, bisnaguinha",
  },
  bolos_e_tortas: {
    label: "Bolos e Tortas",
    icon: "🎂",
    description: "Bolo pronto, massa para bolo",
  },
  biscoitos_e_salgadinhos: {
    label: "Biscoitos e Salgadinhos",
    icon: "🍪",
    description: "Biscoito cream cracker, biscoito recheado, salgadinho de milho",
  },
  farinhas_e_fermentos: {
    label: "Farinhas e Fermentos",
    icon: "🌾",
    description: "Farinha de trigo, amido de milho, fermento em pó",
  },

  // Enlatados e Conservas
  legumes_enlatados: {
    label: "Legumes Enlatados",
    icon: "🥫",
    description: "Milho, ervilha, seleta de legumes",
  },
  frutas_em_calda: {
    label: "Frutas em Calda",
    icon: "🍑",
    description: "Pêssego em calda, abacaxi em calda",
  },
  pescados_enlatados: {
    label: "Pescados Enlatados",
    icon: "🐟",
    description: "Atum, sardinha",
  },
  outros: {
    label: "Outros",
    icon: "🫙",
    description: "Azeitona, palmito",
  },

  // Bebidas
  sucos_e_refrigerantes: {
    label: "Sucos e Refrigerantes",
    icon: "🥤",
    description: "Suco de caixinha, refrigerante, água de coco",
  },
  cafes_chas_e_achocolatados: {
    label: "Cafés, Chás e Achocolatados",
    icon: "☕",
    description: "Café em pó, chá de saquinho, achocolatado em pó",
  },
  aguas: {
    label: "Águas",
    icon: "💧",
    description: "Água mineral com gás, água mineral sem gás",
  },

  // Produtos de Limpeza
  limpeza_de_cozinha: {
    label: "Limpeza de Cozinha",
    icon: "🧽",
    description: "Detergente, desengordurante, esponja de aço",
  },
  limpeza_de_roupas: {
    label: "Limpeza de Roupas",
    icon: "👕",
    description: "Sabão em pó, amaciante, alvejante",
  },
  limpeza_geral: {
    label: "Limpeza Geral",
    icon: "🧴",
    description: "Água sanitária, desinfetante, álcool",
  },

  // Higiene Pessoal
  higiene_bucal: {
    label: "Higiene Bucal",
    icon: "🦷",
    description: "Creme dental, fio dental, enxaguante bucal",
  },
  cuidados_com_o_cabelo: {
    label: "Cuidados com o Cabelo",
    icon: "💇",
    description: "Shampoo, condicionador",
  },
  cuidados_com_o_corpo: {
    label: "Cuidados com o Corpo",
    icon: "🧼",
    description: "Sabonete, desodorante, papel higiênico",
  },
} as const

export const CATEGORY_CONFIG = {
  pereciveis: {
    label: "Perecíveis",
    icon: "🥛",
    defaultDays: 3,
    color: "bg-blue-100 border-blue-200",
    hasSubcategories: true,
  },
  legumes: {
    label: "Legumes",
    icon: "🥕",
    defaultDays: 4,
    color: "bg-green-100 border-green-200",
    hasSubcategories: false,
  },
  graos: {
    label: "Grãos",
    icon: "🌾",
    defaultDays: 180,
    color: "bg-yellow-100 border-yellow-200",
    hasSubcategories: false,
  },
  temperos_condimentos: {
    label: "Temperos e Condimentos",
    icon: "🧂",
    defaultDays: 365,
    color: "bg-orange-100 border-orange-200",
    hasSubcategories: true,
  },
  padaria_confeitaria: {
    label: "Padaria e Confeitaria",
    icon: "🍞",
    defaultDays: 7,
    color: "bg-amber-100 border-amber-200",
    hasSubcategories: true,
  },
  enlatados_conservas: {
    label: "Enlatados e Conservas",
    icon: "🥫",
    defaultDays: 730,
    color: "bg-red-100 border-red-200",
    hasSubcategories: true,
  },
  bebidas: {
    label: "Bebidas",
    icon: "🥤",
    defaultDays: 90,
    color: "bg-cyan-100 border-cyan-200",
    hasSubcategories: true,
  },
  produtos_limpeza: {
    label: "Produtos de Limpeza",
    icon: "🧽",
    defaultDays: 1095,
    color: "bg-purple-100 border-purple-200",
    hasSubcategories: true,
  },
  higiene_pessoal: {
    label: "Higiene Pessoal",
    icon: "🧼",
    defaultDays: 365,
    color: "bg-pink-100 border-pink-200",
    hasSubcategories: true,
  },
} as const

// Helper function to get subcategories for a specific category
export function getSubcategoriesForCategory(category: FoodCategory): string[] {
  switch (category) {
    case "pereciveis":
      return ["carnes", "frutos_do_mar", "laticinios", "frutas", "vegetais", "ovos", "alimentos_cozidos"]
    case "temperos_condimentos":
      return [
        "ervas_secas",
        "especiarias",
        "molhos_e_pastas",
        "sais_e_acucares",
        "caldos_e_bases",
        "vinagres_e_azeites",
      ]
    case "padaria_confeitaria":
      return ["paes", "bolos_e_tortas", "biscoitos_e_salgadinhos", "farinhas_e_fermentos"]
    case "enlatados_conservas":
      return ["legumes_enlatados", "frutas_em_calda", "pescados_enlatados", "outros"]
    case "bebidas":
      return ["sucos_e_refrigerantes", "cafes_chas_e_achocolatados", "aguas"]
    case "produtos_limpeza":
      return ["limpeza_de_cozinha", "limpeza_de_roupas", "limpeza_geral"]
    case "higiene_pessoal":
      return ["higiene_bucal", "cuidados_com_o_cabelo", "cuidados_com_o_corpo"]
    default:
      return []
  }
}
