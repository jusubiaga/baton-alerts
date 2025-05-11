"use client";
import React, { useRef, useEffect } from "react";

interface WavyImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const WavyImage: React.FC<WavyImageProps> = ({ src, alt = "", className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const animationRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;

    let width = canvas.width = img.naturalWidth;
    let height = canvas.height = img.naturalHeight - 10; // Crop 10px from bottom

    function drawWave() {
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
    }

    function animate() {
      drawWave();
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [src]);

  useEffect(() => {
    let isOver = false;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only apply effect if mouse is inside the image area
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        isOver = true;
        mouse.current.x = x;
      } else {
        isOver = false;
        mouse.current.x = 0;
      }
    };
    const handleMouseLeave = () => {
      isOver = false;
      mouse.current.x = 0;
    };
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ overflow: "hidden" }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ display: "none" }}
        onLoad={() => {
          if (canvasRef.current && imgRef.current) {
            canvasRef.current.width = imgRef.current.naturalWidth;
            canvasRef.current.height = imgRef.current.naturalHeight;
          }
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default WavyImage;
