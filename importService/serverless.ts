import type { AWS } from '@serverless/typescript';
import importProductsFile from '@functions/importProductsFile';
import importProductsFileParser from '@functions/importProductsFileParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    httpApi: {
      cors: true,
      authorizers: {
        httpApiRequestAuthorizer: {
          name: 'httpApiRequestAuthorizer',
          functionArn:
            'arn:aws:lambda:${aws:region}:${aws:accountId}:function:authorization-service-dev-basicAuthorizer',
          type: 'request',
          identitySource: '$request.header.Authorization',
          enableSimpleResponses: true,
          payloadVersion: '2.0',
        },

      },
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SQS_URL: "${env:SQS_URL}",
      APP_REGION: "${env:APP_REGION}",
    },
    // Permissions for Lambda to access S3
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: ['arn:aws:s3:::dadykin-uploaded-files'],
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: ['arn:aws:s3:::dadykin-uploaded-files/*'],
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: ['arn:aws:sqs:us-east-1:730643092676:catalogItemsQueue']
      }
    ]
  },
  // import the function via paths
  functions: { importProductsFile, importProductsFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
