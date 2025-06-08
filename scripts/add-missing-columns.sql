-- Add subcategory column to foods table if it doesn't exist
ALTER TABLE foods ADD COLUMN IF NOT EXISTS subcategory VARCHAR(50);

-- Add in_stock column to foods table if it doesn't exist
ALTER TABLE foods ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;

-- Update existing records to be in stock by default
UPDATE foods SET in_stock = true WHERE in_stock IS NULL;

-- Make the in_stock column NOT NULL after setting default values
ALTER TABLE foods ALTER COLUMN in_stock SET NOT NULL;

-- Update existing perishable foods with default subcategories based on common names
UPDATE foods SET subcategory = 'laticinios' WHERE category = 'pereciveis' AND subcategory IS NULL AND (
  LOWER(name) LIKE '%leite%' OR 
  LOWER(name) LIKE '%iogurte%' OR 
  LOWER(name) LIKE '%queijo%' OR 
  LOWER(name) LIKE '%manteiga%'
);

UPDATE foods SET subcategory = 'carnes' WHERE category = 'pereciveis' AND subcategory IS NULL AND (
  LOWER(name) LIKE '%carne%' OR 
  LOWER(name) LIKE '%frango%' OR 
  LOWER(name) LIKE '%bacon%' OR 
  LOWER(name) LIKE '%peru%'
);

UPDATE foods SET subcategory = 'frutas' WHERE category = 'pereciveis' AND subcategory IS NULL AND (
  LOWER(name) LIKE '%banana%' OR 
  LOWER(name) LIKE '%morango%' OR 
  LOWER(name) LIKE '%maçã%' OR 
  LOWER(name) LIKE '%uva%'
);
