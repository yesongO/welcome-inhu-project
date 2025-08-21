// (tabs)/restaurantdex.tsx
// 식당 도감 화면

import { useRouter } from "expo-router";
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

type Item = {
  name?: string;
  icon?: any; // (선택) 아이콘 이미지를 넣고 싶을 때 사용
};

function chunkArray(array: any[], chunkSizes: number[]) {
  const result: any[] = [];
  let index = 0;

  while (index < array.length) {
    for (let size of chunkSizes) {
      if (index >= array.length) break;
      result.push(array.slice(index, index + size));
      index += size;
    }
  }
  return result;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_CIRCLE_PER_ROW = 3;
const GAP = 14;            
const H_PADDING = 24;    
const CIRCLE = (SCREEN_WIDTH - H_PADDING * 5.2 - GAP * (MAX_CIRCLE_PER_ROW - 1)) / MAX_CIRCLE_PER_ROW;           
// 최대 3개가 들어가는 줄 기준 너비(작은 화면에서 좌우 여백 고려)
const ROW_WIDTH = Math.min(SCREEN_WIDTH - H_PADDING * 2, CIRCLE * 3 + GAP * 2);

export default function GiftShopScreen() {
  const router = useRouter();

  // 임시데이터(테스트용) — 나중에 API 연결 후 수정
  const items: Item[] = [
    { name: "미식당" },
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
  ];

  const grouped = chunkArray(items, [3, 2, 2, 3]);

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

      {/* 식당 도감 아이콘 & 글자 */}
      <View style={styles.iconRow}>
        <Image source={require("../assets/images/intro_dex.png")} style={styles.iconImage} />
        <View>
          <Svg height="80" width="140">
            <SvgText
              x="0"
              y="26"
              fontSize="30"
              fontFamily="cookieB"
              stroke="#fff"
              strokeWidth="4"
            >
              식당 도감
            </SvgText>
            <SvgText
              x="0"
              y="26"
              fontSize="30"
              fontFamily="cookieB"
              fill="#1D96CE"
            >
              식당 도감
            </SvgText>
          </Svg>
          <Text style={styles.pointText}>채운 도감 : n개</Text>
        </View>
      </View>

      {/* 원형 그리드 */}
      <View style={styles.circleGrid}>
        {grouped.map((row: Item[], rowIndex: number) => (
          <View
            key={rowIndex}
            style={[
            styles.rowBase,
            { width: ROW_WIDTH, marginBottom: 10, marginTop: 4 },
              row.length === 2 && { paddingHorizontal: (CIRCLE + GAP) / 2 },

    rowIndex === 2 && { marginLeft: 30},
    rowIndex === 3 && { marginLeft: 20},
    rowIndex === 4 && { marginLeft: -20},
  ]}
>
            {row.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.circle,
                  {
                    width: CIRCLE,
                    height: CIRCLE,
                    borderRadius: CIRCLE / 2,
                    marginRight: index < row.length - 1 ? GAP : 0,
                  },
                ]}
              >
                {item?.name ? (
                  <>
                    {item.icon && (
                      <Image source={item.icon} style={{ width: 40, height: 40, marginBottom: 6 }} />
                    )}
                    <Text style={styles.circleLabel} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* 넘어가기 버튼 */}
<TouchableOpacity
  style={styles.rightImage}
  onPress={() => router.push("/restaurantdex2")}
  accessibilityRole="button"
  accessibilityLabel="넘어가기"
>
  <Image
    source={require("../assets/images/right1.png")}
    
  />
</TouchableOpacity>


      
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
    top: "11%",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  iconImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 8,
    marginRight: 8,
  },
  pointText: {
    fontSize: 20,
    fontFamily: "cookieB",
    color: "#fff",
    textAlign: "center",
    marginTop: -38,
  },


  rowBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    shadowColor: "#000",        // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 가로/세로 번짐
    shadowOpacity: 0.3,         // 불투명도 (0 ~ 1)
    shadowRadius: 4,            // 퍼지는 정도
  },
  circleLabel: {
    fontSize: 14,
    fontFamily: "cookieB",
    color: "#000",
    textAlign: "center",
  },
  circleGrid: {
    marginLeft: 55,
    marginBottom: 10,
  },
  rightImage: {
    top: -92,
    left: "1%",
    marginLeft: "78%",
  },
});
