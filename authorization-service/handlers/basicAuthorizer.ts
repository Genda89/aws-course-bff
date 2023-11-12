import { Effect } from '../types/api.types';
import {
  APIGatewayTokenAuthorizerHandler,
  APIGatewayAuthorizerResult,
} from 'aws-lambda';

const generatePolicy = (
  principalId: string,
  effect: Effect,
  resource: string
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = (
  event,
  context,
  returnStatus
) => {
  console.log('basicAuthorizer event ', JSON.stringify(event, null, 2));

  if (!event.authorizationToken) {
    returnStatus('Unauthorized');
    return;
  }

  try {
    const encodedCreds = event.authorizationToken.split(' ')[1];
    const plainCreds = Buffer.from(encodedCreds, 'base64')
      .toString('utf-8')
      .split(':');
    const [username, password] = plainCreds;

    const storedUserPassword = process.env[username];

    if (!storedUserPassword || storedUserPassword !== password) {
      returnStatus(
        null,
        generatePolicy(username, Effect.Deny, event.methodArn)
      );
      return;
    }

    returnStatus(null, generatePolicy(username, Effect.Allow, event.methodArn));
  } catch (error) {
    console.error('Error processing authorization:', error);
    returnStatus('Unauthorized');
  }
};
