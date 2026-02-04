/**
 * Layout & Spacing System
 * Consistent spacing, border radius, shadows, and component sizes
 */

export const LAYOUT = {
    // Spacing Scale - 4px base unit
    spacing: {
        none: 0,
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
        xxxl: 64,
    },

    // Border Radius - Rounded geometry
    radius: {
        none: 0,
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24,
        full: 9999,
    },

    // Shadows - Soft depth, never heavy
    shadow: {
        none: {
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
        },
        xs: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 8,
        },
        xl: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.15,
            shadowRadius: 24,
            elevation: 12,
        },
    },

    // Component Sizes - Award-winning standard
    component: {
        // Buttons
        button: {
            height: 52,
            heightSmall: 40,
            heightLarge: 56,
            paddingHorizontal: 24,
            borderRadius: 12,
        },

        // Inputs
        input: {
            height: 48,
            paddingHorizontal: 16,
            borderRadius: 12,
            borderWidth: 1,
        },

        // Cards
        card: {
            borderRadius: 16,
            padding: 16,
        },

        // Icons
        icon: {
            small: 16,
            medium: 20,
            large: 24,
            xLarge: 32,
        },

        // Avatar
        avatar: {
            small: 32,
            medium: 40,
            large: 56,
            xLarge: 80,
        },

        // Bottom Navigation
        tabBar: {
            height: 60,
            iconSize: 24,
        },

        // Header
        header: {
            height: 56,
        },
    },

    // Container Widths
    container: {
        maxWidth: 1200,
        padding: 16,
    },

    // Safe Area
    safeArea: {
        top: 44,
        bottom: 34,
    },
};

// Helper to get consistent spacing
export const getSpacing = (...values) => {
    return values.map(v => LAYOUT.spacing[v] || v).join(' ');
};
