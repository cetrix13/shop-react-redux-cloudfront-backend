import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { BUCKET_REGION, PARSED_FOLDER, PRODUCT_UPLOADED_FILES_BUCKET, UPLOADED_FOLDER } from "../../constants";

const AWS = require('aws-sdk');
const csv = require('csv-parser');

const S3 = new AWS.S3({ region: BUCKET_REGION });
const SQS = new AWS.SQS({ region: process.env.APP_REGION });

export const importProductsFileParser = async (event: {
  Records: { s3: { bucket: { name: string }; object } }[];
}) => {
  for (const record of event.Records) {

    const PARAMS = {
      Bucket: record.s3.bucket.name,
      Key: decodeURIComponent(record.s3.object.key)
    };

    const records = await new Promise<any[]>((resolve, reject) => {
      let data = [];

      S3.getObject(PARAMS)
        .createReadStream()
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('error', (err) => reject(err))
        .on('end', () => resolve(data));
    });

    console.log('records', records);

    for (const item of records) {
      await SQS
        .sendMessage({
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(item),
        })
        .promise();
    }

    const parsedFileName = record.s3.object.key.replace(UPLOADED_FOLDER, PARSED_FOLDER);

    const copiedFile = await S3.copyObject({
      Bucket: PRODUCT_UPLOADED_FILES_BUCKET,
      CopySource: `${PRODUCT_UPLOADED_FILES_BUCKET}/${record.s3.object.key}`,
      Key: parsedFileName,
    }).promise();

    if (copiedFile) {
      await S3.deleteObject({
        Bucket: PRODUCT_UPLOADED_FILES_BUCKET,
        Key: record.s3.object.key,
      }).promise();
    }
  }

  return formatJSONResponse('');
};

export const main = middyfy(importProductsFileParser);
