import { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import mockProducts from 'database/mocks/products.mock.json';
import { ErrorResponse } from 'types/api.types';

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const products = mockProducts;

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error: unknown) {
    let message = 'Something went wrong.';

    if (error instanceof Error) {
      message = error.message;
    }
    const errorResponse: ErrorResponse = { message };

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(errorResponse),
    };
  }
};
