-- Update some items to be out of stock for demonstration
UPDATE foods SET in_stock = false WHERE name IN ('Salmão Grelhado', 'Feijão Preto');

-- Add some new items with mixed stock status
INSERT INTO foods (name, quantity, category, subcategory, purchase_date, expiration_date, in_stock) VALUES
('Presunto', 200, 'pereciveis', 'carnes', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', true),
('Camarão Congelado', 500, 'pereciveis', 'frutos_do_mar', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', false),
('Queijo Parmesão', 1, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '10 days', true),
('Maçãs', 6, 'pereciveis', 'frutas', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', false);
