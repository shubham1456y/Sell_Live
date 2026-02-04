import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { LiveBadge } from './LiveBadge';
import { Users } from 'lucide-react-native';

export const LiveCard = ({ seller, onPress, style }) => {
    return (
        <View style={style}>
            {/* Premium Shop Header */}
            <View style={styles.shopHeader}>
                <Image
                    source={{ uri: seller.logo || 'https://via.placeholder.com/24' }}
                    style={styles.logo}
                />
                <Text style={styles.shopName} numberOfLines={1}>
                    {seller.shopName || seller.name}
                </Text>
            </View>

            {/* Premium Card */}
            <TouchableOpacity
                style={styles.card}
                onPress={onPress}
                activeOpacity={0.95}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: seller.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    {/* Live Badge with Animation */}
                    <View style={styles.liveBadgeContainer}>
                        <LiveBadge size="small" animated={true} />
                    </View>

                    {/* Viewer Count */}
                    <View style={styles.viewerBadge}>
                        <Users size={12} color={PREMIUM_COLORS.neutral.surface} />
                        <Text style={styles.viewerText}>
                            {seller.viewers >= 1000
                                ? `${(seller.viewers / 1000).toFixed(1)}k`
                                : seller.viewers}
                        </Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                        {seller.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    shopHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: LAYOUT.spacing.sm,
        paddingHorizontal: LAYOUT.spacing.xs,
    },
    logo: {
        width: 28,
        height: 28,
        borderRadius: LAYOUT.radius.full,
        marginRight: LAYOUT.spacing.sm,
        backgroundColor: PREMIUM_COLORS.neutral.border,
        borderWidth: 2,
        borderColor: PREMIUM_COLORS.neutral.surface,
    },
    shopName: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize + 1,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        flex: 1,
        letterSpacing: 0.2,
    },
    card: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        overflow: 'hidden',
        ...LAYOUT.shadow.md, // Floating feel
        borderWidth: 0, // No border - clean look
    },
    imageContainer: {
        height: 200,
        width: '100%',
        backgroundColor: PREMIUM_COLORS.neutral.divider,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    liveBadgeContainer: {
        position: 'absolute',
        top: LAYOUT.spacing.sm,
        left: LAYOUT.spacing.sm,
    },
    viewerBadge: {
        position: 'absolute',
        bottom: LAYOUT.spacing.sm,
        left: LAYOUT.spacing.sm,
        backgroundColor: PREMIUM_COLORS.glass.background,
        backdropFilter: 'blur(10px)',
        paddingHorizontal: LAYOUT.spacing.sm + 2,
        paddingVertical: LAYOUT.spacing.xs + 2,
        borderRadius: LAYOUT.radius.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.xs,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        ...LAYOUT.shadow.sm,
    },
    viewerText: {
        color: PREMIUM_COLORS.neutral.surface,
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    info: {
        padding: LAYOUT.spacing.md,
    },
    title: {
        fontSize: TYPOGRAPHY.scale.body.fontSize + 1,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        lineHeight: TYPOGRAPHY.scale.body.lineHeight + 2,
        letterSpacing: -0.2,
    },
});
