import z from "zod";
import {
	ContributionsSchema,
	defaultContributions,
	type Contributions,
} from "./schemas";

const DEFAULT_GITHUB_USERNAME = "PanPanFR";
const DEFAULT_GITHUB_LINK = `https://github.com/${DEFAULT_GITHUB_USERNAME}`;
const DEFAULT_GITHUB_API_HOST = "https://github-stats-dusky-mu.vercel.app";

function resolveGithubUsername(rawLink: string | undefined): string {
	const candidateLink = rawLink?.trim() ? rawLink.trim() : DEFAULT_GITHUB_LINK;
	const ensureProtocol = (link: string) => {
		if (/^https?:\/\//i.test(link)) {
			return link;
		}
		return `https://${link}`;
	};

	try {
		const parsed = new URL(ensureProtocol(candidateLink));
		const segment = parsed.pathname.split("/").filter(Boolean)[0];
		if (segment) {
			return segment;
		}
	} catch {
		// Ignore parsing errors and try fallback logic below
	}

	const fallbackSegment = candidateLink.split("/").filter(Boolean).pop();
	return fallbackSegment || DEFAULT_GITHUB_USERNAME;
}

function resolveGithubApiHost(rawHost: string | undefined): string {
	if (!rawHost || !rawHost.trim()) {
		return DEFAULT_GITHUB_API_HOST;
	}

	const trimmedHost = rawHost.trim();
	const normalisedHost = /^https?:\/\//i.test(trimmedHost)
		? trimmedHost
		: `https://${trimmedHost}`;

	try {
		const parsed = new URL(normalisedHost);
		return `${parsed.origin}${parsed.pathname.replace(/\/$/, "")}`;
	} catch {
		return DEFAULT_GITHUB_API_HOST;
	}
}

async function fetchGithubContributions(): Promise<unknown> {
	const username = resolveGithubUsername(import.meta.env.VITE_GITHUB_LINK);
	const baseHost = resolveGithubApiHost(import.meta.env.VITE_GITHUB_API_LINK);
	const basePath = `/api/portfolio-data`;
	const queryParams = new URLSearchParams({
		username,
		langs_count: import.meta.env.VITE_CONTRIBUTIONS_LANGS_COUNT || "10",
		include_all_commits:
			import.meta.env.VITE_CONTRIBUTIONS_INCLUDE_ALL_COMMITS || "false",
	});

	const response = await fetch(`${baseHost}${basePath}?${queryParams.toString()}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
}

export async function fetchContributions(): Promise<Contributions> {
	const data = await fetchGithubContributions();
	const validResult = ContributionsSchema.safeParse(data);
	if (!validResult.success) {
		console.error(
			"Invalid contribution data received from source:",
			z.prettifyError(validResult.error),
		);
		return defaultContributions;
	}

	return validResult.data;
}
