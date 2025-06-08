-- Verify the current structure of the foods table
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'foods' 
ORDER BY ordinal_position;

-- Show sample data to verify everything is working
SELECT id, name, category, subcategory, in_stock, purchase_date, expiration_date
FROM foods 
LIMIT 5;
