// (tabs)/mypage.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Text as SvgText } from "react-native-svg";

// myInfo API 임포트 ----------------------------------------
import { getUserInfo } from "../../app/api/myInfo";

export default function MyPageScreen() {
    const router = useRouter();
    const [myProfile, setMyProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = await getUserInfo();
            if (!user) {
                return;
            }

            setMyProfile({
                name: user.nickname,
                department: user.department,
                points: user.point,
                gender: user.gender,
            });
        };

        fetchProfile();
    }, []);

    if (!myProfile) {
        return <Text>Loading...</Text>;
    }

    const profileImageSource = myProfile.gender === "male" 
    ? require("../../assets/images/man.png") 
    : require("../../assets/images/woman.png");
//------------------------------------------------------
    return (
        <ImageBackground source={require("../../assets/images/sky_background.png")} style={styles.background}>
            <View style={styles.overlay}></View>

            {/* 상단 프로필 영역 */}
            <View style={styles.profileContainer}>
                <View style={styles.profileBgContainer}>
                    <Image source={require("../../assets/images/profile_circle.png")} style={styles.profileBg} />
                    <Image source={profileImageSource} style={styles.profileImage} />
                </View>

                <View style={styles.profileText}>
                    <Text style={styles.department}>{myProfile.department}</Text>
                    <Text style={styles.name}>{myProfile.name}</Text>
                    <Text style={styles.points}>보유 포인트 : {myProfile.points} P</Text>
                </View>
            </View>

                {/* 오른쪽 상단 선물 상점 */}
                <TouchableOpacity style={[styles.iconButton, { top: "34%", right: "12%" }]} onPress={() => router.push("/giftshop")}>
                    <Image source={require("../../assets/images/intro_gift.png")} style={styles.iconImage} />
                    <Svg height="80" width="120">
                        <SvgText
                            x="0"
                            y="26"
                            fontSize="30"
                            fontFamily="cookieB"
                            stroke="#fff"       // 테두리 색
                            strokeWidth="4"     // 테두리 굵기
                        >
                            선물 상점
                        </SvgText>
                        <SvgText
                            x="0"
                            y="26"
                            fontSize="30"
                            fontFamily="cookieB"
                            fill="#EF6868"      // 안쪽 글자 색
                        >
                            선물 상점
                        </SvgText>
                    </Svg>
                </TouchableOpacity>

                {/* 왼쪽 중단 식당 도감 1D96CE */}
                <TouchableOpacity style={[styles.iconButton, { top: "44%", left: "8%" }]} onPress={() => router.push("/restaurantdex")}>
                    <Image source={require("../../assets/images/intro_dex.png")} style={styles.iconImage} />
                    <Svg height="80" width="120">
                        <SvgText
                            x="0"
                            y="26"
                            fontSize="30"
                            fontFamily="cookieB"
                            stroke="#fff"       // 테두리 색
                            strokeWidth="4"     // 테두리 굵기
                        >
                            식당 도감
                        </SvgText>
                        <SvgText
                            x="0"
                            y="26"
                            fontSize="30"
                            fontFamily="cookieB"
                            fill="#1D96CE"      // 안쪽 글자 색
                        >
                            식당 도감
                        </SvgText>
                    </Svg>
                </TouchableOpacity>

                {/* 오른쪽 하단 내 교환권 F0AD04 */}
                <TouchableOpacity style={[styles.iconButton, { top: "60%", right: "12%" }]} onPress={() => router.push("/mycoupons")}>
                    <Image source={require("../../assets/images/intro_ticket.png")} style={[styles.iconImage, { top: 14 }]} />
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
        marginBottom: "148%",
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
        top: -20,
        left: -30,
        width: 126,
        height: 126,
    },
    profileImage: {
        width: 88,
        height: 88,
        left: -10,
        marginTop: -4,
        marginRight: 20,
    },
    profileText: {
        justifyContent: "center",
        marginLeft: "4%",
    },

    department: {
        fontSize: 18,
        fontFamily: "cookieB",
        fontWeight: "bold",
        color: "#132836",
        marginBottom: 2,
    },
    name: {
        fontSize: 30,
        fontFamily: "cookieB",
        color: "#132836",
        marginBottom: 4,
    },
    points: {
        fontSize: 18,
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
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginBottom: 4,
    },
    iconText: {
        fontSize: 28,
        fontFamily: "cookieB",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
});
