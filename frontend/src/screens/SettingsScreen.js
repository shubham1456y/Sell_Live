import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { user, Bell, Shield, FileText, ChevronRight, ArrowLeft, User, MapPin, Mail, Phone, Edit2, Save, Tag, CreditCard, Lock, HelpCircle, MessageSquare, LogOut } from 'lucide-react-native';

export default function SettingsScreen({ navigation }) {
    // Profile State
    const [profile, setProfile] = useState({
        name: 'John Doe',
        phone: '+1 234 567 8900',
        email: 'john@example.com',
    });

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const renderMenu = () => {
        const accountItems = [
            { id: 1, title: 'Payments & Shipping', icon: CreditCard, action: () => navigation.navigate('PaymentsShipping') },
            { id: 5, title: 'Addresses', icon: MapPin, action: () => navigation.navigate('Address') },
            { id: 2, title: 'Notifications', icon: Bell, action: () => navigation.navigate('Notifications') },
            { id: 6, title: 'Change Email', icon: Mail, action: () => alert('Navigate to Change Email') },
            { id: 7, title: 'Change Password', icon: Lock, action: () => alert('Navigate to Change Password') },
        ];

        const helpItems = [
            { id: 8, title: 'Contact Us', icon: MessageSquare, action: () => alert('Navigate to Contact Us') },
            { id: 3, title: 'Privacy Policy', icon: Shield, action: () => { } },
            { id: 4, title: 'Terms and Conditions', icon: FileText, action: () => navigation.navigate('Terms') },
            { id: 9, title: 'FAQs', icon: HelpCircle, action: () => alert('Navigate to FAQs') },
        ];

        const renderSection = (title, items) => (
            <View style={{ marginBottom: LAYOUT.spacing.lg }}>
                <Text style={styles.sectionHeader}>{title}</Text>
                <Card variant="elevated" contentStyle={{ padding: 0 }}>
                    {items.map((opt, index) => (
                        <TouchableOpacity
                            key={opt.id}
                            style={[styles.optionRow, index === items.length - 1 && { borderBottomWidth: 0 }]}
                            onPress={opt.action}
                            activeOpacity={0.7}
                        >
                            <View style={styles.optionLeft}>
                                <View style={styles.iconContainer}>
                                    <opt.icon size={20} color={PREMIUM_COLORS.primary.main} />
                                </View>
                                <Text style={styles.optionText}>{opt.title}</Text>
                            </View>
                            <ChevronRight size={20} color={PREMIUM_COLORS.neutral.textTertiary} />
                        </TouchableOpacity>
                    ))}
                </Card>
            </View>
        );

        return (
            <ScrollView
                style={styles.scrollContent}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Seller Banner */}
                <View style={styles.sellerBanner}>
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Interested in selling?</Text>
                        <Text style={styles.bannerSubtitle}>BestSell in seconds</Text>
                        <TouchableOpacity
                            style={styles.bannerButton}
                            onPress={() => navigation.navigate('Sell')}
                        >
                            <Text style={styles.bannerBtnText}>Get Started</Text>
                            <ChevronRight size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bannerIcon}>
                        <Tag size={80} color="rgba(255,255,255,0.1)" />
                    </View>
                </View>

                {renderSection('Account', accountItems)}
                {renderSection('Help & Legal', helpItems)}

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={() => navigation.replace('Login')}
                >
                    <LogOut size={20} color={PREMIUM_COLORS.accent.error} />
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const renderProfile = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
                <ProfileField
                    icon={User}
                    label="Full Name"
                    value={profile.name}
                    editable={isEditing}
                    onChange={(t) => handleChange('name', t)}
                />
                <ProfileField
                    icon={Phone}
                    label="Phone"
                    value={profile.phone}
                    editable={isEditing}
                    onChange={(t) => handleChange('phone', t)}
                />
                <ProfileField
                    icon={Mail}
                    label="Email"
                    value={profile.email}
                    editable={isEditing}
                    onChange={(t) => handleChange('email', t)}
                />
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.profileHeader} onPress={() => navigation.navigate('ViewProfile', { isMe: true })}>
                    <View style={styles.avatarContainer}>
                        <User size={40} color={PREMIUM_COLORS.primary.main} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profile.name}</Text>
                        <Text style={styles.viewProfileLink}>View Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {renderMenu()}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background
    },
    header: {
        padding: LAYOUT.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0,
        ...LAYOUT.shadow.xs,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        height: 70,
    },
    menuHeader: {
        justifyContent: 'flex-start',
        paddingVertical: LAYOUT.spacing.sm,
        height: 'auto',
    },
    headerTitle: {
        ...TYPOGRAPHY.scale.h3,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.bold,
    },
    scrollContent: {
        padding: LAYOUT.spacing.md
    },
    card: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        padding: LAYOUT.spacing.md,
        ...LAYOUT.shadow.md,
    },

    // Profile Header Styles
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 56,
        height: 56,
        borderRadius: LAYOUT.radius.full,
        backgroundColor: PREMIUM_COLORS.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: LAYOUT.spacing.md,
        ...LAYOUT.shadow.sm,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        ...TYPOGRAPHY.scale.h3,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.bold,
        marginBottom: 4,
    },
    viewProfileLink: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.primary.main,
        fontWeight: TYPOGRAPHY.weight.semibold,
    },

    // Menu Styles
    sectionHeader: {
        ...TYPOGRAPHY.scale.overline,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginBottom: LAYOUT.spacing.sm,
        marginLeft: LAYOUT.spacing.xs,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: LAYOUT.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: PREMIUM_COLORS.neutral.divider,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.md,
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: LAYOUT.radius.md,
        backgroundColor: PREMIUM_COLORS.primary.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.medium,
    },

    // Seller Banner
    sellerBanner: {
        backgroundColor: PREMIUM_COLORS.neutral.textPrimary,
        borderRadius: LAYOUT.radius.xl,
        padding: LAYOUT.spacing.lg,
        marginBottom: LAYOUT.spacing.lg,
        width: '100%',
        minHeight: 180,
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        ...LAYOUT.shadow.lg,
    },
    bannerContent: {
        zIndex: 2,
        alignItems: 'flex-start',
    },
    bannerTitle: {
        color: PREMIUM_COLORS.neutral.surface,
        ...TYPOGRAPHY.scale.overline,
        marginBottom: 4,
        opacity: 0.9,
    },
    bannerSubtitle: {
        color: PREMIUM_COLORS.neutral.surface,
        fontSize: 28,
        fontWeight: TYPOGRAPHY.weight.extrabold,
        marginBottom: LAYOUT.spacing.md,
        lineHeight: 34,
        width: '80%',
    },
    bannerButton: {
        backgroundColor: PREMIUM_COLORS.primary.main,
        paddingHorizontal: LAYOUT.spacing.md + 4,
        paddingVertical: LAYOUT.spacing.sm + 2,
        borderRadius: LAYOUT.radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.xs,
        ...LAYOUT.shadow.md,
    },
    bannerBtnText: {
        color: PREMIUM_COLORS.neutral.surface,
        fontWeight: TYPOGRAPHY.weight.bold,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
    },
    bannerIcon: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        transform: [{ rotate: '-15deg' }],
        opacity: 0.1,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        marginBottom: LAYOUT.spacing.lg,
        gap: LAYOUT.spacing.sm,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.accent.error + '20',
        ...LAYOUT.shadow.sm,
    },
    signOutText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.accent.error,
    },

    // Field Styles
    fieldContainer: { marginBottom: LAYOUT.spacing.md },
    fieldHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.sm,
        marginBottom: LAYOUT.spacing.xs,
    },
    fieldLabel: {
        color: PREMIUM_COLORS.neutral.textSecondary,
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        fontWeight: TYPOGRAPHY.weight.medium,
    },
    fieldValue: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
        fontWeight: TYPOGRAPHY.weight.medium,
        marginTop: LAYOUT.spacing.xs,
    },
    backBtn: {
        padding: LAYOUT.spacing.xs,
    },
});
