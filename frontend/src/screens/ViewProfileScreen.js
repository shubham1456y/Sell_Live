import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, FlatList, TextInput, Platform, Share as RNShare, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { Share, ChevronLeft, MessageCircle, Edit2, Search, Heart, Star, Wallet } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24;

const PROFILE_TABS = ['Shop', 'Shows', 'Reviews', 'Clips'];
const FILTER_CHIPS = ['All', 'Active', 'Inactive', 'Sold'];

export default function ViewProfileScreen({ navigation, route }) {
    // Determine if it's the current user's profile
    const isMe = route.params?.isMe ?? true;
    const profile = route.params?.profile || {
        name: 'Harsh',
        username: 'kingjames098123',
        initial: 'K',
        stats: { followers: 0, following: 2 },
    };

    const [activeTab, setActiveTab] = useState('Shop');
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const handleBack = () => {
        navigation.goBack();
    };

    const handleShare = async () => {
        try {
            await RNShare.share({
                message: `Check out ${profile.name}'s profile (@${profile.username})`,
                title: 'Share Profile'
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const handleFollowers = () => {
        // Navigate to followers list
        Alert.alert('Followers', `${profile.stats.followers} followers`);
        // TODO: navigation.navigate('FollowersList', { userId: profile.id });
    };

    const handleFollowing = () => {
        // Navigate to following list
        Alert.alert('Following', `${profile.stats.following} following`);
        // TODO: navigation.navigate('FollowingList', { userId: profile.id });
    };

    const handleMessages = () => {
        // Navigate to inbox/messages
        if (isMe) {
            navigation.navigate('Inbox');
        } else {
            Alert.alert('Messages', `Start a conversation with ${profile.name}`);
            // TODO: navigation.navigate('Chat', { userId: profile.id });
        }
    };

    const handleEditProfile = () => {
        // Navigate to edit profile screen
        navigation.navigate('EditProfile', { profile });
    };

    const Header = () => (
        <View style={styles.headerContainer}>
            {/* Gradient Background */}
            <LinearGradient
                colors={['#4c4c4c', '#1a1a1a']}
                style={styles.headerGradient}
            >
                {/* Navbar */}
                <SafeAreaView>
                    <View style={styles.navbar}>
                        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
                            <ChevronLeft color="#FFF" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
                            <Share color="#FFF" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Header Info */}
                    <View style={styles.profileHeaderContent}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>{profile.initial}</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.usernameText}>{profile.username}</Text>
                            <Text style={styles.nameText}>{profile.name}</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );

    const ProfileActions = () => (
        <View style={styles.contentPadding}>
            {/* Stats */}
            <View style={styles.statsRow}>
                <TouchableOpacity onPress={handleFollowers}>
                    <Text style={styles.statsText}>
                        <Text style={styles.statsCount}>{profile.stats.followers}</Text> Followers
                    </Text>
                </TouchableOpacity>
                <Text style={styles.statsDot}>·</Text>
                <TouchableOpacity onPress={handleFollowing}>
                    <Text style={styles.statsText}>
                        <Text style={styles.statsCount}>{profile.stats.following}</Text> Following
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.primaryButton} onPress={handleMessages}>
                    <MessageCircle color="#FFF" size={20} />
                    <Text style={styles.primaryButtonText}>Messages</Text>
                </TouchableOpacity>
                {isMe && (
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleEditProfile}>
                        <Edit2 color="#000" size={18} />
                        <Text style={styles.secondaryButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    const Tabs = () => (
        <View style={styles.tabsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                {PROFILE_TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const ShopFilters = () => (
        <View style={styles.contentPadding}>
            <View style={styles.searchBar}>
                <Search color="#999" size={20} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <View style={styles.filtersRow}>
                {FILTER_CHIPS.map((chip) => (
                    <TouchableOpacity
                        key={chip}
                        onPress={() => setActiveFilter(chip)}
                        style={[styles.filterChip, activeFilter === chip && styles.activeFilterChip]}
                    >
                        <Text style={[styles.filterChipText, activeFilter === chip && styles.activeFilterChipText]}>
                            {chip}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.itemCount}>0 items</Text>
        </View>
    );

    const EmptyState = () => (
        <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIcon}>
                <Wallet color="#FFF" size={40} fillOpacity={0} />
                {/* Visual approximation of the W icon using Wallet for now */}
            </View>
            <Text style={styles.emptyStateText}>There’s nothing here at the moment!</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <Header />
                <ProfileActions />
                <Tabs />
                {activeTab === 'Shop' && (
                    <>
                        <ShopFilters />
                        <EmptyState />
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerContainer: {
        marginBottom: 10,
    },
    headerGradient: {
        paddingBottom: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
    },
    profileHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#333',
    },
    avatarText: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: '300',
    },
    userInfo: {
        flex: 1,
    },
    usernameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    nameText: {
        color: '#ccc',
        fontSize: 14,
    },
    contentPadding: {
        paddingHorizontal: 16,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    statsText: {
        fontSize: 14,
        color: '#666',
    },
    statsCount: {
        fontWeight: 'bold',
        color: '#000',
    },
    statsDot: {
        marginHorizontal: 6,
        color: '#666',
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 24,
        gap: 8,
    },
    primaryButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 24,
        gap: 8,
    },
    secondaryButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
    },
    tabsWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 16,
    },
    tabsContainer: {
        paddingHorizontal: 16,
    },
    tab: {
        paddingVertical: 12,
        marginRight: 24,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#000',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#000',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 24,
        paddingHorizontal: 16,
        height: 48,
        marginBottom: 16,
        // Shadow for elevation
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    filtersRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    activeFilterChip: {
        backgroundColor: '#333',
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    activeFilterChipText: {
        color: '#FFF',
    },
    itemCount: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    emptyStateIcon: {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
        borderRadius: 28, // Squircle
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
});
