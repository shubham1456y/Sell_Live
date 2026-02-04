import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, CheckSquare, Square, UserPlus } from 'lucide-react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let valid = true;
        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Full name must not be empty';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Email must be a valid format';
            valid = false;
        }

        if (password.length < 8) {
            newErrors.password = 'Password minimum 8 characters';
            valid = false;
        }

        if (!agreedToTerms) {
            Alert.alert('Terms Required', 'You must agree to the Terms and Conditions to proceed.');
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleContinue = () => {
        if (validate()) {
            navigation.navigate('MobileInput', { userData: { name, email, password } });
        }
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
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <LinearGradient
                                colors={PREMIUM_COLORS.gradients.primary}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.iconGradient}
                            >
                                <UserPlus size={28} color={PREMIUM_COLORS.neutral.surface} />
                            </LinearGradient>
                        </View>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            Join the live shopping revolution.{'\n'}
                            Discover, watch, and buy instantly.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                            error={errors.name}
                        />
                        <Input
                            label="Email Address"
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            error={errors.email}
                        />
                        <View style={styles.passwordContainer}>
                            <Input
                                label="Password"
                                placeholder="Minimum 8 characters"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                error={errors.password}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                                activeOpacity={0.7}
                            >
                                {showPassword ? (
                                    <EyeOff color={PREMIUM_COLORS.neutral.textSecondary} size={20} />
                                ) : (
                                    <Eye color={PREMIUM_COLORS.neutral.textSecondary} size={20} />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.termsContainer}
                            onPress={() => setAgreedToTerms(!agreedToTerms)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.checkboxContainer}>
                                {agreedToTerms ? (
                                    <CheckSquare color={PREMIUM_COLORS.primary.main} size={24} />
                                ) : (
                                    <Square color={PREMIUM_COLORS.neutral.textSecondary} size={24} />
                                )}
                            </View>
                            <Text style={styles.termsText}>
                                I agree to the{' '}
                                <Text
                                    style={styles.termsLink}
                                    onPress={() => navigation.navigate('Terms')}
                                >
                                    Terms and Conditions
                                </Text>
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title="Create Account"
                            onPress={handleContinue}
                            variant="primary"
                            disabled={!agreedToTerms}
                            style={{
                                marginTop: LAYOUT.spacing.lg,
                                opacity: agreedToTerms ? 1 : 0.5
                            }}
                        />
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.footerRow}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.linkText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
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
    },
    scrollContent: {
        flexGrow: 1,
        padding: LAYOUT.spacing.lg,
        paddingTop: LAYOUT.spacing.xxl,
    },
    header: {
        marginBottom: LAYOUT.spacing.xl,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: LAYOUT.spacing.md,
    },
    iconGradient: {
        width: 64,
        height: 64,
        borderRadius: LAYOUT.radius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        ...LAYOUT.shadow.md,
    },
    title: {
        fontSize: TYPOGRAPHY.scale.h1.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.sm,
        textAlign: 'center',
        letterSpacing: TYPOGRAPHY.scale.h1.letterSpacing,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        textAlign: 'center',
        lineHeight: TYPOGRAPHY.scale.body.lineHeight + 2,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        marginBottom: LAYOUT.spacing.xl,
    },
    passwordContainer: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: LAYOUT.spacing.md,
        top: 40,
        padding: LAYOUT.spacing.xs,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: LAYOUT.spacing.md,
        marginBottom: LAYOUT.spacing.xs,
    },
    checkboxContainer: {
        marginRight: LAYOUT.spacing.sm,
        marginTop: 2,
    },
    termsText: {
        flex: 1,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
        lineHeight: TYPOGRAPHY.scale.body.lineHeight + 2,
    },
    termsLink: {
        color: PREMIUM_COLORS.primary.main,
        fontWeight: TYPOGRAPHY.weight.semibold,
        textDecorationLine: 'underline',
    },
    footer: {
        alignItems: 'center',
        marginTop: LAYOUT.spacing.lg,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: PREMIUM_COLORS.neutral.textSecondary,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
    },
    linkText: {
        color: PREMIUM_COLORS.primary.main,
        fontWeight: TYPOGRAPHY.weight.semibold,
        fontSize: TYPOGRAPHY.scale.body.fontSize,
    },
});
