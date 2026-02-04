import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { triggerHaptic, TIMING, EASING } from '../utils/animations';

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    size = 'medium',
    style,
    textStyle
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    // Button variants
    const getVariantStyle = () => {
        switch (variant) {
            case 'primary':
                return {
                    background: PREMIUM_COLORS.gradients.primary,
                    textColor: PREMIUM_COLORS.neutral.surface,
                    borderColor: 'transparent',
                };
            case 'secondary':
                return {
                    background: null,
                    backgroundColor: PREMIUM_COLORS.neutral.surface,
                    textColor: PREMIUM_COLORS.primary.main,
                    borderColor: PREMIUM_COLORS.primary.main,
                };
            case 'outline':
                return {
                    background: null,
                    backgroundColor: 'transparent',
                    textColor: PREMIUM_COLORS.primary.main,
                    borderColor: PREMIUM_COLORS.neutral.border,
                };
            case 'ghost':
                return {
                    background: null,
                    backgroundColor: 'transparent',
                    textColor: PREMIUM_COLORS.primary.main,
                    borderColor: 'transparent',
                };
            case 'success':
                return {
                    background: PREMIUM_COLORS.gradients.success,
                    textColor: PREMIUM_COLORS.neutral.surface,
                    borderColor: 'transparent',
                };
            case 'danger':
                return {
                    background: null,
                    backgroundColor: PREMIUM_COLORS.accent.error,
                    textColor: PREMIUM_COLORS.neutral.surface,
                    borderColor: 'transparent',
                };
            default:
                return {
                    background: PREMIUM_COLORS.gradients.primary,
                    textColor: PREMIUM_COLORS.neutral.surface,
                    borderColor: 'transparent',
                };
        }
    };

    // Button sizes
    const getSizeStyle = () => {
        switch (size) {
            case 'small':
                return {
                    height: LAYOUT.component.button.heightSmall,
                    paddingHorizontal: 16,
                    fontSize: TYPOGRAPHY.scale.buttonSmall.fontSize,
                };
            case 'large':
                return {
                    height: LAYOUT.component.button.heightLarge,
                    paddingHorizontal: 28,
                    fontSize: 18,
                };
            default:
                return {
                    height: LAYOUT.component.button.height,
                    paddingHorizontal: LAYOUT.component.button.paddingHorizontal,
                    fontSize: TYPOGRAPHY.scale.button.fontSize,
                };
        }
    };

    const variantStyle = getVariantStyle();
    const sizeStyle = getSizeStyle();
    const isDisabled = disabled || loading;

    // Press animation
    const handlePressIn = () => {
        if (isDisabled) return;
        triggerHaptic('light');

        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.97,
                duration: TIMING.fast,
                easing: EASING.smooth,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0.9,
                duration: TIMING.fast,
                easing: EASING.smooth,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        if (isDisabled) return;

        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 180,
                friction: 12,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: TIMING.fast,
                easing: EASING.smooth,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animatedStyle = {
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
    };

    // Render gradient button
    if (variantStyle.background) {
        return (
            <Animated.View style={[animatedStyle, { borderRadius: LAYOUT.component.button.borderRadius }]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={isDisabled}
                    activeOpacity={1}
                >
                    <LinearGradient
                        colors={variantStyle.background}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                            styles.button,
                            {
                                height: sizeStyle.height,
                                paddingHorizontal: sizeStyle.paddingHorizontal,
                                borderRadius: LAYOUT.component.button.borderRadius,
                                borderWidth: 1,
                                borderColor: variantStyle.borderColor,
                            },
                            isDisabled && styles.disabled,
                            style,
                        ]}
                    >
                        {loading ? (
                            <ActivityIndicator color={variantStyle.textColor} size="small" />
                        ) : (
                            <Text
                                style={[
                                    styles.text,
                                    {
                                        color: variantStyle.textColor,
                                        fontSize: sizeStyle.fontSize,
                                        ...TYPOGRAPHY.scale.button,
                                    },
                                    textStyle,
                                ]}
                            >
                                {title}
                            </Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    // Render solid button
    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        height: sizeStyle.height,
                        paddingHorizontal: sizeStyle.paddingHorizontal,
                        backgroundColor: variantStyle.backgroundColor,
                        borderRadius: LAYOUT.component.button.borderRadius,
                        borderWidth: 1,
                        borderColor: variantStyle.borderColor,
                    },
                    isDisabled && styles.disabled,
                    style,
                ]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isDisabled}
                activeOpacity={1}
            >
                {loading ? (
                    <ActivityIndicator color={variantStyle.textColor} size="small" />
                ) : (
                    <Text
                        style={[
                            styles.text,
                            {
                                color: variantStyle.textColor,
                                fontSize: sizeStyle.fontSize,
                                ...TYPOGRAPHY.scale.button,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        ...LAYOUT.shadow.sm,
    },
    text: {
        fontWeight: TYPOGRAPHY.weight.semibold,
        letterSpacing: TYPOGRAPHY.scale.button.letterSpacing,
    },
    disabled: {
        opacity: 0.5,
    },
});
