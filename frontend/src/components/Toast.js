import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Check, X, Info, AlertTriangle } from 'lucide-react-native';

export const Toast = ({
    type = 'info',
    title,
    message,
    onDismiss,
    action,
    style
}) => {
    const getTypeConfig = () => {
        switch (type) {
            case 'success':
                return {
                    icon: Check,
                    backgroundColor: PREMIUM_COLORS.accent.success,
                    color: PREMIUM_COLORS.neutral.surface,
                };
            case 'error':
                return {
                    icon: X,
                    backgroundColor: PREMIUM_COLORS.accent.error,
                    color: PREMIUM_COLORS.neutral.surface,
                };
            case 'warning':
                return {
                    icon: AlertTriangle,
                    backgroundColor: PREMIUM_COLORS.accent.highlight,
                    color: PREMIUM_COLORS.neutral.textPrimary,
                };
            default:
                return {
                    icon: Info,
                    backgroundColor: PREMIUM_COLORS.primary.main,
                    color: PREMIUM_COLORS.neutral.surface,
                };
        }
    };

    const config = getTypeConfig();
    const Icon = config.icon;

    return (
        <View style={[styles.container, { backgroundColor: config.backgroundColor }, style]}>
            <View style={styles.iconContainer}>
                <Icon size={20} color={config.color} />
            </View>
            <View style={styles.content}>
                {title && <Text style={[styles.title, { color: config.color }]}>{title}</Text>}
                {message && <Text style={[styles.message, { color: config.color }]}>{message}</Text>}
            </View>
            {action && <View style={styles.action}>{action}</View>}
            {onDismiss && (
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onDismiss}
                    activeOpacity={0.7}
                >
                    <X size={18} color={config.color} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: LAYOUT.radius.lg,
        padding: LAYOUT.spacing.md,
        ...LAYOUT.shadow.lg,
        minHeight: 60,
    },
    iconContainer: {
        marginRight: LAYOUT.spacing.sm,
    },
    content: {
        flex: 1,
    },
    title: {
        ...TYPOGRAPHY.scale.body,
        fontWeight: TYPOGRAPHY.weight.semibold,
        marginBottom: 2,
    },
    message: {
        ...TYPOGRAPHY.scale.caption,
        opacity: 0.9,
    },
    action: {
        marginLeft: LAYOUT.spacing.sm,
    },
    closeButton: {
        marginLeft: LAYOUT.spacing.sm,
        padding: LAYOUT.spacing.xs,
    },
});
