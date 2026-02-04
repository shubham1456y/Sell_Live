import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, FlatList, Platform, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../constants/colors';
import { CATEGORIES_DATA } from '../constants/data';
import { Search, Smartphone, Footprints, GalleryVerticalEnd, Shirt, ShoppingBag, Briefcase, Sparkles, Dumbbell, Gamepad2, Music, Clock as ClockIcon, Home, Coffee, Dog } from 'lucide-react-native';

const FILTER_BUTTONS = ['Recommended', 'Popular', 'A-Z'];

const IconMap = {
    Smartphone, Footprints, GalleryVerticalEnd, Shirt, ShoppingBag, Briefcase, Sparkles, Dumbbell, Gamepad2, Music, Clock: ClockIcon, Home, Coffee, Dog
};

export default function BrowseScreen({ navigation }) {
    const [activeFilter, setActiveFilter] = useState('Recommended');
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    const filteredCategories = CATEGORIES_DATA.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCategoryCard = ({ item }) => {
        const IconComponent = IconMap[item.icon] || Home; // Fallback icon

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Subcategory', { category: item })}
            >
                <View style={styles.iconContainer}>
                    <IconComponent color={COLORS.primary} size={32} />
                </View>
                <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Sticky Header */}
            <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => searchInputRef.current?.focus()}>
                    <View style={styles.searchContainer}>
                        <Search color={COLORS.textSecondary} size={20} />
                        <TextInput
                            ref={searchInputRef}
                            placeholder="Search products, categories..."
                            placeholderTextColor={COLORS.textSecondary}
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                    {FILTER_BUTTONS.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterBtn, activeFilter === filter && styles.activeFilterBtn]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Grid Content */}
            <FlatList
                data={filteredCategories}
                renderItem={renderCategoryCard}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 40 : 16,
        paddingBottom: 12,
        backgroundColor: COLORS.background,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        zIndex: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        marginHorizontal: 16,
        paddingHorizontal: 12,
        height: 44,
        borderRadius: 8,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: COLORS.text,
    },
    filters: {
        paddingHorizontal: 16,
        gap: 8,
    },
    filterBtn: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeFilterBtn: {
        backgroundColor: COLORS.text,
        borderColor: COLORS.text,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    activeFilterText: {
        color: COLORS.background,
    },
    grid: {
        padding: 16,
        paddingBottom: 100, // Bottom tab spacing
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        width: '48%',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: 1, // Square cards
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.background, // Slight contrast
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        textAlign: 'center',
    },
});
