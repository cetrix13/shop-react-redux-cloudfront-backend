import { formatJSONResponse } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import { queryAllProducts } from "../../common/queryAllProducts";

export const main = middyfy(async () => {
  const mock = await queryAllProducts();
  return formatJSONResponse(mock);
});
