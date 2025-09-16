import { useState, useRef, useEffect } from "react";
import { RefreshCcw, Expand, ZoomOut, ZoomIn } from "lucide-react";

export function IframeMedia({ link }: { link: string }) {
	const [scale, setScale] = useState(1);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [errorIframe, setErrorIframe] = useState(false);
	const [limitScale, setLimitScale] = useState({
		min: window.innerWidth >= 768 ? 0.5 : 0.2,
		max: window.innerWidth >= 768 ? 1.5 : 0.8,
	});

	useEffect(() => {
		// adjust according to screen size since mobile screen is smaller, so the limit will be smaller
		const handleResize = () => {
			setLimitScale({
				min: window.innerWidth >= 768 ? 0.5 : 0.2,
				max: window.innerWidth >= 768 ? 1.5 : 0.8,
			});
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleReset = () => {
		setScale(1);
		if (iframeRef.current) {
			// refresh iframe
			iframeRef.current.src = link;
		}
	};

	const handleFullscreen = () => {
		if (iframeRef.current) {
			iframeRef.current.requestFullscreen();
		}
	};

	const handleZoomIn = () => setScale((prev: number) => Math.min(prev + 0.1, limitScale.max));
		const handleZoomOut = () => setScale((prev: number) => Math.max(prev - 0.1, limitScale.min));

	return (
		<>
			<div className="h-[600px] relative">
				{errorIframe ? (
					<div className="flex items-center justify-center w-full h-full">
						<h2 className="text-2xl font-bold">
							{
								"Error load the website, try to refresh using the refresh button"
							}
						</h2>
					</div>
				) : (
					<iframe
						ref={iframeRef}
						src={link}
						loading="lazy"
						width="100%"
						height="100%"
						className="absolute top-0 left-0 w-full h-full"
						style={{ zoom: `${scale}` }}
						onError={() => setErrorIframe(true)}
					/>
				)}
			</div>

			<div className="flex items-center justify-between gap-2 px-4 py-2 border-t-4 dark:border-zinc-600">
				<div className="flex items-center gap-2">
					<button
						type="button"
						aria-label="Refresh the website"
						onClick={handleReset}
						className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
					>
						<RefreshCcw size={15} />
					</button>
					<button
						type="button"
						aria-label="Make the website fullscreen"
						onClick={handleFullscreen}
						className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
					>
						<Expand size={15} />
					</button>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						aria-label="Zoom out the website"
						onClick={() => handleZoomOut()}
						className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
					>
						<ZoomOut size={15} />
					</button>

					<button
						type="button"
						aria-label="Zoom in the website"
						onClick={handleZoomIn}
						className="cursor-pointer btn rounded-xs border-2 border-black text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-grow bg-base-300 btn-lg text-base flex items-center gap-2 justify-center w-10 h-10"
					>
						<ZoomIn size={15} />
					</button>
				</div>
			</div>
		</>
	);
}