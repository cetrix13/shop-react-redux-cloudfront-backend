import { formatJSONResponse, HttpCode } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BUCKET_REGION, PRODUCT_UPLOADED_FILES_BUCKET, UPLOADED_FOLDER } from "../../constants";

const AWS = require('aws-sdk');

export const importProductsFile = async (event) => {
  const { name } = event.queryStringParameters || {};

  const CATALOG_PATH = `${UPLOADED_FOLDER}/${decodeURIComponent(name)}`;

  const S3 = new AWS.S3({ region: BUCKET_REGION });

  const PARAMS = {
    ContentType: 'text/csv',
    Key: CATALOG_PATH,
    Bucket: PRODUCT_UPLOADED_FILES_BUCKET,
    Expires: 30
  };

  try {
    const url = S3.getSignedUrl('putObject', PARAMS);
    return formatJSONResponse(url);
  } catch (e) {
    return formatJSONResponse(e, HttpCode.SERVER_ERROR);
  }
};

export const main = middyfy(importProductsFile);
