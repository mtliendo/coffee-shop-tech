import {
	Button,
	Card,
	Flex,
	Image,
	Text,
	View,
	withAuthenticator,
} from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { createOrder } from '../src/graphql/mutations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import staticProducts from '../src/products'

function Home({ signOut, user }) {
	console.log(user)
	const router = useRouter()
	const [products, setProducts] = useState([])

	useEffect(() => {
		setProducts(staticProducts)
	}, [])

	const handleClick = async (product) => {
		console.log(`${user.attributes.name} (${user.attributes.nickname})`)
		const data = await API.graphql({
			query: createOrder,
			variables: {
				input: {
					products: [product.name],
					status: 'PROCESSED',
					customerName: `${user.attributes.name} (${user.attributes.nickname})`,
				},
			},
		})

		router.push(`/payment-confirmation?orderId=${data.data.createOrder.id}`)
	}

	return (
		<View>
			<Button onClick={signOut}>Sign Out</Button>
			<Flex direction={'column'}>
				{products.map((product) => {
					return (
						<Card key={product.id} width={'300px'} border="1px solid black">
							<Flex direction={'column'}>
								<Image objectFit={'cover'} height={'300px'} src={product.src} />
								<Flex justifyContent={'space-around'}>
									<Text>$ {Number(product.price).toFixed(2)}</Text>
									<Text>{product.name}</Text>
								</Flex>
								<Button
									onClick={() => handleClick(product)}
									variation="primary"
								>
									Buy
								</Button>
							</Flex>
						</Card>
					)
				})}
			</Flex>
		</View>
	)
}

export default withAuthenticator(Home, {
	signUpAttributes: ['name', 'nickname'],
})
