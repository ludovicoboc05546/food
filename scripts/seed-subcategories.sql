-- Clear existing data and insert new examples with subcategories
DELETE FROM foods;

-- Insert sample data with subcategories
INSERT INTO foods (name, quantity, category, subcategory, purchase_date, expiration_date) VALUES
-- Laticínios
('Leite Integral', 2, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days'),
('Iogurte Natural', 4, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days'),
('Queijo Mussarela', 1, 'pereciveis', 'laticinios', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days'),

-- Carnes
('Peito de Frango', 1, 'pereciveis', 'carnes', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days'),
('Carne Moída', 500, 'pereciveis', 'carnes', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days'),

-- Frutas
('Morangos', 1, 'pereciveis', 'frutas', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days'),
('Bananas', 6, 'pereciveis', 'frutas', CURRENT_DATE, CURRENT_DATE + INTERVAL '4 days'),

-- Vegetais
('Alface', 1, 'pereciveis', 'vegetais', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days'),
('Tomates', 4, 'pereciveis', 'vegetais', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days'),

-- Ovos
('Ovos Brancos', 12, 'pereciveis', 'ovos', CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days'),

-- Frutos do Mar
('Salmão Fresco', 1, 'pereciveis', 'frutos_do_mar', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days'),

-- Alimentos Cozidos
('Salmão Grelhado', 2, 'pereciveis', 'alimentos_cozidos', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days'),

-- Legumes (sem subcategoria)
('Cenoura', 1, 'legumes', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '4 days'),
('Brócolis', 2, 'legumes', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days'),

-- Grãos (sem subcategoria)
('Arroz Branco', 3, 'graos', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days'),
('Feijão Preto', 2, 'graos', NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days');
