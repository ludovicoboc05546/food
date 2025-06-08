-- Drop and recreate the foods table with all necessary columns
DROP TABLE IF EXISTS foods;

CREATE TABLE foods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('pereciveis', 'legumes', 'graos')),
  subcategory VARCHAR(50),
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiration_date DATE NOT NULL,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);
CREATE INDEX IF NOT EXISTS idx_foods_expiration ON foods(expiration_date);
CREATE INDEX IF NOT EXISTS idx_foods_in_stock ON foods(in_stock);
CREATE INDEX IF NOT EXISTS idx_foods_subcategory ON foods(subcategory);
