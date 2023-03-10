import { colors } from "quasar";

export function useColor(colorName?: string) {
  if (
    [
      "primary",
      "secondary",
      "accent",
      "dark",
      "positive",
      "negative",
      "info",
      "warning",
    ].includes(colorName ?? "")
  ) {
    return colors.getPaletteColor(colorName ?? "");
  } else {
    return colorName ?? "primary";
  }
}
