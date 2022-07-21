import { formatJSONResponse, HttpCode } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import { getMock } from "src/libs/mock-request";

const getProductsById = async (event: Event) => {
  const { pathParameters: { productId = '' } = {} } = event;
  const product = await findProductById(productId);

  if (product) {
    return formatJSONResponse(product);
  } else {
    return formatJSONResponse('Product not found.', HttpCode.NOT_FOUND);
  }
};

const findProductById = async (id: string): Promise<Product | null> => {
  const mock = await getMock();
  const product = id && mock.find((item: Product) => item.id === id);

  if (!product) {
    return null;
  }

  return product;
}

export const main = middyfy(getProductsById);
