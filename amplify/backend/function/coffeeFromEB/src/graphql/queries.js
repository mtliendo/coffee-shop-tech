"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listProducts = exports.listOrders = exports.getProduct = exports.getOrder = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const getProduct =
/* GraphQL */
`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      src
      tester
      createdAt
      updatedAt
    }
  }
`;
exports.getProduct = getProduct;
const listProducts =
/* GraphQL */
`
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        src
        tester
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
exports.listProducts = listProducts;
const getOrder =
/* GraphQL */
`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.getOrder = getOrder;
const listOrders =
/* GraphQL */
`
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        products
        status
        customerName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
exports.listOrders = listOrders;