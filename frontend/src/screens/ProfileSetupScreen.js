import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { CheckCircle2, Circle } from 'lucide-react-native';

export default function ProfileSetupScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        if (!username.trim()) {
            Alert.alert('Required', 'Please enter a username.');
            return;
        }
        if (!gender) {
            Alert.alert('Required', 'Please select your gender.');
            return;
        }

        setLoading(true);
        // Mock save profile
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Interests');
        }, 1000);
    };

    const GenderOption = ({ label, value }) => (
        <TouchableOpacity
            style={[styles.genderOption, gender === value && styles.genderOptionSelected]}
            onPress={() => setGender(value)}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {gender === value ? (
                    <CheckCircle2 color={COLORS.primary} size={20} />
                ) : (
                    <Circle color={COLORS.textSecondary} size={20} />
                )}
                <Text style={[styles.genderText, gender === value && styles.genderTextSelected]}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Complete Profile</Text>
                    <Text style={styles.subtitle}>Tell us a bit more about you.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Username"
                        placeholder="@username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <GenderOption label="Male" value="male" />
                        <GenderOption label="Female" value="female" />
                        <GenderOption label="Others" value="others" />
                    </View>

                    <Button
                        title="Let's Begin"
                        onPress={handleContinue}
                        loading={loading}
                        style={{ marginTop: 24 }}
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
    title: {
        fontSize: 32,
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
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text,
        marginBottom: 8,
    },
    genderContainer: {
        gap: 12,
    },
    genderOption: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: 16,
        backgroundColor: COLORS.background,
    },
    genderOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface,
    },
    genderText: {
        fontSize: 16,
        color: COLORS.text,
        marginLeft: 10,
    },
    genderTextSelected: {
        fontWeight: '600',
        color: COLORS.primary,
    },
});
