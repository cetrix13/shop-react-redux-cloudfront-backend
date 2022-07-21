import mockData from 'src/mocks/products.json';

// Simulate API request
export const getMock = (timeout = 1000): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, timeout);
  });
}
