import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  placeholder?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  decoding = "async",
  placeholder
}: OptimizedImageProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset loading state when src changes
    setImageLoading(true);
    setImageError(false);
  }, [src]);

  const handleLoad = () => {
    setImageLoading(false);
  };

  const handleError = () => {
    setImageLoading(false);
    setImageError(true);
    
    // If there's a placeholder, try to load it
    if (placeholder && imgRef.current) {
      imgRef.current.src = placeholder;
    }
  };

  // Generate webp version if possible
  const webpSrc = src && !src.endsWith('.webp') ? src.replace(/\.(jpg|jpeg|png)/i, '.webp') : src;
  
  return (
    <>
      {/* skeleton image */}
      {imageLoading && (
        <div className={`absolute inset-0 animate-pulse bg-zinc-600 dark:bg-zinc-800 ${className}`} />
      )}
      
      <picture>
        {webpSrc && webpSrc !== src && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          ref={imgRef}
          src={imageError && placeholder ? placeholder : src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding={decoding}
          className={`${className} transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    </>
  );
}