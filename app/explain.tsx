import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";

export default function ExplainScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <Image source={require("../assets/images/board1.png")} style={styles.board} />
                <Text style={styles.description}>
                    안녕 !!!{'\n'}
                    오늘도 인후의 숲에 와줘서 고마워{'\n'}
                    {'\n'}
                    인후의 숲에 갇혀 있는 {'\n'}
                    인후 식당 사장님들의{'\n'}
                    부탁을 들어줘!{'\n'}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push("/chat")}>
                    <Text style={styles.buttonText}>맡겨줘!!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        resizeMode: "cover",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "relative",
        marginTop: -180,
    },
    board: {
        width: "120%",
        height: 380,
    },
    description: {
        fontFamily: "pixel",
        color: "#804F50",
        fontSize: 18,
        marginTop: -280,
        alignSelf: "center",
        marginLeft: 18,
        marginRight: 18,
        lineHeight: 28,
        textAlign: "center",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
    },
    button: {
        width: 170,
        alignSelf: "center",
        backgroundColor: "#6A4546",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginTop: 20,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "supermagic",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});