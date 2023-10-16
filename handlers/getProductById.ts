import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { ErrorResponse } from 'types/api.types';
import { StatusCodes } from 'http-status-codes';
import mockedProductList from 'database/mocks/products.mock.json';
import { ProductList } from '@interfaces/product.types';

export const getProductById: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  try {
    const mockProducts: any = mockedProductList;
    const id = event.pathParameters?.id;

    const product = mockProducts.find((product: any) => product?.id === id);

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
