import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { MOCK_PURCHASES, MOCK_OFFERS } from '../constants/data';
import { Package, Tag, Clock, CheckCircle, XCircle, RefreshCcw, AlertCircle } from 'lucide-react-native';

const STATUS_FILTERS = ['All', 'Pending', 'In Progress', 'Completed', 'Cancelled', 'Refunded'];

export default function ActivityScreen() {
    const [activeTab, setActiveTab] = useState('Purchases');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredPurchases = MOCK_PURCHASES.filter(item =>
        statusFilter === 'All' ? true : item.status === statusFilter
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#4CAF50';
            case 'In Progress': return '#2196F3';
            case 'Pending': return '#FF9800';
            case 'Cancelled': return '#F44336';
            case 'Refunded': return '#9E9E9E';
            default: return COLORS.textSecondary;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed': return <CheckCircle size={14} color="#FFF" />;
            case 'In Progress': return <Package size={14} color="#FFF" />;
            case 'Pending': return <Clock size={14} color="#FFF" />;
            case 'Cancelled': return <XCircle size={14} color="#FFF" />;
            case 'Refunded': return <RefreshCcw size={14} color="#FFF" />;
            default: return <AlertCircle size={14} color="#FFF" />;
        }
    };

    const renderPurchaseItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.shopName}>{item.shopName}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                        {getStatusIcon(item.status)}
                        <Text style={styles.badgeText}>{item.status}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderOfferItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.shopName}>{item.shopName}</Text>
                    <View style={styles.expiryBadge}>
                        <Clock size={12} color={COLORS.accent} />
                        <Text style={styles.expiryText}>Exp: {item.expiresIn}</Text>
                    </View>
                </View>
                <Text style={styles.productName} numberOfLines={1}>{item.productName}</Text>
                <View style={styles.cardFooter}>
                    <View>
                        <Text style={styles.offerPrice}>${item.offerPrice}</Text>
                        <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                    </View>
                    <TouchableOpacity style={styles.acceptBtn}>
                        <Text style={styles.acceptBtnText}>View Offer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Activity</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Purchases' && styles.activeTab]}
                    onPress={() => setActiveTab('Purchases')}
                >
                    <Package size={20} color={activeTab === 'Purchases' ? COLORS.primary : COLORS.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'Purchases' && styles.activeTabText]}>Purchases</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Offers' && styles.activeTab]}
                    onPress={() => setActiveTab('Offers')}
                >
                    <Tag size={20} color={activeTab === 'Offers' ? COLORS.primary : COLORS.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'Offers' && styles.activeTabText]}>Offers Saved</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'Purchases' && (
                <View>
                    <FlatList
                        horizontal
                        data={STATUS_FILTERS}
                        keyExtractor={item => item}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filters}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.filterPill, statusFilter === item && styles.activeFilterPill]}
                                onPress={() => setStatusFilter(item)}
                            >
                                <Text style={[styles.filterText, statusFilter === item && styles.activeFilterText]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                        style={{ flexGrow: 0 }}
                    />
                    <FlatList
                        data={filteredPurchases}
                        renderItem={renderPurchaseItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                        ListEmptyComponent={
                            <View style={styles.empty}>
                                <Text style={styles.emptyText}>No purchases found.</Text>
                            </View>
                        }
                    />
                </View>
            )}

            {activeTab === 'Offers' && (
                <FlatList
                    data={MOCK_OFFERS}
                    renderItem={renderOfferItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>No saved offers.</Text>
                        </View>
                    }
                />
            )}
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
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
    },
    tabsContainer: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    activeTabText: {
        color: COLORS.primary,
    },
    filters: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeFilterPill: {
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
    list: {
        padding: 16,
        paddingBottom: 100, // Bottom tab spacing
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shopName: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    date: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    productName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginTop: 4,
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFF',
        textTransform: 'uppercase',
    },
    // Offer specific styles
    expiryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#FFF2F2',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    expiryText: {
        fontSize: 10,
        color: COLORS.accent,
        fontWeight: '600',
    },
    offerPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.accent,
    },
    originalPrice: {
        fontSize: 12,
        color: COLORS.textSecondary,
        textDecorationLine: 'line-through',
    },
    acceptBtn: {
        backgroundColor: COLORS.text,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    acceptBtnText: {
        color: COLORS.background,
        fontSize: 12,
        fontWeight: '600',
    },
    empty: {
        padding: 24,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
    },
});
