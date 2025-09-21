import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	CircleCheck,
	GraduationCap,
	Info,
	UserSearch,
	type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useData } from "../contexts/DataProvider";
import TechStackLogos from "../components/TechStackLogos";
import Marquee from "react-fast-marquee";
import { SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiDocker, SiGooglecloud, SiGit } from 'react-icons/si';

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

export default function Profile() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 px-2 md:px-0">
			<ProfileCard />
			<DetailsCard />
			<TechStackSection />
		</div>
	);
}

function TechStackSection() {
	const { techStack, translations: { techStack: translations }, currentlyLearning } = useData();
	const [selectedCategory, setSelectedCategory] = useState<string>("frontend");
	const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(true);
	
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

	const categories = Object.keys(groupedTechStack);
	
	// Function to get color based on progress and theme
	const getProgressColor = () => {
		// For light theme, use black; for dark theme, use white
		return "bg-black dark:bg-white";
	};

	// Get description for category based on selected language
	const getCategoryDescription = (category: string) => {
		if (category === "frontend") {
			return translations?.["frontend-description"] || "Framework & libraries yang sering saya gunakan.";
		} else if (category === "backend") {
			return translations?.["backend-description"] || "API, server & integrasi.";
		} else if (category === "database") {
			return translations?.["database-description"] || "Penyimpanan data & platform deployment.";
		} else {
			return translations?.["other-description"] || "Tools dan teknologi yang saya gunakan.";
		}
	};

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="col-span-4 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6"
			>
				<h3 className="text-lg md:text-xl font-bold mb-4">{translations?.["tech-stack-title"] || "Tech Stack"}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
					{translations?.["tech-stack-description"] || "Teknologi dan tools yang saya gunakan untuk membangun aplikasi — terorganisir berdasarkan kategori dan level kenyamanan."}
				</p>
				
				{/* Logo Loop */}
				<div className="py-4 overflow-hidden">
					<TechStackLogos />
				</div>

				{/* Category Selection */}
				<div className="flex flex-wrap gap-2 mb-6">
					<button
						onClick={() => {
							if (selectedCategory === "all") {
								// Jika tombol "All" diklik saat sudah aktif, toggle dropdown
								setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
							} else {
								// Jika tombol "All" diklik saat kategori lain aktif, aktifkan "All"
								setSelectedCategory("all");
								setIsCategoryDropdownOpen(true);
							}
						}}
						className={`px-4 py-2 text-sm font-medium capitalize border-2 transition-all duration-200 ease-in-out ${
							selectedCategory === "all"
								? "bg-black text-white dark:bg-zinc-700 dark:text-white border-black dark:border-zinc-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
								: "bg-white text-black dark:bg-zinc-900 dark:text-white border-black dark:border-zinc-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
						}`}
					>
						All
					</button>
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => {
								if (selectedCategory === category) {
									// Jika kategori yang sama diklik saat sudah aktif, toggle dropdown
									setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
								} else {
									// Jika kategori berbeda diklik, pilih kategori baru dan tampilkan dropdown
									setSelectedCategory(category);
									setIsCategoryDropdownOpen(true);
								}
							}}
							className={`px-4 py-2 text-sm font-medium capitalize border-2 transition-all duration-200 ease-in-out ${
								selectedCategory === category
									? "bg-black text-white dark:bg-zinc-700 dark:text-white border-black dark:border-zinc-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
									: "bg-white text-black dark:bg-zinc-900 dark:text-white border-black dark:border-zinc-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				{/* Category Description */}
				{selectedCategory !== "all" && isCategoryDropdownOpen && (
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						{getCategoryDescription(selectedCategory)}
					</p>
				)}

				{/* Tech Stack Items */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{isCategoryDropdownOpen ? (
						(selectedCategory === "all" 
							? techStack 
							: groupedTechStack[selectedCategory] || []
						).map((item, index) => (
							<motion.div
								key={item.name}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2, delay: 0.1 * index }}
								className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 flex items-center justify-center text-sm font-bold">
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
										) : (
											<div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
										)}
									</div>
									<div>
										<div className="font-bold text-sm">{item.name}</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
									</div>
								</div>
								{/* Skill bar */}
								<div className="w-24">
									<div className="h-2 bg-gray-200 dark:bg-zinc-700 overflow-hidden rounded-full">
										<AnimatePresence>
											<motion.div 
												initial={{ width: 0 }}
												animate={{ width: `${item.progress}%` }}
												exit={{ width: 0 }}
												transition={{ duration: 0.3, delay: 0.1 * index }}
												className={`h-full rounded-full ${getProgressColor()}`}
											/>
										</AnimatePresence>
									</div>
									<div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1 capitalize">{item.level}</div>
								</div>
							</motion.div>
						))
					) : null}
				</div>
			</motion.div>

			{/* Currently Learning */}
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="col-span-4 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6"
			>
				<h3 className="text-lg md:text-xl font-bold mb-4">{translations?.["currently-learning-title"] || "Currently Learning"}</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
					{translations?.["currently-learning-description"] || "Teknologi yang sedang saya pelajari untuk meningkatkan skill."}
				</p>
				<ul className="space-y-2">
					{currentlyLearning.map((item, index) => (
						<motion.li 
							key={item.name}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, delay: 0.1 * index }}
							className="flex items-center justify-between"
						>
							<div>
							<div className="font-bold">{item.name}</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400">{item.status}</div>
						</motion.li>
					))}
				</ul>
			</motion.div>
		</>
	);
}



function ProfileCard() {
	return (
		<motion.div
			initial={{ rotateX: -90 }}
			animate={{ rotateX: 0 }}
			exit={{ rotateX: 90 }}
			transition={{ duration: 0.5 }}
			className="col-span-4 lg:col-span-1 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
		>
			<div className="relative mb-4">
				<img
					alt="Profile Banner"
					className="h-32 w-full object-cover border-2"
					src="/banner_profile.avif"
					loading="eager"
					decoding="async"
					fetchPriority="high"
				/>

				<div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 border-8 border-white dark:border-zinc-900 rounded-full">
					<img
						loading="eager"
						decoding="async"
						src="/profile_picture.avif"
						alt="Profile Picture"
						width={200}
						height={200}
						className="max-w-32 max-h-32 rounded-full border-3 dark:border-white object-cover"
						fetchPriority="high"
					/>
				</div>
			</div>

			<div className="p-4 pt-16 flex flex-col items-center justify-center">
				<h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center overflow-hidden text-ellipsis max-w-full">
					{import.meta.env.VITE_FULL_NAME || "Pandu Fatikha Rahmadana"}
				</h2>
				<h3 className="text-md sm:text-lg md:text-xl font-bold mt-1 mb-3 text-center overflow-hidden text-ellipsis max-w-full">
					[{import.meta.env.VITE_NICKNAME || "PanPanFR"}]
				</h3>
				<div className="w-full max-w-xs pt-2 pb-2">
					<Marquee 
						speed={30}
						pauseOnHover={true}
						className="text-black dark:text-white font-bold leading-tight"
					>
						&nbsp;Software Engineer | Backend Developer | Frontend Developer | Cloud/Deployment DevOps | Software Engineer&nbsp;
					</Marquee>
				</div>
			</div>
		</motion.div>
	);
}

function CollapsedContent({
	title,
	children,
	Icon,
	initialOpen = false,
}: {
	title: string;
	children: React.ReactNode;
	Icon: LucideIcon;
	initialOpen?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(initialOpen);
	return (
		<div>
			<button
				type="button"
				aria-label="Toggle collapsed content"
				onClick={() => setIsOpen((prev) => !prev)}
				className="cursor-pointer rounded-full flex items-center justify-between gap-2 w-full"
			>
				<div className="flex items-center gap-4 md:gap-2">
					<Icon size={20} />
					<span className="font-bold uppercase">{title}</span>
				</div>
				<ChevronDown
					size={20}
					className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300 ease-in-out`}
				/>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}
						className="mt-4 ml-2"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function DetailsCard() {
	const {
		translations: { details: translations },
	} = useData();
	const educationLength =
		translations?.["education-length"] &&
		!isNaN(Number(translations["education-length"]))
			? Number(translations["education-length"])
			: null;

	return (
		<motion.div
			initial={{ rotateX: -90 }}
			animate={{ rotateX: 0 }}
			exit={{ rotateX: 90 }}
			transition={{ duration: 0.5 }}
			className="px-4 py-8 col-span-4 lg:col-span-3 flex flex-col gap-8 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] "
		>
			<CollapsedContent
				title={translations?.["about-me"] || "About Me"}
				Icon={Info}
				initialOpen
			>
				<p className="semibold text-justify">
					{translations?.["about-me-description"] ||
						`A developer specializing in Web and Data Science. I build
					intelligent web applications and turn data into meaningful
					insights. Based in Indonesia.`}
				</p>
			</CollapsedContent>

			<CollapsedContent
				title={
					translations?.["personal-info"] || "Personal Information"
				}
				Icon={UserSearch}
			>
				<div className="space-y-2">
					<p className="semibold text-justify">
						<strong>{translations?.["personal-info-address"] || "Address:"}</strong>
						{translations?.["personal-info-address-value"] ||
							"Surabaya, Jawa Timur, Indonesia"}
					</p>
					<p className="semibold text-justify">
						<strong>{translations?.["personal-info-email"] || "Email:"}</strong>
						{translations?.["personal-info-email-value"] ||
							"ketutshridhara@gmail.com"}
					</p>
					<p className="semibold text-justify">
						<strong>
							{translations?.["personal-info-birth-date"] || "Birth Date:"}
						</strong>
						{translations?.["personal-info-birth-date-value"] || "12 Maret 2007"}
					</p>
				</div>
			</CollapsedContent>

			<CollapsedContent
				title={translations?.["education"] || "Education"}
				Icon={GraduationCap}
			>
				<div className="flex flex-col md:flex-row w-full justify-center gap-12">
					{educationLength &&
						Array.from({
							length: educationLength,
						}).map((_, index) => {
							const first = index === 0;
							const last = index === educationLength - 1;
							return (
								<motion.div
									key={index}
									className="relative"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										delay: index * 0.2,
									}}
								>
									{/* VERTICAL line for mobile view */}
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: "100%" }}
										transition={{
											duration: 0.5,
											delay: index * 0.2 + 0.5,
										}}
										className={`md:hidden absolute left-5 w-0.5 bg-gray-300
											${first ? "top-1/2 h-1/2" : last ? "-top-1/2 h-1/2" : "top-0 h-full"}
											`}
									/>

									{/* HORIZONTAL line for desktop view */}
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: "100%" }}
										transition={{
											duration: 0.5,
											delay: index * 0.2 + 0.5,
										}}
										className={`hidden md:block absolute top-5 h-0.5 bg-gray-300
									${first ? "left-1/2 w-1/2" : last ? "-left-1/2 w-1/2" : "left-0 w-full"}`}
									/>

									{/* The Icon and Content Container */}
									<div className="relative flex flex-row md:flex-col items-center z-10">
										{/* Icon with background to "cut" the line */}
										<div className="bg-white dark:bg-zinc-900 p-1 rounded-full border-2 border-zinc-200 dark:border-zinc-800 md:mx-auto">
											<CircleCheck
												className="text-blue-600 dark:text-blue-500"
												size={30}
												strokeWidth={2}
											/>
										</div>

										{/* Text content */}
										<div className="pl-5 md:pl-0 md:text-center md:mt-4">
											<p className="text-sm font-bold text-gray-700 dark:text-gray-300">
												{translations?.[`education-${index}-year`] || "Year"}
											</p>
											<div className="mt-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm min-w-[220px]">
												<h3 className="font-bold">
													{translations?.[`education-${index}-title`] || "Title"}
												</h3>
												<p className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-1">
													{translations?.[`education-${index}-institution`] || "Institution"}
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
				</div>
			</CollapsedContent>
		</motion.div>
	);
}
