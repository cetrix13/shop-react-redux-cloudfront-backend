import { main } from '../handler';

describe('getProductsById', () => {
  it('gets product by ID', async () => {
      const event = {
        pathParameters: {
            productId: '7567ec4b-b10c-45c5-9345-fc73c48a80a1'
          }
      };
      const response = await main(event, undefined);
      const product = response && JSON.parse(response.body);

      expect(product.id).toBe(event.pathParameters.productId);
  });

  it('finds no product by ID', async () => {
      const event = {
        pathParameters: {
            productId: 'wrong_product_id'
          }
      };
      const response = await main(event, undefined);
      const product = response && JSON.parse(response.body);

      expect(product).toContain('Product not found');
  });
})
