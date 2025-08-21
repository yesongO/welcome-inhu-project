// giftshop.tsx
// 선물 상점 화면

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { usePoint } from "./api/point";

// ===== 설정값 =====
const DEFAULT_POINTS = 100;     // 앱 최초 실행 시 로컬 기본 포인트
const PICK_COST = 20;           // 일반 상자 가격
const PREMIUM_COST = 500;       // 프리미엄 가격
const DEV_TOPUP = 100;          // 길게 눌러 충전되는 포인트 (개발자용)

// 임시 보상 데이터 나중에 수정할거
const rewards = [
  { id: "r1", label: "포인트 10", kind: "point" as const, amount: 10 },
  { id: "r2", label: "포인트 30", kind: "point" as const, amount: 30 },
  { id: "r3", label: "인덕이 키링 교환권", kind: "coupon" as const },
  { id: "r4", label: "학과별 스티커", kind: "item" as const },
];
const pickRandomReward = () => {
  const idx = Math.floor(Math.random() * rewards.length);
  return rewards[idx];
};

async function getLocalPoints() {
  const raw = await AsyncStorage.getItem("points");
  return parseInt(raw ?? "0", 10) || 0;
}
async function setLocalPoints(v: number) {
  await AsyncStorage.setItem("points", String(v));
}

