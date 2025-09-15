import {
	createContext,
	useState,
	useEffect,
	type ReactNode,
	useContext,
} from "react";
import {
	fetchAchievements,
	fetchProject,
	fetchSupportedLangs,
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
		translations: {},
		contributions: defaultContributions,
		currentLang: "",
		currentlyLearning: [],
		blogPosts: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const { showBoundary } = useErrorBoundary();

	useEffect(() => {
		const loadData = async () => {
			try {
				const [supportedLangs, projects, achievements, contributions, techStack, currentlyLearning, blogPosts] =
				await Promise.all([
					fetchSupportedLangs(),
					fetchProject(),
					fetchAchievements(),
					fetchContributions(),
					fetchTechStack(),
					fetchCurrentlyLearning(),
					fetchBlogPosts(),
				]);

				setContent((prev) => ({
					...prev,
					supportedLangs,
					projects,
					achievements,
					contributions,
					techStack,
					currentlyLearning,
					blogPosts,
				}));
			} catch (error) {
				console.error("Error fetching data:", error);
				showBoundary(new Error("Failed to fetch data"));
			}
		};
		loadData();
	}, []);
	
	const loadContentForLang = async (langCode: string) => {
		setIsLoading(true);
		try {
			const langInfo = content.supportedLangs.find(
				(l) => l.code === langCode,
			);
			if (!langInfo) throw new Error("Unsupported language");

			// Fetch all data in parallel
			const translations = await fetchTranslations(langInfo.sheetName);
			setContent((prev) => ({
				...prev,
				translations,
				currentLang: langCode,
			}));
		} catch (error) {
			console.error("Error fetching data:", error);
			showBoundary(new Error("Failed to fetch data"));
		} finally {
			setIsLoading(false);
		}
	};

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
