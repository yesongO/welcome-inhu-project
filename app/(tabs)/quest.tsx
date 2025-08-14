import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuestStore } from "../store/questStore";

export default function QuestScreen() {
    const { acceptedQuests } = useQuestStore();

    return (
    <ImageBackground source={require("../../assets/images/forest_background2.png")} style={styles.background}>
    <ImageBackground
        source={require("../../assets/images/quest_list_box.png")}
        style={styles.backgroundQ}
    >
        <View style={styles.overlay}>
        {/* <Text style={styles.header}>내 퀘스트</Text> */}
        {acceptedQuests.length === 0 ? (
            <Text style={styles.empty}>아직 수락한 퀘스트가 없습니다.</Text>
        ) : (
            <FlatList
            data={acceptedQuests}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.card}>
                <Image source={item.image} style={styles.characterImage} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.reward}>보상: {item.reward}P</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                </View>
                <TouchableOpacity style={styles.completeBtn}>
                    <Text style={styles.completeText}>완료</Text>
                </TouchableOpacity>
                </View>
            )}
            />
        )}
        </View>
    </ImageBackground>
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
    backgroundQ: { 
        flex: 1, 
        resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    header: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
    empty: { color: "#ccc", fontSize: 16 },
    card: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        alignItems: "center",
    },
    characterImage: { width: 50, height: 50, marginRight: 10 },
    info: { flex: 1 },
    title: { fontSize: 18, fontWeight: "bold" },
    reward: { color: "#4CAF50", fontWeight: "600" },
    desc: { fontSize: 14, color: "#555" },
    completeBtn: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    completeText: { color: "#fff", fontWeight: "bold", fontFamily: "pixel", fontSize: 16 },
});
