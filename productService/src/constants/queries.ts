export default {
  allProducts: 'SELECT p.*, s.count from public.products AS p INNER JOIN public.stocks AS s ON s.product_id = p.id',
}
