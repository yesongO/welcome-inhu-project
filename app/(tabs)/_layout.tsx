import { Stack, useRouter, useSegments } from "expo-router";
import { Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const current = "/" + segments.join("/");

  return (
    <View style={{ flex: 1}}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />

      <SafeAreaView style={styles.tabBarContainer}>
      <View style={styles.tabBar}>

        <TouchableOpacity onPress={() => router.push("/main")}>
          <Image source={require("../../assets/images/home.png")} 
          style={[styles.icon, current === "/main" && styles.active]}
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/quest")}>
          <Image source={require("../../assets/images/quest.png")} 
          style={[styles.icon, current === "/quest" && styles.active]}
        />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require("../../assets/images/change.png")} 
          style={styles.icon}
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/notification")}>
          <Image source={require("../../assets/images/bell.png")} 
          style={[styles.icon, current === "/notification" && styles.active]}
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/mypage")}>
          <Image source={require("../../assets/images/profile.png")} 
          style={[styles.icon, current === "/mypage" && styles.active]}
        />
        </TouchableOpacity>

      </View>
      </SafeAreaView>

    </View>
  );
}


const styles = StyleSheet.create({
  tabBarContainer: {
    width: "100%",
    top: 40,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 0.1,
  },
  icon: {
    width: SCREEN_WIDTH / 5,
    height: SCREEN_WIDTH / 5,
    marginTop: -26,
    marginBottom: 100,
  },
  active: {
    opacity: 1,
  },
});