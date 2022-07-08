// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import mock from './mock.json';

// import schema from './schema';

const hello = async (event) => {
  const { pathParameters: { productId = '' } = {} } = event;
  return formatJSONResponse({
    product: findProductById(productId),
    event
  });
};

const findProductById = (id) => {
  const product = id && mock.find((p) => p.id === id);
  if (!product) {
    return [];
  }
  return product;
}

export const main = middyfy(hello);
