import { mockProducts } from 'mocks/products.mock';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { Product } from 'types/product.types';
import { ErrorResponse } from 'types/api.types';
import { StatusCodes } from 'http-status-codes';

export const getProductById: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const id = event.pathParameters?.id;

    const product: Product | undefined = mockProducts.find(
      (product) => product.id === id
    );

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
