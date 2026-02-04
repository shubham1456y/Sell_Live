import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { X, Search, Check } from 'lucide-react-native';

const CATEGORIES = [
    'Sneakers',
    'Vintage',
    'Tech',
    'Cards',
    'Toys',
    'Fashion',
    'Home',
    'Sports',
    'Art',
    'Collectibles',
];

export default function CategoryPicker({ visible, onClose, selectedCategory, onSelectCategory }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = CATEGORIES.filter(cat =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (category) => {
        onSelectCategory(category);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Category</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={24} color={PREMIUM_COLORS.neutral.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                        <Search size={20} color={PREMIUM_COLORS.neutral.textSecondary} />
                        <TextInput
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search categories..."
                            placeholderTextColor={PREMIUM_COLORS.neutral.textTertiary}
                        />
                    </View>

                    {/* Categories List */}
                    <FlatList
                        data={filteredCategories}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.categoryItem}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.categoryText}>{item}</Text>
                                {selectedCategory === item && (
                                    <Check size={20} color={PREMIUM_COLORS.primary.main} />
                                )}
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderTopLeftRadius: LAYOUT.radius.xl,
        borderTopRightRadius: LAYOUT.radius.xl,
        maxHeight: '80%',
        paddingBottom: LAYOUT.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: LAYOUT.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: PREMIUM_COLORS.neutral.divider,
    },
    title: {
        fontSize: TYPOGRAPHY.scale.h3.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.sm,
        margin: LAYOUT.spacing.lg,
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        borderRadius: LAYOUT.radius.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
    },
    searchInput: {
        flex: 1,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: LAYOUT.spacing.lg,
    },
    categoryText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    separator: {
        height: 1,
        backgroundColor: PREMIUM_COLORS.neutral.divider,
        marginHorizontal: LAYOUT.spacing.lg,
    },
});
