export type ChipVariant =
  | "green"
  | "violet"
  | "yellow"
  | "red"
  | "blue"
  | "blue2";

export const getChipVariant = (
  level: string
): { variant: ChipVariant; text: string } => {
  switch (level) {
    case "BEGINNER":
      return { variant: "green", text: "Beginner" };
    case "INTERMEDIATE":
      return { variant: "violet", text: "Intermediate" };
    case "ADVANCED":
      return { variant: "yellow", text: "Advanced" };
    case "EXPERT":
      return { variant: "red", text: "Expert" };
    default:
      return { variant: "green", text: "Beginner" };
  }
};
