import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { config } from "@/config";
import { Colors, Spacing } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { activeTheme } = useThemeContext();
  const [ip, setIp] = useState<string>(config.DEFAULT_ROUTER_IP);
  const [username, setUsername] = useState<string>(config.DEFAULT_USERNAME);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!ip || !username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(ip, username, password);
      router.replace("/devices");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.error ||
          "Unable to connect to router. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <ThemedText style={styles.title}>WiFi Manager</ThemedText>
          <ThemedText
            style={[
              styles.subtitle,
              { color: Colors[activeTheme].textSecondary },
            ]}
          >
            Login to your router
          </ThemedText>

          <View style={styles.form}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors[activeTheme].backgroundElement,
                  color: Colors[activeTheme].text,
                  borderColor: Colors[activeTheme].border,
                },
              ]}
              placeholder="Router IP Address"
              placeholderTextColor={Colors[activeTheme].textSecondary}
              value={ip}
              onChangeText={setIp}
              autoCapitalize="none"
              keyboardType="url"
            />

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors[activeTheme].backgroundElement,
                  color: Colors[activeTheme].text,
                  borderColor: Colors[activeTheme].border,
                },
              ]}
              placeholder="Username"
              placeholderTextColor={Colors[activeTheme].textSecondary}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: Colors[activeTheme].backgroundElement,
                  color: Colors[activeTheme].text,
                  borderColor: Colors[activeTheme].border,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={Colors[activeTheme].textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: Colors[activeTheme].tint },
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Login</ThemedText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.four,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: Spacing.five,
  },
  form: {
    gap: Spacing.three,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.two,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
