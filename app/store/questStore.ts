import { create } from "zustand";

export interface Quest {
    id: string;
    title: string;
    reward: number;
    image: any;
    description: string;
}

interface QuestState {
    acceptedQuests: Quest[]; // 수락한 퀘스트 목록
    acceptQuest: (quest: Quest) => void;
    removeQuest: (questId: string) => void;
    isQuestAccepted: (questId: string) => boolean;
}

export const useQuestStore = create<QuestState>((set, get) => ({
    // 수락한 퀘스트 초기값
    acceptedQuests: [],

    // 퀘스트 수락하기 (중복 방지)
    acceptQuest: (quest: Quest) => {
        const state = get();
        // 이미 수락된 퀘스트인지 확인
        if (!state.isQuestAccepted(quest.id)) {
            set((state) => ({
                acceptedQuests: [...state.acceptedQuests, quest],
            }));
        }
    },

    // 퀘스트 제거하기
    removeQuest: (questId: string) => {
        set((state) => ({
            acceptedQuests: state.acceptedQuests.filter(quest => quest.id !== questId),
        }));
    },

    // 퀘스트가 이미 수락되었는지 확인
    isQuestAccepted: (questId: string) => {
        const state = get();
        return state.acceptedQuests.some(quest => quest.id === questId);
    },
}));
