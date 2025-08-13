import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


type Quest = {
    title: string;
    reward: number;
    description: string;
    characterImage?: any;
};

type QuestModalProps = {
    visible: boolean;
    onClose: () => void;
    quest: Quest;
    onAccept: (quest: Quest) => void;
};

export default function QuestModal({ 
    visible, 
    onClose, 
    quest, 
    onAccept 
}: QuestModalProps) {
    if (!quest) return null;

    return (
    <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
        <ImageBackground
            source={require("../assets/images/boards2.png")}
            style={styles.menuBoard}
        >
            {/* 닫기 버튼 */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>X</Text>
            </TouchableOpacity>

            {/* 캐릭터 + 제목 */}
            <View style={styles.header}>
                <Image source={{ uri: quest.characterImage }} style={styles.characterImage} />
                <View>
                    <Text style={styles.title}>{quest.title}</Text>
                    <Text style={styles.reward}>보상: {quest.reward}P</Text>
                </View>
            </View>

            {/* 내용 */}
            <Text style={styles.description}>{quest.description}</Text>

            {/* 수락 버튼 */}
            <TouchableOpacity style={styles.acceptBtn} onPress={() => {
                onAccept(quest);
                onClose();
            }}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>수락하기</Text>
            </TouchableOpacity>
        </ImageBackground>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    menuBoard: { width: 300, height: 400, padding: 20 },
    closeBtn: { position: "absolute", top: 10, right: 10 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    characterImage: { width: 80, height: 80, resizeMode: "contain", marginRight: 10 },
    title: { fontSize: 18, fontWeight: "bold" },
    reward: { fontSize: 14, color: "#888" },
    description: { fontSize: 14, marginVertical: 10 },
    acceptBtn: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 8, alignItems: "center" }
});
