import {
	useState,
	useEffect,
	useMemo,
	type ReactNode,
} from "react";
import { ThemeContext } from "./theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [darkMode, setDarkMode] = useState<boolean>(
		localStorage.getItem("theme") === "dark",
	);

	// Set the initial theme
	useEffect(() => {
		const theme = darkMode ? "dark" : "light";
		document.documentElement.classList.toggle("dark", darkMode);
		localStorage.setItem("theme", theme);
	}, [darkMode]);

	const contextValue = useMemo(() => ({
		darkMode,
		setDarkMode
	}), [darkMode]);

	// Listen for system theme changes
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleThemeChange = (e: MediaQueryListEvent) => {
			setDarkMode(e.matches);
		};

		mediaQuery.addEventListener("change", handleThemeChange);
		return () =>
			mediaQuery.removeEventListener("change", handleThemeChange);
	}, []);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}