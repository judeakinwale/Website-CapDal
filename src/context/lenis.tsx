import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { getWindow } from "@/utils";

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  const [lenis, setLenis] = React.useState<Lenis | null>(null);

  useEffect(() => {
    if (!getWindow() || lenisRef.current) return;

    lenisRef.current = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 2,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisRef.current);

    let frameId: number;

    function raf(time: number) {
      lenisRef.current?.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    // <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>
  );
};

export const useLenis = () => {
  const lenis = useContext(LenisContext);
  if (!lenis && !getWindow()) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return lenis;
};
