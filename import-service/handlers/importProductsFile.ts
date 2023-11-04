import { S3 } from 'aws-sdk';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { errorResponse, successfulResponse } from 'utils/responses';
import { StatusCodes } from 'http-status-codes';

const BUCKET = 'aws-course-bff-uploaded';
const s3 = new S3({ region: 'eu-west-1' });

export const importProductsFile = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const fileName = event.queryStringParameters?.name;

  if (!fileName) {
    return errorResponse(
      { message: 'Query parameter "name" is missing', name: 'NotFoundError' },
      StatusCodes.NOT_FOUND
    );
  }

  const paramsUploaded = {
    Bucket: BUCKET,
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv',
  };
  const signedURL = await s3.getSignedUrlPromise('putObject', paramsUploaded);

  return successfulResponse(signedURL);
};
