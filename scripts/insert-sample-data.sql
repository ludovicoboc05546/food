-- Clear existing data first
DELETE FROM foods;

-- Insert sample data with subcategories and stock status
INSERT INTO foods (name, quantity, category, subcategory, purchase_date, expiration_date, in_stock) VALUES
-- Laticínios
('Leite Integral', 2, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', true),
('Iogurte Natural', 4, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', true),
('Queijo Mussarela', 1, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', true),
('Queijo Parmesão', 1, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '10 days', true),

-- Carnes
('Peito de Frango', 1, 'pereciveis', 'carnes', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', true),
('Carne Moída', 500, 'pereciveis', 'carnes', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', true),
('Presunto', 200, 'pereciveis', 'carnes', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', true),

-- Frutas
('Morangos', 1, 'pereciveis', 'frutas', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', true),
('Bananas', 6, 'pereciveis', 'frutas', CURRENT_DATE, CURRENT_DATE + INTERVAL '4 days', true),
('Maçãs', 6, 'pereciveis', 'frutas', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', false),

-- Vegetais
('Alface', 1, 'pereciveis', 'vegetais', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', true),
('Tomates', 4, 'pereciveis', 'vegetais', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', true),

-- Ovos
('Ovos Brancos', 12, 'pereciveis', 'ovos', CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days', true),

-- Frutos do Mar
('Salmão Fresco', 1, 'pereciveis', 'frutos_do_mar', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', true),
('Camarão Congelado', 500, 'pereciveis', 'frutos_do_mar', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', false),

-- Alimentos Cozidos
('Salmão Grelhado', 2, 'pereciveis', 'alimentos_cozidos', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', false),

-- Legumes (sem subcategoria)
('Cenoura', 1, 'legumes', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '4 days', true),
('Brócolis', 2, 'legumes', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', true),

-- Grãos (sem subcategoria)
('Arroz Branco', 3, 'graos', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days', true),
('Feijão Preto', 2, 'graos', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days', false);
