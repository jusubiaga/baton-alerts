"use client";
import React, { useRef, useEffect, useState } from "react";

interface InteractiveImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const EFFECTS = ["ripple", "blur", "parallax", "tilt"] as const;
type EffectType = typeof EFFECTS[number];

const InteractiveImage: React.FC<InteractiveImageProps> = ({ src, alt = "", className = "" }) => {
  const [effectIdx, setEffectIdx] = useState(0);
  const effect = EFFECTS[effectIdx];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });

  // Cycle effect on click
  const handleClick = () => setEffectIdx((idx) => (idx + 1) % EFFECTS.length);

  // Common mouse tracking
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

  // Canvas-based effects: ripple, blur
  useEffect(() => {
    if (effect !== "ripple" && effect !== "blur") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imgRef.current;
    if (!canvas || !ctx || !img) return;
    let crop = 20;
    let width = canvas.width = img.naturalWidth - crop * 2;
    let height = canvas.height = img.naturalHeight - crop * 2;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      if (!mouse.inside) {
        // Show normal cropped image when mouse is out
        ctx.drawImage(img, crop, crop, width, height, 0, 0, width, height);
        return;
      }
      if (effect === "ripple") {
        // Ripple: displace lines in a circle around mouse
        for (let y = 0; y < height; y++) {
          let offset = 0;
          if (mouse.inside) {
            const dist = Math.abs(y - mouse.y);
            if (dist < 60) {
              offset = Math.sin((mouse.x + y) * 0.05) * (20 - dist / 3);
            }
          }
          ctx.drawImage(img, crop, y + crop, width, 1, offset, y, width, 1);
        }
      } else if (effect === "blur") {
        ctx.filter = "blur(16px)";
        ctx.drawImage(img, crop, crop, width, height, 0, 0, width, height);
        ctx.filter = "none";
        if (mouse.inside) {
          // Feathered sharp circle using radial gradient mask
          const r = 110;
          const feather = 48; // more blur at edge
          // Create an offscreen canvas for the sharp circle
          const off = document.createElement('canvas');
          off.width = width;
          off.height = height;
          const offCtx = off.getContext('2d');
          if (offCtx) {
            // Draw the sharp image
            offCtx.drawImage(img, crop, crop, width, height, 0, 0, width, height);
            // Create radial gradient for alpha mask
            const grad = offCtx.createRadialGradient(mouse.x, mouse.y, r, mouse.x, mouse.y, r + feather);
            grad.addColorStop(0, 'rgba(0,0,0,1)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            offCtx.globalCompositeOperation = 'destination-in';
            offCtx.fillStyle = grad;
            offCtx.beginPath();
            offCtx.arc(mouse.x, mouse.y, r + feather, 0, 2 * Math.PI);
            offCtx.fill();
            offCtx.globalCompositeOperation = 'source-over';
            // Draw the masked sharp circle onto the main canvas
            ctx.drawImage(off, 0, 0);
          }
        }
      }
    }
    let animId: number;
    function animate() {
      draw();
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
  }, [effect, mouse, src]);

  // Parallax and 3D tilt use CSS transforms
  let style: React.CSSProperties = {};
  let showTransformed = mouse.inside;
  if (effect === "parallax" && mouse.inside) {
    style.transform = `translate(${(mouse.x - 200) / 8}px, ${(mouse.y - 200) / 8}px)`; // intensified
    style.transition = "transform 0.1s";
  } else if (effect === "tilt" && mouse.inside) {
    const rotateY = ((mouse.x / (containerRef.current?.offsetWidth || 400)) - 0.5) * 45; // intensified
    const rotateX = ((mouse.y / (containerRef.current?.offsetHeight || 400)) - 0.5) * -45; // intensified
    style.transform = `perspective(600px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    style.transition = "transform 0.1s";
  } else {
    style.transform = "none";
    style.transition = "transform 0.3s";
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-pointer select-none ${className}`}
      style={{ overflow: "hidden" }}
      onClick={handleClick}
      title={`Click to change effect (${effect})`}
    >
      {/* Canvas for ripple/blur */}
      {(effect === "ripple" || effect === "blur") && (
        <>
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            style={{ display: "none" }}
            onLoad={() => {
              if (canvasRef.current && imgRef.current) {
                canvasRef.current.width = imgRef.current.naturalWidth - 40;
                canvasRef.current.height = imgRef.current.naturalHeight - 40;
              }
            }}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        </>
      )}
      {/* Parallax/Tilt use img with CSS transform */}
      {(effect === "parallax" || effect === "tilt") && (
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            ...style,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            objectPosition: "center",

            transform: (effect === 'parallax' || effect === 'tilt')
              ? (mouse.inside ? `${style.transform || ''} scale(1.3)` : undefined)
              : style.transform || undefined,
            transition: "transform 0.1s"
          }}
        />
      )}
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs rounded px-2 py-1 pointer-events-none select-none">
        click to change
      </div>
    </div>
  );
};

export default InteractiveImage;
