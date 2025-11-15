import { useTheme } from "../contexts/useTheme";
import Squares from "./Squares";

export default function Background() {
	const { darkMode } = useTheme();
	
	return (
		<div className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-50 ${darkMode ? 'bg-[#1a202c]' : 'bg-[#f9f7ec]'}`}>
			<Squares 
				speed={0.1} 
				squareSize={150}
				direction="top-left"
				borderColor={darkMode ? '#ffffff' : '#000000'}
			/>
		</div>
	);
}
