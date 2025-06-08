-- Insert sample data for all new categories

-- Temperos e Condimentos
INSERT INTO foods (name, quantity, category, subcategory, purchase_date, expiration_date, in_stock) VALUES
('Orégano', 1, 'temperos_condimentos', 'ervas_secas', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Manjericão Seco', 1, 'temperos_condimentos', 'ervas_secas', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Pimenta do Reino', 1, 'temperos_condimentos', 'especiarias', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Cominho', 1, 'temperos_condimentos', 'especiarias', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', false),
('Molho de Tomate', 3, 'temperos_condimentos', 'molhos_e_pastas', CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days', true),
('Ketchup', 1, 'temperos_condimentos', 'molhos_e_pastas', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', true),
('Sal Refinado', 1, 'temperos_condimentos', 'sais_e_acucares', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Açúcar Cristal', 1, 'temperos_condimentos', 'sais_e_acucares', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Caldo de Galinha', 5, 'temperos_condimentos', 'caldos_e_bases', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Azeite Extra Virgem', 1, 'temperos_condimentos', 'vinagres_e_azeites', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),

-- Padaria e Confeitaria
('Pão de Forma', 1, 'padaria_confeitaria', 'paes', CURRENT_DATE, CURRENT_DATE + INTERVAL '5 days', true),
('Pão Francês', 6, 'padaria_confeitaria', 'paes', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', true),
('Bolo de Chocolate', 1, 'padaria_confeitaria', 'bolos_e_tortas', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 days', false),
('Biscoito Cream Cracker', 1, 'padaria_confeitaria', 'biscoitos_e_salgadinhos', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true),
('Biscoito Recheado', 2, 'padaria_confeitaria', 'biscoitos_e_salgadinhos', CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', true),
('Farinha de Trigo', 1, 'padaria_confeitaria', 'farinhas_e_fermentos', CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days', true),
('Fermento em Pó', 1, 'padaria_confeitaria', 'farinhas_e_fermentos', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),

-- Enlatados e Conservas
('Milho em Conserva', 2, 'enlatados_conservas', 'legumes_enlatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Ervilha em Conserva', 1, 'enlatados_conservas', 'legumes_enlatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Pêssego em Calda', 1, 'enlatados_conservas', 'frutas_em_calda', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', false),
('Atum em Lata', 3, 'enlatados_conservas', 'pescados_enlatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Sardinha em Lata', 2, 'enlatados_conservas', 'pescados_enlatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Azeitona Verde', 1, 'enlatados_conservas', 'outros', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Palmito', 1, 'enlatados_conservas', 'outros', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),

-- Bebidas
('Suco de Laranja', 2, 'bebidas', 'sucos_e_refrigerantes', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days', true),
('Refrigerante Cola', 1, 'bebidas', 'sucos_e_refrigerantes', CURRENT_DATE, CURRENT_DATE + INTERVAL '180 days', true),
('Água de Coco', 3, 'bebidas', 'sucos_e_refrigerantes', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', false),
('Café em Pó', 1, 'bebidas', 'cafes_chas_e_achocolatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Chá de Camomila', 1, 'bebidas', 'cafes_chas_e_achocolatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Achocolatado em Pó', 1, 'bebidas', 'cafes_chas_e_achocolatados', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Água Mineral', 6, 'bebidas', 'aguas', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),

-- Produtos de Limpeza
('Detergente', 2, 'produtos_limpeza', 'limpeza_de_cozinha', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Desengordurante', 1, 'produtos_limpeza', 'limpeza_de_cozinha', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Esponja de Aço', 5, 'produtos_limpeza', 'limpeza_de_cozinha', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Sabão em Pó', 1, 'produtos_limpeza', 'limpeza_de_roupas', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Amaciante', 1, 'produtos_limpeza', 'limpeza_de_roupas', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', false),
('Água Sanitária', 1, 'produtos_limpeza', 'limpeza_geral', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Desinfetante', 1, 'produtos_limpeza', 'limpeza_geral', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Álcool 70%', 2, 'produtos_limpeza', 'limpeza_geral', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),

-- Higiene Pessoal
('Creme Dental', 2, 'higiene_pessoal', 'higiene_bucal', CURRENT_DATE, CURRENT_DATE + INTERVAL '730 days', true),
('Fio Dental', 1, 'higiene_pessoal', 'higiene_bucal', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Enxaguante Bucal', 1, 'higiene_pessoal', 'higiene_bucal', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', false),
('Shampoo', 1, 'higiene_pessoal', 'cuidados_com_o_cabelo', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Condicionador', 1, 'higiene_pessoal', 'cuidados_com_o_cabelo', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Sabonete', 3, 'higiene_pessoal', 'cuidados_com_o_corpo', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true),
('Desodorante', 1, 'higiene_pessoal', 'cuidados_com_o_corpo', CURRENT_DATE, CURRENT_DATE + INTERVAL '365 days', true),
('Papel Higiênico', 12, 'higiene_pessoal', 'cuidados_com_o_corpo', CURRENT_DATE, CURRENT_DATE + INTERVAL '1095 days', true);
