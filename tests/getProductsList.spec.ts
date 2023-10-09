import { getProductsList } from '@functions';
import { describe, expect, test } from '@jest/globals';
import { mockProducts } from '@mocks/products.mock';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWSMockLambdaContext from 'aws-lambda-mock-context';

describe('Test getProductsList lambda', () => {
  test('Returns mock products list', async () => {
    const event = {} as APIGatewayProxyEvent;
    const result = (await getProductsList(
      event,
      AWSMockLambdaContext(),
      () => {}
    )) as APIGatewayProxyResult;

    const parsedResult = JSON.parse(result.body);
    expect(parsedResult).toStrictEqual(mockProducts);
    expect(result.statusCode).toEqual(200);
  });
});
