export const colorObject = {
  design: "blue",
  javascript: "red",
  python: "orange",
  css: "purple",
  computing: "yellow",
} as const;

export function getColorsFromCategory(categoryName: keyof typeof colorObject) {
  if (categoryName in colorObject) return colorObject[categoryName];
  return "slate";
}
