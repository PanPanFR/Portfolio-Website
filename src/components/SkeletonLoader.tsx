import { motion } from "framer-motion";

interface SkeletonLoaderProps {
	width?: string;
	height?: string;
	className?: string;
	variant?: "text" | "rectangular" | "circular";
}

export default function SkeletonLoader({ 
	width = "100%", 
	height = "20px", 
	className = "",
	variant = "rectangular"
}: SkeletonLoaderProps) {
	const getVariantClass = () => {
		switch (variant) {
			case "text":
				return "h-4 w-full rounded";
			case "circular":
				return "rounded-full aspect-square";
			case "rectangular":
			default:
				return "rounded";
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={`skeleton ${getVariantClass()} ${className}`}
			style={{ width, height }}
		/>
	);
}

// Skeleton components for common use cases
export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
	return (
		<div className={`space-y-2 ${className}`}>
			{Array.from({ length: lines }).map((_, index) => (
				<SkeletonLoader
					key={index}
					height="16px"
					width={index === lines - 1 ? "75%" : "100%"}
					variant="text"
				/>
			))}
		</div>
	);
}

export function SkeletonCard({ className = "" }: { className?: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className={`p-4 border rounded-lg ${className}`}
		>
			<div className="flex items-center space-x-3 mb-3">
				<SkeletonLoader variant="circular" width="40px" height="40px" />
				<div className="flex-1">
					<SkeletonLoader height="16px" width="60%" className="mb-2" />
					<SkeletonLoader height="12px" width="40%" />
				</div>
			</div>
			<SkeletonText lines={2} />
		</motion.div>
	);
}

export function SkeletonProfile({ className = "" }: { className?: string }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={`flex flex-col items-center text-center ${className}`}
		>
			<SkeletonLoader 
				variant="circular" 
				width="120px" 
				height="120px" 
				className="mb-4" 
			/>
			<SkeletonLoader height="24px" width="200px" className="mb-2" />
			<SkeletonLoader height="16px" width="150px" className="mb-4" />
			<SkeletonText lines={3} className="max-w-md" />
		</motion.div>
	);
}
