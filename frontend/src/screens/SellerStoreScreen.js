import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { MOCK_SELLER_PRODUCTS } from '../constants/data';
import { ChevronLeft, Star, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24;

export default function SellerStoreScreen({ navigation, route }) {
    const { seller } = route.params;

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ChevronLeft color={COLORS.text} size={28} />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
                <Text style={styles.headerTitle}>{seller.shopName}</Text>
                <Text style={styles.headerSubtitle}>{seller.name}</Text>
            </View>
            <Image source={{ uri: seller.logo }} style={styles.storeLogo} />
        </View>
    );

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { product: item, seller })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <TouchableOpacity style={styles.heartButton}>
                <Heart size={16} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>${item.price}</Text>
                    <View style={styles.ratingContainer}>
                        <Star size={12} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
                data={MOCK_SELLER_PRODUCTS}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={styles.bannerContainer}>
                        <Text style={styles.productsTitle}>All Products</Text>
                        <Text style={styles.productsCount}>{MOCK_SELLER_PRODUCTS.length} items</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingTop: 60, // Safe area approximation
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    backButton: {
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    storeLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    listContent: {
        padding: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    bannerContainer: {
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productsTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
    },
    productsCount: {
        color: COLORS.textSecondary,
    },
    productCard: {
        width: COLUMN_WIDTH,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: COLUMN_WIDTH,
        backgroundColor: '#E0E0E0',
    },
    heartButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 6,
        borderRadius: 12,
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
});
