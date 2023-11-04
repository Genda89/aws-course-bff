import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

import items from './mocks/products.mock.json';
import { ProductList } from '@interfaces/product.types';
import { Stock } from '@interfaces/stock.types';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocument.from(client);
const products: ProductList = [];
const stocks: Stock[] = [];

items.forEach((item) => {
  const id = uuid();

  products.push({
    id,
    title: item.title,
    description: item.description,
    price: item.price,
  });

  stocks.push({
    product_id: id,
    count: item.count,
  });
});

products.forEach(async (product) => {
  await docClient.put({
    TableName: 'products',
    Item: product,
  });
});

stocks.forEach(async (stock) => {
  await docClient.put({
    TableName: 'stocks',
    Item: stock,
  });
});

console.log('Tables are populated.');
