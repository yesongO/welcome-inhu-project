// (tabs)/mypage.tsx
import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MyPageScreen() {
    const router = useRouter();

    // 임시 더미 데이터
    const profile = {
        name: "오예송",
        department: "디자인테크놀로지학과",
        points: 100,
        image: require("../../assets/images/woman.png"),
    };

    return (
        <ImageBackground source={require("../../assets/images/sky_background.png")} style={styles.background}>
            <View style={styles.overlay}></View>

            {/* 상단 프로필 영역 */}
            <View style={styles.profileContainer}>
                <View style={styles.profileBgContainer}>
                    <Image source={require("../../assets/images/profile_circle.png")} style={styles.profileBg} />
                    <Image source={profile.image} style={styles.profileImage} />
                </View>

                <View style={styles.profileText}>
                    <Text style={styles.department}>{profile.department}</Text>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.points}>보유 포인트 : {profile.points} P</Text>
                </View>
            </View>

                {/* 오른쪽 상단 선물 상점 */}
                <TouchableOpacity style={[styles.iconButton, { top: "30%", right: "12%" }]} onPress={() => router.push("/giftshop")}>
                    <Image source={require("../../assets/images/intro_gift.png")} style={styles.iconImage} />
                    <Text style={[styles.iconText, { color: "#EF6868" }]}>선물 상점</Text>
                </TouchableOpacity>

                {/* <Svg height="40" width="200">
                <SvgText x="3" y="30" fontSize="20" fontFamily="cookieB" stroke="#30211A" strokeWidth="8">
                    보유 포인트: {points}P
                </SvgText>
                <SvgText x="3" y="30" fontSize="20" fontFamily="cookieB" fill="#fff">
                    보유 포인트: {points}P
                </SvgText>
                </Svg> */}

                {/* 왼쪽 중단 식당 도감 */}
                <TouchableOpacity style={[styles.iconButton, { top: "45%", left: "10%" }]} onPress={() => router.push("/restaurantdex")}>
                    <Image source={require("../../assets/images/intro_dex.png")} style={styles.iconImage} />
                    <Text style={[styles.iconText, { color: "#1D96CE" }]}>식당 도감</Text>
                </TouchableOpacity>

                {/* 오른쪽 하단 내 교환권 */}
                <TouchableOpacity style={[styles.iconButton, { bottom: "12%", right: "12%" }]} onPress={() => router.push("/mycoupons")}>
                    <Image source={require("../../assets/images/intro_ticket.png")} style={styles.iconImage} />
                    <Text style={[styles.iconText, { color: "#F0AD04" }, { marginTop: -14}]}>내 교환권</Text>
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
        position: "relative",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "140%",
        borderRadius: 10,
        paddingVertical: 26,
        paddingHorizontal: 24,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    profileBgContainer: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "8%",
    },
    profileBg: {
        position: "absolute",
        top: -15,
        left: -15,
        width: 100,
        height: 100,
    },
    profileImage: {
        width: 70,
        height: 70,
        marginTop: -2,
        marginRight: 40,
    },
    profileText: {
        justifyContent: "center",
    },
    department: {
        fontSize: 16,
        fontFamily: "cookieB",
        fontWeight: "bold",
        color: "#132836",
        marginBottom: 2,
    },
    name: {
        fontSize: 22,
        fontFamily: "cookieB",
        color: "#132836",
        marginBottom: 2,
    },
    points: {
        fontSize: 16,
        fontFamily: "cookieB",
        color: "#132836",
        fontWeight: "bold",
    },
    iconButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    iconImage: {
        width: 140,
        height: 140,
        resizeMode: "contain",
        marginBottom: 8,
    },
    iconText: {
        fontSize: 28,
        fontFamily: "cookieB",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
});
