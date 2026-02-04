import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Button } from '../components/Button';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, Plus, Search } from 'lucide-react-native';

// Mock data - replace with actual API call
const MOCK_PRODUCTS = [
    {
        id: '1',
        category: 'Sneakers',
        name: 'Nike Air Jordan 1 Retro High OG',
        description: 'Classic basketball shoe in excellent condition',
        price: '250.00',
        quantity: '5',
        shippingProfile: 'Standard Shipping (3-5 days)',
        photos: ['https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Sneaker+1']
    },
    {
        id: '2',
        category: 'Electronics',
        name: 'Apple AirPods Pro 2nd Generation',
        description: 'Brand new, sealed in box',
        price: '199.99',
        quantity: '10',
        shippingProfile: 'Express Shipping (1-2 days)',
        photos: ['https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=AirPods']
    },
    {
        id: '3',
        category: 'Fashion',
        name: 'Vintage Leather Jacket',
        description: 'Genuine leather, size M',
        price: '150.00',
        quantity: '1',
        shippingProfile: 'Standard Shipping (3-5 days)',
        photos: ['https://via.placeholder.com/400x400/95E1D3/FFFFFF?text=Jacket']
    },
];

export default function ProductListingsScreen({ navigation }) {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [searchQuery, setSearchQuery] = useState('');

    const handleEdit = (product) => {
        navigation.navigate('AddProduct', { product });
    };

    const handleDelete = (product) => {
        Alert.alert(
            'Delete Product',
            `Are you sure you want to delete "${product.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        setProducts(products.filter(p => p.id !== product.id));
                        Alert.alert('Success', 'Product deleted successfully');
                    }
                }
            ]
        );
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.6}
                >
                    <ChevronLeft color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Products</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddProduct')}
                    style={styles.addButton}
                >
                    <Plus color={PREMIUM_COLORS.primary.main} size={24} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Search size={20} color={PREMIUM_COLORS.neutral.textSecondary} />
                <Text style={styles.searchInput}>Search products...</Text>
            </View>

            {/* Products List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {filteredProducts.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>📦</Text>
                        <Text style={styles.emptyTitle}>No Products Yet</Text>
                        <Text style={styles.emptySubtitle}>
                            Add your first product to start selling
                        </Text>
                        <Button
                            title="Add Product"
                            onPress={() => navigation.navigate('AddProduct')}
                            style={{ marginTop: 20 }}
                        />
                    </View>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            showActions={true}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: PREMIUM_COLORS.neutral.divider,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    backButton: {
        padding: LAYOUT.spacing.md,
        marginRight: LAYOUT.spacing.xs,
    },
    headerTitle: {
        ...TYPOGRAPHY.scale.h3,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        flex: 1,
        textAlign: 'center',
    },
    addButton: {
        padding: LAYOUT.spacing.sm,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.sm,
        padding: LAYOUT.spacing.md,
        margin: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
    },
    searchInput: {
        flex: 1,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textTertiary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: LAYOUT.spacing.md,
        paddingTop: 0,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: LAYOUT.spacing.md,
    },
    emptyTitle: {
        fontSize: TYPOGRAPHY.scale.h2.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.sm,
    },
    emptySubtitle: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        textAlign: 'center',
    },
});
