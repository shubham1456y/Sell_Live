import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function SubcategoryScreen({ navigation, route }) {
    const { category } = route.params;
    const subcategories = category.subcategories || [];

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('CategoryLive', { subcategory: item })}
        >
            <Text style={styles.itemText}>{item.name}</Text>
            <ChevronRight color={COLORS.textSecondary} size={20} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>{category.name}</Text>
            </View>

            <FlatList
                data={subcategories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No subcategories found.</Text>
                    </View>
                }
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
        padding: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
    },
    list: {
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text,
    },
    empty: {
        padding: 24,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
    },
});
