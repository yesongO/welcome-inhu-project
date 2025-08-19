// app/obtain-gift.tsx
// 뽑기 결과 화면 (본문 없이 기본 구조만)

import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

type Params = {
  boxId?: string;
  rewardLabel?: string;
  kind?: "point" | "coupon" | "item" | "premium" | string;
  amount?: string;
};


const BOX_IMAGES: Record<string, any> = {
  g1: require("../assets/images/boxes_1.png"),
  g2: require("../assets/images/boxes_2.png"),
  g3: require("../assets/images/boxes_3.png"),
  g4: require("../assets/images/boxes_4.png"),
  g5: require("../assets/images/boxes_5.png"),

};

export default function ObtainGiftScreen() {
  const router = useRouter();
  const { boxId, rewardLabel, kind, amount } = useLocalSearchParams<Params>();

  const boxImage = boxId && BOX_IMAGES[boxId] ? BOX_IMAGES[boxId] : BOX_IMAGES["g1"];
  const resultText =
    kind === "point" && amount ? `${amount} point` : String(rewardLabel ?? "보상을 획득했어요");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.back();
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

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

    {/* 선물 상점 아이콘 & 글자 */}
    <View style={styles.iconRow}>
      <Image source={require("../assets/images/intro_gift.png")} style={styles.iconImage} />
      <View>
        <Svg height="80" width="120">
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
        <Text style={styles.pointText}>내 포인트 : 20 P</Text>
      </View>
      </View>

      <View style={styles.boxWrapper}>
      {/* 폭죽 배경 */}
      <Image
        source={require("../assets/images/gift-deco.png")}
        style={styles.decoImage}
      />

      <Text style={styles.resultText}>{resultText}</Text>
      {/* 선택한 상자 */}
      <Image source={boxImage} style={styles.boxImage} />
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
  },
  backArrow: {
    width: 80,
    height: 48,
  },
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
  iconImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
  },
  pointText: {
    fontSize: 20,
    fontFamily: "cookieB",
    color: "#fff",
    textAlign: "center",
    marginTop: -38,
  },
  boxWrapper: {
    top: -360,
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
},

decoImage: {
  position: "absolute",
  width: 500,     
  height: 500,
  resizeMode: "contain",
},

boxImage: {
  width: 150,
  height: 150,
  resizeMode: "contain",
},
resultText:{
    fontSize: 40,
    fontFamily: "cookieB",
    color: "#ADFF2F",
    textAlign: "center",
        
    
  },
});
