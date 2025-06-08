-- Add subcategory column to foods table
ALTER TABLE foods ADD COLUMN IF NOT EXISTS subcategory VARCHAR(50);

-- Update existing perishable foods with default subcategories based on common names
UPDATE foods SET subcategory = 'laticinios' WHERE category = 'pereciveis' AND (
  LOWER(name) LIKE '%leite%' OR 
  LOWER(name) LIKE '%iogurte%' OR 
  LOWER(name) LIKE '%queijo%' OR 
  LOWER(name) LIKE '%manteiga%'
);

UPDATE foods SET subcategory = 'carnes' WHERE category = 'pereciveis' AND (
  LOWER(name) LIKE '%carne%' OR 
  LOWER(name) LIKE '%frango%' OR 
  LOWER(name) LIKE '%bacon%' OR 
  LOWER(name) LIKE '%peru%'
);

UPDATE foods SET subcategory = 'frutas' WHERE category = 'pereciveis' AND (
  LOWER(name) LIKE '%banana%' OR 
  LOWER(name) LIKE '%morango%' OR 
  LOWER(name) LIKE '%maçã%' OR 
  LOWER(name) LIKE '%uva%'
);
