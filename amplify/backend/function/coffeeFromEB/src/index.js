/* Amplify Params - DO NOT EDIT
    API_COFFEESHOPTECH_GRAPHQLAPIENDPOINTOUTPUT
    API_COFFEESHOPTECH_GRAPHQLAPIIDOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const urlParse = require('url').URL
const fetch = require('node-fetch')
const updateOrder = require('./graphql/mutations').updateOrder

exports.handler = async (event) => {
	const appsyncUrl = process.env.API_COFFEESHOPTECH_GRAPHQLAPIENDPOINTOUTPUT
	const region = process.env.REGION

	//same as appsyncUrl but without the "https://"
	const endpoint = new urlParse(appsyncUrl).hostname
	const httpRequest = new AWS.HttpRequest(appsyncUrl, region)

	httpRequest.headers.host = endpoint
	httpRequest.headers['Content-Type'] = 'application/json'
	httpRequest.method = 'POST'

	//request to update an order with AppSync
	const updateOrderById = (id) => {
		const updateOrderBody = {
			query: updateOrder,
			operationName: 'UpdateOrder',
			variables: {
				input: {
					id,
					status: 'NEEDS_FULFILLED',
				},
			},
		}

		httpRequest.body = JSON.stringify(updateOrderBody)

		signer = new AWS.Signers.V4(httpRequest, 'appsync', true)
		signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

		const options = {
			method: httpRequest.method,
			body: httpRequest.body,
			headers: httpRequest.headers,
		}
		return fetch(appsyncUrl, options).then((res) => res.json())
	}

	//make the calls to get an order, then update it, sending the updated order back to the client
	try {
		const { orderId } = event.detail.PositionProperties
		const updatedOrder = await updateOrderById(orderId)

		return {
			statusCode: 200,
			body: updatedOrder,
		}
	} catch (e) {
		console.log({ error: e })
		return { statusCode: 404, body: { error: e } }
	}
}
