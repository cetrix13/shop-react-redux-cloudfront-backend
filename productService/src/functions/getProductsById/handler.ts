import { formatJSONResponse } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import mock from 'src/mocks/products.json';

const getProductsById = (event: Event) => {
  const { pathParameters: { productId = '' } = {} } = event;
  const product = findProductById(productId);
  return formatJSONResponse(product);
};

const findProductById = (id: string): Product | string => {
  const product = id && mock.find((item: Product) => item.id === id);

  if (!product) {
    return 'Product not found.';
  }

  return product;
}

export const main = middyfy(getProductsById);
