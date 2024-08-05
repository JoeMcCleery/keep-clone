export type NoteType = "simple" | "todo";

export type NoteContentItem = {
  text: string;
  completed: boolean;
};

export type NoteBackground =
  | "default"
  | "coral"
  | "peach"
  | "sand"
  | "mint"
  | "sage"
  | "fog"
  | "storm"
  | "dusk"
  | "blossom"
  | "clay"
  | "chalk";
