import {
	createContext,
	useState,
	type ReactNode,
	useContext,
	useEffect,
} from "react";
import {
	fetchAchievements,
	fetchProject,
	fetchTranslations,
	fetchTechStack,
	fetchCurrentlyLearning,
	fetchBlogPosts,
	fetchSupportedLangs,
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

const DataContent = createContext<
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

	// Load supported languages on component mount
	useEffect(() => {
		async function loadSupportedLangs() {
			try {
				const supportedLangs = await fetchSupportedLangs();
				setContent(prev => ({
					...prev,
					supportedLangs
				}));
				// Always set isLoading to false after attempting to load
				setIsLoading(false);
			} catch (error) {
				console.error("Error loading supported languages:", error);
				showBoundary(error);
				// Even on error, we need to stop loading to prevent infinite loading state
				setIsLoading(false);
			}
		}
		
		// Only load if we don't already have supported languages
		if (content.supportedLangs.length === 0) {
			loadSupportedLangs();
		} else {
			setIsLoading(false);
		}
	}, []);

	// fetch content for a specific language
	async function loadContentForLang(langCode: string) {
		// If we're already loading this language or it's the current language, don't reload
		if (isLoading || content.currentLang === langCode) {
			return;
		}
		
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
			console.error("Error loading content for language:", langCode, error);
			showBoundary(error);
			setIsLoading(false);
		}
	}

	const value = {
		...content,
		isLoading,
		loadContentForLang,
	};

	return (
		<DataContent.Provider value={value}>{children}</DataContent.Provider>
	);
}

export function useData() {
	const context = useContext(DataContent);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}