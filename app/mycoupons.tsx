// (tabs)/mycoupons.tsx
// 내 쿠폰 화면

import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

export default function GiftShopScreen() {
    const router = useRouter();

    return (
        <ImageBackground source={require("../assets/images/sky_background.png")} style={styles.background}>
            <View style={styles.overlay}></View>

                {/* 왼쪽 상단 뒤로가기 버튼 */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/mypage")}>
                    <Text style={styles.backText}>←</Text>
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
                        {/* <Text style={styles.pointText}>채운 도감 : n개</Text> */}
                    </View>
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
    backButton: {
        position: "absolute",
        top: 60,
        left: 18,
        padding: 12,
        width: 54,
        height: 54,
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#000",
    },
    backText: {
        fontSize: 30,
        fontFamily: "cookieB",
        fontWeight: "bold",
        color: "#000",
        marginTop: -8,
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
        marginTop: -38
    },
});