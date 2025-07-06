export interface Choice {
  order: number;
  content: string;
}
export interface Problem {
  id: number;
  number: number;
  title: string;
  description: string;
  choices: Choice[];
}
