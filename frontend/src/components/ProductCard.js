import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Edit2, Trash2 } from 'lucide-react-native';

export default function ProductCard({ product, onEdit, onDelete, showActions = true }) {
    return (
        <View style={styles.card}>
            {/* Product Image */}
            <Image
                source={{ uri: product.photos[0] }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Product Info */}
            <View style={styles.info}>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

                <View style={styles.row}>
                    <Text style={styles.price}>${parseFloat(product.price).toFixed(2)}</Text>
                    <Text style={styles.quantity}>Qty: {product.quantity}</Text>
                </View>

                {showActions && (
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(product)}>
                            <Edit2 size={16} color={PREMIUM_COLORS.primary.main} />
                            <Text style={styles.actionText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(product)}>
                            <Trash2 size={16} color={PREMIUM_COLORS.accent.error} />
                            <Text style={[styles.actionText, { color: PREMIUM_COLORS.accent.error }]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        overflow: 'hidden',
        marginBottom: LAYOUT.spacing.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: PREMIUM_COLORS.neutral.divider,
    },
    info: {
        padding: LAYOUT.spacing.md,
    },
    category: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        textTransform: 'uppercase',
        marginBottom: LAYOUT.spacing.xs,
    },
    name: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: LAYOUT.spacing.md,
    },
    price: {
        fontSize: TYPOGRAPHY.scale.h3.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.primary.main,
    },
    quantity: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
    },
    actions: {
        flexDirection: 'row',
        gap: LAYOUT.spacing.md,
        paddingTop: LAYOUT.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: PREMIUM_COLORS.neutral.divider,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.xs,
        paddingVertical: LAYOUT.spacing.sm,
    },
    actionText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: PREMIUM_COLORS.primary.main,
    },
});
