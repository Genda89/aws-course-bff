import { describe, expect, test } from '@jest/globals';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWSMockLambdaContext from 'aws-lambda-mock-context';
import { StatusCodes } from 'http-status-codes';

import { getProductById } from 'handlers';

describe('Test getProductById lambda', () => {
  test('Successfully returns product by id', async () => {
    const event = {
      pathParameters: {
        id: 'mock002',
      } as unknown,
    } as APIGatewayProxyEvent;

    const result = (await getProductById(
      event,
      AWSMockLambdaContext(),
      () => {}
    )) as APIGatewayProxyResult;

    const parsedResult = JSON.parse(result.body);

    expect(parsedResult).toBeDefined();
    expect(result.statusCode).toEqual(StatusCodes.OK);
  });

  test('Fails to get unknown product by id', async () => {
    const event = {
      pathParameters: {
        id: 'mock-id',
      } as unknown,
    } as APIGatewayProxyEvent;

    const result = (await getProductById(
      event,
      AWSMockLambdaContext(),
      () => {}
    )) as APIGatewayProxyResult;

    const parsedResult = JSON.parse(result.body);

    expect(parsedResult?.message).toBeDefined();
    expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
  });
});
