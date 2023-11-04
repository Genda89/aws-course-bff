import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { ErrorResponse } from '@interfaces/api.types';
import {
  BASIC_ERROR_MESSAGE,
  GET_PRODUCTS_ERROR_MESSAGE,
} from 'constants/messages';
import { ProductService } from '@services/product-service';

export const getProductsList: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const productsService = new ProductService();
  try {
    console.log(
      'Lambda function getProductsList request',
      JSON.stringify(event)
    );

    const products = await productsService.getAllProducts();

    if (!products) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: GET_PRODUCTS_ERROR_MESSAGE,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error: unknown) {
    let message = BASIC_ERROR_MESSAGE;

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
