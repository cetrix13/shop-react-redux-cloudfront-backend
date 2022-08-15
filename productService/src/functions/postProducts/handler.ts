import { formatJSONResponse, HttpCode } from 'src/libs/api-gateway';
import { middyfy } from 'src/libs/lambda';
import { Client } from 'pg';
import QUERIES from 'src/constants/queries';

export const createProduct = async ({ body }) => {
  const { id, title, description, price, count, img } = JSON.parse(body);

  const client = new Client({
    host: process.env.PG_HOST,
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });

  await client.connect();

  try {
    await client.query(QUERIES.createPost(id, title, description, count, price, img));
  } catch (err) {
    console.log(err);
    return formatJSONResponse('Server error', HttpCode.SERVER_ERROR);
  } finally {
    await client.end();
  }

  const newProduct = { id, title, description, price, count, img };

  return formatJSONResponse(newProduct);
}

export const main = middyfy(createProduct);
