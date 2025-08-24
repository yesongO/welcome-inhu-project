// app/chat.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { customFonts } from "../constants/Fonts";

import {
  completeSession,
  getPresetQuestions,
  normalizeAnswerQuests,
  normalizeIdQuests,
  PresetQuestion,
  sendUserAnswer,
  startSession,
} from "./api/chatbot";

type Msg = { role: "bot" | "user"; text: string };
const BOT_CONFIRM = "좋아요, 이제 숲속에서 사장님들의 부탁을 들어주세요!";

// API가 비어올 때 화면용으로만 쓰는 폴백 질문(서버에는 깔끔한 문구만 전달)
const FALLBACK_PRESETS = [
  "오늘 시원한 음식이 땡겨요? 아니면 따뜻한 음식이 땡겨요?",
  "한식, 중식, 일식 중에 어떤 게 당겨요?",
  "뭘 먹을까요? 국물 있는 거? 없는 거?",
  "면 요리 vs 밥 요리, 뭐가 좋아요?",
  "매운 음식 vs 안매운 음식",
  "지금 배고픈 정도는 어때요? 아주 많이? 조금?",
  "고기 많은 음식 vs 야채 많은 음식",
  "오늘은 혼밥? 같이?",
  "느끼한 음식 vs 담백한 음식",
  "매콤한 국물 vs 담백한 국물",
  "오늘 먹고싶은 건.. 밥? 면?",
  "짭짤한 음식 vs 달콤한 음식",
  "식사 분위기는 조용하게? 북적하게?",
  "오늘은 고기? 채소?" , 

] as const;

const pickRandom = <T,>(arr: ReadonlyArray<T>) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;

