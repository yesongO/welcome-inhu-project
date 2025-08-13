import { create } from "zustand";

interface Quest {
    id: string;
    title: string;
    // 필요한 다른 필드들...
}

interface QuestState {
    quests: Quest[];
    acceptQuest: (quest: Quest) => void;
}

export const useQuestStore = create<QuestState>((set) => ({
    quests: [],
    acceptQuest: (quest: Quest) =>
        set((state) => ({
        quests: [...state.quests, quest],
    })),
}));
