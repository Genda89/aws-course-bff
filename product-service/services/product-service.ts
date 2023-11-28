import { Product, ProductCreate } from '@interfaces/product.types';
import { ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from 'database/docClient';
import { TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

import { v4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Stock } from '@interfaces/stock.types';

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;

    const scanProducts = new ScanCommand({ TableName: PRODUCTS_TABLE });
    const scanStocks = new ScanCommand({ TableName: STOCKS_TABLE });

    const [basicProducts, stocks] = await Promise.all([
      docClient
        .send(scanProducts)
        .then((res) => res.Items as unknown as Product[]),
      docClient.send(scanStocks).then((res) => res.Items as unknown as Stock[]),
    ]);

    return basicProducts?.map((basicProduct) => ({
      ...basicProduct,
      count:
        stocks?.find((stock) => stock.product_id === basicProduct.id)?.count ??
        0,
    }));
  }

  async getProductById(productId: string): Promise<ProductCreate | null> {
    const { PRODUCTS_TABLE, STOCKS_TABLE } = process.env;

    const productQuery = new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: { id: productId },
    });

    const stockQuery = new GetCommand({
      TableName: STOCKS_TABLE,
      Key: { product_id: productId },
    });

    const [basicProduct, stock] = await Promise.all([
      docClient.send(productQuery).then((res) => res.Item as Product),
      docClient.send(stockQuery).then((res) => res.Item as Stock),
    ]);

    if (!basicProduct) {
      return null;
    }

    return {
      ...basicProduct,
      count: stock?.count ?? 0,
    };
  }

  async createProduct({
    count,
    description,
    price,
    title,
  }: ProductCreate): Promise<string | null> {
    const { PRODUCTS_TABLE = '', STOCKS_TABLE = '' } = process.env;

    const productId = v4();

    const command = new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: PRODUCTS_TABLE,
            Item: marshall({
              id: productId,
              description,
              title,
              price,
            }),
          },
        },
        {
          Put: {
            TableName: STOCKS_TABLE,
            Item: marshall({
              product_id: productId,
              count,
            }),
          },
        },
      ],
    });

    const transactionResponse = await docClient.send(command);

    if (transactionResponse.$metadata.httpStatusCode !== StatusCodes.OK) {
      return null;
    }

    return productId;
  }
}
