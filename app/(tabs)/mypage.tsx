// (tabs)/mypage.tsx
import { useRouter } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MyPageScreen() {
    const router = useRouter();

    return (
        <ImageBackground source={require("../../assets/images/sky_background.png")} style={styles.background}>
            <View style={styles.overlay}></View>
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
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 12,
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
