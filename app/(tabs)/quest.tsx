import { useRouter } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuestStore } from "../store/questStore";

export default function QuestScreen() {
    const { acceptedQuests } = useQuestStore();
    const router = useRouter();

    // 수락하기 버튼을 눌렀을 경우 동작하는 함수
    const handleAuthenticate = (questId: string) => {
        router.push({
            pathname: "/camera",
            params: { questId: questId },
        });
    };

    return (
        <ImageBackground source={require("../../assets/images/forest_background2.png")} style={styles.background}>
            <View style={styles.container}>
                {/* quest_list_box.png를 배경으로 사용하는 메인 패널 */}
                <ImageBackground
                    source={require("../../assets/images/quest_list_box.png")}
                    style={styles.mainPanel}
                    resizeMode="stretch"
                >
                    {/* 퀘스트 정보 */}
                    <View style={styles.questSection}>
                        {acceptedQuests.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>아직 수락한 퀘스트가 없습니다.</Text>
                                <Text style={styles.emptySubText}>메인 페이지에서 퀘스트를 수락해보세요!</Text>
                            </View>
                        ) : (
                            acceptedQuests.map((quest, index) => (
                                <View key={quest.id} style={styles.questItem}>
                                    <View style={styles.characterContainer}>
                                        <Image source={quest.image} style={styles.characterImage} />
                                    </View>
                                    <View style={styles.questInfo}>
                                        <Text style={styles.questTitle}>{quest.title}</Text>
                                        <Text style={styles.questDescription}>{quest.description}</Text>
                                        <View style={styles.actionButtons}>
                                            {/* <TouchableOpacity style={styles.viewQuestBtn}>
                                                <Text style={styles.viewQuestText}>퀘스트보기</Text>
                                            </TouchableOpacity> */}
                                            <TouchableOpacity style={styles.authenticateBtn} onPress={() => handleAuthenticate(quest.id)}>
                                                <Image 
                                                    source={require("../../assets/images/camera.png")} 
                                                    style={[styles.cameraIcon, { tintColor: "#FFFFFF" }]} 
                                                />
                                                <Text style={styles.authenticateText}>인증하기</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                </ImageBackground>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    mainPanel: {
        flex: 1,
        padding: 14,
        minHeight: 500,
        width: "116%",
        marginLeft: -20,
        alignSelf: "center",
    },
    questSection: {
        width: "100%",
        alignItems: "center",
        flex: 1,
        marginTop: 250, // 책 이미지 아래에 적절하게 배치
        marginLeft: 10
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontFamily: "pixel",
        color: "#5D3838",
        fontWeight: "bold",
        marginTop: -200,
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubText: {
        fontSize: 14,
        fontFamily: "pixel",
        color: "#8B7355",
        textAlign: 'center',
    },
    questItem: {
        flexDirection: "row",
        alignItems: "center",
        top: 30,
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#FFFFFF", // 구분선을 흰색으로 변경
    },
    characterContainer: {
        width: 80,
        height: 80,
        overflow: 'hidden',
        marginRight: 15,
        marginLeft: 5,
        alignItems: 'center',        // 가로 중앙
        justifyContent: 'flex-start',// 세로 상단에 붙이기 (머리 안 잘림)
    },
    characterImage: {
        width: 80,
        height: 130,    // 컨테이너(80)보다 더 크게 → 아래쪽만 잘림
        resizeMode: 'contain',
        marginTop: 0,
        marginLeft: 14,
    },
    questInfo: {
        flex: 1,
    },
    questTitle: {
        fontSize: 16,
        fontFamily: "pixel",
        color: "#5D3838",
        fontWeight: "bold",
        marginBottom: 8,
    },
    questDescription: {
        fontSize: 12,
        fontFamily: "pixel",
        color: "#8B7355",
        marginBottom: 12,
        lineHeight: 16,
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "flex-start", // space-between에서 flex-start로 변경
        width: "100%",
        gap: 15, // 버튼 간 간격을 늘림
        alignItems: 'center', // 버튼들을 세로 중앙 정렬
    },
    viewQuestBtn: {
        backgroundColor: "#6A4546", // 사진과 똑같은 어두운 갈색
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 3, // 테두리를 더 두껍게
        borderColor: "#FFFFFF",
        minWidth: 100,
        alignItems: "center",
        justifyContent: 'center', // 버튼 내 텍스트 중앙 정렬
        height: 40, // 고정 높이로 버튼 크기 통일
    },
    viewQuestText: {
        color: "#fff",
        fontFamily: "pixel",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center', // 텍스트 중앙 정렬
    },
    authenticateBtn: {
        backgroundColor: "#6A4546", // 퀘스트보기 버튼과 같은 색
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 3, // 테두리를 더 두껍게
        borderColor: "#FFFFFF",
        minWidth: 100,
        alignItems: "center",
        justifyContent: 'center', // 버튼 내 콘텐츠 중앙 정렬
        flexDirection: "row",
        height: 40, // 고정 높이로 버튼 크기 통일
    },
    cameraIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
        tintColor: "#FFFFFF",
    },
    authenticateText: {
        color: "#fff",
        fontFamily: "pixel",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: 'center', // 텍스트 중앙 정렬
    },
});
