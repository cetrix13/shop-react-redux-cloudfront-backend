import { formatJSONResponse } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import { getMock } from 'src/libs/mock-request';

export const main = middyfy(async () => {
  const mock = await getMock();
  return formatJSONResponse(mock);
});
