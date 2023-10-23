// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "aws-course-bff",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "$ref": "#/definitions/ProductList"
            }
          },
          "500": {
            "description": "Something went wrong",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      },
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Body required in the request",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ProductCreate"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        }
      }
    },
    "/products/{id}": {
      "get": {
        "summary": "getProductById",
        "description": "",
        "operationId": "getProductById.get./products/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "404": {
            "description": "Product not found",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          },
          "500": {
            "description": "Something went wrong",
            "schema": {
              "$ref": "#/definitions/ErrorResponse"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "id": {
          "title": "Product.id",
          "type": "string"
        },
        "title": {
          "title": "Product.title",
          "type": "string"
        },
        "description": {
          "title": "Product.description",
          "type": "string"
        },
        "price": {
          "title": "Product.price",
          "type": "number"
        }
      },
      "required": [
        "id",
        "title",
        "description",
        "price"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "ProductCreate": {
      "properties": {
        "title": {
          "title": "ProductCreate.title",
          "type": "string"
        },
        "description": {
          "title": "ProductCreate.description",
          "type": "string"
        },
        "price": {
          "title": "ProductCreate.price",
          "type": "number"
        },
        "count": {
          "title": "ProductCreate.count",
          "type": "number"
        }
      },
      "required": [
        "title",
        "description",
        "price",
        "count"
      ],
      "additionalProperties": false,
      "title": "ProductCreate",
      "type": "object"
    },
    "PostProductSuccessResponse": {
      "properties": {
        "id": {
          "title": "PostProductSuccessResponse.id",
          "type": "string"
        }
      },
      "required": [
        "id"
      ],
      "additionalProperties": false,
      "title": "PostProductSuccessResponse",
      "type": "object"
    },
    "ProductList": {
      "items": {
        "$ref": "#/definitions/Product",
        "title": "ProductList.[]"
      },
      "title": "ProductList.[]",
      "type": "array"
    },
    "ErrorResponse": {
      "properties": {
        "message": {
          "title": "ErrorResponse.message",
          "type": "string"
        }
      },
      "required": [
        "message"
      ],
      "additionalProperties": false,
      "title": "ErrorResponse",
      "type": "object"
    },
    "Stock": {
      "properties": {
        "product_id": {
          "title": "Stock.product_id",
          "type": "string"
        },
        "count": {
          "title": "Stock.count",
          "type": "number"
        }
      },
      "required": [
        "product_id",
        "count"
      ],
      "additionalProperties": false,
      "title": "Stock",
      "type": "object"
    }
  },
  "securityDefinitions": {}
};