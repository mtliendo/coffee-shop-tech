module.exports = {
	mutation: `mutation UpdateOrder(
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
`,
	query: `query GetOrder($id: ID!) {
		getOrder(id: $id) {
			id
			products
			status
			customerName
			createdAt
			updatedAt
		}
	}
`,
}
