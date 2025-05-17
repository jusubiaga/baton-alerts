"use client";
import React, { useRef, useEffect } from "react";

interface WavyImageProps {
  src: string;
  alt?: string;
  className?: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const WavyImage: React.FC<WavyImageProps> = ({ src, alt = "", className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imgRef.current;
    
    if (!canvas || !ctx || !img) {
      console.error('Canvas or image not available');
      return;
    }

    if (!img.naturalWidth || !img.naturalHeight) {
      console.error('Image dimensions not available');
      return;
    }

    let width = canvas.width = img.naturalWidth;
    let height = canvas.height = img.naturalHeight - 10; // Crop 10px from bottom

    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);
      // Only apply wave if mouse is over the image area (horizontal movement only)
      const isMouseOver = mouse.current.x !== 0;
      const amplitude = isMouseOver ? 20 : 0;
      const frequency = isMouseOver ? 0.02 + mouse.current.x * 0.00005 : 0.02;
      for (let y = 0; y < height; y++) {
        const offset = isMouseOver ? Math.sin(y * frequency + mouse.current.x * 0.02) * amplitude : 0;
        ctx.drawImage(
          img,
          0, y, width, 1, // src
          offset, y, width, 1 // dest
        );
      }
    };

    const animate = () => {
      drawWave();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.current.x = x;
      } else {
        mouse.current.x = 0;
      }
    };

    const handleMouseLeave = () => {
      mouse.current.x = 0;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      style={{ overflow: "hidden" }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      <img 
        ref={imgRef} 
        src={src} 
        alt={alt} 
        className="absolute inset-0 object-cover"
        onLoad={() => {
          const canvas = canvasRef.current;
          const img = imgRef.current;
          if (canvas && img && img.naturalWidth && img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
        }}
      />
    </div>
  );
};

export default WavyImage;
