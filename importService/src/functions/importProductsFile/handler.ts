import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const importProductsFile = async (event) => {
  const { queryStringParameters: { name }, headers: { Host } } = event;

  const signedURL = `https://${Host}/dev/uploaded/${name}`;

  return formatJSONResponse(signedURL);
};

export const main = middyfy(importProductsFile);
