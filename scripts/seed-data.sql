-- Insert sample data
INSERT INTO foods (name, quantity, category, purchase_date, expiration_date) VALUES
('Leite Integral', 2, 'pereciveis', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days'),
('Iogurte Natural', 4, 'pereciveis', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days'),
('Cenoura', 1, 'legumes', CURRENT_DATE, CURRENT_DATE + INTERVAL '4 days'),
('Brócolis', 2, 'legumes', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days'),
('Arroz Branco', 3, 'graos', CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days'),
('Feijão Preto', 2, 'graos', CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days');
