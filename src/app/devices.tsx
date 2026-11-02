import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Device } from '@/types';

export default function DevicesScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { activeTheme } = useThemeContext();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const data = await api.getDevices();
      setDevices(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again');
        await logout();
        router.replace('/login');
      } else {
        Alert.alert('Error', 'Failed to fetch devices');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDevices();
  }, []);

  const handleBlockToggle = async (device: Device) => {
    const action = device.blocked ? 'unblock' : 'block';
    const actionText = device.blocked ? 'Unblock' : 'Block';

    Alert.alert(
      `${actionText} Device`,
      `Are you sure you want to ${action} ${device.alias || device.hostname}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: actionText,
          style: device.blocked ? 'default' : 'destructive',
          onPress: async () => {
            try {
              await api.blockDevice(device.mac, action);
              fetchDevices();
            } catch (error) {
              Alert.alert('Error', `Failed to ${action} device`);
            }
          },
        },
      ]
    );
  };

  const handleSetAlias = (device: Device) => {
    Alert.prompt(
      'Set Device Name',
      `Enter a friendly name for ${device.hostname}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async (alias) => {
            if (alias !== undefined) {
              try {
                await api.setAlias(device.mac, alias);
                fetchDevices();
              } catch (error) {
                Alert.alert('Error', 'Failed to set device name');
              }
            }
          },
        },
      ],
      'plain-text',
      device.alias || ''
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  const renderDevice = ({ item }: { item: Device }) => (
    <ThemedView
      style={[
        styles.deviceCard,
        {
          backgroundColor: Colors[activeTheme].backgroundElement,
          borderColor: Colors[activeTheme].border,
        },
      ]}
    >
      <View style={styles.deviceHeader}>
        <View style={styles.deviceInfo}>
          <ThemedText style={styles.deviceName}>
            {item.alias || item.hostname}
          </ThemedText>
          <ThemedText style={[styles.deviceDetail, { color: Colors[activeTheme].textSecondary }]}>
            {item.ip} • {item.mac}
          </ThemedText>
          <ThemedText style={[styles.deviceDetail, { color: Colors[activeTheme].textSecondary }]}>
            {item.port}
            {item.leaseTime && ` • Lease: ${item.leaseTime}`}
          </ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'Online'
                  ? Colors[activeTheme].online + '20'
                  : Colors[activeTheme].offline + '20',
            },
          ]}
        >
          <ThemedText
            style={[
              styles.statusText,
              {
                color:
                  item.status === 'Online'
                    ? Colors[activeTheme].online
                    : Colors[activeTheme].offline,
              },
            ]}
          >
            {item.status}
          </ThemedText>
        </View>
      </View>

      <View style={styles.deviceActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: Colors[activeTheme].backgroundSelected }]}
          onPress={() => handleSetAlias(item)}
        >
          <ThemedText style={styles.actionButtonText}>Rename</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: item.blocked
                ? Colors[activeTheme].success + '20'
                : Colors[activeTheme].error + '20',
            },
          ]}
          onPress={() => handleBlockToggle(item)}
        >
          <ThemedText
            style={[
              styles.actionButtonText,
              {
                color: item.blocked ? Colors[activeTheme].success : Colors[activeTheme].error,
              },
            ]}
          >
            {item.blocked ? 'Unblock' : 'Block'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[activeTheme].background }]} edges={['top']}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Connected Devices</ThemedText>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: Colors[activeTheme].backgroundElement }]}
            onPress={() => router.push('/settings')}
          >
            <ThemedText>⚙️</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: Colors[activeTheme].backgroundElement }]}
            onPress={handleLogout}
          >
            <ThemedText>🚪</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.mac}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors[activeTheme].tint}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              {loading ? 'Loading devices...' : 'No devices found'}
            </ThemedText>
          </View>
        }
      />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  deviceCard: {
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.three,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.one,
  },
  deviceDetail: {
    fontSize: 14,
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  deviceActions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.six,
  },
  emptyText: {
    fontSize: 16,
  },
});
