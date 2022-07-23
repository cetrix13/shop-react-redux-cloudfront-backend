-- DROP TABLE public.products;

CREATE TABLE public.products (
	id uuid NOT NULL,
	title text NOT NULL,
	description text NULL,
	price int4 NULL,
	img: text NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
);

-- DROP TABLE public.stocks;

CREATE TABLE public.stocks (
	product_id uuid NOT NULL,
	count int4 NULL,
	CONSTRAINT stocks_un UNIQUE (product_id)
);

-- public.stocks foreign keys

ALTER TABLE public.stocks ADD CONSTRAINT stocks_fk FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE;
