import { createContext } from "react";
import type {
	Achievement,
	Contributions,
	CurrentlyLearningItem,
	Project,
	SupportedLang,
	TechStack,
	Translations,
} from "../lib/schemas";

export interface DataContextValue {
	supportedLangs: SupportedLang[];
	projects: Project[];
	achievements: Achievement[];
	techStack: TechStack[];
	translations: Translations;
	contributions: Contributions;
	currentLang: string;
	currentlyLearning: CurrentlyLearningItem[];
	blogPosts: {
		title: string;
		description: string;
		link: string;
		thumbnail: string;
		date: string;
		category: string;
	}[];
	isLoading: boolean;
	loadContentForLang: (langCode: string) => void;
	invalidateAllCaches: () => void;
	invalidateCache: (key: string) => void;
}

export const DataContent = createContext<DataContextValue | null>(null);
