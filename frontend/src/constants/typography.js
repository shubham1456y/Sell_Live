/**
 * Typography System
 * Optimized for mobile readability with strong hierarchy
 * Uses system fonts (SF Pro on iOS, Roboto on Android)
 */

export const TYPOGRAPHY = {
    // Font Families
    fontFamily: {
        default: 'System', // System default - SF Pro (iOS), Roboto (Android)
        Inter: 'Inter',    // Optional: Inter font if loaded
    },

    // Type Scale - Mobile-optimized
    scale: {
        // Headings
        h1: {
            fontSize: 28,
            fontWeight: '700',
            lineHeight: 34,
            letterSpacing: -0.5,
        },
        h2: {
            fontSize: 22,
            fontWeight: '600',
            lineHeight: 28,
            letterSpacing: -0.3,
        },
        h3: {
            fontSize: 18,
            fontWeight: '500',
            lineHeight: 24,
            letterSpacing: -0.2,
        },

        // Body Text
        body: {
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 20,
            letterSpacing: 0,
        },
        bodyLarge: {
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 22,
            letterSpacing: 0,
        },
        bodySmall: {
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 18,
            letterSpacing: 0,
        },

        // Utility Text
        caption: {
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 16,
            letterSpacing: 0,
        },
        overline: {
            fontSize: 11,
            fontWeight: '600',
            lineHeight: 14,
            letterSpacing: 1,
            textTransform: 'uppercase',
        },

        // Interactive Elements
        button: {
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 20,
            letterSpacing: 0.2,
        },
        buttonSmall: {
            fontSize: 14,
            fontWeight: '600',
            lineHeight: 18,
            letterSpacing: 0.2,
        },

        // Special
        display: {
            fontSize: 34,
            fontWeight: '700',
            lineHeight: 40,
            letterSpacing: -0.8,
        },
    },

    // Font Weights
    weight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
    },
};

// Helper function to get text style
export const getTextStyle = (type) => {
    return TYPOGRAPHY.scale[type] || TYPOGRAPHY.scale.body;
};
