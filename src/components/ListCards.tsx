import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { File, RefreshCcw, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import OptimizedImage from "./OptimizedImage";

interface CardConfig<TData extends Record<string, unknown>> {
	titleField?: keyof TData;
	imageField: keyof TData;
	placeholderImage: string;
	buttons: {
		leftButton?: (
			data: TData,
			setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		) => React.ReactNode;
		rightButton?: (
			data: TData,
			setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		) => React.ReactNode;
	};
}

interface ListCardsProps<TData extends Record<string, unknown>> {
	title: string;
	dataSet: TData[];
	searchConfig?: {
		placeholder: string;
		fieldSearch: keyof TData;
	};
	filterConfig: {
		canReset?: boolean;
		selectField: {
			name: string;
			label: string;
			ariaLabel?: string;
			defaultValue?: string;
			options: {
				label: string;
				value: string;
				sortingMethod?: (a: TData, b: TData) => number;
			}[];
			setValue: React.Dispatch<React.SetStateAction<string>>;
			value: string;
		}[];
		selectFieldClassName?: string;
	};
	cardConfig?: CardConfig<TData>;
	CustomCard?: (
		data: TData,
		index: number,
		search: string,
		modal?: (
			data: TData,
			setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
		) => React.ReactNode,
	) => React.ReactNode;
	modal?: (
		data: TData,
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
	) => React.ReactNode;
}

function ListCards<TData extends Record<string, unknown>>({
	title,
	dataSet,
	searchConfig,
	filterConfig,
	cardConfig,
	CustomCard,
	modal,
}: ListCardsProps<TData>) {
	const titleCardKey =
		cardConfig &&
		((cardConfig.titleField || searchConfig?.fieldSearch) as
			| string
			| undefined);
	const [search, setSearch] = useState("");
	const groupedSelectFields = useMemo(() => {
		if (filterConfig.selectFieldClassName) {
			return [filterConfig.selectField];
		}
		const result = [];
		const chunkSize = 2;
		for (let i = 0; i < filterConfig.selectField.length; i += chunkSize) {
			result.push(filterConfig.selectField.slice(i, i + chunkSize));
		}
		return result;
	}, [filterConfig.selectField, filterConfig.selectFieldClassName]);

	function getValueByPath(obj: unknown, path: string | string[]): unknown {
		// Convert path to an array if it's a string
		const parts = Array.isArray(path) ? path : path.split(".");

		// Destructure the first part and the rest of the path
		const [currentPart, ...remainingParts] = parts;

		// If the object is null/undefined or the path is exhausted, return the object
		if (obj == null || currentPart === undefined) {
			return obj;
		}

		if (currentPart === "*") {
			// If we hit a wildcard, the current value must be an array
			if (!Array.isArray(obj)) {
				return undefined;
			}

			// If there are no more parts, return the array
			if (remainingParts.length === 0) {
				return obj;
			}

			// Map over the array and get the value for each item
			return obj.map((item) => getValueByPath(item, remainingParts));
		}

		// If it's a normal key, just move to the next level of the object
		// and recurse with the rest of the path.
		return getValueByPath((obj as Record<string, unknown>)[currentPart], remainingParts);
	}

	const processedData = useMemo(() => {
		const filtered = dataSet.filter((data) => {
			const inFilter = filterConfig.selectField.every((select) => {
				if (select.name === "sort") return true; // Skip the sort field
				const value = getValueByPath(data, select.name);
				const checkIfArray = Array.isArray(value);
				return (
					select.value === "" ||
					(checkIfArray
						? (value as string[]).includes(select.value)
						: (value as string) === select.value)
				);
			});

			const inSearch =
				search === "" ||
				((data as Record<string, unknown>)[(searchConfig?.fieldSearch as string) || "name"] as string)
					.toLowerCase()
					.includes(search.toLowerCase());

			return inFilter && inSearch;
		});

		// Find the select field that controls sorting
		const sortController = filterConfig.selectField.find(
			(field) => field.name === "sort",
		);
		const selectedValue = sortController?.value;
		const selectedOption = sortController?.options.find(
			(opt) => opt.value === selectedValue,
		);
		const activeSortMethod = selectedOption?.sortingMethod;

		if (activeSortMethod) {
			return [...filtered].sort(activeSortMethod);
		} else if (selectedValue === "oldest") {
			// If "Oldest" is selected, return the original filtered order.
			return filtered;
		} else {
			// For any other case (including the default 'newest-default'), reverse.
			return filtered.reverse();
		}
	}, [
		dataSet,
		search,
		filterConfig.selectField,
	]);

	return (
		<div className="col-span-full flex flex-col gap-4">
			{/* Headline of the section */}
			<motion.div
				initial={{ rotateX: -90 }}
				animate={{ rotateX: 0 }}
				exit={{ rotateX: 90 }}
				transition={{ duration: 0.5 }}
				className="font-bold  px-4 py-2 flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
			>
				<File size={25} />
				<h1 className="text-md">{title}</h1>
				<p>({processedData.length})</p>
			</motion.div>

			<div
				className={`flex flex-col gap-2 ${searchConfig ? "lg:flex-row lg:bg-white lg:dark:bg-zinc-900 lg:border-2 dark:border-zinc-600 lg:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""}`}
			>
				{/* Search bar */}
				{searchConfig && (
					<motion.div
						initial={{ rotateX: -90 }}
						animate={{ rotateX: 0 }}
						exit={{ rotateX: 90 }}
						transition={{ duration: 0.5 }}
						whileTap={{ scale: 0.95 }}
						aria-label="Search bar"
						className="px-4 py-2 w-full flex-1 flex gap-2 items-center bg-white dark:bg-zinc-900 border-2 lg:border-0 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-none relative z-10"
					>
						<Search size={25} />
						<input
							type="search"
							placeholder={searchConfig.placeholder}
							className="w-full bg-transparent outline-none font-bold"
							value={search}
							onChange={(e) => {
								e.preventDefault();
								setSearch(e.target.value);
							}}
						/>
					</motion.div>
				)}

				{/* Filters */}
				{groupedSelectFields.map((group, groupIndex) => (
					<motion.div
						key={groupIndex}
						initial={{ rotateX: -90 }}
						animate={{ rotateX: 0 }}
						exit={{ rotateX: 90 }}
						transition={{ duration: 0.5 }}
						className={`flex flex-row gap-2 items-stretch ${filterConfig.selectFieldClassName || ""}`}
					>
						{group.map((field, index) => (
							<div key={field.name + index} className="flex-1 min-w-[120px]">
								<div className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
									<motion.select
								key={field.name + index}
								whileTap={{ scale: 0.95 }}
								value={field.value}
								onChange={(e) => {
									e.preventDefault();
									field.setValue(e.target.value);
								}}
								aria-label={field.ariaLabel}
								title={
									field.options.find(
										(opt) => opt.value === field.value,
									)?.label || field.label
								}
								className={`min-w-0 w-full sm:flex-1 text-sm lg:text-base truncate cursor-pointer px-2 py-2 font-bold uppercase h-10 dark:border-zinc-600 outline-none transition-all duration-200
									${searchConfig ? "lg:border-l-4" : ""} ${index === 1 ? "sm:border-l-4" : ""}`}
							>
								<option value="" className="dark:bg-zinc-900">
									{(field.defaultValue || field.label)
										.replace("_", " ")
										.toUpperCase()}
								</option>

								{field.options.map((option, index) => (
									<option key={index} value={option.value} className="dark:bg-zinc-900">
										{option.label
											.replace("_", " ")
											.toUpperCase()}
									</option>
								))}
							</motion.select>
							</div>
						</div>
						))}

						{/* Reset filters */}
						{filterConfig.canReset &&
							groupIndex === groupedSelectFields.length - 1 && (
								<div className="flex-none">
									<div className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
										<motion.button
												onClick={(e) => {
													e.preventDefault();
													filterConfig.selectField.forEach(
														(field) => {
															field.setValue("");
														},
													);
													setSearch("");
												}}
												whileHover={{ scale: 0.9 }}
												whileTap={{ scale: 0.95, x: 2, y: 2 }}
												aria-label="reset filters"
												className="cursor-pointer w-10 h-10 p-0 transition-all duration-200 hover:shadow-none"
											>
												<RefreshCcw size={20} />
											</motion.button>
										</div>
								</div>
							)}
					</motion.div>
				))}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-0">
				<AnimatePresence>
					{processedData.map((data, index) => {
						const key = titleCardKey
							? `${String(data?.[titleCardKey])}-${index}`
							: index;

						if (CustomCard) {
							return (
								<React.Fragment key={key}>
									{CustomCard(data, index, search, modal)}
								</React.Fragment>
							);
						}
						if (cardConfig) {
							return (
								<Card
									key={key}
									data={data}
									index={index}
									modal={modal}
									search={search}
									cardConfig={cardConfig}
									titleCardKey={titleCardKey}
								/>
							);
						}
						return null;
					})}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default memo(ListCards, (prevProps, nextProps) => {
	// Custom comparison function for memoization
	return (
		prevProps.title === nextProps.title &&
		prevProps.dataSet === nextProps.dataSet &&
		prevProps.searchConfig === nextProps.searchConfig
	);
}) as <TData extends Record<string, unknown>>(props: ListCardsProps<TData>) => React.JSX.Element;

interface CardProps<T extends Record<string, unknown>> {
	data: ListCardsProps<T>["dataSet"][number];
	index: number;
	modal?: ListCardsProps<T>["modal"];
	search: string;
	cardConfig: CardConfig<T>;
	titleCardKey: string | undefined;
}

function Card<T extends Record<string, unknown>>({
	data,
	index,
	modal,
	search,
	cardConfig,
	titleCardKey,
}: CardProps<T>) {
	const [openModal, setOpenModal] = useState(false);
	function Highlight({ text }: { text: string }) {
		if (!search.trim()) {
			return <span>{text}</span>;
		}
		const regex = new RegExp(`(${search})`, "gi");
		const parts = text.split(regex);

		return (
			<span>
				{parts.map((part, i) =>
					regex.test(part) ? (
						<mark key={i} className="bg-yellow-500">
							{part}
						</mark>
					) : (
						<span key={i}>{part}</span>
					),
				)}
			</span>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.2, delay: index * 0.08 }}
			className="flex flex-col bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
		>
			<div
				className="group relative flex-1"
				onClick={() => setOpenModal(true)}
			>
				<OptimizedImage
					src={
						(data?.[cardConfig.imageField] as string)?.trim() ||
						cardConfig.placeholderImage
					}
					alt="project"
					width={400}
					height={250}
					loading="lazy"
					decoding="async"
					placeholder={cardConfig.placeholderImage}
					className="w-full h-full object-cover"
				/>
			</div>

			{titleCardKey && (data?.[titleCardKey] as string) && (
				<div className="px-4 py-3 border-t-4 border-zinc-900 dark:border-zinc-600">
					<h1 className="font-bold text-xl text-center uppercase">
						<Highlight text={data?.[titleCardKey] as string} />
					</h1>
				</div>
			)}

			{(cardConfig.buttons.leftButton ||
				cardConfig.buttons.rightButton) && (
				<div className="flex justify-between px-4 py-2 border-t-4 dark:border-zinc-600">
					<div className="flex items-center gap-2">
						{cardConfig.buttons.leftButton &&
							cardConfig.buttons.leftButton(data, setOpenModal)}
					</div>

					<div className="flex items-center gap-2">
						{cardConfig.buttons.rightButton &&
							cardConfig.buttons.rightButton(data, setOpenModal)}
					</div>
				</div>
			)}

			<AnimatePresence>
				{openModal && modal && modal(data, setOpenModal)}
			</AnimatePresence>
		</motion.div>
	);
}