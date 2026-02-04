import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { Edit, ChevronLeft } from 'lucide-react-native';

const TABS = ['System', 'Carriers', 'Partners'];

export default function InboxScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('System');

    const renderMessage = ({ item }) => (
        <View style={styles.messageCard}>
            <View style={styles.avatar} />
            <View style={styles.messageContent}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text style={styles.preview} numberOfLines={1}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    );

    const MOCK_MESSAGES = [
        { id: '1', sender: 'System Admin', message: 'Welcome to the app! Complete your profile.', time: '2h ago' },
        { id: '2', sender: 'System Update', message: 'Version 2.0 is live with new features.', time: '1d ago' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>Inbox</Text>
            </View>

            <View style={styles.tabContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={MOCK_MESSAGES}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No messages in {activeTab}</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab}>
                <Edit color="#FFF" size={24} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    activeTabText: {
        color: '#FFF',
    },
    list: {
        padding: 16,
    },
    messageCard: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.border,
        marginRight: 12,
    },
    messageContent: {
        flex: 1,
    },
    sender: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 2,
    },
    preview: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    time: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    emptyState: {
        padding: 24,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
    },
});
