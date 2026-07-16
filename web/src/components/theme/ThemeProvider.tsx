"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { colorways, defaultColorway, type Colorway, type ColorwayId } from "@/lib/colorways";

interface ThemeContextValue {
  current: Colorway;
  setColorway: (id: ColorwayId) => void;
  colorways: Colorway[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Colorway>(defaultColorway);
  const isFirstRender = useRef(true);

  const setColorway = useCallback((id: ColorwayId) => {
    const next = colorways.find((c) => c.id === id);
    if (next) setCurrent(next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const { vars } = current;
    const targets = {
      "--color-ink": vars.ink,
      "--color-panel": vars.panel,
      "--color-panel-light": vars.panelLight,
      "--color-accent": vars.accent,
      "--color-accent-dim": vars.accentDim,
      "--color-glow": vars.glow,
    };

    // Reduced-motion: snap instantly, no tween.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isFirstRender.current || prefersReduced) {
      Object.entries(targets).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      isFirstRender.current = false;
      return;
    }

    // Cinematic cross-fade of every CSS var at once, Dramatic-tier easing
    // (matches the site's locked motion intensity: 0.6–1.2s, back.out).
    gsap.to(root, {
      duration: 0.9,
      ease: "power2.inOut",
      ...targets,
    });
  }, [current]);

  return (
    <ThemeContext.Provider value={{ current, setColorway, colorways }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
