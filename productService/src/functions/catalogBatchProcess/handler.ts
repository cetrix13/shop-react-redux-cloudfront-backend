import { SQSEvent } from 'aws-lambda';
import { middyfy } from 'src/libs/lambda';
import { formatJSONResponse } from "@libs/api-gateway";
import { createProduct } from "@functions/postProducts/handler";

const AWS = require('aws-sdk');

export const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    const sns = new AWS.SNS({ region: 'us-east-1' });
    const processedPhones = [];

    for (const record of event.Records) {

      const product = await createProduct({ body: record.body });

      const parsedProduct = JSON.parse(product.body);

      const msg = `Added phone "${parsedProduct.title}" with price ${parsedProduct.price}`;

      await sns
        .publish({
          Subject: 'New phone',
          TopicArn: process.env.SNS_ARN,
          Message: msg,
          MessageAttributes: {
            price: {
              DataType: 'Number',
              StringValue: parsedProduct.price.toString(),
            },
          },
        })
        .promise();

      processedPhones.push(parsedProduct.id);
    }

    const result = `Phones with following ids are added: ${processedPhones.join(', ')}`;

    return formatJSONResponse(result);
  } catch (err) {
    console.log(err);
  }
};

export const main = middyfy(catalogBatchProcess);
