import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function MobileInputScreen({ navigation, route }) {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData } = route.params || {};

    const handleSendCode = async () => {
        if (!phone || phone.length < 10) {
            Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
            return;
        }

        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('OTP', { phoneNumber: phone, userData, target: 'ProfileSetup' });
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ChevronLeft color={COLORS.text} size={28} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Verify Your Mobile Number</Text>
                    <Text style={styles.subtitle}>We'll send a verification code to this number.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Mobile Number"
                        placeholder="Enter your mobile number"
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                        maxLength={10}
                    />

                    <Button
                        title="Send Code"
                        onPress={handleSendCode}
                        loading={loading}
                        style={{ marginTop: 12 }}
                    />
                </View>
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
    backButton: {
        marginBottom: 16,
        marginLeft: -8,
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
    form: {
        width: '100%',
    },
});
