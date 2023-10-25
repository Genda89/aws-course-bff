import { StatusCodes } from 'http-status-codes';

export interface ServerResponse {
  statusCode: StatusCodes;
  body: string;
}
