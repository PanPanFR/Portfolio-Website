import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useData } from "./contexts/DataContext";
import { useEffect, useMemo } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Background from "./components/Background";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Achievements from "./pages/Achievements";
import Stats from "./pages/Stats";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

// for route management
export default function App() {
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

// redirect to the first supported language
function InitialRedirector() {
	const { supportedLangs } = useData();

	// since it still being fetched, show loading screen
	if (supportedLangs.length === 0) return <LoadingScreen />;

	const userLang = navigator.language.split("-")[0];
	const langToRedirect =
		supportedLangs.find((l) => l.code === userLang)?.code ||
		supportedLangs[0].code;

	return <Navigate to={`/${langToRedirect}`} replace />;
}

// handle language change
function LanguageLayout() {
	const { lang } = useParams();
	const { supportedLangs, loadContentForLang, isLoading } = useData();
	const isLangSupported = useMemo(() => {
		if (supportedLangs.length === 0) return null;
		return supportedLangs.some((l) => l.code === lang);
	}, [lang, supportedLangs]);

	useEffect(() => {
		if (lang && isLangSupported) {
			loadContentForLang(lang);
		}
	}, [lang, supportedLangs, isLangSupported, loadContentForLang]);

	// show error page
	if (isLangSupported === false) {
		return (
			<ErrorPage
				error={new Error("Unsupported language")}
				errorCode="404"
			/>
		);
	}

	// show loading screen
	if (isLoading) return <LoadingScreen />;

	return (
		<div className="relative min-h-screen text-black dark:text-white">
			<Background />
			<Header />
			<div className="max-w-8xl mx-auto px-4 md:px-8">
				<main className="pt-25 pb-8 px-0 md:px-12 lg:px-24">
					<Outlet />
				</main>
			</div>
			<NavBar />
			<Footer />
		</div>
	);
}
