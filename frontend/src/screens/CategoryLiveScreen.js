import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { MOCK_SELLERS } from '../constants/data';
import { LiveCard } from '../components/LiveCard';
import { ChevronLeft } from 'lucide-react-native';

export default function CategoryLiveScreen({ navigation, route }) {
    const { subcategory } = route.params;

    // Filter live streams by subcategory (mock logic: matches ID or defaults to showing all if specific mock data missing)
    // In real app: matches specific API filter
    // For Demo: Use 'jordan' matches only, rest show empty or general
    const liveStreams = MOCK_SELLERS.filter(seller => seller.subcategory === subcategory.id);

    // Fallback for demo so user sees something if they click randomly
    const displayStreams = liveStreams.length > 0 ? liveStreams : [];

    const renderItem = ({ item }) => (
        <LiveCard
            seller={item}
            onPress={() => navigation.navigate('LiveStream', { seller: item })}
            style={styles.cardStyle}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>{subcategory.name}</Text>
            </View>

            <FlatList
                data={displayStreams}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyTitle}>No live streams right now.</Text>
                        <Text style={styles.emptyText}>Check back soon or browse other categories!</Text>
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
    columnWrapper: {
        justifyContent: 'space-between',
        gap: 12,
    },
    cardStyle: {
        width: '48%',
        marginBottom: 16,
    },
    empty: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});
