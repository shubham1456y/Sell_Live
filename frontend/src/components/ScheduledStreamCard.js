import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Bell, BellOff } from 'lucide-react-native';

export const ScheduledStreamCard = ({ stream }) => {
    const [isReminded, setIsReminded] = useState(stream.reminderSet);

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <Image source={{ uri: stream.sellerImage }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.sellerName}>{stream.sellerName}</Text>
                    <Text style={styles.title} numberOfLines={1}>{stream.title}</Text>
                    <Text style={styles.date}>{stream.date} • {stream.category}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.remindButton, isReminded && styles.remindButtonActive]}
                onPress={() => setIsReminded(!isReminded)}
            >
                {isReminded ? (
                    <BellOff size={18} color={PREMIUM_COLORS.primary.main} />
                ) : (
                    <Bell size={18} color={PREMIUM_COLORS.neutral.textSecondary} />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        marginBottom: LAYOUT.spacing.sm,
        ...LAYOUT.shadow.sm,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: LAYOUT.radius.full,
        marginRight: LAYOUT.spacing.md,
    },
    info: {
        flex: 1,
        marginRight: LAYOUT.spacing.sm,
    },
    sellerName: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        fontWeight: TYPOGRAPHY.weight.medium,
        marginBottom: 2,
    },
    title: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.semibold,
        marginBottom: 4,
    },
    date: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.primary.main,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    remindButton: {
        width: 36,
        height: 36,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.border,
    },
    remindButtonActive: {
        borderColor: PREMIUM_COLORS.primary.main,
        backgroundColor: PREMIUM_COLORS.primary.light,
    },
});
