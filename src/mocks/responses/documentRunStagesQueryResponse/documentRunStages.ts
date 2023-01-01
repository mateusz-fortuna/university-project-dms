import { DocumentRunStage } from "../documentRunStagesQueryResponse";

export const stages: DocumentRunStage[] = [
  {
    id: "1",
    name: "Rejestracja zgłoszenia",
    runId: "1",
    status: "Niezakończony",
  },
  {
    id: "2",
    name: "Realizowanie",
    runId: "1",
    status: "Niezakończony",
  },
  {
    id: "3",
    name: "Rozwiązanie problemu",
    runId: "1",
    status: "Zakończony",
  },
  {
    id: "4",
    name: "Rejestracja dokumentu",
    runId: "2",
    status: "Niezakończony",
  },
  {
    id: "5",
    name: "Analizowanie dokumentu",
    runId: "2",
    status: "Niezakończony",
  },
  {
    id: "6",
    name: "Akceptacja dokumentu",
    runId: "2",
    status: "Zakończony",
  },
  {
    id: "7",
    name: "Start",
    runId: "3",
    status: "Niezakończony",
  },
  {
    id: "8",
    name: "Definiowanie",
    runId: "3",
    status: "Niezakończony",
  },
  {
    id: "9",
    name: "Realizowanie",
    runId: "3",
    status: "Niezakończony",
  },
  {
    id: "10",
    name: "Koniec",
    runId: "3",
    status: "Zakończony",
  },
  {
    id: "11",
    name: "Rejestracja wniosku",
    runId: "4",
    status: "Niezakończony",
  },
  {
    id: "12",
    name: "Rozpatrzanie wniosku",
    runId: "4",
    status: "Niezakończony",
  },
  {
    id: "13",
    name: "Akceptacja przełożonego",
    runId: "4",
    status: "Zakończony",
  },
  {
    id: "14",
    name: "Start",
    runId: "5",
    status: "Niezakończony",
  },
  {
    id: "15",
    name: "Przygotowanie umowy",
    runId: "6",
    status: "Niezakończony",
  },
  {
    id: "16",
    name: "Konsultacja umowy",
    runId: "6",
    status: "Niezakończony",
  },
  {
    id: "17",
    name: "Oczekiwanie na podpis",
    runId: "6",
    status: "Niezakończony",
  },
  {
    id: "18",
    name: "Podpisanie umowy",
    runId: "6",
    status: "Zakończony",
  },
];
