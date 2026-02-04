import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Button } from '../components/Button';
import { X, Heart, Share2, Users, Send } from 'lucide-react-native';

export default function ViewerLiveScreen({ navigation, route }) {
    const { seller = 'ShopName' } = route.params || {};

    const [viewerCount] = useState(127);
    const [isFollowing, setIsFollowing] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'User123', text: 'Looking great!' },
        { id: 2, user: 'Buyer456', text: 'How much for the sneakers?' },
        { id: 3, user: 'Shopper789', text: 'Just ordered!' },
    ]);

    // Mock selected product
    const [selectedProduct] = useState({
        id: '1',
        name: 'Nike Air Jordan 1 Retro High OG',
        price: '250.00',
        quantity: '5',
        photos: ['https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Product']
    });

    const handleSendComment = () => {
        if (comment.trim()) {
            setComments([...comments, {
                id: Date.now(),
                user: 'You',
                text: comment
            }]);
            setComment('');
        }
    };

    const handleBuyNow = () => {
        Alert.alert(
            'Purchase Product',
            `Buy ${selectedProduct.name} for $${selectedProduct.price}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Buy Now',
                    onPress: () => {
                        navigation.navigate('Checkout', { product: selectedProduct });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Video Feed Area */}
            <View style={styles.videoContainer}>
                <View style={styles.videoPlaceholder}>
                    <Text style={styles.videoText}>📹 LIVE STREAM</Text>
                    <Text style={styles.videoSubtext}>Viewer Mode</Text>
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
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <X size={24} color="#FFF" />
                </TouchableOpacity>

                {/* Seller Info */}
                <View style={styles.sellerInfo}>
                    <View style={styles.sellerAvatar}>
                        <Text style={styles.sellerInitial}>{seller[0]}</Text>
                    </View>
                    <View style={styles.sellerDetails}>
                        <Text style={styles.sellerName}>{seller}</Text>
                        <Text style={styles.sellerFollowers}>1.2K followers</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.followButton, isFollowing && styles.followingButton]}
                        onPress={() => setIsFollowing(!isFollowing)}
                    >
                        <Text style={styles.followButtonText}>
                            {isFollowing ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setHasLiked(!hasLiked)}
                    >
                        <Heart
                            size={28}
                            color={hasLiked ? '#FF6B6B' : '#FFF'}
                            fill={hasLiked ? '#FF6B6B' : 'transparent'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Share2 size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Product Display Card */}
            {selectedProduct && (
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: selectedProduct.photos[0] }}
                        style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={2}>
                            {selectedProduct.name}
                        </Text>
                        <View style={styles.productPriceRow}>
                            <Text style={styles.productPrice}>
                                ${parseFloat(selectedProduct.price).toFixed(2)}
                            </Text>
                            <Text style={styles.productQuantity}>
                                {selectedProduct.quantity} available
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                        <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Comments Section */}
            <View style={styles.commentsSection}>
                <ScrollView style={styles.commentsList}>
                    {comments.map((c) => (
                        <View key={c.id} style={styles.comment}>
                            <Text style={styles.commentUser}>{c.user}</Text>
                            <Text style={styles.commentText}>{c.text}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Comment Input */}
                <View style={styles.commentInputContainer}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Add a comment..."
                        placeholderTextColor={PREMIUM_COLORS.neutral.textTertiary}
                        value={comment}
                        onChangeText={setComment}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleSendComment}
                        disabled={!comment.trim()}
                    >
                        <Send
                            size={20}
                            color={comment.trim() ? PREMIUM_COLORS.primary.main : PREMIUM_COLORS.neutral.textTertiary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
    sellerInfo: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 80,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sellerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: PREMIUM_COLORS.primary.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellerInitial: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    sellerDetails: {
        flex: 1,
    },
    sellerName: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sellerFollowers: {
        color: '#CCC',
        fontSize: 12,
    },
    followButton: {
        backgroundColor: PREMIUM_COLORS.primary.main,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    followingButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    followButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    actionButtons: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        gap: 16,
    },
    actionButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 12,
        borderRadius: 25,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        padding: 12,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: PREMIUM_COLORS.neutral.divider,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: PREMIUM_COLORS.neutral.divider,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: 4,
    },
    productPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PREMIUM_COLORS.primary.main,
    },
    productQuantity: {
        fontSize: 12,
        color: PREMIUM_COLORS.neutral.textSecondary,
    },
    buyButton: {
        backgroundColor: PREMIUM_COLORS.primary.main,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
    },
    buyButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    commentsSection: {
        height: 200,
        backgroundColor: PREMIUM_COLORS.neutral.background,
    },
    commentsList: {
        flex: 1,
        padding: 12,
    },
    comment: {
        marginBottom: 8,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        padding: 8,
        borderRadius: 8,
    },
    commentUser: {
        fontSize: 12,
        fontWeight: 'bold',
        color: PREMIUM_COLORS.primary.main,
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    commentInputContainer: {
        flexDirection: 'row',
        padding: 12,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: PREMIUM_COLORS.neutral.divider,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    commentInput: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    sendButton: {
        padding: 8,
        justifyContent: 'center',
    },
});
