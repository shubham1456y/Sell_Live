import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { triggerHaptic, TIMING, EASING } from '../utils/animations';

export const Card = ({
    children,
    onPress,
    variant = 'default',
    style,
    contentStyle,
    ...props
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const shadowAnim = useRef(new Animated.Value(0)).current;

    const getVariantStyle = () => {
        switch (variant) {
            case 'elevated':
                return {
                    ...LAYOUT.shadow.md,
                    backgroundColor: PREMIUM_COLORS.neutral.surface,
                };
            case 'outlined':
                return {
                    backgroundColor: PREMIUM_COLORS.neutral.surface,
                    borderWidth: 1,
                    borderColor: PREMIUM_COLORS.neutral.border,
                };
            case 'filled':
                return {
                    backgroundColor: PREMIUM_COLORS.primary.light,
                    borderWidth: 0,
                };
            default:
                return {
                    ...LAYOUT.shadow.sm,
                    backgroundColor: PREMIUM_COLORS.neutral.surface,
                };
        }
    };

    const handlePressIn = () => {
        if (!onPress) return;
        triggerHaptic('light');

        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.98,
                duration: TIMING.fast,
                easing: EASING.smooth,
                useNativeDriver: true,
            }),
            Animated.timing(shadowAnim, {
                toValue: 1,
                duration: TIMING.fast,
                easing: EASING.smooth,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        if (!onPress) return;

        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 180,
                friction: 12,
                useNativeDriver: true,
            }),
            Animated.timing(shadowAnim, {
                toValue: 0,
                duration: TIMING.normal,
                easing: EASING.smooth,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const variantStyle = getVariantStyle();

    const animatedStyle = {
        transform: [{ scale: scaleAnim }],
    };

    const cardStyle = [
        styles.card,
        variantStyle,
        animatedStyle,
        style,
    ];

    if (onPress) {
        return (
            <Animated.View style={animatedStyle}>
                <TouchableOpacity
                    style={[styles.card, variantStyle, style]}
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={1}
                    {...props}
                >
                    <View style={[styles.content, contentStyle]}>
                        {children}
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <View style={[styles.card, variantStyle, style]} {...props}>
            <View style={[styles.content, contentStyle]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: LAYOUT.component.card.borderRadius,
        overflow: 'hidden',
    },
    content: {
        padding: LAYOUT.component.card.padding,
    },
});
