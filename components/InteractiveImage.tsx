"use client";
import React, { useRef, useEffect, useState } from "react";

interface InteractiveImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const InteractiveImage: React.FC<InteractiveImageProps> = ({ src, alt = "", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number; inside: boolean }>({ x: 0, y: 0, inside: false });

  // Mouse tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom,
      });
    };

    const handleLeave = () => setMouse((m) => ({ ...m, inside: false }));

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Parallax and zoom effect
  const style: React.CSSProperties = {};
  if (mouse.inside) {
    // Parallax movement
    style.transform = `translate(${(mouse.x - 200) / 8}px, ${(mouse.y - 200) / 8}px) scale(1.3)`;
    style.transition = "transform 0.1s";
  } else {
    style.transform = "none";
    style.transition = "transform 0.3s";
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className} w-full h-full overflow-hidden`}
    >
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 object-cover w-full h-full"
        style={style}
        draggable={false}
      />
    </div>
  );
};

export default InteractiveImage;
