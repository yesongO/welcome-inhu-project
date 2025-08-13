// (tabs)/quest.tsx
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuestStore } from "../store/questStore"; // Zustand에서 수락한 퀘스트 불러오기

export default function QuestScreen() {
  const { acceptedQuests } = useQuestStore(); // [{ id, title, reward, image, description }, ...]

    return (
    <View style={styles.container}>
        <Text style={styles.header}>내 퀘스트</Text>
        {acceptedQuests.length === 0 ? (
        <Text style={styles.empty}>아직 수락한 퀘스트가 없습니다.</Text>
        ) : (
        <FlatList
            data={acceptedQuests}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
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
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
    empty: { fontSize: 16, color: "#888" },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
    },
    image: { width: 60, height: 60, resizeMode: "contain", marginRight: 10 },
    info: { flex: 1 },
    title: { fontSize: 18, fontWeight: "bold" },
    reward: { fontSize: 14, color: "#4CAF50" },
    desc: { fontSize: 12, color: "#555" },
    completeBtn: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    completeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
