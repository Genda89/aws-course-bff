import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { ErrorResponse } from 'types/api.types';
import { StatusCodes } from 'http-status-codes';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { docClient } from './docClient';

export const getProductById: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const id = event.pathParameters?.id;

    const stocks: DocumentClient.ScanOutput = await docClient.send(
      new ScanCommand({
        TableName: 'stocks',
        ConsistentRead: true,
      })
    );

    const products: DocumentClient.ScanOutput = await docClient.send(
      new ScanCommand({
        TableName: 'products',
        ConsistentRead: true,
      })
    );

    if (!stocks.Items || !products.Items) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }
    const stockItems = stocks.Items.map((item) => unmarshall(item));

    const result = products.Items.map((item) => {
      const product = unmarshall(item);
      const stocksInfo = stockItems.find(
        (item) => item.product_id === product.id
      );

      return {
        ...product,
        count: stocksInfo ? stocksInfo.count : 0,
      };
    });

    const product = result.find((product: any) => product?.id === id);

    if (product) {
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    }

    const errorResPonse: ErrorResponse = {
      message: `Product with id:${id} not found.`,
    };

    return {
      statusCode: StatusCodes.NOT_FOUND,
      body: JSON.stringify(errorResPonse),
    };
  } catch (error: unknown) {
    let message = 'Something went wrong.';

    if (error instanceof Error) {
      message = error.message;
    }

    const errorResponse: ErrorResponse = { message };
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: JSON.stringify(errorResponse),
    };
  }
};
