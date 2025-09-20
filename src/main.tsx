import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { DataProvider } from "./contexts/DataProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./pages/ErrorPage.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				{/* because ErrorPage use useTheme */}
				<ErrorBoundary FallbackComponent={ErrorPage}>
					<DataProvider>
						<App />
						<SpeedInsights />
					</DataProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>,
);
