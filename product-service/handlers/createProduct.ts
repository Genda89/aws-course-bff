import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import { docClient } from './docClient';
import { ErrorResponse } from '@interfaces/api.types';

export async function createProduct(event: APIGatewayProxyEvent) {
  try {
    const newProduct = event.body && JSON.parse(event.body);
    const { title, description, price, count } = newProduct;
    const id = uuid();
    const productCommand = new PutCommand({
      TableName: 'products',
      Item: {
        id,
        title,
        description,
        price,
      },
    });

    const stockCommand = new PutCommand({
      TableName: 'stocks',
      Item: {
        product_id: id,
        count,
      },
    });

    await docClient.send(productCommand);
    await docClient.send(stockCommand);

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify({
        id,
      }),
    };
  } catch (error) {
    let message = 'Internal error with wrtiting to DB';

    if (error instanceof Error) {
      message = error.message;
    }

    const errorResponse: ErrorResponse = { message };
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(errorResponse),
    };
  }
}
