// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import mock from './mock.json';

// import schema from './schema';

const hello = async () => {
  return formatJSONResponse({
    products: mock,
  });
};

export const main = middyfy(hello);
