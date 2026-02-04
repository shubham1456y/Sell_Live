import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Sparkles } from 'lucide-react-native';

export default function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!phone || phone.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
            return;
        }

        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OTP', { phoneNumber: phone, target: 'Main' });
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[PREMIUM_COLORS.neutral.background, PREMIUM_COLORS.primary.light]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <LinearGradient
                            colors={PREMIUM_COLORS.gradients.primary}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.iconGradient}
                        >
                            <Sparkles size={32} color={PREMIUM_COLORS.neutral.surface} />
                        </LinearGradient>
                    </View>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>
                        Watch live shopping streams,{'\n'}buy amazing products instantly.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                        maxLength={10}
                    />
                    <Button
                        title="Continue with OTP"
                        onPress={handleLogin}
                        loading={loading}
                        variant="primary"
                        style={{ marginTop: LAYOUT.spacing.md }}
                    />

                    <View style={styles.trustBadge}>
                        <Text style={styles.trustText}>
                            🔒 Secure login with OTP verification
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.footerLink}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background,
    },
    content: {
        flex: 1,
        padding: LAYOUT.spacing.lg,
        justifyContent: 'center',
    },
    header: {
        marginBottom: LAYOUT.spacing.xxl,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: LAYOUT.spacing.lg,
    },
    iconGradient: {
        width: 72,
        height: 72,
        borderRadius: LAYOUT.radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        ...LAYOUT.shadow.lg,
    },
    title: {
        fontSize: TYPOGRAPHY.scale.display.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.sm,
        textAlign: 'center',
        letterSpacing: TYPOGRAPHY.scale.display.letterSpacing,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        textAlign: 'center',
        lineHeight: TYPOGRAPHY.scale.body.lineHeight + 4,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    trustBadge: {
        marginTop: LAYOUT.spacing.lg,
        alignItems: 'center',
    },
    trustText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: LAYOUT.spacing.xl,
        left: LAYOUT.spacing.lg,
        right: LAYOUT.spacing.lg,
        alignItems: 'center',
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: PREMIUM_COLORS.neutral.textSecondary,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
    },
    footerLink: {
        color: PREMIUM_COLORS.primary.main,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
    },
});
