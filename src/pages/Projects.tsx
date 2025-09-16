import { useState } from "react";
import { useData } from "../contexts/DataContext";
import ListCards from "../components/ListCards";
import DetailsModal from "../components/DetailsModal";
import { IframeMedia } from "../components/IframeMedia";
import ImagesSlider from "../components/ImagesSlider";
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
	const [techStack, setTechStack] = useState("");

	// Get unique types and tech stacks for filter options
	const types: string[] = [...new Set(projects.map((project) => project.type))].sort();
	const techStacks: string[] = [
		...new Set(projects.flatMap((project) => project.tech_stack)),
	].sort();

	return (
		<div className="mt-auto pb-4">
			<ListCards
				title={(translations?.["projects"]?.["projects-list"] as string) || "Projects List"}
				dataSet={projects}
				searchConfig={{
					placeholder:
						(translations?.["projects"]?.["search-placeholder"] as string) || "Search by name",
					fieldSearch: "name",
				}}
				filterConfig={{
					canReset: true,
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
						{
							name: "tech_stack",
							label: (translations?.["projects"]?.["tech-stack"] as string) || "tech_stack",
							ariaLabel: "choose tech stack of project",
							options: techStacks.map((tech) => ({
								label: tech,
								value: tech,
							})),
							setValue: setTechStack,
							value: techStack,
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
								<button
									aria-label="ai project"
									title={(translations?.["projects"]?.["ai-project"] as string) || "AI Project"}
									className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
								>
									<BrainCircuit size={20} />
								</button>
							) : null;
						},
						rightButton: (data, setOpenModal) => (
							<>
								<a
									href="#"
									aria-label="view details of project"
									onClick={(e) => {
										e.preventDefault();
										setOpenModal(true);
									}}
									className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
								>
									<Info size={12} />
								</a>
								{data.github_link && (
									<a
										href={data.github_link}
										aria-label="external link to github"
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
									>
										<Globe size={12} />
									</a>
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
									<a
										href={data.link}
										aria-label="external link to project"
										target="_blank"
										rel="noopener noreferrer"
										className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
									>
										<ExternalLink size={12} />
									</a>
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
		</div>
	);
}