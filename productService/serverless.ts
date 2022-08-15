import type { AWS } from '@serverless/typescript';
import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import postProducts from '@functions/postProducts';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: "${env:PG_HOST}",
      PG_USERNAME: "${env:PG_USERNAME}",
      PG_PASSWORD: "${env:PG_PASSWORD}",
      PG_DATABASE: "${env:PG_DATABASE}",
      SNS_ARN: "${env:SNS_ARN}",
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: [{ 'Fn::GetAtt': ['SQSQueue', 'Arn'] }],
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: [{ Ref: 'SNSTopic' }],
      },
    ]
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: { QueueName: 'catalogItemsQueue' },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: { TopicName: 'createProductTopic' },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'alexander_dadykin@epam.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
        },
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, postProducts, catalogBatchProcess },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
