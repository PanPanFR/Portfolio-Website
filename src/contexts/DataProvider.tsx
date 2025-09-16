import {
	createContext,
	useState,
	type ReactNode,
	useContext,
} from "react";
import {
	fetchAchievements,
	fetchProject,
	fetchTranslations,
	fetchTechStack,
	fetchCurrentlyLearning,
	fetchBlogPosts,
} from "../lib/sheets";
import { useErrorBoundary } from "react-error-boundary";
import { fetchContributions } from "../lib/github";
import {
	defaultContributions,
	type Achievement,
	type Contributions,
	type Project,
	type SupportedLang,
	type Translations,
	type TechStack,
} from "../lib/schemas";

interface Content {
	supportedLangs: SupportedLang[];
	projects: Project[];
	achievements: Achievement[];
	techStack: TechStack[];
	translations: Translations;
	contributions: Contributions;
	currentLang: string;
	currentlyLearning: {name: string, description: string, status: string}[];
	blogPosts: {title: string, description: string, link: string, thumbnail: string, date: string, category: string}[];
}

const DataContext = createContext<
	| (Content & {
			isLoading: boolean;
			loadContentForLang: (langCode: string) => Promise<void>;
	  })
	| null
>(null);

export function DataProvider({ children }: { children: ReactNode }) {
	const [content, setContent] = useState<Content>({
		supportedLangs: [],
		projects: [],
		achievements: [],
		techStack: [],
		translations: {} as Translations,
		contributions: defaultContributions,
		currentLang: "",
		currentlyLearning: [],
		blogPosts: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const { showBoundary } = useErrorBoundary();

	// fetch content for a specific language
	async function loadContentForLang(langCode: string) {
		try {
			setIsLoading(true);
			const [
				projects,
				achievements,
				techStack,
				translations,
				contributions,
				currentlyLearning,
				blogPosts
			] = await Promise.all([
				fetchProject(),
				fetchAchievements(),
				fetchTechStack(),
				fetchTranslations(langCode),
				fetchContributions(),
				fetchCurrentlyLearning(),
				fetchBlogPosts()
			]);

			setContent({
				supportedLangs: content.supportedLangs,
				projects,
				achievements,
				techStack,
				translations,
				contributions,
				currentLang: langCode,
				currentlyLearning,
				blogPosts
			});
			setIsLoading(false);
		} catch (error) {
			showBoundary(error);
		}
	}

	const value = {
		...content,
		isLoading,
		loadContentForLang,
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}