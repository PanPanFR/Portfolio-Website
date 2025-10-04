import { useState } from "react";
import { useData } from "../contexts/DataProvider";
import ListCards from "../components/ListCards";
import DetailsModal from "../components/DetailsModal";
import { IframeMedia } from "../components/IframeMedia";
import ImagesSlider from "../components/ImagesSlider";
import Button from "../components/Button";
import {
	Globe,
	TerminalSquare,
	Info,
	ExternalLink,
	BrainCircuit,
} from "lucide-react";

export default function Projects() {
	const { projects, translations } = useData();
	const [type, setType] = useState("");

	// Get unique types for filter options
	const types: string[] = [...new Set(projects.map((project) => project.type))].sort();

	return (
		<ListCards
				title={(translations?.["projects"]?.["projects-list"] as string) || "Projects List"}
				dataSet={projects}
				searchConfig={{
					placeholder: "Search",
					fieldSearch: "name",
				}}
				filterConfig={{
					canReset: false,
					selectFieldClassName: "flex-row flex-wrap items-center",
					selectField: [
						{
							name: "type",
							label: (translations?.["projects"]?.["type"] as string) || "type",
							ariaLabel: "choose type of project",
							options: types.map((type) => ({
								label: type,
								value: type,
							})),
							setValue: setType,
							value: type,
						},
					],
				}}
				cardConfig={{
					titleField: "name",
					imageField: "thumbnail",
					placeholderImage: "/placeholder_project.avif",
					buttons: {
						leftButton: (data) => {
							const isAiProject = data.tech_stack.some((tech: string) =>
								tech.toLowerCase().includes("ai")
							);
							return isAiProject ? (
								<Button ariaLabel="ai project" tooltip={(translations?.["projects"]?.["ai-project"] as string) || "AI Project"}>
									<BrainCircuit size={20} />
								</Button>
							) : null;
						},
						rightButton: (data, setOpenModal) => (
							<>
								<Button ariaLabel="view details of project" onClick={() => setOpenModal(true)}>
									<Info size={12} />
								</Button>
								{data.github_link && (
									<Button href={data.github_link} ariaLabel="external link to github">
										<Globe size={12} />
									</Button>
								)}
								{data.demo_link && (
									<a
										href={data.demo_link}
										aria-label="external link to demo"
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
									>
										<TerminalSquare size={12} />
									</a>
								)}
								{data.link && (
									<Button href={data.link} ariaLabel="external link to project">
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
						translations={translations?.["projects"] as Record<string, string> || {}}
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
	);
}
