import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronDown,
	CircleCheck,
	GraduationCap,
	Info,
	UserSearch,
	type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useData } from "../contexts/useData";
import TechStackLogos from "../components/TechStackLogos";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";

function getThemedIconUrl(baseUrl: string | undefined, darkMode: boolean) {
	if (!baseUrl) {
		return undefined;
	}

	try {
		const url = new URL(baseUrl);
		const colorParam = darkMode ? "000000" : "FFFFFF";
		if (url.searchParams.has("color")) {
			url.searchParams.set("color", colorParam);
		} else {
			url.searchParams.append("color", colorParam);
		}
		return url.toString();
	} catch (error) {
		console.warn("Invalid currently learning icon URL:", baseUrl, error);
		return undefined;
	}
}

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
    const { translations, currentlyLearning, currentLang } = useData();
    const { darkMode } = useTheme();
	const techTranslations = (translations?.["techStack"] as Record<string, string>) || {};
	const detailsTranslations = (translations?.["details"] as Record<string, string>) || {};
	const email = detailsTranslations?.["personal-info-email-value"] || "ketutshridhara@gmail.com";
	const projectsHref = `/${currentLang || "en"}/projects`;
	const connectHref = `mailto:${email}`;

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="col-span-4 bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6"
			>
				<h3 className="text-lg md:text-xl font-bold mb-4">
					{techTranslations?.["tech-stack-title"] || "Tech Stack"}
				</h3>
				<div className="py-4 overflow-hidden">
					<TechStackLogos />
				</div>
			</motion.div>

			<section className="col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 flex flex-col gap-4"
				>
					<div>
						<h3 className="text-lg md:text-xl font-bold">
							{techTranslations?.["currently-learning-title"] || "Currently Learning"}
						</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
							{techTranslations?.["currently-learning-description"] || "Latest technologies I'm exploring to sharpen my skills."}
						</p>
					</div>
                    {currentlyLearning.length > 0 ? (
                        <ul className="space-y-3">
                            {currentlyLearning.map((item, index) => {
                                const themedIcon = getThemedIconUrl(item.icon, darkMode);

                                const content = (
                                    <div className="flex items-start gap-3">
                                        {themedIcon ? (
                                            <img
                                                src={themedIcon}
                                                alt={item.name}
                                                loading="lazy"
                                                decoding="async"
                                                className="h-10 w-10 flex-shrink-0 rounded-md border border-black/20 bg-white object-contain p-1 dark:border-white/30"
                                            />
                                        ) : null}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm md:text-base leading-tight">
                                                {item.name}
                                            </span>
                                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-snug">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );

                                if (!item.link) {
					return (
						<motion.li
							key={`${item.name}-${index}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							whileHover={{ y: -4 }}
							transition={{ duration: 0.2, delay: 0.15 + index * 0.08 }}
							className="rounded-lg border-2 border-black dark:border-zinc-600 bg-gray-50 dark:bg-zinc-800 p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
						>
							{content}
						</motion.li>
					);
                                }

                                return (
                                    <motion.li
                                        key={`${item.name}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: 0.15 + index * 0.08 }}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ y: 0 }}
                                        className="rounded-lg border-2 border-black dark:border-zinc-600 bg-gray-50 dark:bg-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                                    >
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-full w-full items-start gap-3 rounded-md p-3 cursor-pointer transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-800"
                                        >
                                            {content}
                                        </a>
                                    </motion.li>
                                );
                            })}
                        </ul>
					) : (
						<p className="text-sm text-gray-500 dark:text-gray-400">
							No active learning items at the moment.
						</p>
					)}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 flex flex-col gap-4"
				>
					<div>
						<h3 className="text-lg md:text-xl font-bold">Let's Collaborate</h3>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
							Looking for a teammate or curious about my work? Pick a button below and let's make something great.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
						<Link
							to={projectsHref}
					className="flex-1 min-w-[160px] px-4 py-3 text-center font-bold border-2 border-black dark:border-white bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] cursor-pointer"
						>
							View My Projects
						</Link>
						<button
							type="button"
							onClick={() => console.info("Download CV placeholder: attach your resume link when ready.")}
					className="flex-1 min-w-[160px] px-4 py-3 font-bold border-2 border-dashed border-black dark:border-white bg-white dark:bg-zinc-900 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed"
							aria-disabled
						>
							Download CV
						</button>
						<a
							href={connectHref}
					className="flex-1 min-w-[160px] px-4 py-3 text-center font-bold border-2 border-black dark:border-white bg-white text-black dark:bg-zinc-900 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-yellow-200/40 dark:hover:bg-yellow-300/20 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] cursor-pointer"
						>
							Let’s Connect
						</a>
					</div>
				</motion.div>
			</section>
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
						className="mt-4 w-full px-2 md:px-0"
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
				<div className="flex w-full flex-col items-center gap-0.5 sm:gap-1.5 md:grid md:grid-cols-3 md:items-start md:justify-items-center md:gap-2.5">
					{educationLength &&
						Array.from({ length: educationLength }).map((_, index) => {
							const first = index === 0;
							const last = index === educationLength - 1;
							return (
							<motion.div
									key={index}
								className="relative flex w-full justify-center"
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
									className={`hidden md:block absolute top-5 h-0.5 bg-gray-300 dark:bg-zinc-700
										${first ? "left-1/2 w-1/2" : last ? "-left-1/2 w-1/2" : "left-0 w-full"}`}
								/>

								{/* The Icon and Content Container */}
								<div className="relative z-10 flex w-full max-w-xs flex-row items-start md:max-w-none md:flex-col md:items-center md:px-2">
									{/* Icon with background to "cut" the line */}
									<div className="bg-white dark:bg-zinc-900 p-1 rounded-full border-2 border-black dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:mx-auto">
										<CircleCheck
											className="text-blue-600 dark:text-blue-500"
											size={30}
											strokeWidth={2}
										/>
									</div>

									{/* Text content */}
								<div className="w-full pl-5 mt-1 md:mt-1 md:pl-0 md:text-center">
										<p className="text-sm font-bold text-gray-700 dark:text-gray-300">
											{translations?.[`education-${index}-year`] || "Year"}
										</p>
									<div className="mt-1 flex h-[132px] w-full flex-col justify-between gap-1.5 border-2 border-black bg-white px-3 py-3 text-left shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-600 dark:bg-zinc-900 md:h-[126px] md:px-4 md:text-center md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
											<h3 className="text-sm font-bold md:text-base">
												{translations?.[`education-${index}-title`] || "Title"}
											</h3>
											<p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 sm:text-xs md:text-xs">
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
