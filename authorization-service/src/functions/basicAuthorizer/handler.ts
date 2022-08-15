import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const basicAuthorizer = async (event) => {
  // TODO
};

export const main = middyfy(basicAuthorizer);
