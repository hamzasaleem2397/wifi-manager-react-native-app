import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type ThemeOption = 'light' | 'dark' | 'system';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, setTheme, activeTheme } = useThemeContext();

  const themeOptions: { value: ThemeOption; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '⚙️' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[activeTheme].background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: Colors[activeTheme].backgroundElement }]}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backButtonText}>←</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedView
          style={[
            styles.section,
            {
              backgroundColor: Colors[activeTheme].backgroundElement,
              borderColor: Colors[activeTheme].border,
            },
          ]}
        >
          <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
          <ThemedText style={[styles.sectionDescription, { color: Colors[activeTheme].textSecondary }]}>
            Choose your preferred theme
          </ThemedText>

          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor:
                      theme === option.value
                        ? Colors[activeTheme].backgroundSelected
                        : Colors[activeTheme].background,
                    borderColor:
                      theme === option.value
                        ? Colors[activeTheme].tint
                        : Colors[activeTheme].border,
                  },
                ]}
                onPress={() => setTheme(option.value)}
              >
                <ThemedText style={styles.themeIcon}>{option.icon}</ThemedText>
                <ThemedText style={styles.themeLabel}>{option.label}</ThemedText>
                {theme === option.value && (
                  <ThemedText style={[styles.checkmark, { color: Colors[activeTheme].tint }]}>
                    ✓
                  </ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ThemedView>

        <ThemedView
          style={[
            styles.section,
            {
              backgroundColor: Colors[activeTheme].backgroundElement,
              borderColor: Colors[activeTheme].border,
            },
          ]}
        >
          <ThemedText style={styles.sectionTitle}>About</ThemedText>
          <View style={styles.aboutRow}>
            <ThemedText style={{ color: Colors[activeTheme].textSecondary }}>Version</ThemedText>
            <ThemedText>1.0.0</ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  section: {
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: Spacing.three,
  },
  themeOptions: {
    gap: Spacing.two,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 10,
    borderWidth: 2,
  },
  themeIcon: {
    fontSize: 24,
    marginRight: Spacing.two,
  },
  themeLabel: {
    fontSize: 16,
    flex: 1,
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
});
