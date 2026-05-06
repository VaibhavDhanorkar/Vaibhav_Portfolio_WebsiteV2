"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, id: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`; dot.style.top = `${my}px`;
    };
    const animate = () => {
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
      ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
      id = requestAnimationFrame(animate);
    };
    const enter = () => ring.classList.add("hovering");
    const leave = () => ring.classList.remove("hovering");

    document.addEventListener("mousemove", onMove);
    id = requestAnimationFrame(animate);

    const addListeners = () => {
      document.querySelectorAll("a, button, [role='button']").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    addListeners();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
