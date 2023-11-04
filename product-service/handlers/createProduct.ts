import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '@interfaces/api.types';
import { ProductService } from '@services/product-service';
import {
  BASIC_ERROR_MESSAGE,
  PRODUCT_CREATED_ERROR_MESSAGE,
  PRODUCT_CREATED_SUCCESS_MESSAGE,
} from 'constants/messages';
import { CreateProductSchema } from 'schema/product-schema';

export const createProduct: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const productsService = new ProductService();
  try {
    console.log('Lambda function createProduct request', JSON.stringify(event));

    const parsedBody = JSON.parse(event.body || '{}');

    const validationResult = CreateProductSchema.validate(parsedBody);

    if (!validationResult.value) {
      const errorResponse: ErrorResponse = {
        message: 'Product data is invalid',
      };

      return {
        statusCode: StatusCodes.BAD_REQUEST,
        body: JSON.stringify(errorResponse),
      };
    }

    const productId = await productsService.createProduct(
      validationResult.value
    );

    if (!productId) {
      return {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        body: PRODUCT_CREATED_ERROR_MESSAGE,
      };
    }

    return {
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify({
        message: PRODUCT_CREATED_SUCCESS_MESSAGE,
        productId,
      }),
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
