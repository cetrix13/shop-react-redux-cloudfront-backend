import { Client } from 'pg';
import QUERIES from 'src/constants/queries';

export const queryAllProducts = async (): Promise<Product[]> => {
  const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

  let res;
  await client.connect();

  try {
    res = await client.query(QUERIES.allProducts);
  } catch (err) {
    console.log(err);
  } finally {
    await client.end();
  }


  return res?.rows;
}
