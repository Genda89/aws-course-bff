import { APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { mockProducts } from 'mocks/products.mock';
import { ErrorResponse } from 'types/api.types';
import { ProductList } from 'types/product.types';

export const getProductsList: APIGatewayProxyHandler = async () => {
  try {
    const products: ProductList = mockProducts;

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
