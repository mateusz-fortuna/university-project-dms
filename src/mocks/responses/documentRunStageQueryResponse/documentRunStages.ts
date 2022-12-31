import { DocumentRunStage } from "../documentRunStageQueryResponse";

export const stages: DocumentRunStage[] = [
  {
    id: "1",
    name: "Rejestracja zgłoszenia",
    runId: "1",
    status: "IN_PROGRESS",
  },
  {
    id: "2",
    name: "Realizowanie",
    runId: "1",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    name: "Rozwiązanie problemu",
    runId: "1",
    status: "DONE",
  },
  {
    id: "4",
    name: "Rejestracja dokumentu",
    runId: "2",
    status: "IN_PROGRESS",
  },
  {
    id: "5",
    name: "Analizowanie dokumentu",
    runId: "2",
    status: "IN_PROGRESS",
  },
  {
    id: "6",
    name: "Akceptacja dokumentu",
    runId: "2",
    status: "DONE",
  },
  {
    id: "7",
    name: "Start",
    runId: "3",
    status: "IN_PROGRESS",
  },
  {
    id: "8",
    name: "Definiowanie",
    runId: "3",
    status: "IN_PROGRESS",
  },
  {
    id: "9",
    name: "Realizowanie",
    runId: "3",
    status: "IN_PROGRESS",
  },
  {
    id: "10",
    name: "Koniec",
    runId: "3",
    status: "DONE",
  },
  {
    id: "11",
    name: "Rejestracja wniosku",
    runId: "4",
    status: "IN_PROGRESS",
  },
  {
    id: "12",
    name: "Rozpatrzanie wniosku",
    runId: "4",
    status: "IN_PROGRESS",
  },
  {
    id: "13",
    name: "Akceptacja przełożonego",
    runId: "4",
    status: "DONE",
  },
  {
    id: "14",
    name: "Start",
    runId: "5",
    status: "IN_PROGRESS",
  },
  {
    id: "15",
    name: "Przygotowanie umowy",
    runId: "6",
    status: "IN_PROGRESS",
  },
  {
    id: "16",
    name: "Konsultacja umowy",
    runId: "6",
    status: "IN_PROGRESS",
  },
  {
    id: "17",
    name: "Oczekiwanie na podpis",
    runId: "6",
    status: "IN_PROGRESS",
  },
  {
    id: "18",
    name: "Podpisanie umowy",
    runId: "6",
    status: "DONE",
  },
];
