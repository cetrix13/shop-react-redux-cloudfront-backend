import { middyfy } from '@libs/lambda';

const generatePolicy = (principalId, resource, effect) => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    },
  },
});

const basicAuthorizer = async (event) => {
  const { headers: { Authorization } } = event;

  let effect = 'Deny';
  const credentials = Authorization;
  
  try {
    
    if (!credentials) {
      throw new Error("Unauthorized");
    }

    const buffer = Buffer.from(credentials, 'base64');
    const [username, password] = buffer.toString('utf-8').split(':');

    const storePassword = process.env[username];

    effect = storePassword && storePassword === password ? 'Allow' : 'Deny';

  } catch(err) {
    console.error(err);
  }

  return generatePolicy(credentials, event.methodArn, effect);
};

export const main = middyfy(basicAuthorizer);
