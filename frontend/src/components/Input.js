import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { TIMING, EASING } from '../utils/animations';

export const Input = ({
    label,
    placeholder,
    value,
    onChangeText,
    onFocus,
    onBlur,
    keyboardType,
    secureTextEntry,
    error,
    multiline = false,
    numberOfLines = 1,
    style,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const focusAnim = useRef(new Animated.Value(0)).current;
    const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate label on value change
        Animated.timing(labelAnim, {
            toValue: (isFocused || value) ? 1 : 0,
            duration: TIMING.normal,
            easing: EASING.smooth,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    useEffect(() => {
        // Shake animation on error
        if (error) {
            Animated.sequence([
                Animated.timing(shakeAnim, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnim, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [error]);

    const handleFocus = (e) => {
        setIsFocused(true);
        Animated.timing(focusAnim, {
            toValue: 1,
            duration: TIMING.normal,
            easing: EASING.smooth,
            useNativeDriver: false,
        }).start();
        onFocus?.(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        Animated.timing(focusAnim, {
            toValue: 0,
            duration: TIMING.normal,
            easing: EASING.smooth,
            useNativeDriver: false,
        }).start();
        onBlur?.(e);
    };

    // Interpolate colors
    const borderColor = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
            error ? PREMIUM_COLORS.accent.error : PREMIUM_COLORS.neutral.border,
            error ? PREMIUM_COLORS.accent.error : PREMIUM_COLORS.primary.main,
        ],
    });

    const labelColor = focusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
            PREMIUM_COLORS.neutral.textSecondary,
            error ? PREMIUM_COLORS.accent.error : PREMIUM_COLORS.primary.main,
        ],
    });

    const labelTop = labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [16, -10],
    });

    const labelFontSize = labelAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [TYPOGRAPHY.scale.body.fontSize, TYPOGRAPHY.scale.caption.fontSize],
    });

    const animatedStyle = {
        transform: [{ translateX: shakeAnim }],
    };

    const inputRef = useRef(null);

    const handleContainerPress = () => {
        inputRef.current?.focus();
    };

    return (
        <TouchableWithoutFeedback onPress={handleContainerPress}>
            <Animated.View style={[styles.container, animatedStyle, style]}>
                {label && (
                    <Animated.Text
                        style={[
                            styles.label,
                            {
                                color: labelColor,
                                top: labelTop,
                                fontSize: labelFontSize,
                            },
                        ]}
                    >
                        {label}
                    </Animated.Text>
                )}
                <Animated.View
                    style={[
                        styles.inputContainer,
                        {
                            borderColor: borderColor,
                            borderWidth: isFocused ? 2 : 1,
                        },
                        error && styles.inputContainerError,
                    ]}
                >
                    <TextInput
                        ref={inputRef}
                        style={[
                            styles.input,
                            multiline && {
                                height: numberOfLines * 20,
                                paddingTop: 12,
                                textAlignVertical: 'top',
                            },
                        ]}
                        placeholder={!label || (isFocused || value) ? placeholder : ''}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        placeholderTextColor={PREMIUM_COLORS.neutral.textTertiary}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        {...props}
                    />
                </Animated.View>
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: LAYOUT.spacing.md,
        width: '100%',
        position: 'relative',
    },
    label: {
        position: 'absolute',
        left: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        paddingHorizontal: 4,
        zIndex: 1,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    inputContainer: {
        borderRadius: LAYOUT.component.input.borderRadius,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        overflow: 'hidden',
    },
    inputContainerError: {
        backgroundColor: `${PREMIUM_COLORS.accent.error}08`,
    },
    input: {
        height: LAYOUT.component.input.height,
        paddingHorizontal: LAYOUT.component.input.paddingHorizontal,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.regular,
    },
    errorText: {
        color: PREMIUM_COLORS.accent.error,
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        marginTop: LAYOUT.spacing.xs,
        marginLeft: LAYOUT.spacing.xs,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
});