export default function ChatScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts(customFonts);

  const [initLoading, setInitLoading] = useState(true);   // 세션+프리셋 로딩
  const [sendLoading, setSendLoading] = useState(false);  // 답변 전송 중
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const sessionIdRef = useRef<number | null>(null);
  const contextRef = useRef<string | null>(null); // 서버 프리셋 중 랜덤 1개(또는 폴백)

  // 1) 진입: 세션 생성 → 프리셋 불러오기 → 랜덤 1개 → 봇 첫 메시지
  useEffect(() => {
    (async () => {
      try {
        const sess = await startSession();
        console.log("startSession ->", sess);
        if (!sess?.session_id) throw new Error("세션 생성 실패");
        sessionIdRef.current = sess.session_id;

        const presets = await getPresetQuestions(); // (강화 버전)
        console.log("presets length ->", Array.isArray(presets) ? presets.length : presets);

        const questionText =
          (presets && presets.length > 0
            ? (pickRandom(presets as ReadonlyArray<PresetQuestion>)?.preset_text ?? null)
            : null) ||
          pickRandom(FALLBACK_PRESETS) ||
          "오늘은 어떤 음식이 당기세요?";

        console.log("question source ->", (presets && presets.length > 0) ? "SERVER" : "FALLBACK");

        contextRef.current = questionText;
        setMessages([{ role: "bot", text: questionText }]);
      } catch (e: any) {
        console.error("초기 로드 오류:", e?.message ?? e);
        const questionText = "오늘은 어떤 음식이 당기세요?"; // 라벨 없는 기본 문구
        contextRef.current = questionText;
        setMessages([{ role: "bot", text: questionText }]);
      } finally {
        setInitLoading(false);
      }
    })();
  }, []);

  // 2) 사용자 입력 → 확인 멘트 즉시 표시 → 퀘스트 요청 → 저장 후 /main
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || sendLoading || initLoading) return;

    const userMsg: Msg = { role: "user", text: trimmed };
    const botConfirm: Msg = { role: "bot", text: BOT_CONFIRM };

    setMessages((prev) => [...prev, userMsg, botConfirm]);
    setInput("");
    setSendLoading(true);

    try {
      const session_id = sessionIdRef.current;
      const context = contextRef.current;
      if (!session_id || !context) throw new Error("세션/질문 누락");

      const userIdStr = (await AsyncStorage.getItem("user_id")) || "0";
      const user_id = Number(userIdStr) || 0;

      // ① 답변으로 추천 3개 요청
      const questsRaw = await sendUserAnswer({
        session_id,
        user_id,
        msg_seq: 1,
        context,         // 서버 프리셋(또는 폴백 문구)
        prompt: trimmed, // 사용자의 답변
      });

      let quests:
        | ReturnType<typeof normalizeAnswerQuests>
        | ReturnType<typeof normalizeIdQuests>
        | null = null;

      if (questsRaw && questsRaw.length > 0) {
        quests = normalizeAnswerQuests(questsRaw);
      } else {
        // ② 폴백: 세션 완료로 ID 목록이라도 확보
        const ids = await completeSession(session_id);
        if (ids && ids.length > 0) quests = normalizeIdQuests(ids);
      }

      if (!quests) throw new Error("퀘스트 응답 없음");

      // 저장 완료 후 이동(레이스 컨디션 방지)
      await AsyncStorage.multiSet([
        ["last_quests", JSON.stringify(quests)],
        ["last_context", context],
        ["last_prompt", trimmed],
        ["last_source", "chatbot"],
        ["last_quests_ts", String(Date.now())],
      ]);

      router.push("/main");
    } catch (e) {
      console.error(e);
      Alert.alert("오류", "추천 생성에 실패했어요. 다시 시도해 주세요.");
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "죄송해요. 잠시 오류가 있었어요. 다시 입력해 볼까요?" },
      ]);
    } finally {
      setSendLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require("../assets/images/forest_background1.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {initLoading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator />
            <Text style={[styles.messageText, { marginTop: 8 }]}>질문을 불러오는 중…</Text>
          </View>
        ) : (
          <>
            <FlatList
              style = {{ flex: 1 }}
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.message,
                    item.role === "user" ? styles.user : styles.bot,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
            />

            <KeyboardAvoidingView
              behavior={Platform.select({ ios: "padding", android: undefined })}
              keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={input}
                  onChangeText={setInput}
                  placeholder="여기에 답변을 입력하세요"
                  editable={!sendLoading}
                />
                <TouchableOpacity
                  style={[styles.sendButton, sendLoading && { opacity: 0.6 }]}
                  onPress={sendMessage}
                  disabled={sendLoading}
                >
                  {sendLoading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.sendText}>전송</Text>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  // 1. overlay를 훨씬 더 간단하게!
  overlay: {
    flex: 1,
    // SafeAreaView를 사용하거나, 플랫폼에 맞게 패딩을 조절하는 게 좋아.
    // 여기서는 화면 상단과 하단에 적절한 여백을 줄게.
    paddingTop: Platform.OS === 'ios' ? 90 : 50,
    paddingBottom: 20,
    paddingHorizontal: 22,
  },
  loaderWrap: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
  },
  message: { 
    padding: 12, // 패딩 살짝 키우기
    borderRadius: 15, // 좀 더 둥글게
    marginVertical: 5, 
    maxWidth: "80%", // 메시지 최대 너비 지정
  },
  user: { 
    backgroundColor: "#DCF8C6", 
    alignSelf: "flex-end" 
  },
  bot: { 
    backgroundColor: "#fff", // 흰색 배경
    alignSelf: "flex-start" 
  },
  messageText: { 
    fontSize: 16, 
    fontFamily: "pixel",
  },
  // 2. inputContainer에서 복잡한 위치 값들 제거!
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10, // 위쪽 여백
    borderTopWidth: 1, // 경계선
    borderTopColor: '#eee',
    backgroundColor: 'transparent', // 배경색 투명하게
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "pixel",
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 30,
    padding: 12,
    marginLeft: 10, // 간격 살짝
    minWidth: 70,
    alignItems: "center",
  },
  sendText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontFamily: "pixel" 
  },
});

// const styles = StyleSheet.create({
//   background: { flex: 1, resizeMode: "cover" },
//   overlay: {
//     flex: 1,
//     justifyContent: "space-between",
//     alignItems: "stretch",
//     paddingHorizontal: 22,
//     paddingVertical: 350,
//     top: -100,
//   },
//   loaderWrap: { flex: 1, alignItems: "center", justifyContent: "center", height: "100%", marginTop: -100},
//   message: { padding: 10, borderRadius: 10, marginVertical: -10, maxWidth: "100%", marginTop: 0, marginBottom: 10 },
//   user: { backgroundColor: "#DCF8C6", alignSelf: "flex-end" },
//   bot: { backgroundColor: "#eee", alignSelf: "flex-start" },
//   messageText: { fontSize: 16, fontFamily: "pixel",},
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 5,
//     marginBottom: -40,
//     marginTop: -60,
//     top: 80,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     fontFamily: "pixel",
//   },
//   sendButton: {
//     backgroundColor: "#4CAF50",
//     borderRadius: 30,
//     padding: 12,
//     marginLeft: 5,
//     minWidth: 70,
//     alignItems: "center",
//   },
//   sendText: { color: "#fff", fontWeight: "bold", fontFamily: "pixel" },
// });
