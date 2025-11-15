import { useState } from "react";
import ListCards from "../components/ListCards";
import { useData } from "../contexts/useData";
import Button from "../components/Button";
import {
	Building2,
	ClipboardCheck,
	Compass,
	Flag,
	Globe,
	Info,
	Trophy,
	Users,
} from "lucide-react";
import DetailsModal from "../components/DetailsModal";
import ImagesSlider from "../components/ImagesSlider";

export default function Achievements() {
	const {
		translations: { achievements: translations, sorting },
		achievements,
	} = useData();
	const [sort, setSort] = useState("");

	return (
		<ListCards
			title={translations?.["achievements-list"] || "Achievements List"}
			dataSet={achievements}
			searchConfig={{
				placeholder: "Search",
				fieldSearch: "name",
				wrapperClassName: "col-span-1",
			}}
			filterConfig={{
				canReset: false,
				groupClassName: "col-span-1",
				selectField: [
					{
						name: "sort",
						label: translations?.["sort-by"] || "sort by (default: newest)",
						ariaLabel:
							translations?.["sort-achievements-by"] || "sort achievements by",
						defaultValue:
							sorting?.["newest"] || translations?.["newest"] || "newest",
						options: [
							{
								label:
									sorting?.["oldest"] || translations?.["oldest"] || "Oldest",
								value: "oldest",
							},
							{
								label:
									sorting?.["name-asc"] ||
									translations?.["name-asc"] ||
									"Name (A-Z)",
								value: "name-asc",
								sortingMethod: (a, b) => {
									return a.name.localeCompare(b.name);
								},
							},
							{
								label:
									sorting?.["name-desc"] ||
									translations?.["name-desc"] ||
									"Name (Z-A)",
								value: "name-desc",
								sortingMethod: (a, b) => {
									return b.name.localeCompare(a.name);
								},
							},
						],
						setValue: setSort,
						value: sort,
						wrapperClassName: "w-full",
					},
				],
			}}
			controlsClassName="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
			cardConfig={{
				titleField: "name",
				imageField: "thumbnail",
				placeholderImage: "/placeholder_achievement.avif",
				buttons: {
					leftButton: (data) =>
						(() => {
							const IconType = (() => {
								switch (data.type) {
									case "orientation":
										return Compass;
									case "competition":
										return Trophy;
									case "training":
										return ClipboardCheck;
									case "seminar":
										return Users;
									default:
										return Info;
								}
							})();
							const IconScope = (() => {
								switch (data.scope) {
									case "institutional":
										return Building2;
									case "national":
										return Flag;
									case "international":
										return Globe;
									default:
										return Info;
								}
							})();

							return (
								<>
									<Button
										ariaLabel="type of achievement"
										tooltip={data.type}
									>
										<IconType size={20} />
									</Button>
									<Button
										ariaLabel="category of achievement"
										tooltip={data.category}
									>
										<Info size={20} />
									</Button>
									<Button
										ariaLabel="scope of achievement"
										tooltip={data.scope}
									>
										<IconScope size={20} />
									</Button>
								</>
							);
						})(),
					rightButton: (_, setOpenModal) => (
						<Button ariaLabel="view details of achievement" onClick={() => setOpenModal(true)}>
							<Info size={15} />
						</Button>
					),
				},
			}}
			modal={(achievement, setOpenModal) => (
				<DetailsModal
					data={achievement}
					close={() => setOpenModal(false)}
					translations={translations}
					titleField="name"
					descriptionField="description"
					tagsField="skills"
					mediaPanel={
						<ImagesSlider
							images={[
								achievement.thumbnail,
								...achievement.images,
							]}
							placeholderImage="/placeholder_achievement.avif"
						/>
					}
				/>
			)}
		/>
	);
}
