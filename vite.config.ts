import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	// Properti base ditambahkan di sini, dengan koma di akhir
	base: "/",

	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: false
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
				navigateFallback: '/index.html',
				cleanupOutdatedCaches: true,
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					},
					{
						urlPattern: /^https:\/\/docs\.google\.com\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'google-sheets-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 15 * 60 // 15 minutes
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					},
					{
						urlPattern: /^https:\/\/api\.github\.com\/.*/i,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'github-api-cache',
							expiration: {
								maxEntries: 20,
								maxAgeSeconds: 5 * 60 // 5 minutes
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			},
			manifest: {
				name: '%VITE_FULL_NAME% (%VITE_NICKNAME%) Portfolio',
				short_name: '%VITE_NICKNAME% Portfolio',
				description: 'This is a web for %VITE_FULL_NAME% (%VITE_NICKNAME%) portfolio',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'https://cdn1.iconfinder.com/data/icons/essential-interface-6/64/Profile-1024.png',
						sizes: '1024x1024',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		}),
		{
			name: "vite-plugin-non-blocking-css",
			apply: "build", // Apply this plugin only during the build process
			enforce: "post", // Make sure it runs after CSS is generated
			transformIndexHtml(html) {
				const regex =
					/<link rel="stylesheet"(.*?)href="(.+?\.css)"(.*?)>/;
				const match = html.match(regex);

				if (match) {
					const cssUrl = match[2];
					const preloadLink = `
					<link rel="preload" crossorigin href="${cssUrl}" as="style" fetchpriority="high">
					<link rel="stylesheet" crossorigin href="${cssUrl}">
					`;
					// Replace the original link tag with the new preload version
					return html.replace(match[0], preloadLink);
				}

				return html;
			},
		},
	],
	server: {
		allowedHosts: true,
	},
	build: {
		minify: "terser", // Use Terser for better minification
		sourcemap: false, // Disable sourcemaps for production
		rollupOptions: {
			output: {
				manualChunks: {
					// Manually define chunks for better caching
					react: ["react", "react-dom", "react-router-dom"],
					charts: ["chart.js", "react-chartjs-2"],
					utils: ["lucide-react", "framer-motion", "react-icons", "react-fast-marquee"],
					data: ["papaparse", "zod"],
				},
			},
		},
	},
	define: {
		// Enable tree shaking for production
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
});
