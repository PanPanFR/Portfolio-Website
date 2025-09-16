import { createContext, useContext } from "react";

const ThemeContext = createContext<{
	darkMode: boolean;
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
