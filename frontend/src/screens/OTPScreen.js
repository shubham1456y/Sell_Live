import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';

export default function OTPScreen({ navigation, route }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const { phoneNumber, target } = route.params || {};

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join('');
        if (code.length !== 6) {
            Alert.alert('Error', 'Please enter a complete 6-digit code.');
            return;
        }

        // Mock verification
        if (code === '123456') {
            if (target === 'Main') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                navigation.replace(target || 'ProfileSetup');
            }
        } else {
            Alert.alert('Error', '❌ OTP is incorrect. Please try again.');
        }
    };

    const handleResend = () => {
        Alert.alert('Success', 'OTP sent again');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Enter Verification Code</Text>
                    <Text style={styles.subtitle}>Enter the 6-digit code sent to {phoneNumber}</Text>
                </View>

                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={(ref) => inputs.current[index] = ref}
                            autoFocus={index === 0}
                        />
                    ))}
                </View>

                <Button title="Verify" onPress={handleVerify} style={{ marginTop: 24 }} />

                <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
                    <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    otpInput: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        backgroundColor: COLORS.surface,
    },
    resendButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    resendText: {
        color: COLORS.accent,
        fontWeight: 'bold',
        fontSize: 14,
    },
});
