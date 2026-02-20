import { useEffect, useRef, memo } from "react";

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

function GlowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);
  const trailRef = useRef<TrailPoint[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    // Don't run on touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isVisibleRef.current = true;

      // Add new trail point
      trailRef.current.unshift({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      });

      // Limit trail length
      if (trailRef.current.length > 15) {
        trailRef.current.pop();
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      trailRef.current.forEach((point, index) => {
        const size = Math.max(2, 10 - index * 0.5);
        const opacity = point.opacity * (1 - index / trailRef.current.length);

        // Glow effect
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          size * 2
        );
        gradient.addColorStop(0, `rgba(186, 218, 213, ${opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(166, 182, 224, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(166, 182, 224, 0)");

        ctx.beginPath();
        ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Fade out trail points
        point.opacity *= 0.92;
      });

      // Remove faded points
      trailRef.current = trailRef.current.filter((p) => p.opacity > 0.01);

      // Main cursor glow
      if (isVisibleRef.current) {
        const { x, y } = mouseRef.current;

        // Outer glow
        const mainGradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
        mainGradient.addColorStop(0, "rgba(186, 218, 213, 0.5)");
        mainGradient.addColorStop(0.4, "rgba(166, 182, 224, 0.2)");
        mainGradient.addColorStop(1, "rgba(166, 182, 224, 0)");

        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fillStyle = mainGradient;
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#badad5";
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: "screen" }}
      />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default memo(GlowCursor);
