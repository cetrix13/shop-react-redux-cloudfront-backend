import { formatJSONResponse, HttpCode } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import { queryAllProducts } from 'src/common/queryAllProducts';

const getProductsById = async ({ pathParameters: { productId = '' } = {} }) => {
  const products = await queryAllProducts();

  const product = productId && products && products.find((p) => p.id === productId);

  if (product) {
    return formatJSONResponse(product);
  } else {
    return formatJSONResponse('Product not found.', HttpCode.NOT_FOUND);
  }
};

export const main = middyfy(getProductsById);
