import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { ChevronLeft, Bell, Gift, Truck } from 'lucide-react-native';

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        type: 'live',
        title: 'SneakerHeadz is Live!',
        message: 'Don\'t miss the limited Jordan drop happening now.',
        time: '2m ago',
        read: false,
    },
    {
        id: '2',
        type: 'order',
        title: 'Order Shipped',
        message: 'Your order #12345 has been shipped via FedEx.',
        time: '1h ago',
        read: true,
    },
    {
        id: '3',
        type: 'promo',
        title: 'Weekend Sale 50% Off',
        message: 'Get 50% off on all vintage items this weekend.',
        time: '5h ago',
        read: true,
    },
    {
        id: '4',
        type: 'system',
        title: 'Welcome to LiveShop',
        message: 'Thanks for joining! Complete your profile to get started.',
        time: '1d ago',
        read: true,
    },
];

export default function NotificationsScreen({ navigation }) {
    const getIcon = (type) => {
        switch (type) {
            case 'live': return <Bell size={24} color="#FFF" />;
            case 'order': return <Truck size={24} color="#FFF" />;
            case 'promo': return <Gift size={24} color="#FFF" />;
            default: return <Bell size={24} color="#FFF" />;
        }
    };

    const getIconColor = (type) => {
        switch (type) {
            case 'live': return COLORS.accent;
            case 'order': return COLORS.success;
            case 'promo': return '#FF9500'; // Orange
            default: return COLORS.primary;
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.card, !item.read && styles.unreadCard]}>
            <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) }]}>
                {getIcon(item.type)}
            </View>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
            </View>
            {!item.read && <View style={styles.dot} />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>Notifications</Text>
            </View>

            <FlatList
                data={MOCK_NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
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
    list: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
    },
    unreadCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: COLORS.primary + '20', // Slight highlight
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        flex: 1,
    },
    time: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 8,
    },
    message: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.accent,
        marginLeft: 8,
    },
});
