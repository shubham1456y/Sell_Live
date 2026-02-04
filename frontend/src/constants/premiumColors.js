/**
 * Premium Color System
 * Inspired by Whatnot, Instagram, Stripe, and Airbnb
 * Designed for elegance, clarity, and emotional engagement
 */

export const PREMIUM_COLORS = {
    // Primary Palette - Royal Purple
    primary: {
        main: '#6C5CE7',      // Royal Purple - Primary brand color
        deep: '#5849C4',      // Deep Indigo - Hover/active states
        soft: '#A29BFE',      // Soft Lavender - Subtle highlights
        light: '#E8E6FC',     // Very light purple - Backgrounds
        gradient: ['#6C5CE7', '#5849C4'], // Primary gradient
    },

    // Accents - High-impact colors
    accent: {
        live: '#FF3B30',      // LIVE Red - High urgency, live indicators
        success: '#00D084',   // Success Green - Confirmations, success states
        highlight: '#FF9500', // Highlight Amber - Warnings, highlights
        error: '#FF3B30',     // Error Red - Error states
        info: '#007AFF',      // Info Blue - Informational
    },

    // Neutrals - Foundation colors
    neutral: {
        background: '#FAFAFA',    // Main background - Soft gray
        surface: '#FFFFFF',       // Card/surface background - Pure white
        textPrimary: '#1C1C1E',   // Primary text - Almost black
        textSecondary: '#8E8E93', // Secondary text - Medium gray
        textTertiary: '#C7C7CC',  // Tertiary text - Light gray
        border: '#E5E5EA',        // Hairline borders
        divider: '#F2F2F7',       // Section dividers
        overlay: 'rgba(0, 0, 0, 0.4)', // Modal overlays
        overlayLight: 'rgba(0, 0, 0, 0.2)', // Subtle overlays
    },

    // Semantic Colors
    semantic: {
        online: '#00D084',    // User online status
        offline: '#8E8E93',   // User offline status
        warning: '#FF9500',   // Warning states
        premium: '#FFD700',   // Premium/VIP indicators
    },

    // Glass-morphism
    glass: {
        background: 'rgba(255, 255, 255, 0.8)',
        border: 'rgba(255, 255, 255, 0.3)',
        shadow: 'rgba(0, 0, 0, 0.1)',
    },

    // Gradients
    gradients: {
        primary: ['#6C5CE7', '#5849C4'],
        success: ['#00D084', '#00B56F'],
        live: ['#FF3B30', '#FF1F1F'],
        premium: ['#FFD700', '#FFC700'],
        shimmer: ['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent'],
    },
};

// Legacy support - map old colors to new system
export const COLORS = {
    primary: PREMIUM_COLORS.primary.main,
    accent: PREMIUM_COLORS.accent.live,
    background: PREMIUM_COLORS.neutral.background,
    surface: PREMIUM_COLORS.neutral.surface,
    text: PREMIUM_COLORS.neutral.textPrimary,
    textSecondary: PREMIUM_COLORS.neutral.textSecondary,
    border: PREMIUM_COLORS.neutral.border,
    error: PREMIUM_COLORS.accent.error,
    success: PREMIUM_COLORS.accent.success,
};
