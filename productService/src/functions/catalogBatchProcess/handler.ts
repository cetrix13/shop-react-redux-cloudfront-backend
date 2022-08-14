import { SQSEvent } from 'aws-lambda';
// import { SNS } from 'aws-sdk';

import { middyfy } from 'src/libs/lambda';
// import { formatJSONResponse } from '@libs/api-gateway';

export const catalogBatchProcess = async (event: SQSEvent) => {
  console.log(event);
};

export const main = middyfy(catalogBatchProcess);
