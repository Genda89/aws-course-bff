export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductCreate {
  title: string;
  description: string;
  price: number;
  count: number;
}

export interface PostProductSuccessResponse {
  id: string;
}

export type ProductList = Product[];
