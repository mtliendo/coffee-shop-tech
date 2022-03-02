"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onUpdateProduct = exports.onUpdateOrder = exports.onDeleteProduct = exports.onDeleteOrder = exports.onCreateProduct = exports.onCreateOrder = void 0;

/* eslint-disable */
// this is an auto generated file. This will be overwritten
const onCreateProduct =
/* GraphQL */
`
  subscription OnCreateProduct {
    onCreateProduct {
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
exports.onCreateProduct = onCreateProduct;
const onUpdateProduct =
/* GraphQL */
`
  subscription OnUpdateProduct {
    onUpdateProduct {
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
exports.onUpdateProduct = onUpdateProduct;
const onDeleteProduct =
/* GraphQL */
`
  subscription OnDeleteProduct {
    onDeleteProduct {
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
exports.onDeleteProduct = onDeleteProduct;
const onCreateOrder =
/* GraphQL */
`
  subscription OnCreateOrder {
    onCreateOrder {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.onCreateOrder = onCreateOrder;
const onUpdateOrder =
/* GraphQL */
`
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.onUpdateOrder = onUpdateOrder;
const onDeleteOrder =
/* GraphQL */
`
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      products
      status
      customerName
      createdAt
      updatedAt
    }
  }
`;
exports.onDeleteOrder = onDeleteOrder;