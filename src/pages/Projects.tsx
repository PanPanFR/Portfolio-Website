import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import ListCards from "../components/ListCards";
import Button from "../components/Button";
import { IframeMedia } from "../components/IframeMedia";
import ImagesSlider from "../components/ImagesSlider";
import DetailsModal from "../components/DetailsModal";
import { Globe, TerminalSquare, Info, ExternalLink, BrainCircuit } from "lucide-react";

export default function Projects() {
	const {
		projects,
		translations: { projects: translations, sorting },
	} = useData();
	const [type, setType] = useState("");
	const [techStack, setTechStack] = useState("");
	const [sort, setSort] = useState("");

	const types = [...new Set(projects.map((project) => project.type))].sort();
	const techStacks = [
		...new Set(projects.flatMap((project) => project.tech_stack)),
	].sort();

	return (
		<div className="mt-auto pb-4">
			<ListCards
				title={translations?.["projects-list"] || "Projects List"}
				dataSet={projects}
				searchConfig={{
					placeholder:
						translations?.["search-placeholder"] || "Search by name",
					fieldSearch: "name",
				}}
				filterConfig={{
					canReset: true,
					selectField: [
						{
							name: "type",
							label: translations?.["type"] || "type",
							ariaLabel: "choose type of project",
							options: types.map((type) => ({
								label: type,
								value: type,
							})),
							setValue: setType,
							value: type,
						},
						{
							name: "tech_stack",
							label: translations?.["tech-stack"] || "tech_stack",
							ariaLabel: "choose tech stack",
							options: techStacks.map((techStack) => ({
								label: techStack,
								value: techStack,
							})),
							setValue: setTechStack,
							value: techStack,
						},
						{
							name: "sort",
							label: translations?.["sort-by"] || "sort by (default: newest)",
							ariaLabel: translations?.["sort-projects-by"] || "sort projects by",
							defaultValue: sorting?.["newest"] || translations?.["newest"] || "newest",
							options: [
								{
									label: sorting?.["oldest"] || translations?.["oldest"] || "Oldest",
									value: "oldest",
								},
								{
									label: sorting?.["name-asc"] || translations?.["name-asc"] || "Name (A-Z)",
									value: "name-asc",
									sortingMethod: (a, b) => {
										return a.name.localeCompare(b.name);
									},
								},
								{
									label: sorting?.["name-desc"] || translations?.["name-desc"] || "Name (Z-A)",
									value: "name-desc",
									sortingMethod: (a, b) => {
										return b.name.localeCompare(a.name);
									},
								},
							],
							setValue: setSort,
							value: sort,
						},
					],
				}}
				cardConfig={{
					imageField: "thumbnail",
					placeholderImage: "/placeholder_project.avif",
					buttons: {
						leftButton: (data) =>
							(() => {
								const Icon = (() => {
									switch (data.type) {
										case "website":
											return Globe;
										case "cli_tool":
											return TerminalSquare;
										case "ml_model":
											return BrainCircuit;
										default:
											return Info;
									}
								})();
								return (
									<Button
														ariaLabel="type of project"
														tooltip={data.type}
													>
														<Icon size={20} />
													</Button>
								);
							})(),
						rightButton: (data, setOpenModal) => (
							<>
								<Button
											ariaLabel="view details of project"
											onClick={() => setOpenModal(true)}
										>
											<Info size={12} />
										</Button>
										{data.github_link && (
											<Button
												href={data.github_link}
												ariaLabel={`Github link for project ${data.name}`}
											>
												<img
													src="/github.svg"
													alt="github"
													width={12}
													height={12}
													className="dark:invert"
												/>
											</Button>
										)}
										{data.link && (
											<Button
												href={data.link}
												ariaLabel={`External link for project ${data.name}`}
											>
												<ExternalLink size={12} />
											</Button>
										)}
							</>
						),
					},
				}}
				modal={(project, setOpenModal) => (
					<DetailsModal
						close={() => setOpenModal(false)}
						data={project}
						translations={translations}
						descriptionField="description"
						titleField="name"
						tagsField="tech_stack"
						externalLinkField="link"
						mediaPanel={
							project.type === "website" ? (
								<IframeMedia link={project.link} />
							) : (
								<ImagesSlider
									images={[project.thumbnail, ...project.images]}
									placeholderImage="/placeholder_project.avif"
								/>
							)
						}
					/>
				)}
			/>
		</div>
	);
}