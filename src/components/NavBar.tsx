import { motion } from "framer-motion";
import { BookOpen, Trophy, User, Folder, GitBranch } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useEffect, useRef, useState } from "react";
import { parentVariants, tooltipVariants } from "./NavBarVariants";

export default function NavBar() {
	const {
		currentLang,
		translations: { navbar: translations },
	} = useData();
	const basePath = useLocation().pathname.split("/")?.[2] || "";

	const [isDesktop, setIsDekstop] = useState(window.innerWidth >= 768);

	useEffect(() => {
		const handleResize = () => setIsDekstop(window.innerWidth >= 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<motion.nav
			className="z-100 fixed w-full md:w-auto px-4 py-2 bottom-0 md:bottom-8 md:rounded-lg left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 shadow-lg md:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
			border-t-1 md:border-l-1 border-zinc-900 dark:border-zinc-600"
		>
			{isDesktop ? (
				<DekstopNavBar
					currentLang={currentLang}
					basePath={basePath}
					translations={translations}
				/>
			) : (
				<MobileNavBar
					currentLang={currentLang}
					basePath={basePath}
					translations={translations}
				/>
			)}
		</motion.nav>
	);
}

const getMenus = (translations: Record<string, string>) => [
	{
		name: translations?.["blog"] || "Blog",
		path: "blog",
		Icon: BookOpen,
	},
	{
		name: translations?.["achievements"] || "Achievements",
		path: "achievements",
		Icon: Trophy,
	},
	{
		name: translations?.["profile"] || "Profile",
		path: "",
		Icon: User,
	},
	{
		name: translations?.["projects"] || "Projects",
		path: "projects",
		Icon: Folder,
	},
	{
		name: translations?.["contributions"] || "Stats",
		path: "stats",
		Icon: GitBranch,
	},
];


function DekstopNavBar({
	currentLang,
	basePath,
	translations,
}: {
	currentLang: string;
	basePath: string;
	translations: Record<string, string>;
}) {
	return (
		<ul className="flex gap-4 items-center justify-center">
			{getMenus(translations).map(({ name, path, Icon }) => (
				<motion.li
					key={name}
					initial="hidden"
					whileHover="visible"
					variants={parentVariants}
					className="relative"
				>
					<motion.div
						variants={tooltipVariants}
						className="px-1.5 py-1 absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 rounded-md border-2 border-zinc-900 dark:border-zinc-300
                            after:content-[''] after:absolute after:-bottom-1/2 after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-zinc-900 dark:after:border-t-zinc-300"
					>
						<span className="text-sm font-bold text-nowrap">
							{name}
						</span>
					</motion.div>

					<Link
						aria-label={name}
						to={`/${currentLang}${path ? `/${path}` : ""}`}
						className={`md:px-1 md:py-1.5 rounded flex flex-col items-center transition-all duration-300 hover:shadow-none
                                ${
									basePath === path
										? "bg-black dark:bg-white text-white dark:text-black"
										: "hover:bg-zinc-800 dark:hover:bg-zinc-300 hover:text-white dark:hover:text-black active:translate-x-0.5 active:translate-y-0.5"
								}
                                `}
					>
						<Icon size={30} />
					</Link>
				</motion.li>
			))}
		</ul>
	);
}

function MobileNavBar({
	currentLang,
	basePath,
	translations,
}: {
	currentLang: string;
	basePath: string;
	translations: Record<string, string>;
}) {
	const menusRef = useRef<Record<string, HTMLAnchorElement | null>>({});
	const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

	// This effect runs whenever the menu changes
	useEffect(() => {
		const handleResize = () => {
			const activeMenuNode = menusRef.current[basePath];

			if (activeMenuNode) {
				setUnderlineStyle({
					left: activeMenuNode.offsetLeft + 5,
					width: activeMenuNode.offsetWidth - 10,
				});
			}
		};

		handleResize();

		// Add event listener for window resize
		window.addEventListener("resize", handleResize);

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [basePath, menusRef]);
	return (
		<div className="relative">
			<ul className="flex items-center justify-around mb-1">
				{getMenus(translations).map(({ name, path, Icon }) => (
					<motion.li key={name} className="flex-1">
						<Link
							ref={(el) => {
								menusRef.current[path] = el;
							}}
							aria-label={name}
							to={`/${currentLang}${path ? `/${path}` : ""}`}
							className="flex flex-col items-center justify-center py-1"
						>
							<Icon size={19} />
							<span className="text-[0.6rem] font-bold mt-0.5">{name}</span>
						</Link>
					</motion.li>
				))}
			</ul>
			{/* Tab Indicator for small screens */}
			<div
				className="absolute -bottom-1.5 h-[0.3rem] bg-black dark:bg-white transition-all duration-300 rounded-xl"
				style={underlineStyle}
			/>
		</div>
	);
}
