-- Add in_stock column to foods table
ALTER TABLE foods ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;

-- Update existing records to be in stock by default
UPDATE foods SET in_stock = true WHERE in_stock IS NULL;

-- Make the column NOT NULL after setting default values
ALTER TABLE foods ALTER COLUMN in_stock SET NOT NULL;