export default function GiftShopScreen() {
  const router = useRouter();
  const [points, setPoints] = useState(0);

  // 앱 최초 진입 시 기본 포인트 세팅
  useEffect(() => {
    (async () => {
      const cur = await getLocalPoints();
      if (cur <= 0) {
        await setLocalPoints(DEFAULT_POINTS);
        setPoints(DEFAULT_POINTS);
      } else {
        setPoints(cur);
      }
    })();
  }, []);

  // 포인트 최신화(다른 화면 다녀오고 돌아왔을 때 대비)
  const refreshPoints = useCallback(async () => {
    const cur = await getLocalPoints();
    setPoints(cur);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      (async () => {
        const cur = await getLocalPoints();
        if (alive) setPoints(cur);
      })();
      return () => {
        alive = false;
      };
    }, [])
  );

  // 개발자용: 길게 눌러 포인트 충전
  const devTopupPoints = useCallback(async () => {
    const cur = await getLocalPoints();
    const next = cur + DEV_TOPUP;
    await setLocalPoints(next);
    setPoints(next);
    Alert.alert("개발자 충전", `+${DEV_TOPUP}P 충전됨\n현재: ${next}P`);
  }, []);

  const items = [
    { id: "g1", name: "box 1", premium: false, image: require("../assets/images/boxes_1.png") },
    { id: "g2", name: "box 2", premium: false, image: require("../assets/images/boxes_2.png") },
    { id: "g3", name: "box 3", premium: false, image: require("../assets/images/boxes_3.png") },
    { id: "g4", name: "box 4", premium: false, image: require("../assets/images/boxes_4.png") },
    { id: "g5", name: "box 5", premium: false, image: require("../assets/images/boxes_5.png") },
    { id: "g6", name: "프리미엄 ", premium: true, image: require("../assets/images/special_gift_1.png") },
  ];

  const regularItems = items.filter(i => !i.premium).slice(0, 6);
  const topRow = regularItems.slice(0, 2);     // 2개
  const bottomRow = regularItems.slice(2, 5);  // 3개

  const tryDeductPoints = useCallback(async (cost: number) => {
    const current = await getLocalPoints();
    if (current < cost) {
      Alert.alert("포인트 부족", "포인트가 부족합니다. 충전 후 이용해 주세요.");
      return false;
    }

    // 1) API 시도
    try {
      const apiRes = await usePoint(cost); // 서버 차감 시도
      if (apiRes) {
        const newLocal = Math.max(0, current - cost);
        await setLocalPoints(newLocal);
        setPoints(newLocal);
        return true;
      }
      // apiRes가 falsy면 아래 로컬 차감으로 폴백
    } catch (e) {
      // 서버 실패 → 로컬 폴백
    }

    // 2) 서버 안될 때 로컬 폴백
    const newLocal = current - cost;
    await setLocalPoints(newLocal);
    setPoints(newLocal);
    return true;
  }, []);

  // 일반 박스 클릭
  const handlePick = useCallback(async (boxId: string) => {
    const ok = await tryDeductPoints(PICK_COST);
    if (!ok) return;

    const reward = pickRandomReward();
    // 포인트 보상(예: 포인트 10/30)일 경우 로컬 포인트 즉시 가산
    if (reward.kind === "point" && (reward as any).amount) {
      const after = (await getLocalPoints()) + (reward as any).amount;
      await setLocalPoints(after);
      setPoints(after);
    }

    router.push({
      pathname: "/obtain-gift",
      params: {
        boxId,
        rewardLabel: reward.label,
        kind: (reward as any).kind,
        amount: (reward as any).kind === "point" ? String((reward as any).amount) : "",
      },
    });
  }, [tryDeductPoints, router]);

  // 프리미엄 상품 클릭
  const handlePremium = useCallback(async () => {
    const ok = await tryDeductPoints(PREMIUM_COST);
    if (!ok) return;

    router.push({
      pathname: "/obtain-gift",
      params: {
        rewardLabel: "프리미엄 스페이스 출입증",
        kind: "premium",
      },
    });
  }, [tryDeductPoints, router]);

  return (
    <ImageBackground
      source={require("../assets/images/sky_background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      {/* 왼쪽 상단 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/mypage")}
        accessibilityRole="button"
        accessibilityLabel="뒤로가기"
      >
        <Image source={require("../assets/images/back_arrow.png")} style={styles.backArrow} />
      </TouchableOpacity>

      {/* 선물 상점 아이콘 & 글자 */}
      <View style={styles.iconRow}>
        <Image source={require("../assets/images/intro_gift.png")} style={styles.iconImage} />
        <View>
          <Svg height="80" width="160">
            <SvgText
              x="0"
              y="26"
              fontSize="30"
              fontFamily="cookieB"
              stroke="#fff"
              strokeWidth="4"
            >
              선물 상점
            </SvgText>
            <SvgText
              x="0"
              y="26"
              fontSize="30"
              fontFamily="cookieB"
              fill="#EF6868"
            >
              선물 상점
            </SvgText>
          </Svg>

          {/* ⬇️ 길게 누르면 포인트 충전 (개발자용) */}
          <TouchableOpacity
            onLongPress={devTopupPoints}
            delayLongPress={450}
            accessibilityRole="button"
            accessibilityLabel="포인트 충전(개발자)"
            style={{ alignSelf: "center", paddingVertical: 6, paddingHorizontal: 12 }}
          >
            <Text style={styles.pointText}>내 포인트 : {points} P</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 컨텐츠 */}
      <View style={styles.content}>
        {/* 상자 그리드 */}
        <View style={styles.dashedBox}>
          <View style={[styles.gridRow, { marginBottom: 12 }]}>
            {topRow.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handlePick(item.id)}
              >
                <Image source={item.image} style={styles.cardImage} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.gridRow}>
            {bottomRow.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handlePick(item.id)}
              >
                <Image source={item.image} style={styles.cardImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 안내 보드 */}
        <View style={{ marginTop: -30, alignItems: "center" }}>
          <ImageBackground
            source={require("../assets/images/gift-board.png")}
            style={{
              width: "100%",
              minHeight: 170,
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              marginTop: -4,
            }}
            resizeMode="stretch"
            imageStyle={styles.boardImage}
          >

            <Text style={[styles.infoText, {textAlign: "center"}]}>
              20 포인트를 사용해 {"\n"}
              5가지의 랜덤선물을 뽑아보세요 !{"\n"}
              {"\n"}
              • 인후의숲 안뇽인덕 스티커 교환권 {"\n"}
              • 인후의숲 안뇽인덕 학과별 빅스티커 교환권 {"\n"}
              • 인후의숲 안뇽인덕 엽서 교환권 {"\n"}
              • 인후의숲 안뇽인덕 키링 교환권 {"\n"}
              • 인후의숲 안뇽인덕 인형 교환권 {"\n"}
            </Text>
          </ImageBackground>
        </View>

        {/* 프리미엄 상품 */}
        <TouchableOpacity style={styles.premiumRow} onPress={handlePremium}>
          <Image
            source={require("../assets/images/special_gift_1.png")}
            style={styles.premiumImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumTitle}>
              프리미엄 스페이스 교환권 {"\n"}
              가격: {PREMIUM_COST} P
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },
  backArrow: { width: 80, height: 48 },
  backButton: {
    position: "absolute",
    top: 66,
    left: 24,
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  iconRow: {
    position: "absolute",
    top: "10%",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  iconImage: { width: 120, height: 120, resizeMode: "contain", marginBottom: 8 },
  pointText: {
    fontSize: 20,
    fontFamily: "cookieB",
    color: "#fff",
    textAlign: "center",
    marginTop: -38,
  },
  content: { position: "absolute", left: 16, right: 16, top: "22%", bottom: 24 },
  dashedBox: {
    top: 10,
    borderWidth: 10,
    borderStyle: "solid",
    borderColor: "#7C4E4E",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#D2EBF7",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: -2,
    marginBottom: 9,
    marginTop: -6,
    padding: 8,
  },
  card: { width: "37%", aspectRatio: 1, justifyContent: "center", alignItems: "center" },
  cardImage: { width: "100%", height: "100%", resizeMode: "contain" },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B4D33",
     fontFamily: "cookieB",
     marginBottom: 20,
     marginTop: 40,
  },
  premiumRow: { marginTop: 14, flexDirection: "row", alignItems: "center", padding: 12 },
  premiumImage: { width: 130, height: 130, resizeMode: "contain", marginRight: 8 },
  premiumTitle: { fontSize: 20, fontFamily: "cookieB", color: "#3A2A0A" },
  premiumPrice: { marginTop: 4, fontSize: 14, color: "#3A2A0A" },
  boardImage: { borderRadius: 12, marginLeft: -2 },
});
