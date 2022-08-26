import AWS from 'aws-sdk';

export const addEventToQueue = (params, region = 'us-east-1') => {
    const SNS = new AWS.SNS({ region });
    return SNS.publish(params).promise();
};
