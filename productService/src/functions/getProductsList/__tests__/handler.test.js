import { main } from '../handler';

describe('getProductsList', () => {
  it('gets all products', async () => {
      const response = await main({}, undefined);

      const products = response && JSON.parse(response.body);

      expect(products.length).toBe(8);
  });
})
