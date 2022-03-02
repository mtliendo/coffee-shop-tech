import * as cdk from '@aws-cdk/core'
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper'
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref'
import * as location from '@aws-cdk/aws-location'
import * as events from '@aws-cdk/aws-events'
import * as targets from '@aws-cdk/aws-events-targets'
import * as lambda from '@aws-cdk/aws-lambda'

export class cdkStack extends cdk.Stack {
	constructor(
		scope: cdk.Construct,
		id: string,
		props?: cdk.StackProps,
		amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
	) {
		super(scope, id, props)
		/* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
		new cdk.CfnParameter(this, 'env', {
			type: 'String',
			description: 'Current Amplify CLI env name',
		})

		const cfnTracker = new location.CfnTracker(
			this,
			'coffeeShopDeviceTracker',
			{
				trackerName: 'coffeeShopDeviceTracker',
				description: 'coffeeShopDeviceTracker',
				pricingPlan: 'RequestBasedUsage', //only option available
			}
		)

		const cfnGeofenceCollection = new location.CfnGeofenceCollection(
			this,
			'coffeeShopGeofenceCollection',
			{
				collectionName: 'coffeeShopGeofenceCollection',
				description: 'coffeeShopGeofenceCollection',
				pricingPlan: 'RequestBasedUsage', //only option available
			}
		)

		new location.CfnTrackerConsumer(this, 'CoffeeShopTrackerConsumer', {
			consumerArn: cfnGeofenceCollection.attrArn,
			trackerName: cfnTracker.trackerName,
		})

		const rule = new events.Rule(this, 'coffeeCustomerEnter', {
			eventPattern: {
				source: ['aws.geo'],
				detailType: ['Location Geofence Event'],
				detail: {
					EventType: ['ENTER'],
				},
			},
		})
		const retVal: AmplifyDependentResourcesAttributes =
			AmplifyHelpers.addResourceDependency(
				this,
				amplifyResourceProps.category,
				amplifyResourceProps.resourceName,
				[{ category: 'function', resourceName: 'coffeeFromEB' }]
			)

		const coffeeOrderReceivedFunc = lambda.Function.fromFunctionArn(
			this,
			'coffeeFromEB',
			cdk.Fn.ref(retVal.function.coffeeFromEB.Arn)
		)

		rule.addTarget(new targets.LambdaFunction(coffeeOrderReceivedFunc))
	}
}
