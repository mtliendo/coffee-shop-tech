/**
 * This is a sample hook script created by Amplify CLI.
 * To start using this pre-push hook please change the filename:
 * pre-push.js.sample  ->  pre-push.js
 *
 * learn more: https://docs.amplify.aws/cli/usage/command-hooks
 */

const { execSync } = require('child_process')

/**
 * @param data { { amplify: { environment: string, command: string, subCommand: string, argv: string[] } } }
 * @param error { { message: string, stack: string } }
 */

const hookHandler = async (data, error) => {
	console.log('in here.')
	execSync('npm run updateAppsyncOperationsForBackendLambda')
	console.log('done')
}

const getParameters = async () => {
	const fs = require('fs')
	return JSON.parse(fs.readFileSync(0, { encoding: 'utf8' }))
}

getParameters()
	.then((event) => hookHandler(event.data, event.error))
	.catch((err) => {
		console.error(err)
		process.exitCode = 1
	})
