import { type Variants } from "framer-motion";

export const parentVariants: Variants = {
	hidden: {
		scale: 1,
		x: 0,
		y: 0,
		transition: { duration: 0.2 },
	},
	visible: {
		scale: 0.95,
		x: 2,
		y: 2,
		transition: { duration: 0.2 },
	},
};

export const tooltipVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -10,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};