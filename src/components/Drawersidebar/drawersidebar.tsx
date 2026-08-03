import React, { FC, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography } from '@constant/index';
// import { version } from '../../package.json'; // Reads app version

const SidebarDrawer: FC = () => {
  const [isAppLock, setIsAppLock] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header / Title */}
      <Text style={styles.headerTitle}>Settings</Text>

      {/* App Lock Switch */}
      <View style={styles.row}>
        <Text style={styles.label}>App Lock</Text>
        <Switch
          value={isAppLock}
          onValueChange={setIsAppLock}
          trackColor={{ false: '#ccc', true: Colors.PRIMARY[200] }}
          thumbColor={isAppLock ? Colors.PRIMARY[600] : '#f4f3f4'}
        />
      </View>

      {/* App Version */}
      <View style={styles.versionBox}>
        <Text style={styles.versionLabel}>App Version</Text>
        <Text style={styles.versionValue}>{'0.1'}</Text>
      </View>
    </View>
  );
};

export default SidebarDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY[100] || '#fff',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.PRIMARY?.[700] || '#333',
    marginBottom: 25,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    color: Colors.SECONDARY?.[200] || '#444',
    ...Typography.mulishbold3,
  },
  versionBox: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
  versionLabel: {
    color: '#777',
    ...Typography.mulishbold3,
  },
  versionValue: {
    fontSize: 16,
    color: Colors.PRIMARY?.[600] || '#333',
    fontWeight: '500',
  },
});
