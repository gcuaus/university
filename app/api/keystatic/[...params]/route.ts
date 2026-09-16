import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

const hasGitHubAuth = Boolean(
	process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
		process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
		process.env.KEYSTATIC_SECRET,
);

const keystaticHandler = hasGitHubAuth ? makeRouteHandler({ config }) : null;

function missingConfigurationResponse() {
	return Response.json(
		{ error: 'Keystatic GitHub authentication is not configured.' },
		{ status: 503 },
	);
}

export async function GET(request: Request) {
	return keystaticHandler?.GET(request) ?? missingConfigurationResponse();
}

export async function POST(request: Request) {
	return keystaticHandler?.POST(request) ?? missingConfigurationResponse();
}