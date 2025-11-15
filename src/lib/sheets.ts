import Papa from "papaparse";
import z from "zod";
import {
	AchievementSchema,
	BaseAchievementSchema,
	BaseProjectSchema,
	CurrentlyLearningItemSchema,
	ProjectSchema,
	SupportedLangSchema,
	type Achievement,
	type CurrentlyLearningItem,
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
		group: z.string().optional(),
		key: z.string().optional(),
		value: z.string().optional(),
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
		// Skip items with empty/undefined values
		if (!item.group || !item.key || !item.value) {
			return acc;
		}

		if (!acc[item.group]) {
			// If the group doesn't exist, create it
			acc[item.group] = {};
		}

		acc[item.group][item.key] = item.value;
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
		description: z.string().optional(),
		description_en: z.string().optional(),
		description_id: z.string().optional(),
		level: z.string(),
		progress: z.string().or(z.number()).transform((val) => {
			const parsed = typeof val === 'string' ? parseFloat(val) : val;
			return parsed;
		}),
		logo: z.string().optional()
	}).transform((item) => {
		// If language-specific description exists, use it; otherwise fallback to general description
		const description = item.description || "";
		// We'll handle language-specific descriptions in the DataProvider
		return { ...item, description } as TechStack & { logo?: string };
	})
);

export async function fetchTechStack(): Promise<TechStack[]> {
	try {
		const raw = await fetchData("Tech_stack");
		if (import.meta.env.DEV) {
			// @ts-expect-error debug assignment for development diagnostics
			globalThis.__techStackRaw = raw;
		}
		const sanitized = raw
			.filter((item) => {
				const category = typeof item.category === "string" ? item.category.trim() : "";
				const name = typeof item.name === "string" ? item.name.trim() : "";
				const level = typeof item.level === "string" ? item.level.trim() : "";
				return category.length > 0 && name.length > 0 && level.length > 0;
			})
			.map((item) => {
				const progressValue =
					typeof item.progress === "string" || typeof item.progress === "number"
						? item.progress
						: "0";
				return {
					...item,
					category: typeof item.category === "string" ? item.category.trim() : "",
					name: typeof item.name === "string" ? item.name.trim() : "",
					description: typeof item.description === "string" ? item.description.trim() : item.description,
					description_en: typeof item.description_en === "string" ? item.description_en.trim() : item.description_en,
					description_id: typeof item.description_id === "string" ? item.description_id.trim() : item.description_id,
					level: typeof item.level === "string" ? item.level.trim() : item.level,
					progress: progressValue,
					logo: typeof item.logo === "string" ? item.logo.trim() : item.logo,
				};
			});

		if (import.meta.env.DEV) {
			// @ts-expect-error debug assignment for development diagnostics
			globalThis.__techStackSanitized = sanitized;
		}
		const validResult = ParseTechStackSchema.safeParse(sanitized);

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

export async function fetchCurrentlyLearning(): Promise<CurrentlyLearningItem[]> {
	try {
		const data = await fetchData("Currently_learning");
		let statusColumnDetected = false;

		const sanitizeUrl = (value: unknown) => {
			if (typeof value !== "string") {
				return undefined;
			}
			const trimmed = value.trim();
			if (!trimmed) {
				return undefined;
			}
			try {
				return new URL(trimmed).toString();
			} catch (error) {
				console.warn("[Currently Learning] Invalid URL detected:", trimmed, error);
				return undefined;
			}
		};

		const sanitized = data.map((item) => {
			const name = typeof item.name === "string" ? item.name.trim() : "";
			const description =
				typeof item.description === "string" ? item.description.trim() : "";
			const link = sanitizeUrl((item as Record<string, unknown>).link);
			const icon =
				sanitizeUrl((item as Record<string, unknown>).icons ?? (item as Record<string, unknown>).icon);
			if (
				!statusColumnDetected &&
				Object.prototype.hasOwnProperty.call(item, "status")
			) {
				statusColumnDetected = true;
			}

			return { name, description, link, icon } satisfies CurrentlyLearningItem;
		});

		const validResult = z.array(CurrentlyLearningItemSchema).safeParse(sanitized);

		if (!validResult.success) {
			console.error(
				"Invalid currently learning data received from source:",
				z.prettifyError(validResult.error),
			);
			return [];
		}

		if (statusColumnDetected) {
			console.info(
				"[Currently Learning] The 'status' column is no longer used. Please remove it from the spreadsheet to avoid future warnings.",
			);
		}

		return validResult.data;
	} catch (error) {
		console.error("Error fetching currently learning data:", error);
		return [];
	}
}

// Blog posts: accept minimal columns (name, url) and normalize
const BlogPostSchema = z.object({
	 title: z.string(),
	 description: z.string(),
	 link: z.string(),
	 thumbnail: z.string(),
	 date: z.string(),
	 category: z.string(),
});

const ParseBlogPostSchema = z.array(
	z.object({
		title: z.string().optional(),
		name: z.string().optional(),
		description: z.string().optional(),
		link: z.string().optional(),
		url: z.string().optional(),
		thumbnail: z.string().optional(),
		date: z.string().optional(),
		category: z.string().optional(),
	})
	.transform((item) => {
		const rawLink = (item.link || item.url || "").trim();
		let derivedTitle = (item.title || item.name || "").trim();
		if (!derivedTitle) {
			try {
				derivedTitle = rawLink ? new URL(rawLink).hostname : "Untitled";
			} catch {
				derivedTitle = rawLink || "Untitled";
			}
		}
		const description = (item.description || "").trim();
		const category = (item.category || "Uncategorized").trim();
		const date = item.date && item.date.trim() ? item.date : new Date().toISOString();
		let thumbnail = (item.thumbnail || "").trim();
		if (!thumbnail && rawLink) {
			const encoded = encodeURIComponent(rawLink);
			thumbnail = `https://s.wordpress.com/mshots/v1/${encoded}?w=800`;
		}
		return {
			title: derivedTitle,
			description,
			link: rawLink,
			thumbnail,
			date,
			category,
		};
	})
	.pipe(BlogPostSchema)
);

export async function fetchBlogPosts(): Promise<{title: string, description: string, link: string, thumbnail: string, date: string, category: string}[]> {
	try {
		const data = await fetchData("Blog");
		const validResult = ParseBlogPostSchema.safeParse(data);

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
