// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const generatePolicy = (principalId, resource, effect = "Allow") => ({
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
  const { headers: Authorization } = event;

  if (!Authorization) {
    throw new Error("Unauthorized");
  }

  const effect = 'Deny';

  return generatePolicy(Authorization, event.methodArn, effect);
};

export const main = middyfy(basicAuthorizer);
