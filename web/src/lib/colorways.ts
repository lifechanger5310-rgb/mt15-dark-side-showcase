export type ColorwayId =
  | "teal-baby-girl"
  | "ice-dragon"
  | "girl-princess"
  | "purple-dragon";

export interface Colorway {
  id: ColorwayId;
  name: string;
  tagline: string;
  swatchHex: string; // shown in the picker UI
  image: string; // real AI-generated bike photo for this colorway, in /public/images
  vars: {
    ink: string;
    panel: string;
    panelLight: string;
    accent: string;
    accentDim: string;
    glow: string; // drives the R3F particle/glow layer color
  };
}

// Hex values sampled from the actual uploaded artwork (dominant saturated
// pixel colors), not guessed — see Trackerfile entry 0005 for the sampling
// method. Each colorway's `ink`/`panel` background is tinted toward its
// accent so the retint feels cohesive, not just an accent-color swap.
export const colorways: Colorway[] = [
  {
    id: "teal-baby-girl",
    name: "Teal Baby Girl",
    tagline: "Soft, sweet, unmistakably yours.",
    swatchHex: "#2dd4c8",
    image: "/images/colorway-teal-baby-girl.webp",
    vars: {
      ink: "#0a1414",
      panel: "#102626",
      panelLight: "#163434",
      accent: "#2dd4c8",
      accentDim: "#1fa89d",
      glow: "#2dd4c8",
    },
  },
  {
    id: "ice-dragon",
    name: "Ice Dragon",
    tagline: "Frost, scales, and a little bit of magic.",
    swatchHex: "#7de0da",
    image: "/images/colorway-ice-dragon.webp",
    vars: {
      ink: "#0a1618",
      panel: "#102a2e",
      panelLight: "#163a3e",
      accent: "#7de0da",
      accentDim: "#4fc2bb",
      glow: "#9fefe8",
    },
  },
  {
    id: "girl-princess",
    name: "Girl Princess",
    tagline: "Lavender dreams, dressed to be seen.",
    swatchHex: "#a78bfa",
    image: "/images/colorway-girl-princess.webp",
    vars: {
      ink: "#12101c",
      panel: "#1e1a2e",
      panelLight: "#29233d",
      accent: "#a78bfa",
      accentDim: "#8467d6",
      glow: "#c4b5fd",
    },
  },
  {
    id: "purple-dragon",
    name: "Purple Dragon",
    tagline: "Small dragon, big personality.",
    swatchHex: "#8b5cf6",
    image: "/images/colorway-purple-dragon.webp",
    vars: {
      ink: "#0f0a1a",
      panel: "#1c1430",
      panelLight: "#281c42",
      accent: "#8b5cf6",
      accentDim: "#6d3fd6",
      glow: "#8b5cf6",
    },
  },
];

export const defaultColorway = colorways[0];
