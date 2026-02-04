/**
 * Animation & Motion System
 * 60fps, natural, intentional, delightful
 * Award-level interactions
 */

import { Animated, Easing } from 'react-native';

// Timing configurations
export const TIMING = {
    instant: 0,
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 400,
    slowest: 600,
};

// Easing curves
export const EASING = {
    // Standard easing
    easeOut: Easing.out(Easing.cubic),
    easeIn: Easing.in(Easing.cubic),
    easeInOut: Easing.inOut(Easing.cubic),

    // Spring-like
    spring: Easing.bezier(0.68, -0.55, 0.265, 1.55),

    // Custom curves
    smooth: Easing.bezier(0.4, 0.0, 0.2, 1),
    snappy: Easing.bezier(0.25, 0.8, 0.25, 1),
};

// Spring configurations
export const SPRING_CONFIG = {
    gentle: {
        tension: 120,
        friction: 14,
        useNativeDriver: true,
    },
    bouncy: {
        tension: 180,
        friction: 12,
        useNativeDriver: true,
    },
    wobbly: {
        tension: 100,
        friction: 8,
        useNativeDriver: true,
    },
    stiff: {
        tension: 210,
        friction: 20,
        useNativeDriver: true,
    },
};

// Animation presets
export const ANIMATIONS = {
    // Button press
    buttonPress: {
        scale: 0.97,
        duration: TIMING.fast,
        easing: EASING.smooth,
    },

    // Fade animations
    fadeIn: (toValue = 1) => ({
        toValue,
        duration: TIMING.normal,
        easing: EASING.easeOut,
        useNativeDriver: true,
    }),

    fadeOut: (toValue = 0) => ({
        toValue,
        duration: TIMING.normal,
        easing: EASING.easeIn,
        useNativeDriver: true,
    }),

    // Scale animations
    scaleIn: {
        toValue: 1,
        duration: TIMING.normal,
        easing: EASING.spring,
        useNativeDriver: true,
    },

    scaleOut: {
        toValue: 0,
        duration: TIMING.normal,
        easing: EASING.easeIn,
        useNativeDriver: true,
    },

    // Slide animations
    slideInUp: {
        toValue: 0,
        duration: TIMING.slow,
        easing: EASING.easeOut,
        useNativeDriver: true,
    },

    slideOutDown: {
        toValue: 100,
        duration: TIMING.slow,
        easing: EASING.easeIn,
        useNativeDriver: true,
    },
};

// Helper: Create pulse animation
export const createPulseAnimation = (
    animatedValue,
    minScale = 0.95,
    maxScale = 1.05,
    duration = 1000
) => {
    return Animated.loop(
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: maxScale,
                duration: duration / 2,
                easing: EASING.easeInOut,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: minScale,
                duration: duration / 2,
                easing: EASING.easeInOut,
                useNativeDriver: true,
            }),
        ])
    );
};

// Helper: Create shimmer animation
export const createShimmerAnimation = (animatedValue, duration = 1500) => {
    return Animated.loop(
        Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    );
};

// Helper: Create spring animation
export const createSpringAnimation = (
    animatedValue,
    toValue,
    config = SPRING_CONFIG.gentle
) => {
    return Animated.spring(animatedValue, {
        toValue,
        ...config,
    });
};

// Helper: Create fade animation
export const createFadeAnimation = (animatedValue, toValue, duration = TIMING.normal) => {
    return Animated.timing(animatedValue, {
        toValue,
        duration,
        easing: toValue === 1 ? EASING.easeOut : EASING.easeIn,
        useNativeDriver: true,
    });
};

// Helper: Create scale animation
export const createScaleAnimation = (animatedValue, toValue, duration = TIMING.normal) => {
    return Animated.timing(animatedValue, {
        toValue,
        duration,
        easing: toValue > 1 ? EASING.spring : EASING.smooth,
        useNativeDriver: true,
    });
};

// Stagger helper
export const staggerAnimation = (animations, staggerTime = 50) => {
    return Animated.stagger(staggerTime, animations);
};

// Parallel helper
export const parallelAnimation = (animations) => {
    return Animated.parallel(animations);
};

// Sequence helper
export const sequenceAnimation = (animations) => {
    return Animated.sequence(animations);
};

// Haptic feedback simulation (placeholder for future implementation)
export const triggerHaptic = (type = 'light') => {
    // In production, use react-native-haptic-feedback or expo-haptics
    console.log(`Haptic feedback: ${type}`);
};
