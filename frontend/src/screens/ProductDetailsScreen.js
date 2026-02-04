import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import { ChevronLeft, Share2, Heart, Star, ShoppingBag } from 'lucide-react-native';
import { Button } from '../components/Button';

export default function ProductDetailsScreen({ navigation, route }) {
    const { product, seller } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Image Header */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <SafeAreaView style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                            <ChevronLeft color={COLORS.text} size={24} />
                        </TouchableOpacity>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.iconButton}>
                                <Share2 color={COLORS.text} size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Heart color={COLORS.text} size={24} />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Seller Info */}
                    <TouchableOpacity style={styles.sellerRow} onPress={() => navigation.navigate('SellerStore', { seller })}>
                        <Image source={{ uri: seller.logo }} style={styles.sellerAvatar} />
                        <View>
                            <Text style={styles.sellerName}>{seller.shopName}</Text>
                            <Text style={styles.sellerSubtitle}>Verified Seller</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.productName}>{product.name}</Text>

                    <View style={styles.ratingRow}>
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>{product.rating} ({product.reviews} reviews)</Text>
                    </View>

                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Shipping</Text>
                    <Text style={styles.description}>Free shipping on orders over $50. Estimated delivery: 3-5 business days.</Text>
                </View>
            </ScrollView>

            {/* Bottom Actions */}
            <SafeAreaView style={styles.bottomBar}>
                <View style={styles.bottomBarContent}>
                    <TouchableOpacity style={styles.cartButton}>
                        <ShoppingBag color={COLORS.text} size={24} />
                    </TouchableOpacity>
                    <Button
                        title="Buy Now"
                        onPress={() => navigation.navigate('Checkout', { product })}
                        style={{ flex: 1, marginLeft: 16 }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        width: '100%',
        height: 400,
        backgroundColor: '#F5F5F5',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        padding: 24,
        marginTop: -24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: COLORS.background,
    },
    sellerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sellerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    sellerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    sellerSubtitle: {
        fontSize: 12,
        color: COLORS.success,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 6,
    },
    ratingText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    price: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.text,
        marginBottom: 24,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    bottomBarContent: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
});
