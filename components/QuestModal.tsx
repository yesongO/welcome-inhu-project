// *** 퀘스트 모달 컴포넌트 ***

// import QuestModal from "../../components/QuestModal";
// 캐릭터를 사용자가 클릭했을 경우 퀘스트 정보를 표시하고, 
// 수락 버튼을 클릭하면 퀘스트 수락이 됩니다.

import { useFonts } from "expo-font";
import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { customFonts } from "../constants/Fonts";

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

    const [fontsLoaded] = useFonts(customFonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
    <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
        <ImageBackground
            source={require("../assets/images/boards2.png")}
            style={styles.menuBoard}
        >
            {/* 닫기 버튼 */}
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Image source={require("../assets/images/close_btn.png")} style={styles.closeBtnImage} />
            </TouchableOpacity>

            {/* 캐릭터 + 제목 */}
            <View style={styles.header}>
                <Image source={ quest.characterImage } style={styles.characterImage} />
                <View>
                    <Text style={styles.title}>{quest.title}</Text>
                    <Text style={styles.title}>사장님의 부탁</Text>
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
    overlay: { 
        flex: 1, 
        backgroundColor: "rgba(0,0,0,0.5)", 
        justifyContent: "center", 
        alignItems: "center" 
    },
    menuBoard: { 
        width: 330, height: 480, padding: 20,
    },
    closeBtn: { 
        position: "absolute", 
        top: 30, 
        right: 20,
        zIndex: 2000,
        width: 50,
        height: 50,
    },
    closeBtnImage: {
        width: "100%",
        height: "100%",
    },
    header: { 
        flexDirection: "row", 
        alignItems: "center", 
        marginTop: 70,
        marginRight: 160,
        marginBottom: 40,
        zIndex: 1000,
    },
    characterImage: { 
        width: 140, 
        height: 140, 
        resizeMode: "contain", 
        marginRight: -10,
        marginLeft: -4,
        zIndex: 1000,
    },
    title: { 
        fontSize: 20, 
        fontFamily: "pixel",
        color: "#5D3838",
    },
    reward: { 
        fontSize: 16, 
        fontFamily: "pixel",
        color: "#5D3838",
        marginTop: 10,
    },
    description: { 
        fontSize: 14, 
        marginVertical: 10 },
    acceptBtn: { 
        backgroundColor: "#4CAF50", 
        padding: 10, 
        borderRadius: 8, 
        alignItems: "center" 
    }
});
