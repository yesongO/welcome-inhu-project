// app/(tabs)/notification.tsx

import { useRouter } from "expo-router";
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";


// 임시 데이터
const dummyNotifications: any[] = [
    { id: '1', title: '인후의 숲 가입을 환영합니다!', time: '방금' },
];

export default function NotificationScreen() {
    const router = useRouter();

    return (
    <ImageBackground
        source={require("../../assets/images/forest_background1.png")}
        style={styles.background}
    >
        <SafeAreaView style={styles.container}>
        {/* 1. 헤더: 뒤로가기 버튼과 제목 */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Image source={require("../../assets/images/back_arrow.png")} style={styles.backArrow} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>알림</Text>
          <View style={styles.placeholder} />{/* 제목을 가운데 정렬하기 위한 빈 공간 */}
        </View>

        {/* 2. 콘텐츠: 알림 목록 */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {dummyNotifications.length === 0 ? (
            // 알림이 하나도 없을 때 보여줄 화면
            <View style={styles.emptyContainer}>
                <Image source={require("../../assets/images/bell.png")} style={styles.emptyIcon} />
                <Text style={styles.emptyText}>새로운 알림이 없습니다.</Text>
            </View>
            ) : (
            // 알림이 있을 때 보여줄 목록 (지금은 dummyNotifications가 비어있어서 보이지 않음)
            dummyNotifications.map((notif) => (
                <View key={notif.id} style={styles.notificationItem}>
                <View style={styles.notificationIconWrapper}>
                    {/* <Image source={require("../../assets/images/intro_gift.png")} style={styles.notificationIcon} /> */}
                    <Text style={styles.notificationIcon}>🌳</Text>
                </View>
                <View style={styles.notificationTextWrapper}>
                    <Text style={styles.notificationText}>{notif.title}</Text>
                    <Text style={styles.notificationTime}>{notif.time}</Text>
                </View>
                </View>
            ))
            )}
        </ScrollView>
        </SafeAreaView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 50, // 상태바 높이에 따라 조절
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButton: {
        width: 40,
        height: 40,
        padding: 10,
    },
    backArrow: {
        width: 60,
        height: 30,
        resizeMode: 'contain',
    },
    headerTitle: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: "pixel",
    },
    placeholder: {
        width: 44, // backButton의 너비와 동일하게 맞춰서 제목을 가운데로!
    },
    contentContainer: {
        flexGrow: 1, // 내용이 적어도 화면을 채우도록
        padding: 15,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 18,
        color: 'white',
        fontFamily: "pixel",
        // fontFamily: 'cookieR',
    },
    notificationItem: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    notificationIconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    notificationIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    notificationTextWrapper: {
        flex: 1,
    },
    notificationText: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: "pixel",
    },
    notificationTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
});