import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";

// 랜덤 시작 질문들
const startQuestions = [
    { role: "bot", text: "오늘 시원한 음식이 땡겨요? 아니면 따뜻한 음식이 땡겨요?" },
    { role: "bot", text: "오늘 기분은 어떤가요? 새콤? 달콤?" },
    { role: "bot", text: "점심으로 뭘 먹을까요? 국물 있는 거? 없는 거?" },
    { role: "bot", text: "지금 배고픈 정도는 어때요? 아주 많이? 조금?" },
    { role: "bot", text: "매운 음식 괜찮으세요? 네 or 아니오" },
    { role: "bot", text: "오늘은 따뜻한 국물? 시원한 면?" },
    { role: "bot", text: "식사 분위기는 조용하게? 북적하게?" },
    { role: "bot", text: "면 요리 vs 밥 요리, 뭐가 좋아요?" },
    { role: "bot", text: "한식, 중식, 일식 중에 어떤 게 당겨요?" },
    { role: "bot", text: "점심 예산은 넉넉하게? 절약 모드?" },
    { role: "bot", text: "매콤한 닭? 부드러운 닭?" },
    { role: "bot", text: "오늘은 고기? 채소?" },
    { role: "bot", text: "해산물 좋아하세요? 네 or 아니오" },
    { role: "bot", text: "오늘은 혼밥? 같이?" },
    { role: "bot", text: "매콤한 국물 vs 담백한 국물" },
    { role: "bot", text: "뜨끈한 밥? 차가운 국수?" },
    { role: "bot", text: "짭짤한 음식 vs 달콤한 음식" },
    { role: "bot", text: "느끼한 음식 vs 담백한 음식" },
    { role: "bot", text: "고기 많은 음식 vs 야채 많은 음식" }
];

export default function ChatScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts(customFonts);
    const [messages, setMessages] = useState([
        startQuestions[Math.floor(Math.random() * startQuestions.length)]
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, { role: "user", text: input }]);
        setInput("");

        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {role: "bot", text: "좋아요, 이제 숲속에서 사장님들의 부탁을 들어주세요!"}
            ]);

            setTimeout(() => router.push("/main"), 3000);
        }, 1000);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground source={require("../assets/images/forest_background1.png")} style={styles.background}>
            <View style={styles.overlay}>
                <FlatList
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                    <View style={[styles.message, item.role === "user" ? styles.user : styles.bot]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                    )}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={setInput}
                    placeholder="메시지를 입력하세요"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendText}>전송</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: "space-between",
        alignItems: "stretch",
        paddingHorizontal: 30,
        paddingVertical: 350,
    },
    message: { 
        padding: 10, 
        borderRadius: 10, 
        marginVertical: 5, 
        maxWidth: "100%" },
    user: { 
        backgroundColor: "#DCF8C6", 
        alignSelf: "flex-end" 
    },
    bot: { 
        backgroundColor: "#eee", 
        alignSelf: "flex-start" 
    },
    messageText: { 
        fontSize: 16 
    },
    inputContainer: { 
        flexDirection: "row", 
        alignItems: "center", 
        paddingVertical: 5,
        marginBottom: -30,
    },
    input: { 
        flex: 1, 
        borderWidth: 1, 
        borderColor: "#ccc", 
        borderRadius: 20, 
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    sendButton: { 
        backgroundColor: "#4CAF50", 
        borderRadius: 20, 
        padding: 10, 
        marginLeft: 5 
    },
    sendText: { 
        color: "#fff", 
        fontWeight: "bold"
    },
});