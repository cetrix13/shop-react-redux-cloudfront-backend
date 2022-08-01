import { formatJSONResponse } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import { queryAllProducts } from "../../common/queryAllProducts";

export const main = middyfy(async () => {
  const data = await queryAllProducts();
  return formatJSONResponse(data);
});
