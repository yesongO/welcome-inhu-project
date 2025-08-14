import { create } from "zustand";

export interface Quest {
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

// *** 퀘스트 수락하기 함수 정의 ***
export const useQuestStore = create<QuestState>((set) => ({
    // 전체 퀘스트 초기값
    quests: [],

    // 수락한 퀘스트 초기값
    acceptedQuests: [],

    acceptQuest: (quest: Quest) =>
        set((state) => ({
        quests: [...state.quests, quest], // 전체 퀘스트 목록에 추가 (추후 수정?)
        acceptedQuests: [...state.acceptedQuests, quest], // 수락한 퀘스트 목록에 추가
    })),
}));
