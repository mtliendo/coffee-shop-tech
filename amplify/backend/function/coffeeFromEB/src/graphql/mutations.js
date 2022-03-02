"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.updateOrder = exports.sendLocation = exports.deleteProduct = exports.deleteOrder = exports.createProduct = exports.createOrder = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const sendLocation =
/* GraphQL */
`
  mutation SendLocation($input: SendLocationInput) {
    sendLocation(input: $input)
  }
`;
exports.sendLocation = sendLocation;
const createProduct =
/* GraphQL */
`
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
exports.createProduct = createProduct;
const updateProduct =
/* GraphQL */
`
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
exports.updateProduct = updateProduct;
const deleteProduct =
/* GraphQL */
`
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
exports.deleteProduct = deleteProduct;
const createOrder =
/* GraphQL */
`
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.createOrder = createOrder;
const updateOrder =
/* GraphQL */
`
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.updateOrder = updateOrder;
const deleteOrder =
/* GraphQL */
`
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.deleteOrder = deleteOrder;