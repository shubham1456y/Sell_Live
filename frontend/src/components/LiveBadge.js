import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { createPulseAnimation, EASING } from '../utils/animations';

export const LiveBadge = ({
    size = 'medium',
    animated = true,
    style
}) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!animated) return;

        // Pulse animation
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1000,
                    easing: EASING.easeInOut,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: EASING.easeInOut,
                    useNativeDriver: true,
                }),
            ])
        );

        // Glow animation
        const glow = Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: EASING.easeInOut,
                    useNativeDriver: false,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 1500,
                    easing: EASING.easeInOut,
                    useNativeDriver: false,
                }),
            ])
        );

        pulse.start();
        glow.start();

        return () => {
            pulse.stop();
            glow.stop();
        };
    }, [animated]);

    const getSizeStyle = () => {
        switch (size) {
            case 'small':
                return {
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    fontSize: 10,
                    dotSize: 6,
                };
            case 'large':
                return {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    fontSize: 14,
                    dotSize: 10,
                };
            default:
                return {
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    fontSize: 12,
                    dotSize: 8,
                };
        }
    };

    const sizeStyle = getSizeStyle();

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.8],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    paddingHorizontal: sizeStyle.paddingHorizontal,
                    paddingVertical: sizeStyle.paddingVertical,
                    transform: [{ scale: pulseAnim }],
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    styles.glow,
                    {
                        opacity: animated ? glowOpacity : 0,
                    },
                ]}
            />

            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.dot,
                        {
                            width: sizeStyle.dotSize,
                            height: sizeStyle.dotSize,
                            transform: [{ scale: animated ? pulseAnim : 1 }],
                        },
                    ]}
                />
                <Text
                    style={[
                        styles.text,
                        {
                            fontSize: sizeStyle.fontSize,
                        },
                    ]}
                >
                    LIVE
                </Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.accent.live,
        alignSelf: 'flex-start',
        position: 'relative',
        overflow: 'visible',
    },
    glow: {
        position: 'absolute',
        top: -4,
        left: -4,
        right: -4,
        bottom: -4,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.accent.live,
        opacity: 0.5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    text: {
        color: PREMIUM_COLORS.neutral.surface,
        fontWeight: TYPOGRAPHY.weight.bold,
        letterSpacing: 1,
    },
});
