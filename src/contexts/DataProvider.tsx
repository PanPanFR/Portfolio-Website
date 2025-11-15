import { useState, useMemo, useCallback, type ReactNode, useEffect } from "react";
import {
	useSupportedLangs,
	useProjects,
	useAchievements,
	useTechStack,
	useContributions,
	useCurrentlyLearning,
	useBlogPosts,
	useTranslations,
	invalidateAllCaches,
	invalidateCache
} from "../lib/hooks";
import { useErrorBoundary } from "react-error-boundary";
import {
	defaultContributions,
	type Achievement,
	type Contributions,
	type Project,
	type SupportedLang,
	type Translations,
	type TechStack,
	type CurrentlyLearningItem,
} from "../lib/schemas";
import { DataContent, type DataContextValue } from "./DataContext";


interface Content {
	supportedLangs: SupportedLang[];
	projects: Project[];
	achievements: Achievement[];
	techStack: TechStack[];
	translations: Translations;
	contributions: Contributions;
	currentLang: string;
	currentlyLearning: CurrentlyLearningItem[];
	blogPosts: {title: string, description: string, link: string, thumbnail: string, date: string, category: string}[];
}
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
	
	// Fetch supported languages with SWR
	const { data: supportedLangsData, error: supportedLangsError } = useSupportedLangs();
	
	// Fetch all content with SWR
	const { data: projectsData, error: projectsError } = useProjects();
	const { data: achievementsData, error: achievementsError } = useAchievements();
	const { data: techStackData, error: techStackError } = useTechStack();
	const { data: contributionsData, error: contributionsError } = useContributions();
	const { data: currentlyLearningData, error: currentlyLearningError } = useCurrentlyLearning();
	const { data: blogPostsData, error: blogPostsError } = useBlogPosts();
	const { data: translationsData, error: translationsError } = useTranslations(content.currentLang);
	
	// Handle errors
	useEffect(() => {
	if (supportedLangsError) {
		console.error("Error loading supported languages:", supportedLangsError);
		showBoundary(supportedLangsError);
	}
	if (projectsError) {
		console.error("Error loading projects:", projectsError);
		showBoundary(projectsError);
	}
	if (achievementsError) {
		console.error("Error loading achievements:", achievementsError);
		showBoundary(achievementsError);
	}
	if (techStackError) {
		console.error("Error loading tech stack:", techStackError);
		showBoundary(techStackError);
	}
	if (contributionsError) {
		console.error("Error loading contributions:", contributionsError);
	}
		if (currentlyLearningError) {
		console.error("Error loading currently learning:", currentlyLearningError);
		showBoundary(currentlyLearningError);
	}
	if (blogPostsError) {
		console.error("Error loading blog posts:", blogPostsError);
		showBoundary(blogPostsError);
	}
	if (translationsError) {
		console.error("Error loading translations:", translationsError);
		showBoundary(translationsError);
	}
	}, [
		supportedLangsError,
		projectsError,
		achievementsError,
		techStackError,
		contributionsError,
		currentlyLearningError,
		blogPostsError,
		translationsError,
		showBoundary
	]);
	
	// Update content when data changes
	useEffect(() => {
		if (supportedLangsData) {
		setContent((prev) => ({
			...prev,
			supportedLangs: supportedLangsData,
		}));
			setIsLoading(false);
		}
	}, [supportedLangsData]);
	
	useEffect(() => {
		if (projectsData) {
			setContent(prev => ({
				...prev,
				projects: projectsData
			}));
		}
	}, [projectsData]);
	
	useEffect(() => {
		if (achievementsData) {
			setContent(prev => ({
				...prev,
				achievements: achievementsData
			}));
		}
	}, [achievementsData]);
	
	useEffect(() => {
	if (techStackData) {
		const updatedTechStack = techStackData.map((item) => {
				// Create a copy of the item
			const updatedItem = { ...item };
				
				// Select the appropriate description based on the current language
				if (content.currentLang === 'en' && item.description_en) {
					updatedItem.description = item.description_en;
				} else if (content.currentLang === 'id' && item.description_id) {
					updatedItem.description = item.description_id;
				}
				// If no language-specific description exists, keep the original description
				// If original description is also empty, provide a fallback
				if (!updatedItem.description) {
					updatedItem.description = "No description available";
				}
				
			return updatedItem;
		});
			
		setContent((prev) => ({
			...prev,
			techStack: updatedTechStack,
		}));
		}
	}, [techStackData, content.currentLang]);
	
	useEffect(() => {
	if (contributionsData) {
		setContent((prev) => ({
			...prev,
			contributions: contributionsData,
		}));
		}
	}, [contributionsData]);
	
	useEffect(() => {
	if (currentlyLearningData) {
		setContent((prev) => ({
			...prev,
			currentlyLearning: currentlyLearningData,
		}));
		}
	}, [currentlyLearningData]);
	
	useEffect(() => {
	if (blogPostsData) {
		setContent((prev) => ({
			...prev,
			blogPosts: blogPostsData,
		}));
		}
	}, [blogPostsData]);
	
	useEffect(() => {
	if (translationsData) {
		setContent((prev) => ({
			...prev,
			translations: translationsData,
		}));
		}
	}, [translationsData]);
	
	// Load content for a specific language
	const loadContentForLang = useCallback((langCode: string) => {
		// Update the current language - this will trigger the useTranslations hook to fetch new translations
	setContent((prev) => ({
		...prev,
		currentLang: langCode,
	}));
	}, []);
	
	// Cache invalidation functions
	const invalidateAll = useCallback(() => {
		invalidateAllCaches();
	}, []);
	
	const invalidateSpecific = useCallback((key: string) => {
		invalidateCache(key);
	}, []);
	
	const value: DataContextValue = useMemo(
	() => ({
		...content,
		isLoading,
		loadContentForLang,
		invalidateAllCaches: invalidateAll,
		invalidateCache: invalidateSpecific,
	}),
	[content, isLoading, loadContentForLang, invalidateAll, invalidateSpecific],
);

	return (
		<DataContent.Provider value={value}>{children}</DataContent.Provider>
	);
}
