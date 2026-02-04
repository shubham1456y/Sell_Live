import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { LAYOUT } from '../constants/layout';
import { createShimmerAnimation } from '../utils/animations';

export const Skeleton = ({
    width = '100%',
    height = 20,
    borderRadius = LAYOUT.radius.sm,
    style
}) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = createShimmerAnimation(shimmerAnim, 1500);
        animation.start();

        return () => animation.stop();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-300, 300],
    });

    return (
        <View
            style={[
                styles.container,
                {
                    width,
                    height,
                    borderRadius,
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={PREMIUM_COLORS.gradients.shimmer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

// Skeleton variants for common UI elements
export const SkeletonCard = ({ style }) => (
    <View style={[styles.card, style]}>
        <Skeleton height={180} borderRadius={LAYOUT.radius.lg} style={{ marginBottom: LAYOUT.spacing.sm }} />
        <Skeleton width="60%" height={16} style={{ marginBottom: LAYOUT.spacing.xs }} />
        <Skeleton width="40%" height={14} />
    </View>
);

export const SkeletonText = ({ lines = 3, style }) => (
    <View style={style}>
        {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
                key={index}
                width={index === lines - 1 ? '70%' : '100%'}
                height={14}
                style={{ marginBottom: LAYOUT.spacing.xs }}
            />
        ))}
    </View>
);

export const SkeletonAvatar = ({ size = 48, style }) => (
    <Skeleton
        width={size}
        height={size}
        borderRadius={LAYOUT.radius.full}
        style={style}
    />
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: PREMIUM_COLORS.neutral.divider,
        overflow: 'hidden',
    },
    card: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        padding: LAYOUT.spacing.md,
        ...LAYOUT.shadow.sm,
    },
});
