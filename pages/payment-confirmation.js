import {
	Button,
	Heading,
	Text,
	View,
	withAuthenticator,
} from '@aws-amplify/ui-react'
import React, { useState } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { sendLocation } from '../src/graphql/mutations'
import Map from '../components/Map'
import { API } from 'aws-amplify'
import { useRouter } from 'next/router'

const fakeCoords = [
	[-90.5782219, 41.5484125],
	[-90.5804142, 41.5475641],
	[-90.5790098, 41.547084],
	[-90.579515, 41.5461143],
	[-90.5791693, 41.5459824],
	[-90.5777225, 41.545321],
	[-90.5759108, 41.5443321],
]

function PaymentConfirmationPage({ user }) {
	const router = useRouter()
	const { orderId } = router.query

	const [coordinates, setCoordinates] = useState({
		index: 0,
		coords: fakeCoords[0],
	})

	const handleLocationUpdate = () => {
		if (coordinates.index + 1 !== fakeCoords.length) {
			const newIndex = coordinates.index + 1
			const [longitude, latitude] = fakeCoords[newIndex]

			API.graphql({
				query: sendLocation,
				variables: {
					input: {
						username: user.username,
						longitude,
						latitude,
						orderId,
					},
				},
			}).then((data) => {
				console.log(data)

				setCoordinates((currState) => {
					const newIndex = currState.index + 1
					console.log(newIndex)
					return {
						index: newIndex,
						coords: fakeCoords[newIndex],
					}
				})
			})
		}
	}

	return (
		<View>
			<Heading level={3}>Thank you for your order!</Heading>
			<Text>
				We will automatically begin your order once you are 1/2 a mile away ☕
			</Text>
			<hr />
			<Heading level={4}>Simulate location changes 👇🏽</Heading>
			<Button onClick={handleLocationUpdate}>Update Location</Button>
			<Map
				customerLocation={{
					title: "Michael's Coffee Shop",
					address: 'Some place in Iowa',
					coordinates: coordinates.coords,
				}}
			/>
		</View>
	)
}

export default withAuthenticator(PaymentConfirmationPage)
