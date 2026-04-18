import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const xToDot = gsap.quickTo(dotRef.current, "x", {
      duration: 0.15,
      ease: "power3.out",
    });
    const yToDot = gsap.quickTo(dotRef.current, "y", {
      duration: 0.15,
      ease: "power3.out",
    });

    const xToRing = gsap.quickTo(ringRef.current, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yToRing = gsap.quickTo(ringRef.current, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveHandler = (e) => {
      xToDot(e.clientX - 2);
      yToDot(e.clientY - 2);

      xToRing(e.clientX - 16);
      yToRing(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveHandler);

    // subtle hover detection
    const hoverOn = () => setHover(true);
    const hoverOff = () => setHover(false);

    const elements = document.querySelectorAll("button, a");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", hoverOn);
      el.addEventListener("mouseleave", hoverOff);
    });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", hoverOn);
        el.removeEventListener("mouseleave", hoverOff);
      });
    };
  }, []);

  return (
    <>
      {/* Ring (glass style) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
      >
        <div
          className={`w-8 h-8 rounded-full border transition-all duration-200 ${hover
              ? "scale-125 border-gray-300"
              : "border-gray-500"
            } backdrop-blur-sm bg-white/5`}
        />
      </div>

      {/* Dot (sharp center) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-150 ${hover ? "scale-110 bg-white" : "bg-gray-300"
            }`}
        />
      </div>
    </>
  );
}

export default CustomCursor;