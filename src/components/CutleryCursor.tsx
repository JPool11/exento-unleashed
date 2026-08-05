import { useEffect, useRef, useState } from "react";

/**
 * Cursor personalizado: tenedor + cuchillo.
 * - Hover sobre elementos interactivos: crece un poco.
 * - Click: los cubiertos se cierran como si cortaran.
 */
export function CutleryCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cutting, setCutting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("cutlery-cursor-active");

    const move = (e: MouseEvent) => {
      setVisible(true);
      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
      );
    };
    const down = () => setCutting(true);
    const up = () => setCutting(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("cutlery-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  const scale = cutting ? 1.05 : hovering ? 1.3 : 1;

  return (
    <div
      ref={ref}
      aria-hidden
      className="cutlery-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          style={{ overflow: "visible" }}
        >
          {/* Tenedor */}
          <g
            className="transition-transform duration-150 ease-out"
            style={{
              transformOrigin: "23px 40px",
              transform: `rotate(${cutting ? -4 : -20}deg)`,
            }}
            stroke="var(--gold)"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M17 4v9" />
            <path d="M21 4v9" />
            <path d="M13 4v9" />
            <path d="M13 13h8c0 3-1.5 4.5-3 5v22" />
            <path d="M17 18v22" />
          </g>
          {/* Cuchillo */}
          <g
            className="transition-transform duration-150 ease-out"
            style={{
              transformOrigin: "23px 40px",
              transform: `rotate(${cutting ? 4 : 20}deg)`,
            }}
            stroke="var(--gold)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M29 4c4 4 5 8 5 13 0 3-2 5-5 5s-4-2-4-5V4z" />
            <path d="M29 22v18" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default CutleryCursor;