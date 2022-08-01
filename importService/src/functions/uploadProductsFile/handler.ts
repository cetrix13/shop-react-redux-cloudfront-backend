import { formatJSONResponse, HttpCode } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const AWS = require('aws-sdk');

const uploadProductFile = async (event) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: 'dadykin-uploaded-files',
    Key: 'uploaded/sample.csv', // File name you want to save as in S3
    Body: JSON.stringify(event.body),
  };

  const s3 = new AWS.S3({ region: 'us-east-1' });

  // Uploading files to the bucket
  try {
    const res = await s3.putObject(params).promise();
    return formatJSONResponse(res);
  } catch (err) {
    console.log(err);
    return formatJSONResponse(err, HttpCode.SERVER_ERROR);
  }
};

export const main = middyfy(uploadProductFile);
