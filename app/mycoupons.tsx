// (tabs)/mycoupons.tsx
// 내 쿠폰 화면

import { useRouter } from "expo-router";
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";
import { useCouponStore } from './store/couponStore';

// 각 쿠폰에 맞는 이미지를 미리 준비해두자 (경로는 예시)
const couponImages = {
    "인후의숲 안뇽인덕 엽서 교환권": require('../assets/images/goods_ticket.png'),
    "인후의숲 안뇽인덕 키링 교환권": require('../assets/images/goods_ticket.png'),
    "인후의숲 안뇽인덕 스티커 교환권": require('../assets/images/goods_ticket.png'),
    "인후의숲 안뇽인덕 빅스티커 교환권": require('../assets/images/goods_ticket.png'),
    "인후의숲 안뇽인덕 인형 교환권": require('../assets/images/goods_ticket.png'),
};

// const rewards = [
//     { id: "r1", label: "인후의숲 안뇽인덕 스티커 교환권", kind: "coupon" as const },
//     { id: "r2", label: "인후의숲 안뇽인덕 학과별 빅스티커 교환권", kind: "coupon" as const },
//     { id: "r3", label: "인후의숲 안뇽인덕 엽서 교환권", kind: "coupon" as const },
//     { id: "r4", label: "인후의숲 안뇽인덕 키링 교환권", kind: "coupon" as const },
//     { id: "r5", label: "인후의숲 안뇽인덕 인형 교환권", kind: "coupon" as const },
//   ];

export default function MyCouponsScreen() {
    const router = useRouter();
    const { myCoupons } = useCouponStore();

    return (
        <ImageBackground source={require("../assets/images/sky_background.png")} style={styles.background}>
            <View style={styles.overlay}></View>

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
                    <Image source={require("../assets/images/intro_ticket.png")} style={styles.iconImage} />
                    <View style={{marginTop: 30}}>
                        <Svg height="80" width="120">
                            <SvgText
                                x="0"
                                y="26"
                                fontSize="30"
                                fontFamily="cookieB"
                                stroke="#fff"       // 테두리 색
                                strokeWidth="4"     // 테두리 굵기
                            >
                                내 교환권
                            </SvgText>
                            <SvgText
                                x="0"
                                y="26"
                                fontSize="30"
                                fontFamily="cookieB"
                                fill="#F0AD04"      // 안쪽 글자 색
                            >
                                내 교환권
                            </SvgText>
                        </Svg>
                    </View>
                </View>
                    <View style={styles.couponContainer}>
                        {myCoupons.length === 0 ? (
                            <Text style={styles.pointText}>아직 획득한 교환권이 없어요.</Text>
                        ) : (
                        <FlatList
                            data={myCoupons}
                            keyExtractor={(item) => item.id + Math.random()} // key는 고유해야 해
                            renderItem={({ item }) => (
                                <View style={styles.couponItem}>
                                    <Image source={couponImages[item.label as keyof typeof couponImages]} style={styles.couponImage} />
                                    <Text style={styles.labelText}>{item.label}</Text>
                                </View>
                            )}
                        />
                        )}
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
    },
    couponContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -400,
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
        marginTop: -140
    },
    couponItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    couponImage: { width: 100, height: 80, marginRight: 10, resizeMode: 'contain' },
    labelText: {
        fontSize: 18,
        fontFamily: "cookieB",
        color: "#CF796C",
        textAlign: "center",
        marginTop: -0,
        marginLeft: 10,
    }
});