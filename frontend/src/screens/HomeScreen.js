import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, ScrollView, TouchableOpacity, TextInput, Animated, TouchableWithoutFeedback } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { MOCK_SELLERS, MOCK_SCHEDULED_STREAMS } from '../constants/data';
import { LiveCard } from '../components/LiveCard';
import { ScheduledStreamCard } from '../components/ScheduledStreamCard';
import { Search, Bell, MessageSquare, Cat } from 'lucide-react-native';

const CATEGORIES = [
    'All', 'Following', 'Sneakers', 'Vintage', 'Tech', 'Cards', 'Toys', 'Fashion', 'Home'
];

export default function HomeScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const searchInputRef = React.useRef(null);

    const followedSellers = MOCK_SELLERS.filter(s => s.isFollowed);
    const hasFollows = followedSellers.length > 0;

    const renderFollowingView = () => {
        return (
            <ScrollView contentContainerStyle={styles.list}>
                {/* Live Now Section */}
                {followedSellers.length > 0 ? (
                    <View style={styles.section}>
                        <View style={styles.sectionHeaderRow}>
                            <Text style={styles.sectionTitle}>Live Now 🔴</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                            {followedSellers.map(seller => (
                                <LiveCard
                                    key={seller.id}
                                    seller={seller}
                                    onPress={() => navigation.navigate('ViewerLive', { seller: seller.name })}
                                    style={{ width: 160 }}
                                />
                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.emptyLive}>
                        <Text style={styles.emptyText}>No followed sellers are live right now.</Text>
                    </View>
                )}

                {/* Scheduled Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Coming Up 📅</Text>
                    {MOCK_SCHEDULED_STREAMS.map(stream => (
                        <ScheduledStreamCard key={stream.id} stream={stream} />
                    ))}
                </View>

                {/* Empty State Fallback (if both empty) */}
                {followedSellers.length === 0 && MOCK_SCHEDULED_STREAMS.length === 0 && (
                    <View style={styles.emptyStateContainer}>
                        <Cat size={48} color={PREMIUM_COLORS.neutral.textTertiary} />
                        <Text style={styles.emptyStateTitle}>It's quiet here...</Text>
                        <Text style={styles.emptyStateSubtitle}>Follow more sellers to see their updates!</Text>
                    </View>
                )}
            </ScrollView>
        );
    };

    const renderItem = ({ item }) => (
        <LiveCard
            seller={item}
            onPress={() => navigation.navigate('ViewerLive', { seller: item.name })}
            style={styles.cardStyle}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Premium Header */}
            <View style={styles.header}>
                <View style={styles.headerTopRow}>
                    <TouchableWithoutFeedback onPress={() => searchInputRef.current?.focus()}>
                        <View style={styles.searchContainer}>
                            <Search color={PREMIUM_COLORS.neutral.textSecondary} size={20} />
                            <TextInput
                                ref={searchInputRef}
                                placeholder="Search live streams..."
                                placeholderTextColor={PREMIUM_COLORS.neutral.textTertiary}
                                style={styles.searchInput}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('Notifications')}
                        >
                            <Bell color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('Inbox')}
                        >
                            <MessageSquare color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categories}
                        style={{ flexGrow: 0 }}
                    >
                        {CATEGORIES.map((cat) => {
                            if (cat === 'Following' && !hasFollows) return null; // Hide Following if no follows

                            const isActive = selectedCategory === cat;
                            return (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryPill,
                                        isActive && styles.activeCategoryPill
                                    ]}
                                    onPress={() => setSelectedCategory(cat)}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        isActive && styles.activeCategoryText
                                    ]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>

            {/* Content */}
            {selectedCategory === 'Following' ? (
                renderFollowingView()
            ) : (
                <FlatList
                    data={MOCK_SELLERS}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: PREMIUM_COLORS.neutral.background,
        borderBottomWidth: 0,
        ...LAYOUT.shadow.xs,
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.md,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: LAYOUT.spacing.md,
        paddingBottom: LAYOUT.spacing.sm,
        gap: 20,
    },
    tab: {
        paddingVertical: 8,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: PREMIUM_COLORS.primary.main,
    },
    tabText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    activeTabText: {
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: 12,
    },
    emptyLive: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        marginBottom: 24,
    },
    emptyText: {
        color: PREMIUM_COLORS.neutral.textSecondary,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        paddingHorizontal: LAYOUT.spacing.md,
        height: 44,
        marginRight: LAYOUT.spacing.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: LAYOUT.spacing.sm,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.regular,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.md,
    },
    iconButton: {
        position: 'relative',
        padding: LAYOUT.spacing.xs,
    },
    notificationBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.accent.live,
        borderWidth: 2,
        borderColor: PREMIUM_COLORS.neutral.background,
    },
    categoriesSection: {
        backgroundColor: PREMIUM_COLORS.neutral.background,
        paddingBottom: LAYOUT.spacing.xs,
        paddingTop: LAYOUT.spacing.xs,
    },
    categories: {
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.sm,
        gap: LAYOUT.spacing.sm,
    },
    categoryPill: {
        paddingHorizontal: LAYOUT.spacing.lg,
        paddingVertical: LAYOUT.spacing.sm + 2,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.border,
        ...LAYOUT.shadow.xs,
    },
    activeCategoryPill: {
        backgroundColor: PREMIUM_COLORS.primary.main,
        borderColor: PREMIUM_COLORS.primary.main,
        ...LAYOUT.shadow.sm,
    },
    categoryText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize + 2,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        letterSpacing: 0.3,
    },
    activeCategoryText: {
        color: PREMIUM_COLORS.neutral.surface,
    },
    list: {
        padding: LAYOUT.spacing.md,
        paddingTop: 130, // Adjusted for Search + Categories
        paddingBottom: 90, // Bottom tab bar clearance
    },
    columnWrapper: {
        justifyContent: 'space-between',
        gap: LAYOUT.spacing.md,
    },
    cardStyle: {
        width: '48%',
        marginBottom: LAYOUT.spacing.lg, // Generous spacing
    },
});
