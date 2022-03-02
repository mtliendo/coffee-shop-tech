const AWS = require('aws-sdk')
var location = new AWS.Location()
exports.handler = async (event) => {
	console.log(JSON.stringify(event, null, 2))
	const { username, longitude, latitude, orderId } = event.arguments.input

	var params = {
		TrackerName: 'coffeeShopDeviceTracker',
		Updates: [
			{
				DeviceId: username,
				Position: [longitude, latitude],
				SampleTime: new Date().toISOString(),
				Accuracy: {
					Horizontal: 5,
				},
				PositionProperties: {
					orderId,
				},
			},
		],
	}
	try {
		const data = await location.batchUpdateDevicePosition(params).promise()
	} catch (e) {
		console.log('uh oh, error', JSON.stringify(e, null, 2))
	}

	const response = {
		statusCode: 200,
		body: JSON.stringify('Hey I was triggered by eventbridge'),
	}
	return response
}
