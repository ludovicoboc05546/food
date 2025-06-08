-- Create the foods table
CREATE TABLE IF NOT EXISTS foods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('pereciveis', 'legumes', 'graos')),
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiration_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);

-- Create an index on expiration_date for faster sorting
CREATE INDEX IF NOT EXISTS idx_foods_expiration ON foods(expiration_date);
