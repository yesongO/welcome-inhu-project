// giftshop.tsx
// 선물 상점 화면

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

// 포인트 차감을 위한 point API 임포트 ----------------------------------------
import { usePointMinus } from "./api/pointMinus";
// 현재 내 포인트를 가져오기 위한 myInfo API 임포트 ------------------------------
import { getUserInfo } from "./api/myInfo";
// 포인트 적립을 위한 point API 임포트 ----------------------------------------
import { usePointAdd } from "./api/pointAdd";

// ===== 설정값 =====
const PICK_COST = 300;           // 일반 상자 가격
const PREMIUM_COST = 500;       // 프리미엄 상자 가격

// 임시 보상 데이터 나중에 수정할거
const rewards = [
  { id: "r1", label: "인후의숲 안뇽인덕 시티커 교환권", kind: "coupon" as const },
  { id: "r2", label: "인후의숲 안뇽인덕 학과별 빅스티커 교환권", kind: "coupon" as const },
  { id: "r3", label: "인후의숲 안뇽인덕 엽서 교환권", kind: "coupon" as const },
  { id: "r4", label: "인후의숲 안뇽인덕 키링 교환권", kind: "coupon" as const },
  { id: "r5", label: "인후의숲 안뇽인덕 인형 교환권", kind: "coupon" as const },
];

const pickRandomReward = () => {
  const idx = Math.floor(Math.random() * rewards.length);
  return rewards[idx];
};

export default function GiftShopScreen() {
  const router = useRouter();
  const [points, setPoints] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 앱 최초 진입 시 기본 나의 포인트 세팅
  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getUserInfo();
      if (user) {
        setPoints(user.point);
      }
    };
    fetchProfile();
  }, []);

  // 치트로 포인트 적립되게 하기 ======================================================
  const handleDevPoint = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await usePointAdd(1);

      if (result && result.points_added) {
        setPoints(prevPoints => prevPoints + result.points_added);

        Alert.alert("포인트 적립 성공!", `포인트 ${result.points_added} P 적립되었어!`);
      } else {
        Alert.alert("포인트 적립 실패", "포인트 적립에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("포인트 적립 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }
  // =============================================================================

  // 핸들러 함수 추가
  const handlePickBox = async () => {
    if (isLoading) return;
    if (points < PICK_COST) {
      Alert.alert("포인트 부족", "포인트가 부족합니다. 충전 후 이용해 주세요.");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await usePointMinus();

      if (result && result.points_deducted) {
        setPoints(prevPoints => prevPoints - result.points_deducted);

        const reward = pickRandomReward();
        Alert.alert(
          "뽑기 성공!", 
          `축하해! ${reward.label}을 획득했어!`,
          [{text: "확인"}]
        );

      } else {
        Alert.alert("뽑기 실패", "뽑기에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("뽑기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };


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
          <Text style={styles.pointText} onLongPress={handleDevPoint}>내 포인트 : {points} P</Text>
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
                onPress={handlePickBox}
                disabled={isLoading}
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
                onPress={handlePickBox}
                disabled={isLoading}
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
              300 포인트를 사용해 {"\n"}
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
        <TouchableOpacity style={styles.premiumRow}>
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
