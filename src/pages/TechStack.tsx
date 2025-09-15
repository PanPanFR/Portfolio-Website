import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../contexts/DataContext";
import TechStackLogos from "../components/TechStackLogos";
import { 
	SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, 
	SiPython, SiPostgresql, SiMongodb, SiDocker, SiGooglecloud, SiGit
} from 'react-icons/si';

// Mapping tech names to icons
const techIcons: Record<string, React.ReactNode> = {
	"React": <SiReact />,
	"TypeScript": <SiTypescript />,
	"JavaScript": <SiJavascript />,
	"HTML5": <SiHtml5 />,
	"CSS3": <SiCss3 />,
	"Node.js": <SiNodedotjs />,
	"Python": <SiPython />,
	"PostgreSQL": <SiPostgresql />,
	"MongoDB": <SiMongodb />,
	"Docker": <SiDocker />,
	"Google Cloud": <SiGooglecloud />,
	"Git": <SiGit />,
	// Add more mappings as needed
};

export default function TechStack() {
	const { techStack, translations: { techStack: translations }, currentLang, currentlyLearning } = useData();
	
	// Group tech stack by category
	const groupedTechStack = useMemo(() => {
		return techStack.reduce((acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		}, {} as Record<string, typeof techStack>);
	}, [techStack]);

	// Function to get color based on progress and theme
	const getProgressColor = (progress: number) => {
		// For light theme, use black; for dark theme, use white
		return "bg-black dark:bg-white";
	};

	return (
		<div className="mt-auto pb-4">
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-6 mb-6"
			>
				<h1 className="text-3xl md:text-4xl font-extrabold mb-6">{translations?.["tech-stack-title"] || "Tech Stack"}</h1>
				<p className="text-gray-600 dark:text-gray-300 mb-8">
					{translations?.["tech-stack-description"] || "Teknologi dan tools yang saya gunakan untuk membangun aplikasi — terorganisir berdasarkan kategori dan level kenyamanan."}
				</p>
			</motion.div>

			{/* Categories grid */}
			{techStack.length === 0 ? (
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 mb-6 text-center"
				>
					<h2 className="text-xl font-semibold mb-4">No Tech Stack Data Available</h2>
					<p className="text-gray-600 dark:text-gray-300">
						Tech stack data is currently unavailable. Please check back later.
					</p>
				</motion.div>
			) : (
				<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					{categories.map((category, categoryIndex) => (
						<motion.div 
						key={category}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.1 * categoryIndex }}
						className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-6"
					>
							<h2 className="text-xl font-semibold mb-4 capitalize">{category}</h2>
							<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
								{category === "frontend" && (translations?.["frontend-description"] || "Framework & libraries yang sering saya gunakan.")}
								{category === "backend" && (translations?.["backend-description"] || "API, server & integrasi.")}
								{category === "database" && (translations?.["database-description"] || "Penyimpanan data & platform deployment.")}
								{![`frontend`, `backend`, `database`].includes(category) && (translations?.["other-description"] || "Tools dan teknologi yang saya gunakan.")}
							</p>
							<ul className="space-y-3">
								{groupedTechStack[category].map((item, itemIndex) => (
									<motion.li 
										key={item.name}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.2, delay: 0.1 * itemIndex }}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-3">
												<div className="w-10 h-10 flex items-center justify-center text-base font-medium">
													{item.logo ? (
														<img 
															src={item.logo} 
															alt={item.name} 
															className="w-6 h-6 object-contain"
															onError={(e) => {
																const target = e.target as HTMLImageElement;
																target.style.display = 'none';
															}}
														/>
													) : techIcons[item.name] ? (
														techIcons[item.name]
													) : (
														item.name.substring(0, 2).toUpperCase()
													)}
												</div>
												<div>
													<div className="font-medium">{item.name}</div>
													<div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
												</div>
											</div>
											{/* Skill bar */}
											<div className="w-32">
												<div className="h-2.5 bg-gray-200 dark:bg-zinc-700 overflow-hidden rounded-full">
													<AnimatePresence>
														<motion.div 
															initial={{ width: 0 }}
															animate={{ width: `${item.progress}%` }}
															exit={{ width: 0 }}
															transition={{ duration: 0.3, delay: 0.1 * itemIndex }}
															className={`h-full rounded-full ${getProgressColor(item.progress)}`}
														/>
													</AnimatePresence>
												</div>
												<div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1 capitalize">{item.level}</div>
											</div>
									</motion.li>
								))}
							</ul>
						</motion.div>
					))}
				</section>
			)}

			{/* Logos grid */}
			<motion.section 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.2 }}
				className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-6 mb-6"
			>
				<h3 className="text-lg font-semibold mb-4">{translations?.["tools-title"] || "Tools"}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
					{translations?.["tools-description"] || "Sekilas teknologi populer yang sering saya gunakan."}
				</p>
				<div className="py-4">
					<TechStackLogos />
				</div>
			</motion.section>

			{/* Learning Now + CTA */}
			<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.3 }}
					className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-6"
				>
					<h4 className="text-lg font-semibold mb-3">{translations?.["currently-learning-title"] || "Currently Learning"}</h4>
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						{translations?.["currently-learning-description"] || "Teknologi yang sedang saya pelajari untuk meningkatkan skill."}
					</p>
					<ul className="space-y-2">
						{currentlyLearning.map((item, index) => (
							<motion.li 
								key={item.name}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: 0.4 + index * 0.1 }}
								className="flex items-center justify-between"
							>
								<div>
									<div className="font-medium">{item.name}</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
								</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">{item.status}</div>
							</motion.li>
						))}
					</ul>
				</motion.div>

				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.4 }}
					className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between"
				>
					<div>
						<h4 className="text-lg font-semibold mb-3">{translations?.["open-to-opportunities-title"] || "Open to Opportunities"}</h4>
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
							{translations?.["open-to-opportunities-description"] || "Saya terbuka untuk peluang kerja baru, kolaborasi proyek, atau diskusi teknis. Jangan ragu untuk menghubungi saya!"}
						</p>
						<div className="flex gap-3">
							<a 
								className="px-12 py-6 border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex-grow text-lg font-bold"
								href={`mailto:example@email.com`}
							>
								{translations?.["contact-email"] || "Email"}
							</a>
							<a 
								className="px-12 py-6 border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] flex-grow text-lg font-bold"
								href="#"
							>
								{translations?.["view-portfolio"] || "Portfolio"}
							</a>
						</div>
					</div>

					<div className="mt-6 text-xs text-gray-400 dark:text-gray-500">
						{translations?.["opportunities-tip"] || "Tip: Saya terbuka untuk pekerjaan remote dan proyek open-source."}
					</div>
				</motion.div>
			</section>
		</div>
	);
}