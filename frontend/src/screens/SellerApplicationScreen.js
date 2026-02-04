import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ChevronLeft, Check, Instagram, Globe, Facebook, Twitter, Youtube } from 'lucide-react-native';

export default function SellerApplicationScreen({ navigation }) {
    const [step, setStep] = useState(1);

    // Application Data
    const [applicationData, setApplicationData] = useState({
        agreedToGuidelines: false,
        category: null,
        subCategory: null,
        experience: null,
        revenue: '',
        platforms: [],
        socialLinks: { instagram: '', tiktok: '', youtube: '', website: '' },
        returnAddress: { fullName: '', address1: '', address2: '', city: '', state: '', postalCode: '', country: '' }
    });

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const updateData = (key, value) => {
        setApplicationData(prev => ({ ...prev, [key]: value }));
    };

    // --- STEPS RENDERERS ---

    // Step 1: Intro
    const renderStep1 = () => (
        <View style={styles.centerContent}>
            <Text style={styles.emoji}>👋</Text>
            <Text style={styles.title}>Become a Seller</Text>
            <Text style={styles.subtitle}>
                Start selling live to thousands of buyers independently.
                Complete this quick application to get started.
            </Text>
            <Button title="Get Started" onPress={nextStep} style={styles.mainButton} />
        </View>
    );

    // Step 2: Guidelines
    const renderStep2 = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.stepTitle}>Community Guidelines</Text>
            <Text style={styles.stepDesc}>
                To keep our community safe and fair, please agree to the following rules:
            </Text>

            <View style={styles.guidelineBox}>
                <GuidelineItem icon="🤝" title="Be Honest" desc="Describe items accurately. No counterfeits." />
                <GuidelineItem icon="🚚" title="Ship Quickly" desc="Ship items within 3 business days." />
                <GuidelineItem icon="💬" title="Be Respectful" desc="Treat all buyers and sellers with respect." />
            </View>

            <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => updateData('agreedToGuidelines', !applicationData.agreedToGuidelines)}
            >
                <View style={[styles.checkbox, applicationData.agreedToGuidelines && styles.checkboxChecked]}>
                    {applicationData.agreedToGuidelines && <Check size={14} color="#FFF" />}
                </View>
                <Text style={styles.checkboxText}>I agree to the Community Guidelines</Text>
            </TouchableOpacity>

            <Button
                title="Agree & Continue"
                onPress={nextStep}
                disabled={!applicationData.agreedToGuidelines}
                style={styles.mainButton}
            />
        </ScrollView>
    );

    // Step 3: Category
    const renderStep3 = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.stepTitle}>What do you sell?</Text>
            <Text style={styles.stepDesc}>Choose your primary category.</Text>

            <View style={styles.grid}>
                {['Fashion', 'Sneakers', 'Trading Cards', 'Collectibles', 'Electronics', 'Beauty', 'Home', 'Handmade', 'Other'].map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.gridItem, applicationData.category === cat && styles.gridItemSelected]}
                        onPress={() => updateData('category', cat)}
                    >
                        <Text style={[styles.gridItemText, applicationData.category === cat && styles.gridItemTextSelected]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Button
                title="Next"
                onPress={nextStep}
                disabled={!applicationData.category}
                style={styles.mainButton}
            />
        </ScrollView>
    );

    // Step 4: Experience
    const renderStep4 = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.stepTitle}>Selling Experience</Text>
            <Text style={styles.stepDesc}>How much experience do you have?</Text>

            {['New to selling', 'I sell occasionally', 'I sell professionally (Full-time)', 'I have a physical store'].map((exp) => (
                <TouchableOpacity
                    key={exp}
                    style={[styles.radioItem, applicationData.experience === exp && styles.radioItemSelected]}
                    onPress={() => updateData('experience', exp)}
                >
                    <Text style={styles.radioText}>{exp}</Text>
                    {applicationData.experience === exp && <Check size={20} color={COLORS.primary} />}
                </TouchableOpacity>
            ))}

            <Button
                title="Next"
                onPress={nextStep}
                disabled={!applicationData.experience}
                style={styles.mainButton}
            />
        </ScrollView>
    );

    // Step 5: Revenue
    const renderStep5 = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.stepTitle}>Monthly Revenue</Text>
            <Text style={styles.stepDesc}>What is your typical monthly revenue from selling?</Text>

            <Input
                placeholder="$0.00"
                keyboardType="numeric"
                value={applicationData.revenue}
                onChangeText={(t) => updateData('revenue', t)}
                style={{ fontSize: 24, textAlign: 'center', paddingVertical: 20 }}
            />

            <Button
                title="Next"
                onPress={nextStep}
                style={styles.mainButton}
            />
            <Button title="Skip" variant="secondary" onPress={nextStep} style={{ marginTop: 10, borderColor: 'transparent' }} />
        </ScrollView>
    );

    // Step 6: Other Platforms (Multi-select)
    const renderStep6 = () => {
        const platforms = ['eBay', 'Etsy', 'Poshmark', 'Depop', 'Mercari', 'Amazon', 'Shopify', 'Website', 'Instagram/Socials', 'Physical Store', 'None'];
        const togglePlatform = (p) => {
            const current = applicationData.platforms;
            if (current.includes(p)) {
                updateData('platforms', current.filter(item => item !== p));
            } else {
                updateData('platforms', [...current, p]);
            }
        };

        return (
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.stepTitle}>Where else do you sell?</Text>
                <Text style={styles.stepDesc}>Select all that apply.</Text>

                <View style={styles.grid}>
                    {platforms.map((p) => {
                        const isSelected = applicationData.platforms.includes(p);
                        return (
                            <TouchableOpacity
                                key={p}
                                style={[styles.gridItem, isSelected && styles.gridItemSelected]}
                                onPress={() => togglePlatform(p)}
                            >
                                <Text style={[styles.gridItemText, isSelected && styles.gridItemTextSelected]}>{p}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Button
                    title="Next"
                    onPress={nextStep}
                    style={styles.mainButton}
                />
            </ScrollView>
        );
    };

    // Step 7: Social Media
    const renderStep7 = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.stepTitle}>Social Media</Text>
            <Text style={styles.stepDesc}>Link your profiles to help us verify you faster.</Text>

            <View style={styles.inputRow}>
                <Instagram size={24} color={COLORS.text} style={{ marginRight: 12 }} />
                <Input
                    placeholder="Instagram Handle"
                    value={applicationData.socialLinks.instagram}
                    onChangeText={t => updateData('socialLinks', { ...applicationData.socialLinks, instagram: t })}
                    style={{ flex: 1 }}
                />
            </View>
            <View style={styles.inputRow}>
                <Globe size={24} color={COLORS.text} style={{ marginRight: 12 }} />
                <Input
                    placeholder="Website / TikTok / Other"
                    value={applicationData.socialLinks.website}
                    onChangeText={t => updateData('socialLinks', { ...applicationData.socialLinks, website: t })}
                    style={{ flex: 1 }}
                />
            </View>

            <Button title="Next" onPress={nextStep} style={styles.mainButton} />
            <Button title="Skip" variant="secondary" onPress={nextStep} style={{ marginTop: 10, borderColor: 'transparent' }} />
        </ScrollView>
    );

    // Step 8: Return Address
    const renderStep8 = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.stepTitle}>Return Address</Text>
            <Text style={styles.stepDesc}>Where should buyers send returns?</Text>

            <Input
                label="Full Legal Name"
                placeholder="Name on ID"
                value={applicationData.returnAddress.fullName}
                onChangeText={t => updateData('returnAddress', { ...applicationData.returnAddress, fullName: t })}
            />
            <Input
                label="Address Line 1"
                placeholder="Street Address"
                value={applicationData.returnAddress.address1}
                onChangeText={t => updateData('returnAddress', { ...applicationData.returnAddress, address1: t })}
                style={{ marginTop: 12 }}
            />
            <Input
                label="City"
                placeholder="City"
                value={applicationData.returnAddress.city}
                onChangeText={t => updateData('returnAddress', { ...applicationData.returnAddress, city: t })}
                style={{ marginTop: 12 }}
            />
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                <Input
                    label="State"
                    placeholder="State"
                    value={applicationData.returnAddress.state}
                    onChangeText={t => updateData('returnAddress', { ...applicationData.returnAddress, state: t })}
                    style={{ flex: 1 }}
                />
                <Input
                    label="Zip Code"
                    placeholder="12345"
                    value={applicationData.returnAddress.postalCode}
                    onChangeText={t => updateData('returnAddress', { ...applicationData.returnAddress, postalCode: t })}
                    style={{ flex: 1 }}
                />
            </View>

            <Button
                title="Review & Submit"
                onPress={nextStep}
                disabled={!applicationData.returnAddress.fullName || !applicationData.returnAddress.address1}
                style={styles.mainButton}
            />
        </ScrollView>
    );

    // Step 9: Completion
    const renderStep9 = () => (
        <View style={styles.centerContent}>
            <Text style={styles.emoji}>🎉</Text>
            <Text style={styles.title}>Application Submitted!</Text>
            <Text style={styles.subtitle}>
                We've received your application. We'll review it shortly.
                In the meantime, you can set up your profile.
            </Text>
            <Button
                title="Go to Dashboard"
                onPress={() => {
                    // Navigate to Sell Screen with Dashboard view
                    navigation.navigate('Main', {
                        screen: 'Sell',
                        params: { view: 'DASHBOARD' }
                    });
                }}
                style={styles.mainButton}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {step >= 1 && step < 9 && (
                    <TouchableOpacity
                        onPress={step === 1 ? () => navigation.goBack() : prevStep}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        activeOpacity={0.6}
                    >
                        <ChevronLeft color={COLORS.text} size={28} />
                    </TouchableOpacity>
                )}
                {step < 9 && (
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${(step / 8) * 100}%` }]} />
                    </View>
                )}
                {step > 1 && step < 9 && (
                    <Text style={styles.stepIndicator}>{step}/8</Text>
                )}
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
                {step === 6 && renderStep6()}
                {step === 7 && renderStep7()}
                {step === 8 && renderStep8()}
                {step === 9 && renderStep9()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Helper Component for Guidelines
const GuidelineItem = ({ icon, title, desc }) => (
    <View style={styles.guidelineRow}>
        <Text style={styles.guidelineIcon}>{icon}</Text>
        <View style={{ flex: 1 }}>
            <Text style={styles.guidelineTitle}>{title}</Text>
            <Text style={styles.guidelineDesc}>{desc}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        height: 60,
    },
    backButton: { marginRight: 16 },
    progressContainer: {
        flex: 1,
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        marginRight: 16,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    stepIndicator: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },

    // Content Styles
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    scrollContent: { padding: 24 },

    title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 16, textAlign: 'center' },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center', lineHeight: 22 },
    emoji: { fontSize: 64 },

    stepTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
    stepDesc: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 24 },

    mainButton: { marginTop: 32, width: '100%' },

    // Guidelines
    guidelineBox: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    guidelineRow: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
    guidelineIcon: { fontSize: 24, marginRight: 12, marginTop: 2 },
    guidelineTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    guidelineDesc: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },

    checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    checkbox: {
        width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: COLORS.primary,
        marginRight: 10, justifyContent: 'center', alignItems: 'center',
    },
    checkboxChecked: { backgroundColor: COLORS.primary },
    checkboxText: { fontSize: 16, color: COLORS.text, fontWeight: '500' },

    // Grid (Categories/Platforms)
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    gridItem: {
        width: '30%', flexGrow: 1, padding: 16, borderWidth: 1, borderColor: COLORS.border,
        borderRadius: 8, alignItems: 'center', justifyContent: 'center', minHeight: 80,
    },
    gridItemSelected: { borderColor: COLORS.primary, backgroundColor: '#F0F0FF' },
    gridItemText: { fontSize: 14, color: COLORS.text, textAlign: 'center', fontWeight: '500' },
    gridItemTextSelected: { color: COLORS.primary },

    // Radio List
    radioItem: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 16, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, marginBottom: 12,
    },
    radioItemSelected: { borderColor: COLORS.primary, backgroundColor: '#F0F0FF' },
    radioText: { fontSize: 16, color: COLORS.text },

    // Inputs
    inputRow: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 16,
    },

});
