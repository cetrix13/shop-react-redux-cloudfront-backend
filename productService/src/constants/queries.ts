export default {
  allProducts: 'SELECT p.*, s.count from public.products AS p INNER JOIN public.stocks AS s ON s.product_id = p.id',
  createPost: (id: string, title: string, description: string, count: number, price: number, img: string) =>
    `BEGIN;
     INSERT INTO public.products (id, title, description, price, img) VALUES ('${id}', '${title}', '${description}', '${price}', '${img}');
     INSERT INTO public.stocks (product_id, count) VALUES ('${id}', '${count}');
     COMMIT;`
}
