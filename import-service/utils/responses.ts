import { StatusCodes } from 'http-status-codes';
import { ServerResponse } from '../types/api.type';

export const errorResponse = (
  error: Error,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
): ServerResponse => ({
  statusCode,
  body: JSON.stringify({
    message: error.message || 'Something went wrong',
  }),
});

export const successfulResponse = (
  body: string,
  statusCode = StatusCodes.OK
): ServerResponse => ({
  statusCode,
  body: JSON.stringify(body),
});
