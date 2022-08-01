import { main } from '../handler';
import { Client } from 'pg';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('postProducts', () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new product', async () => {
    const body = {
      "id": "7162ec4b-b10c-48c5-9345-fc73348a80a8",
      "title": "New antique phone",
      "description": "phone description",
      "price": 200,
      "count": 2,
      "img": "phone-8.jpg"
    }
    const response = await main({ body: JSON.stringify(body) }, undefined);

    const bodyText = response && JSON.parse(response.body);

    expect(bodyText).toBe('OK');
  });
})
