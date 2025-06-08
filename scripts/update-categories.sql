-- Update the category constraint to include new categories
ALTER TABLE foods DROP CONSTRAINT IF EXISTS foods_category_check;
ALTER TABLE foods ADD CONSTRAINT foods_category_check 
CHECK (category IN (
  'pereciveis', 
  'legumes', 
  'graos',
  'temperos_condimentos',
  'padaria_confeitaria', 
  'enlatados_conservas',
  'bebidas',
  'produtos_limpeza',
  'higiene_pessoal'
));
