import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { LAYOUT } from '../constants/layout';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProgressBar = ({
    progress = 0, // 0 to 1
    height = 4,
    backgroundColor = PREMIUM_COLORS.neutral.divider,
    fillColor = PREMIUM_COLORS.primary.main,
    animated = true,
    style
}) => {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (animated) {
            Animated.spring(widthAnim, {
                toValue: progress,
                tension: 100,
                friction: 10,
                useNativeDriver: false,
            }).start();
        } else {
            widthAnim.setValue(progress);
        }
    }, [progress, animated]);

    const fillWidth = widthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View
            style={[
                styles.container,
                {
                    height,
                    backgroundColor,
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    styles.fill,
                    {
                        width: fillWidth,
                        backgroundColor: fillColor,
                    },
                ]}
            />
        </View>
    );
};

export const IndeterminateProgressBar = ({
    height = 4,
    backgroundColor = PREMIUM_COLORS.neutral.divider,
    fillColor = PREMIUM_COLORS.primary.main,
    style
}) => {
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: SCREEN_WIDTH,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: -SCREEN_WIDTH,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop();
    }, []);

    return (
        <View
            style={[
                styles.container,
                {
                    height,
                    backgroundColor,
                },
                style,
            ]}
        >
            <Animated.View
                style={[
                    styles.indeterminateFill,
                    {
                        backgroundColor: fillColor,
                        transform: [{ translateX }],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: LAYOUT.radius.full,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: LAYOUT.radius.full,
    },
    indeterminateFill: {
        position: 'absolute',
        height: '100%',
        width: SCREEN_WIDTH * 0.3,
        borderRadius: LAYOUT.radius.full,
    },
});
