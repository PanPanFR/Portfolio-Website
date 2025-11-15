import { createContext, type Dispatch, type SetStateAction } from "react";

export interface ThemeContextValue {
	darkMode: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
