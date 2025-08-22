// app/api/quest.ts
// 퀘스트 수락 API

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// 퀘스트를 수락하는 API 함수
// 인자로 받은 questId를 URL에 동적으로 넣어준다.
export const acceptQuest = async (quest_id: number) => {
    try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) return null;

        // ${questId} 퀘스트 수락
        const res = await axios.post( 
            `${BASE_URL}/quests/${quest_id}/`, 
            { action: "accept" }, // 요청 본문
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.status >= 200 && res.status < 300) {
            return res.data;
        }
        return null;

    } catch (err) {
        console.error(`퀘스트 ID ${quest_id} 수락 오류:`, err);
        return null;
    }
};