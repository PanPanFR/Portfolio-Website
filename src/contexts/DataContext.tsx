import { createContext, useContext } from "react";
import { type Achievement, type Contributions, type Project, type SupportedLang, type Translations, type TechStack } from "../lib/schemas";

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

export function useData() {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
