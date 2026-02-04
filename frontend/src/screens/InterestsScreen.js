import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { Check } from 'lucide-react-native';

const CATEGORIES = [
    { id: '1', name: 'Sneakers' },
    { id: '2', name: 'Cards' },
    { id: '3', name: 'Video Games' },
    { id: '4', name: 'Toys & Hobbies' },
    { id: '5', name: 'Clothing' },
    { id: '6', name: 'Electronics' },
    { id: '7', name: 'Jewellery' },
    { id: '8', name: 'Antique & Vintage' },
    { id: '9', name: 'Women Fashion' },
    { id: '10', name: 'Books' },
    { id: '11', name: 'Home & Garden' },
    { id: '12', name: 'Knives & Hunting' },
    { id: '13', name: 'Arts & Handmade' },
    { id: '14', name: 'Beauty Products' },
    { id: '15', name: 'Drinks & Snacks' },
    { id: '16', name: 'Baby & Children' },
];

export default function InterestsScreen({ navigation }) {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [loading, setLoading] = useState(false);

    const toggleInterest = (id) => {
        if (selectedInterests.includes(id)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== id));
        } else {
            setSelectedInterests([...selectedInterests, id]);
        }
    };

    const handleContinue = () => {
        setLoading(true);
        // Mock save interests
        setTimeout(() => {
            setLoading(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }, 1000);
    };

    const handleSkip = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedInterests.includes(item.id);
        return (
            <TouchableOpacity
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => toggleInterest(item.id)}
                activeOpacity={0.7}
            >
                <View style={styles.cardContent}>
                    {isSelected && (
                        <View style={styles.checkIcon}>
                            <Check color="#FFF" size={12} />
                        </View>
                    )}
                    <Text style={[styles.cardText, isSelected && styles.cardTextSelected]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View />
                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>What do you like to shop for?</Text>
                <Text style={styles.subtitle}>Pick categories to customize your feed.</Text>
            </View>

            <FlatList
                data={CATEGORIES}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        marginBottom: 16,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    skipText: {
        color: COLORS.textSecondary,
        fontSize: 16,
        fontWeight: '500',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: 16,
        width: '48%', // Approx half with spacing
        aspectRatio: 1.5, // Rectangular card
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
    },
    cardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary + '10', // 10% opacity primary
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        textAlign: 'center',
    },
    cardTextSelected: {
        color: COLORS.primary,
    },
    checkIcon: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
});
