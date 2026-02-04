import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Button } from '../components/Button';
import ProductCard from '../components/ProductCard';
import { X, Package, Users, MessageCircle, Settings, PhoneOff } from 'lucide-react-native';

// Mock products
const MOCK_PRODUCTS = [
    {
        id: '1',
        category: 'Sneakers',
        name: 'Nike Air Jordan 1',
        price: '250.00',
        quantity: '5',
        photos: ['https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Sneaker']
    },
    {
        id: '2',
        category: 'Electronics',
        name: 'Apple AirPods Pro',
        price: '199.99',
        quantity: '10',
        photos: ['https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=AirPods']
    },
];

export default function SellerLiveScreen({ navigation, route }) {
    const [viewerCount, setViewerCount] = useState(127);
    const [isLive, setIsLive] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductSelector, setShowProductSelector] = useState(false);
    const [products] = useState(MOCK_PRODUCTS);
    const [comments, setComments] = useState([
        { id: 1, user: 'User123', text: 'Looking great!' },
        { id: 2, user: 'Buyer456', text: 'How much for the sneakers?' },
    ]);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setShowProductSelector(false);
        Alert.alert('Product Selected', `Now showing: ${product.name}`);
    };

    const handleEndStream = () => {
        Alert.alert(
            'End Stream',
            'Are you sure you want to end this live stream?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'End Stream',
                    style: 'destructive',
                    onPress: () => {
                        setIsLive(false);
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Video Preview Area */}
            <View style={styles.videoContainer}>
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoText}>📹 LIVE CAMERA FEED</Text>
                    <Text style={styles.videoSubtext}>Seller View</Text>
                </View>

                {/* Live Indicator */}
                <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                </View>

                {/* Viewer Count */}
                <View style={styles.viewerCount}>
                    <Users size={16} color="#FFF" />
                    <Text style={styles.viewerText}>{viewerCount}</Text>
                </View>

                {/* Close Button */}
                <TouchableOpacity style={styles.closeButton} onPress={handleEndStream}>
                    <X size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Selected Product Display */}
            {selectedProduct && (
                <View style={styles.selectedProductBanner}>
                    <Package size={16} color={PREMIUM_COLORS.primary.main} />
                    <Text style={styles.selectedProductText}>
                        Showing: {selectedProduct.name}
                    </Text>
                    <TouchableOpacity onPress={() => setSelectedProduct(null)}>
                        <X size={16} color={PREMIUM_COLORS.neutral.textSecondary} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Comments Feed */}
            <View style={styles.commentsContainer}>
                <ScrollView style={styles.commentsList}>
                    {comments.map((comment) => (
                        <View key={comment.id} style={styles.comment}>
                            <Text style={styles.commentUser}>{comment.user}</Text>
                            <Text style={styles.commentText}>{comment.text}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Seller Controls */}
            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setShowProductSelector(true)}
                >
                    <Package size={24} color="#FFF" />
                    <Text style={styles.controlButtonText}>Select Product</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton}>
                    <MessageCircle size={24} color="#FFF" />
                    <Text style={styles.controlButtonText}>Chat</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton}>
                    <Settings size={24} color="#FFF" />
                    <Text style={styles.controlButtonText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, styles.endButton]}
                    onPress={handleEndStream}
                >
                    <PhoneOff size={24} color="#FFF" />
                    <Text style={styles.controlButtonText}>End</Text>
                </TouchableOpacity>
            </View>

            {/* Product Selector Modal */}
            <Modal
                visible={showProductSelector}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowProductSelector(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Product to Show</Text>
                            <TouchableOpacity onPress={() => setShowProductSelector(false)}>
                                <X size={24} color={PREMIUM_COLORS.neutral.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.productList}>
                            {products.map((product) => (
                                <TouchableOpacity
                                    key={product.id}
                                    onPress={() => handleSelectProduct(product)}
                                >
                                    <ProductCard
                                        product={product}
                                        showActions={false}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Button
                            title="Add New Product"
                            variant="secondary"
                            onPress={() => {
                                setShowProductSelector(false);
                                navigation.navigate('AddProduct');
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoContainer: {
        flex: 1,
        position: 'relative',
    },
    videoPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    videoText: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 8,
    },
    videoSubtext: {
        fontSize: 14,
        color: '#999',
    },
    liveIndicator: {
        position: 'absolute',
        top: 40,
        left: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginRight: 6,
    },
    liveText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    viewerCount: {
        position: 'absolute',
        top: 40,
        right: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    viewerText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 8,
        borderRadius: 20,
    },
    selectedProductBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: PREMIUM_COLORS.primary.light,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: PREMIUM_COLORS.primary.main,
    },
    selectedProductText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: PREMIUM_COLORS.primary.main,
    },
    commentsContainer: {
        height: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    commentsList: {
        padding: 12,
    },
    comment: {
        marginBottom: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 8,
    },
    commentUser: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        color: '#FFF',
    },
    controlsContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        gap: 12,
    },
    controlButton: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        backgroundColor: PREMIUM_COLORS.primary.main,
        borderRadius: 12,
    },
    endButton: {
        backgroundColor: PREMIUM_COLORS.accent.error,
    },
    controlButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    productList: {
        marginBottom: 16,
    },
});
