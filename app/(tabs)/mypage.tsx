// (tabs)/mypage.tsx
import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MyPageScreen() {
    const router = useRouter();

    // 임시 더미 데이터
    const profile = {
        name: "오예송",
        department: "디자인테크놀로지학과",
        points: 200,
        image: require("../../assets/images/woman.png"),
    };

    return (
        <ImageBackground source={require("../../assets/images/sky_background.png")} style={styles.background}>
            <View style={styles.overlay}></View>

            {/* 상단 프로필 영역 */}
            <View style={styles.profileContainer}>
                <Image source={profile.image} style={styles.profileImage} />

                <View style={styles.profileText}>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.department}>{profile.department}</Text>
                    <Text style={styles.points}>{profile.points}P</Text>
                </View>
            </View>
                <Text style={styles.header}>나의 페이지</Text>

                <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/giftshop")}
                >
                <Text style={styles.buttonText}>🎁 선물 상점</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/restaurantdex")}
                >
                <Text style={styles.buttonText}>🍽 식당 도감</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/mycoupons")}
                >
                <Text style={styles.buttonText}>🎟 내 교환권</Text>
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
    header: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20 
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: "#fff",
        marginRight: 15,
    },
    profileText: {
        justifyContent: "center",
    },
    department: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 2,
    },
    name: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 2,
    },
    points: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 12,
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
