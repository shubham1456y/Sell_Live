import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { X } from 'lucide-react-native';

// Mock tag suggestions - in real app, this would come from API
const MOCK_SUGGESTIONS = {
    sneakers: ['Nike', 'Jordan', 'Adidas', 'Yeezy', 'Streetwear'],
    vintage: ['Retro', 'Classic', 'Antique', 'Collectible', 'Rare'],
    tech: ['Gaming', 'Electronics', 'Gadgets', 'Apple', 'Android'],
    fashion: ['Streetwear', 'Designer', 'Luxury', 'Trending', 'Style'],
};

export default function TagInput({
    tags = [],
    onTagsChange,
    maxTags = 5,
    category = null,
    placeholder = 'Add tags...'
}) {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (text) => {
        setInputValue(text);

        // Generate suggestions based on input and category
        if (text.length > 0) {
            const categorySuggestions = category ? MOCK_SUGGESTIONS[category.toLowerCase()] || [] : [];
            const filtered = categorySuggestions.filter(s =>
                s.toLowerCase().includes(text.toLowerCase()) && !tags.includes(s)
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const addTag = (tag) => {
        if (tags.length >= maxTags) {
            return;
        }

        const trimmedTag = tag.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            onTagsChange([...tags, trimmedTag]);
            setInputValue('');
            setSuggestions([]);
        }
    };

    const removeTag = (tagToRemove) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.nativeEvent.key === 'Enter' || e.nativeEvent.key === ',') {
            e.preventDefault();
            if (inputValue.trim()) {
                addTag(inputValue);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Selected Tags */}
            {tags.length > 0 && (
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <TouchableOpacity onPress={() => removeTag(tag)}>
                                <X size={14} color={PREMIUM_COLORS.primary.main} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            {/* Input */}
            {tags.length < maxTags && (
                <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    onSubmitEditing={() => addTag(inputValue)}
                    placeholder={placeholder}
                    placeholderTextColor={PREMIUM_COLORS.neutral.textTertiary}
                />
            )}

            {/* Tag count */}
            <Text style={styles.count}>{tags.length}/{maxTags} tags</Text>

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.suggestionsContainer}
                    contentContainerStyle={styles.suggestionsContent}
                >
                    {suggestions.map((suggestion, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.suggestion}
                            onPress={() => addTag(suggestion)}
                        >
                            <Text style={styles.suggestionText}>{suggestion}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: LAYOUT.spacing.md,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: LAYOUT.spacing.sm,
        marginBottom: LAYOUT.spacing.sm,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.xs,
        paddingHorizontal: LAYOUT.spacing.sm,
        paddingVertical: LAYOUT.spacing.xs,
        backgroundColor: PREMIUM_COLORS.primary.light,
        borderRadius: LAYOUT.radius.full,
    },
    tagText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.primary.main,
    },
    input: {
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
        borderRadius: LAYOUT.radius.md,
        padding: LAYOUT.spacing.md,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    count: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textTertiary,
        textAlign: 'right',
        marginTop: LAYOUT.spacing.xs,
    },
    suggestionsContainer: {
        marginTop: LAYOUT.spacing.sm,
    },
    suggestionsContent: {
        gap: LAYOUT.spacing.sm,
    },
    suggestion: {
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.sm,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.full,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
    },
    suggestionText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
    },
});
