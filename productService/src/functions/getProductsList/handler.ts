import { formatJSONResponse } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import mock from 'src/mocks/products.json';

export const main = middyfy(() => formatJSONResponse(mock));
