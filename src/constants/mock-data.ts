import {Subject} from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        name: "General Biology",
        code: "SCI-101",
        description: "Foundations of cell biology, genetics and ecology, with weekly laboratory sessions.",
        department: "SCIENCES",
        createdAt: "2026-01-12T09:00:00.000Z"
    },
    {
        id: 2,
        name: "Modern World Literature",
        code: "LANG-201",
        description: "Novels, poetry and drama from the twentieth century to the present, read in translation.",
        department: "LANGUAGES",
        createdAt: "2026-01-14T09:00:00.000Z"
    },
    {
        id: 3,
        name: "Foundations of Studio Art",
        code: "ART-105",
        description: "Drawing, composition and material studies across a range of media, culminating in a term portfolio.",
        department: "ARTS & CRAFTS",
        createdAt: "2026-01-19T09:00:00.000Z"
    }
]