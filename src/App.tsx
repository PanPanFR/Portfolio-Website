import { Navigate, Outlet, Route, Routes, useParams, useLocation } from "react-router-dom";
import { useData } from "./contexts/useData";
import { useEffect, useMemo, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Background from "./components/Background";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";

// Lazy load pages for better performance
import { lazy } from "react";
const Profile = lazy(() => import("./pages/Profile"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Stats = lazy(() => import("./pages/Stats"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));

// redirect to the first supported language
function InitialRedirector() {
	const { supportedLangs, isLoading } = useData();
	const [redirectLang, setRedirectLang] = useState("");
	const [isRedirecting, setIsRedirecting] = useState(false);

	// Add loading class to body when loading
	useEffect(() => {
		const body = document.body;
		if (isLoading || (supportedLangs.length > 0 && !isRedirecting)) {
			body.classList.add("loading");
			body.classList.remove("loaded");
		} else {
			body.classList.remove("loading");
			body.classList.add("loaded");
		}
		
		return () => {
			body.classList.remove("loading", "loaded");
		};
	}, [isLoading, supportedLangs.length, isRedirecting]);

	// When supportedLangs are loaded and we haven't started redirecting yet
	useEffect(() => {
		if (!isLoading && supportedLangs.length > 0 && !isRedirecting) {
			const userLang = navigator.language.split("-")[0];
			const langToRedirect =
				supportedLangs.find((l) => l.code === userLang)?.code ||
				supportedLangs[0].code;
			
			setRedirectLang(langToRedirect);
			setIsRedirecting(true);
		}
	}, [isLoading, supportedLangs, isRedirecting]);

	// If we've finished loading but have no supported languages, show an error
	if (!isLoading && supportedLangs.length === 0) {
		return (
			<ErrorPage
				error={new Error("No supported languages available")}
				errorCode="500"
			/>
		);
	}

	// Show loading screen while data is being fetched or during redirect delay
	if (isLoading || (supportedLangs.length > 0 && !isRedirecting)) {
		return <LoadingScreen />;
	}

	// Perform the redirect
	if (isRedirecting && redirectLang) {
		return <Navigate to={`/${redirectLang}`} replace />;
	}

	// Fallback - should not reach here
	return <LoadingScreen />;
}

// for route management
export default function App() {
	const location = useLocation();
	
	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className="relative">
			<Routes>
				<Route path="/" element={<InitialRedirector />} />
				<Route path="/:lang" element={<LanguageLayout />}>
					<Route index element={<Profile />} />
					<Route path="achievements" element={<Achievements />} />
					<Route path="projects" element={<Projects />} />
					<Route path="blog" element={<Blog />} />
					<Route path="stats" element={<Stats />} />
					<Route
						path="*"
						element={
							<ErrorPage
								error={new Error("Page not found")}
								errorCode="404"
							/>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

// handle language change
function LanguageLayout() {
	const { lang } = useParams();
	const { supportedLangs, loadContentForLang, isLoading, currentLang } = useData();
	const isLangSupported = useMemo(() => {
		if (supportedLangs.length === 0) return null;
		return supportedLangs.some((l) => l.code === lang);
	}, [lang, supportedLangs]);

	// Add loading class to body when loading content
	useEffect(() => {
		const body = document.body;
		if (isLoading && isLangSupported === true) {
			body.classList.add("loading");
			body.classList.remove("loaded");
		} else {
			body.classList.remove("loading");
			body.classList.add("loaded");
		}
		
		return () => {
			body.classList.remove("loading", "loaded");
		};
	}, [isLoading, isLangSupported]);

	// Load content when language changes
	useEffect(() => {
		if (lang && isLangSupported === true && lang !== currentLang) {
			loadContentForLang(lang);
		}
	}, [lang, isLangSupported, loadContentForLang, currentLang]);

	// show error page
	if (isLangSupported === false) {
		return (
			<ErrorPage
				error={new Error("Unsupported language")}
				errorCode="404"
			/>
		);
	}

	// Show loading screen only when content is actually being loaded
	// But not when we're just checking language support
	// Show full loading screen when it's a new language
	if (isLoading && isLangSupported === true && lang !== currentLang) {
		return <LoadingScreen />;
	}

	// Show nothing while checking language support or loading initial data
	if (isLangSupported === null || (supportedLangs.length === 0 && isLoading)) {
		return <LoadingScreen />;
	}

	// Show previous content while loading new content to prevent flickering
		// Only show loading overlay when updating the same language
		if (isLoading && isLangSupported === true && lang === currentLang) {
			// Render previous content WITHOUT loading overlay to prevent double loading screen
			return (
				<div className="relative min-h-screen text-black dark:text-white flex flex-col">
					<Background />
					<Header />
					<div className="max-w-8xl mx-auto px-4 md:px-8 flex-grow">
						<main className="pt-24 pb-8 px-0 md:px-12 lg:px-24">
							<Outlet />
						</main>
					</div>
					<NavBar />
					<Footer />
				</div>
			);
		}

	return (
		<div className="relative min-h-screen text-black dark:text-white flex flex-col">
			<Background />
			<Header />
			<div className="max-w-8xl mx-auto px-4 md:px-8 flex-grow">
				<main className="pt-24 pb-8 px-0 md:px-12 lg:px-24">
					<Outlet />
				</main>
			</div>
			<NavBar />
			<Footer />
		</div>
	);
}
