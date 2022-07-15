TRUNCATE table public.products;
TRUNCATE table public.stocks;

INSERT INTO public.products (id, title, description, price) VALUES
('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'Rotary Dial Phone', 'Short Product Description1', 200),
('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 'Rotating Mechanical Phone', 'Short Product Description2', 100),
('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 'Brass Phone', 'Short Product Description3', 230),
('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'Home Phone of 1930s', 'Short Product Description7', 150),
('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Classic Rotating Dial Phone', 'Short Product Description5', 23),
('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'Wood Wall Phone', 'Short Product Description4', 150);

INSERT INTO public.stocks (product_id, count) VALUES
('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 5),
('7567ec4b-b10c-48c5-9345-fc73c48a80a0', 2),
('7567ec4b-b10c-48c5-9345-fc73c48a80a2', 4),
('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 12),
('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 7),
('7567ec4b-b10c-48c5-9345-fc73348a80a1', 7);
