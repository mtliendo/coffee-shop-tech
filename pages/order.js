import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import { onUpdateOrder } from '../src/graphql/subscriptions'
import { Heading, View } from '@aws-amplify/ui-react'

function Order() {
	const [orders, setOrders] = useState([])
	console.log(orders)
	useEffect(() => {
		const subscription = API.graphql({
			query: onUpdateOrder,
		}).subscribe({
			next: ({ provider, value }) => {
				console.log({ provider, value })
				if (value.data.onUpdateOrder.status === 'NEEDS_FULFILLED') {
					setOrders((currOrders) => {
						return [value.data.onUpdateOrder, ...currOrders]
					})
				}
			},
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return (
		<View>
			<Heading level={4}>Realtime orders will be listed below 👇🏽</Heading>
			<ul>
				{orders.map((order) => (
					<li key={order.id}>
						{order.customerName} | {order.products[0]}
					</li>
				))}
			</ul>
		</View>
	)
}

export default Order
