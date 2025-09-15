import Papa from "papaparse";
import z from "zod";
import {
	AchievementSchema,
	BaseAchievementSchema,
	BaseProjectSchema,
	ProjectSchema,
	SupportedLangSchema,
	type Achievement,
	type Project,
	type SupportedLang,
	type TechStack,
	type Translations,
} from "./schemas";

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
export function fetchData(sheetName: string): Promise<Record<string, unknown>[]> {
	const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
	return new Promise((resolve, reject) => {
		Papa.parse(sheetUrl, {
			download: true,
			header: true,
			complete: (results) => {
				resolve(results.data as Record<string, unknown>[]);
			},
			error: (error) => {
				console.error(`Error fetching sheet "${sheetName}":`, error);
				reject(error);
			},
		});
	});
}

const TranslationFromSourceSchema = z.array(
	z.object({
		group: z.string(),
		key: z.string(),
		value: z.string(),
	}),
);

export async function fetchTranslations(
	sheetName: string,
): Promise<Translations> {
	const data = await fetchData(sheetName);

	const validationResult = TranslationFromSourceSchema.safeParse(data);
	if (!validationResult.success) {
		console.error(
			"Invalid translation data received from source:",
			z.prettifyError(validationResult.error),
		);
		return {};
	}

	return validationResult.data.reduce((acc, item) => {
		const { group, key, value } = item;

		if (!acc[group]) {
			// If the group doesn't exist, create it
			acc[group] = {};
		}

		acc[group][key] = value;
		return acc;
	}, {} as Translations);
}

export async function fetchSupportedLangs(): Promise<SupportedLang[]> {
	const data = await fetchData("supportedLangs");
	const validResult = z.array(SupportedLangSchema).safeParse(data);

	if (!validResult.success) {
		console.error(
			"Invalid supported lang data received from source:",
			z.prettifyError(validResult.error),
		);
		return [];
	}

	return validResult.data;
}

const ParseProjectSchema = z.array(
	BaseProjectSchema.omit({
		tech_stack: true,
		images: true,
	})
		.extend({
			tech_stack: z.string(),
			images: z.string(),
		})
		.catchall(z.string())
		.transform((item) => {
			return {
				...item,
				images: item.images
					? item.images.split(",").map((url) => url.trim())
					: [],
					tech_stack: item.tech_stack
					? item.tech_stack.split(",").map((tech) => tech.trim())
					: [],
			};
		})
		.pipe(ProjectSchema)
);

export async function fetchProject(): Promise<Project[]> {
	const data = await fetchData("Projects");
	const validResult = ParseProjectSchema.safeParse(data);
	if (!validResult.success) {
		console.error(
			"Invalid project data received from source:",
			z.prettifyError(validResult.error),
		);
		return [];
	}
	
	return validResult.data;
}

const ParseAchievementSchema = z.array(
	BaseAchievementSchema.omit({
		skills: true,
		images: true,
	})
		.extend({
			skills: z.string(),
			images: z.string(),
		})
		.transform((item) => {
			return {
				...item,
				thumbnail: item.thumbnail?.trim() || "",
				images: item.images
					? item.images.split(",").map((url) => url.trim())
					: [],
				skills: item.skills
					? item.skills.split(",").map((skill) => skill.trim())
					: [],
			};
		})
		.pipe(AchievementSchema),
);

export async function fetchAchievements(): Promise<Achievement[]> {
	const data = await fetchData("Achievements");
	const validResult = ParseAchievementSchema.safeParse(data);

	if (!validResult.success) {
		console.error(
			"Invalid achievement data received from source:",
			z.prettifyError(validResult.error),
		);
		return [];
	}

	return validResult.data;
}

const ParseTechStackSchema = z.array(
	z.object({
		category: z.string(),
		name: z.string(),
		description: z.string(),
		level: z.string(),
		progress: z.string().or(z.number()).transform((val) => {
			const parsed = typeof val === 'string' ? parseFloat(val) : val;
			return parsed;
		}),
		logo: z.string().optional()
	}).transform((item) => {
		return item as TechStack & { logo?: string };
	})
);

export async function fetchTechStack(): Promise<TechStack[]> {
	try {
		const data = await fetchData("Tech_stack");
		const validResult = ParseTechStackSchema.safeParse(data);

		if (!validResult.success) {
			console.error(
				"Invalid tech stack data received from source:",
				z.prettifyError(validResult.error),
			);
			return [];
		}

		return validResult.data;
	} catch (error) {
		console.error("Error fetching tech stack data:", error);
		return [];
	}
}

// Schema for currently learning items
const CurrentlyLearningSchema = z.array(
	z.object({
		name: z.string(),
		description: z.string(),
		status: z.string(),
	})
);

export async function fetchCurrentlyLearning(): Promise<{name: string, description: string, status: string}[]> {
	try {
		const data = await fetchData("Currently_learning");
		const validResult = CurrentlyLearningSchema.safeParse(data);

		if (!validResult.success) {
			console.error(
				"Invalid currently learning data received from source:",
				z.prettifyError(validResult.error),
			);
			return [];
		}

		return validResult.data;
	} catch (error) {
		console.error("Error fetching currently learning data:", error);
		return [];
	}
}

// Schema for blog posts
const BlogPostSchema = z.array(
	z.object({
		title: z.string(),
		description: z.string(),
		link: z.string(),
		thumbnail: z.string(),
		date: z.string(),
		category: z.string(),
	})
);

export async function fetchBlogPosts(): Promise<{title: string, description: string, link: string, thumbnail: string, date: string, category: string}[]> {
	try {
		const data = await fetchData("Blog");
		const validResult = BlogPostSchema.safeParse(data);

		if (!validResult.success) {
			console.error(
				"Invalid blog posts data received from source:",
				z.prettifyError(validResult.error),
			);
			return [];
		}

		return validResult.data;
	} catch (error) {
		console.error("Error fetching blog posts data:", error);
		return [];
	}
}
