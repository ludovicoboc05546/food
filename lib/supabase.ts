import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Food = {
  id: string
  name: string
  quantity: number
  category: "pereciveis" | "legumes" | "graos"
  subcategory?: string
  purchase_date: string
  expiration_date: string
  in_stock: boolean
  created_at: string
  updated_at: string
}
