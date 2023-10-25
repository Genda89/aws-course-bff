import { S3 } from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { successfulResponse } from 'utils/responses';
import csv from 'csv-parser';

const s3 = new S3({ region: 'eu-west-1' });

export const importFileParser = async (event: S3Event) => {
  const results: any[] = [];
  let statusCode = 500;
  let resMessage = 'Somethins went wrong in importFileParser lambda.';
  const bucket = event.Records[0].s3.bucket.name;
  const keyUploaded = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  );

  const paramsUploaded = {
    Bucket: bucket,
    Key: keyUploaded,
  };

  const paramsParsed = {
    Bucket: bucket,
    CopySource: `${bucket}/${keyUploaded}`,
    Key: keyUploaded.split('uploaded').join('parsed'),
  };

  console.log(paramsUploaded, paramsParsed, event.Records[0].s3.object.key);

  const objectStream = s3.getObject(paramsUploaded).createReadStream();

  try {
    await objectStream
      .pipe(csv())
      .on('data', (data: any) => {
        console.log('chunk data after csv(): ', data);
        results.push(data);
      })
      .on('end', () => {
        statusCode = 200;
        resMessage = 'File read OK';
        console.log('results: ', results);
      })
      .on('error', (error: any) => {
        console.error(error);
        statusCode = 500;
        resMessage = 'Something went wrong inside S3 Readable Stream';
      });
    await s3.copyObject(paramsParsed);
    await s3.deleteObject(paramsUploaded);
  } catch (err) {
    console.error(err);
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    resMessage = `Error getting object ${keyUploaded} from bucket ${bucket}.`;
    throw new Error(resMessage);
  }

  return successfulResponse(
    JSON.stringify({
      resMessage,
      results,
    }),
    statusCode
  );
};
