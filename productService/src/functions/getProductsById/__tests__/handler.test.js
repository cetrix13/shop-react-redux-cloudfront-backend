import { main } from '../handler';
import mock from '../../../mocks/products.json';
import { Client } from 'pg';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});


describe('getProductsById', () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('gets product by ID', async () => {
    client.query = jest.fn().mockReturnValue( { rows: mock });
    const event = {
      pathParameters: {
        productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a1'
      }
    };
    const response = await main(event, undefined);
    const product = response && JSON.parse(response.body);

    expect(product?.id).toBe(event.pathParameters.productId);
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
