
// type TabsLayoutProps = {
//   children: React.ReactNode;
// };

// export default function TabsLayout({ children }: TabsLayoutProps) {
//   return (
//     <Tabs
//     screenOptions={{
//       tabBarActiveTintColor: "#4CAF50",
//       tabBarInactiveTintColor: "#999",
//       tabBarStyle: {
//         backgroundColor: "#fff",
//         borderTopWidth: 1,
//         borderTopColor: "#eee",
//       },
//       headerShown: false,
//     }}
//   >
//     <Tabs.Screen
//       name="main"
//       options={{
//         title: "메인",
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="home" size={size} color={color} />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="quest"
//       options={{
//         title: "퀘스트",
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="flag" size={size} color={color} />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="mypage"
//       options={{
//         title: "마이페이지",
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="person" size={size} color={color} />
//         ),
//       }}
//     />
//   </Tabs>
//   );
// }


import { Stack, useRouter, useSegments } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const current = "/" + segments.join("/");

  return (
    <View style={{ flex: 1}}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
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
          style={[styles.icon, current === "/bell" && styles.active]}
        />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/mypage")}>
          <Image source={require("../../assets/images/profile.png")} 
          style={[styles.icon, current === "/mypage" && styles.active]}
        />
        </TouchableOpacity>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 0.1,
  },
  icon: {
    width: 86,
    height: 86,
    marginTop: -26,
    marginBottom: 100,
  },
  active: {
    opacity: 1,
  },
});