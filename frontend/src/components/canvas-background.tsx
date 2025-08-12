"use client";
import { useEffect, useRef } from "react";

type Vec = { x: number; y: number; vx: number; vy: number };

export default function CanvasBackground({
  count = 90,
  maxSpeed = 0.6,
  linkDist = 140,
}: {
  count?: number;
  maxSpeed?: number;   // px/frame
  linkDist?: number;   // px
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef<{ x: number; y: number; active: boolean }>({
    x: 0, y: 0, active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let anim = 0;
    let points: Vec[] = [];

    const dpr = () => (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);

    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      const ratio = dpr();
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

    function initPoints() {
      const { innerWidth: w, innerHeight: h } = window;
      points = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-maxSpeed, maxSpeed),
        vy: rand(-maxSpeed, maxSpeed),
      }));
    }

    function step() {
      const { innerWidth: w, innerHeight: h } = window;
      ctx.clearRect(0, 0, w, h);

      // update + draw dots
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      for (const p of points) {
        // subtle mouse repulsion
        if (mouse.current.active) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d2 = dx*dx + dy*dy;
          const r = 90;
          if (d2 < r*r) {
            const d = Math.sqrt(d2) || 1;
            p.vx += (dx / d) * 0.05;
            p.vy += (dy / d) * 0.05;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw links
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = 1 - dist / linkDist;
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      anim = requestAnimationFrame(step);
    }

    // events
    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }
    function onEnter() { mouse.current.active = true; }
    function onLeave() { mouse.current.active = false; }

    resize();
    initPoints();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);

    anim = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [count, maxSpeed, linkDist]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    />
  );
}

