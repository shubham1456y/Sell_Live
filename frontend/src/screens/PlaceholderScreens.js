import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';

// Browse Screen
export const BrowseScreen = () => (
    <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.emoji}>😴</Text>
        <Text style={styles.title}>No other streams</Text>
        <Text style={styles.subtitle}>Check back later for more sellers.</Text>
    </SafeAreaView>
);

// Activity Screen
export const ActivityScreen = () => (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Activity</Text>
        </View>
        <View style={styles.centerContainer}>
            <Text style={styles.subtitle}>No recent orders.</Text>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centerContainer: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', padding: 24 },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text },
    title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginTop: 16 },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center' },
    emoji: { fontSize: 48 },
});
