export type ColorwayId = "metallic-black" | "ice-storm-cyan" | "vivid-violet";

export interface Colorway {
  id: ColorwayId;
  name: string;
  tagline: string;
  swatchHex: string; // shown in the picker UI
  vars: {
    ink: string;
    panel: string;
    panelLight: string;
    accent: string;
    accentDim: string;
    glow: string; // drives the R3F particle/glow layer color
  };
}

export const colorways: Colorway[] = [
  {
    id: "metallic-black",
    name: "Metallic Black",
    tagline: "The default menace.",
    swatchHex: "#0b0b0e",
    vars: {
      ink: "#0b0b0e",
      panel: "#17171c",
      panelLight: "#202027",
      accent: "#00d9ff",
      accentDim: "#00a8c7",
      glow: "#00d9ff",
    },
  },
  {
    id: "ice-storm-cyan",
    name: "Ice Storm Cyan",
    tagline: "Sharp, cold, unmistakable.",
    swatchHex: "#00d9ff",
    vars: {
      ink: "#071012",
      panel: "#0d1e22",
      panelLight: "#123039",
      accent: "#00f0ff",
      accentDim: "#00b8cc",
      glow: "#00f0ff",
    },
  },
  {
    id: "vivid-violet",
    name: "Vivid Violet",
    tagline: "Bold enough to be seen coming.",
    swatchHex: "#8b5cf6",
    vars: {
      ink: "#0e0b14",
      panel: "#1c1424",
      panelLight: "#281c33",
      accent: "#8b5cf6",
      accentDim: "#6d3fd6",
      glow: "#8b5cf6",
    },
  },
];

export const defaultColorway = colorways[0];
