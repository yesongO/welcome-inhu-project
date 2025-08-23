// app/api/chatbot.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://inhu-forest.p-e.kr";

// ---------- Types ----------
export type PresetQuestion = { id: number; preset_text: string };

// 서버 응답: "reward points" 키가 공백 포함이라 문자열 키 접근 필요
export type QuestFromAnswer = {
  random_quest_id: number;
  quest: string;
  "reward points": number;
  description: string;
};

export type QuestIdOnly = { quest_id: number };

export type NormalizedQuest = {
  id: number;
  title: string;
  rewardPoints: number;
  description?: string;
};

// ---------- (선택) 디버그 인터셉터 ----------
if (__DEV__) {
  axios.interceptors.request.use((config) => {
    try {
      console.log("[REQ]", config.method?.toUpperCase(), config.url);
      console.log("[REQ headers]", config.headers);
      if (config.data) console.log("[REQ body]", JSON.stringify(config.data));
    } catch {}
    return config;
  });
  axios.interceptors.response.use(
    (res) => {
      try {
        console.log("[RES]", res.status, res.config.url);
        console.log("[RES body]", JSON.stringify(res.data));
      } catch {}
      return res;
    },
    (err) => {
      console.log(
        "[RES ERR]",
        err?.response?.status,
        err?.config?.url,
        err?.message
      );
      return Promise.reject(err);
    }
  );
}

// ---------- Normalizers ----------
export function normalizeAnswerQuests(items: QuestFromAnswer[]): NormalizedQuest[] {
  return items.map((q) => ({
    id: q.random_quest_id,
    title: q.quest,
    rewardPoints: q["reward points"],
    description: q.description,
  }));
}
export function normalizeIdQuests(items: QuestIdOnly[]): NormalizedQuest[] {
  return items.map((q) => ({
    id: q.quest_id,
    title: `퀘스트 #${q.quest_id}`,
    rewardPoints: 0,
  }));
}

// ---------- API functions ----------

// 1) 세션 시작: POST /chat/sessions/start/  (NO REQUEST BODY)
export async function startSession(): Promise<{ success: boolean; session_id: number } | null> {
  try {
    const rawToken = await AsyncStorage.getItem("access_token");
    const token = rawToken?.replace(/^"+|"+$/g, "") || null; // 따옴표 제거

    const headers: any = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    // 바디 null + Content-Type 생략
    const res = await axios.post(`${BASE_URL}/chat/sessions/start/`, null, {
      headers,
      timeout: 15000,
      validateStatus: () => true,
    });

    console.log("startSession:", res.status, res.data);

    if (res.status >= 200 && res.status < 300 && res.data && typeof res.data.session_id === "number") {
      return { success: true, session_id: res.data.session_id };
    }

    // 드물게 {} 바디를 요구하는 서버 대응
    if (res.status === 400 || res.status === 415) {
      const res2 = await axios.post(`${BASE_URL}/chat/sessions/start/`, {}, {
        headers: { ...headers, "Content-Type": "application/json" },
        timeout: 15000,
        validateStatus: () => true,
      });
      console.log("startSession(retry):", res2.status, res2.data);
      if (res2.status >= 200 && res2.status < 300 && res2.data && typeof res2.data.session_id === "number") {
        return { success: true, session_id: res2.data.session_id };
      }
    }

    return null;
  } catch (err) {
    console.error("startSession error:", err);
    return null;
  }
}

// 2) 프리셋 질문: GET /chat/questions/  (인증 스킴/슬래시/스키마 다양성 모두 대응)
export async function getPresetQuestions(): Promise<PresetQuestion[] | null> {
  try {
    // 토큰 정규화: 앞뒤 따옴표 제거
    const rawToken = await AsyncStorage.getItem("access_token");
    const token = rawToken?.replace(/^"+|"+$/g, "") || null;

    console.log("[presets] token? ->", token ? `${token.slice(0, 8)}...` : "NONE");

    const urls = [
      `${BASE_URL}/chat/questions/`, // 일반
      `${BASE_URL}/chat/questions`,  // 슬래시 변형
    ] as const;

    // 토큰이 있어도 마지막에 None(무인증)까지 시도
    const authSchemes: Array<"Bearer" | "Token" | "None"> =
      token ? ["Bearer", "Token", "None"] : ["None"];

    let lastStatus: number | null = null;
    let lastData: any = null;

    for (const url of urls) {
      for (const scheme of authSchemes) {
        const headers: any = { Accept: "application/json" };
        if (scheme !== "None" && token) headers.Authorization = `${scheme} ${token}`;

        const res = await axios.get(url, {
          headers,
          timeout: 15000,
          validateStatus: () => true,
        });

        lastStatus = res.status;
        lastData = res.data;

        console.log("[presets] GET", url, "scheme:", scheme, "status:", res.status);
        try { console.log("[presets] body:", JSON.stringify(res.data)); } catch {}

        // 인증 문제면 다음 스킴
        if (res.status === 401 || res.status === 403) continue;
        // 기타 에러/빈 바디면 다음 URL로
        if (res.status < 200 || res.status >= 300 || !res.data) break;

        // ── 다양한 래핑 키 대응 ──
        const raw =
          (Array.isArray(res.data) ? res.data : null) ??
          res.data.questions ??
          res.data.items ??
          res.data.presets ??
          res.data.data ??
          res.data.result ??
          res.data.results ??
          (res.data.success &&
            (res.data.questions || res.data.items || res.data.data || res.data.results));

        if (!raw) break; // 다음 URL/스킴

        // ── 실제 배열 추출 ──
        let arr: any[] | null = null;
        if (Array.isArray(raw)) arr = raw;
        else if (Array.isArray((raw as any).items)) arr = (raw as any).items;
        else if (Array.isArray((raw as any).data)) arr = (raw as any).data;
        else if (Array.isArray((raw as any).results)) arr = (raw as any).results;

        if (!arr || arr.length === 0) break; // 연결은 됐지만 DB 미등록 가능성

        // ── 항목 정규화 (문자열/객체 혼용) ──
        const mapped: PresetQuestion[] = arr
          .map((x: any, i: number) => {
            if (x == null) return null;
            if (typeof x === "string") return { id: i + 1, preset_text: x };
            const text =
              x.preset_text ??
              x.text ??
              x.question ??
              x.prompt ??
              x.title ??
              x.message ??
              x.content ??
              x.preset ??
              x.question_text ??
              x.content_kr ??
              "";
            const id = Number(x.id ?? x.pk ?? x.preset_id ?? x.question_id ?? i + 1);
            return text ? { id, preset_text: String(text) } : null;
          })
          .filter(Boolean) as PresetQuestion[];

        if (mapped.length) {
          console.log("[presets] OK ->", mapped.length);
          return mapped;
        }
        // 배열인데 전부 빈 텍스트면 다음 URL/스킴 시도
      }
    }

    console.warn("[presets] failed to parse. lastStatus:", lastStatus, "lastData:", lastData);
    return null;
  } catch (err) {
    console.error("getPresetQuestions error:", err);
    return null;
  }
}

