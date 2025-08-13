import { create } from "zustand";

interface Quest {
    id: string;
    title: string;
    reward: number;
    image: any;
    description: string;
}

interface QuestState {
    quests: Quest[]; // 전체 퀘스트
    acceptedQuests: Quest[]; // 수락한 퀘스트 목록
    acceptQuest: (quest: Quest) => void;
}

export const useQuestStore = create<QuestState>((set) => ({

    // 전체 퀘스트 초기값
    quests: [],

    // 수락한 퀘스트 초기값
    acceptedQuests: [],

    acceptQuest: (quest: Quest) =>
        set((state) => ({
        quests: [...state.quests, quest],
        acceptedQuests: [...state.acceptedQuests, quest],
    })),
}));
