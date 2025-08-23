import { create } from "zustand";
import { acceptQuestAPI } from "../api/quest";

export interface Quest {
    id: string;
    title: string;
    reward: number;
    image: any;
    description: string;
}

interface QuestState {
    acceptedQuests: Quest[]; // 수락한 퀘스트 목록

    acceptQuest: (quest: Quest) => Promise<boolean>;
    removeQuest: (questId: string) => void;
    isQuestAccepted: (questId: string) => boolean;
}

export const useQuestStore = create<QuestState>((set, get) => ({
    // 수락한 퀘스트 초기값
    acceptedQuests: [],

    // 퀘스트 수락하기 (중복 방지)
    acceptQuest: async (quest: Quest) => {
        try {
            const result = await acceptQuestAPI(quest.id);

            if (result) {
                set((state) => ({
                    acceptedQuests: [...state.acceptedQuests, quest],
                }));
                return true;
            }
            return false;
        } catch (error) {
            console.error("퀘스트 수락 오류:", error);
            return false;
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
