import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Inbox, ShoppingBag, Heart, Package } from 'lucide-react-native';

export const EmptyState = ({
    icon: Icon = Inbox,
    title = 'Nothing here yet',
    description = 'Start exploring to see content here.',
    action,
    style
}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.iconContainer}>
                <Icon size={64} color={PREMIUM_COLORS.neutral.textTertiary} strokeWidth={1.5} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            {action && <View style={styles.action}>{action}</View>}
        </View>
    );
};

// Common empty state variants
export const EmptyCart = ({ action }) => (
    <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Discover amazing products from live streams and add them to your cart."
        action={action}
    />
);

export const EmptyWishlist = ({ action }) => (
    <EmptyState
        icon={Heart}
        title="No favorites yet"
        description="Save items you love by tapping the heart icon."
        action={action}
    />
);

export const EmptyOrders = ({ action }) => (
    <EmptyState
        icon={Package}
        title="No orders yet"
        description="Your order history will appear here once you make your first purchase."
        action={action}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: LAYOUT.spacing.xl,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.neutral.divider,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: LAYOUT.spacing.lg,
    },
    title: {
        ...TYPOGRAPHY.scale.h2,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.bold,
        textAlign: 'center',
        marginBottom: LAYOUT.spacing.sm,
    },
    description: {
        ...TYPOGRAPHY.scale.body,
        color: PREMIUM_COLORS.neutral.textSecondary,
        textAlign: 'center',
        maxWidth: 300,
        lineHeight: TYPOGRAPHY.scale.body.lineHeight + 4,
    },
    action: {
        marginTop: LAYOUT.spacing.lg,
    },
});