// 3) 사용자 답변 전송 → 퀘스트 3개 배열: POST /chat/sessions/answer/
export async function sendUserAnswer(params: {
  session_id: number;
  user_id: number;
  msg_seq?: number; // 1 고정 사용
  context: string;  // 프리셋(질문) 텍스트
  prompt: string;   // 사용자 입력
}): Promise<QuestFromAnswer[] | null> {
  const { session_id, user_id, context, prompt, msg_seq = 1 } = params;

  try {
    const rawToken = await AsyncStorage.getItem("access_token");
    const token = rawToken?.replace(/^"+|"+$/g, "") || null;

    const headers: any = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const body = { session_id, user_id, msg_seq, context, prompt };
    console.log("sendUserAnswer payload:", body);

    const res = await axios.post(`${BASE_URL}/chat/sessions/answer/`, body, {
      headers,
      timeout: 20000,
      validateStatus: () => true,
    });

    console.log(
      "sendUserAnswer:",
      res.status,
      Array.isArray(res.data) ? `items=${res.data.length}` : res.data
    );

    if (res.status >= 200 && res.status < 300 && Array.isArray(res.data)) {
      return res.data as QuestFromAnswer[];
    }
    return null;
  } catch (err) {
    console.error("sendUserAnswer error:", err);
    return null;
  }
}

// 4) (옵션) 세션 종료·최종 추천: POST /chat/sessions/{session_id}/complete/
export async function completeSession(session_id: number): Promise<QuestIdOnly[] | null> {
  try {
    const rawToken = await AsyncStorage.getItem("access_token");
    const token = rawToken?.replace(/^"+|"+$/g, "") || null;

    const headers: any = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.post(
      `${BASE_URL}/chat/sessions/${session_id}/complete/`,
      { session_id },
      { headers, timeout: 15000, validateStatus: () => true }
    );

    console.log("completeSession:", res.status, res.data);

    if (res.status >= 200 && res.status < 300 && res.data?.quests && Array.isArray(res.data.quests)) {
      return res.data.quests as QuestIdOnly[];
    }
    return null;
  } catch (err) {
    console.error("completeSession error:", err);
    return null;
  }
}

// ---------- One-shot 데모 플로우 ----------
export async function runOneShotQuestFlow(input: {
  prompt: string;
  context?: string;   // 없으면 프리셋에서 랜덤 선택
  user_id?: number;   // 없으면 AsyncStorage의 user_id 사용
}) {
  // 0) 유저 ID
  const userIdStr = (await AsyncStorage.getItem("user_id")) || "0";
  const user_id = input.user_id ?? (Number(userIdStr) || 0); // (괄호로 ??/|| 혼합 이슈 회피)

  // 1) 세션 시작
  const session = await startSession();
  if (!session?.session_id) return { ok: false as const, error: "세션 생성 실패" };
  const session_id = session.session_id;

  // 2) 컨텍스트(질문) 결정
  let context = input.context;
  if (!context) {
    const presets = await getPresetQuestions();
    if (presets && presets.length > 0) {
      const idx = Math.floor(Math.random() * presets.length);
      context = presets[idx].preset_text;
    } else {
      context = "오늘은 어떤 음식이 당기세요?";
    }
  }

  // 3) 사용자 답변 전송
  const answerQuests = await sendUserAnswer({
    session_id,
    user_id,
    context,
    prompt: input.prompt,
    msg_seq: 1,
  });

  if (answerQuests && answerQuests.length > 0) {
    return {
      ok: true as const,
      source: "answer",
      quests: normalizeAnswerQuests(answerQuests),
      session_id,
      context,
    };
  }

  // 4) 폴백: 세션 종료로 ID만 받아오기
  const ids = await completeSession(session_id);
  if (ids && ids.length > 0) {
    return {
      ok: true as const,
      source: "complete",
      quests: normalizeIdQuests(ids),
      session_id,
      context,
    };
  }

  return { ok: false as const, error: "퀘스트 생성 실패", session_id, context };
}
