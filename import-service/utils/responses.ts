import { StatusCodes } from 'http-status-codes';
import { ServerResponse } from '../types/api.type';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const errorResponse = (
  error: Error,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
): ServerResponse => ({
  statusCode,
  headers,
  body: JSON.stringify({
    message: error.message || 'Something went wrong',
  }),
});

export const successfulResponse = (
  body: string,
  statusCode = StatusCodes.OK
): ServerResponse => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});
