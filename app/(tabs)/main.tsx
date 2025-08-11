import { useFonts } from "expo-font";
import { customFonts } from "../../constants/Fonts";
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

export default function MainScreen() {
    return (
        <ImageBackground source={require("../../assets/images/forest_background2.png")} style={styles.background}>
            <View style={styles.overlay}></View>
        </ImageBackground>
    );
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
    },
});

