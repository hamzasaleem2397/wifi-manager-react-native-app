import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Device } from '@/types';

interface DeviceCardProps {
  device: Device;
  activeTheme: 'light' | 'dark';
  onRename: (device: Device) => void;
  onBlockToggle: (device: Device) => void;
}

export function DeviceCard({ device, activeTheme, onRename, onBlockToggle }: DeviceCardProps) {
  return (
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
            {device.alias || device.hostname}
          </ThemedText>
          <ThemedText style={[styles.deviceDetail, { color: Colors[activeTheme].textSecondary }]}>
            {device.ip} • {device.mac}
          </ThemedText>
          <ThemedText style={[styles.deviceDetail, { color: Colors[activeTheme].textSecondary }]}>
            {device.port}
            {device.leaseTime && ` • Lease: ${device.leaseTime}`}
          </ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                device.status === 'Online'
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
                  device.status === 'Online'
                    ? Colors[activeTheme].online
                    : Colors[activeTheme].offline,
              },
            ]}
          >
            {device.status}
          </ThemedText>
        </View>
      </View>

      <View style={styles.deviceActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: Colors[activeTheme].backgroundSelected }]}
          onPress={() => onRename(device)}
        >
          <ThemedText style={styles.actionButtonText}>Rename</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: device.blocked
                ? Colors[activeTheme].success + '20'
                : Colors[activeTheme].error + '20',
            },
          ]}
          onPress={() => onBlockToggle(device)}
        >
          <ThemedText
            style={[
              styles.actionButtonText,
              {
                color: device.blocked ? Colors[activeTheme].success : Colors[activeTheme].error,
              },
            ]}
          >
            {device.blocked ? 'Unblock' : 'Block'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
});
