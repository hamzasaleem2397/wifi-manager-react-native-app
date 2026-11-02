import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { activeTheme } = useThemeContext();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/devices");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[activeTheme].background },
      ]}
    >
      <ActivityIndicator size="large" color={Colors[activeTheme].tint} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
