// app/obtain-gift.tsx
// 뽑기 결과 화면

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Params = {
  boxId?: string;
  rewardLabel?: string;
  kind?: "point" | "coupon" | "item" | "premium" | string;
  amount?: string; // 쿼리 파람이라 문자열로 옴
};

const BOX_IMAGES: Record<string, any> = {
  g1: require("../assets/images/boxes_1.png"),
  g2: require("../assets/images/boxes_2.png"),
  g3: require("../assets/images/boxes_3.png"),
  g4: require("../assets/images/boxes_4.png"),
  g5: require("../assets/images/boxes_5.png"),
};

// 로컬 포인트 헬퍼
async function getLocalPoints() {
  const raw = await AsyncStorage.getItem("points");
  return parseInt(raw ?? "0", 10) || 0;
}
async function setLocalPoints(v: number) {
  await AsyncStorage.setItem("points", String(v));
}

export default function ObtainGiftScreen() {
  const router = useRouter();
  const { boxId, rewardLabel, kind, amount } = useLocalSearchParams<Params>();

  const [points, setPoints] = useState(0);

  const boxImage = boxId && BOX_IMAGES[boxId] ? BOX_IMAGES[boxId] : BOX_IMAGES["g1"];
  const resultText =
    kind === "point" && amount ? `${amount} point` : String(rewardLabel ?? "보상을 획득했어요");

  // 포인트 표시 + (보상이 포인트면) 1회만 가산 처리
  useEffect(() => {
    (async () => {
      // 현재 포인트 불러오기
      const cur = await getLocalPoints();

      // 포인트 보상일 경우 가산(중복 방지)
      if (kind === "point" && amount) {
        const amt = Number(amount);
        // 중복 크레딧 방지 키(박스/라벨/금액 조합)
        const creditKey = `credited:${boxId ?? "na"}:${rewardLabel ?? "na"}:${amt}`;
        const already = await AsyncStorage.getItem(creditKey);

        if (!already && !Number.isNaN(amt) && amt > 0) {
          const next = cur + amt;
          await setLocalPoints(next);
          await AsyncStorage.setItem(creditKey, "1");
          setPoints(next);
          return;
        }
      }

      // 보상이 포인트가 아니거나 이미 가산했다면 그대로 표시
      setPoints(cur);
    })();
  }, [boxId, rewardLabel, kind, amount]);

  return (
    <ImageBackground source={require("../assets/images/sky_background.png")} style={styles.background}>
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

      {/* 상단 타이틀 & 포인트 */}
      <View style={styles.iconRow}>
        <Image source={require("../assets/images/intro_gift.png")} style={styles.iconImage} />
        <View>
          <Svg height="80" width="120">
            <SvgText x="0" y="26" fontSize="30" fontFamily="cookieB" stroke="#fff" strokeWidth="4">
              선물 상점
            </SvgText>
            <SvgText x="0" y="26" fontSize="30" fontFamily="cookieB" fill="#EF6868">
              선물 상점
            </SvgText>
          </Svg>
          <Text style={styles.pointText}>내 포인트 : {points} P</Text>
        </View>
      </View>

      <View style={styles.boxWrapper}>
        {/* 폭죽 배경 */}
        <Image source={require("../assets/images/gift-deco.png")} style={styles.decoImage} />

        <Text style={styles.resultText}>{resultText}</Text>
        {/* 선택한 상자 */}
        <Image source={boxImage} style={styles.boxImage} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
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
  boxWrapper: { top: -360, marginTop: 80, alignItems: "center", justifyContent: "center" },
  decoImage: { position: "absolute", width: 500, height: 500, resizeMode: "contain" },
  boxImage: { width: 150, height: 150, resizeMode: "contain" },
  resultText: { fontSize: 40, fontFamily: "cookieB", color: "#ADFF2F", textAlign: "center" },
});
