import { type Variants } from "framer-motion";

export const parentVariants: Variants = {
	hidden: { opacity: 1 },
	visible: { opacity: 1 },
};

export const tooltipVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};