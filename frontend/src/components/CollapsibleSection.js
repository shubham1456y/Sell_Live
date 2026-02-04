import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

export default function CollapsibleSection({ title, children, defaultExpanded = false }) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.header}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
            >
                <Text style={styles.title}>{title}</Text>
                {isExpanded ? (
                    <ChevronUp size={20} color={PREMIUM_COLORS.neutral.textSecondary} />
                ) : (
                    <ChevronDown size={20} color={PREMIUM_COLORS.neutral.textSecondary} />
                )}
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: LAYOUT.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: LAYOUT.spacing.md,
        paddingHorizontal: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.md,
        ...LAYOUT.shadow.sm,
    },
    title: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    content: {
        marginTop: LAYOUT.spacing.sm,
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.md,
    },
});
