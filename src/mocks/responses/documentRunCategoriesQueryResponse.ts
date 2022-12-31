import { context } from "msw";

export interface DocumentRunCategory {
  id: string;
  name: string;
}

const documentRunCategories: DocumentRunCategory[] = [
  { id: "1", name: "Bez kategorii" },
  { id: "2", name: "Projekty" },
  { id: "3", name: "Dokumenty wewnętrzne" },
  { id: "4", name: "Umowy" },
];

export const documentRunCategoriesQueryResponse = () => {
  return context.json(documentRunCategories);
};
