import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { LAYOUT } from '../constants/layout';

export const Badge = ({
    count = 0,
    max = 99,
    dot = false,
    style,
    children
}) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const prevCount = useRef(count);

    useEffect(() => {
        if (count > prevCount.current) {
            // Bounce animation when count increases
            Animated.sequence([
                Animated.spring(scaleAnim, {
                    toValue: 1.2,
                    tension: 200,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 200,
                    friction: 8,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        prevCount.current = count;
    }, [count]);

    if (count === 0 && !dot) return <>{children}</>;

    const displayCount = count > max ? `${max}+` : count.toString();

    return (
        <View style={styles.container}>
            {children}
            <Animated.View
                style={[
                    dot ? styles.dot : styles.badge,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                    style,
                ]}
            >
                {!dot && (
                    <Animated.Text style={styles.text}>
                        {displayCount}
                    </Animated.Text>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        minWidth: 20,
        height: 20,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.accent.live,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        borderWidth: 2,
        borderColor: PREMIUM_COLORS.neutral.surface,
        ...LAYOUT.shadow.sm,
    },
    dot: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 10,
        height: 10,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.accent.live,
        borderWidth: 2,
        borderColor: PREMIUM_COLORS.neutral.surface,
    },
    text: {
        color: PREMIUM_COLORS.neutral.surface,
        fontSize: 11,
        fontWeight: '700',
        textAlign: 'center',
    },
});
