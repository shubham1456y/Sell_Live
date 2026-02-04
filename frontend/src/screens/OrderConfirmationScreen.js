import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { CheckCircle, ShoppingBag } from 'lucide-react-native';

export default function OrderConfirmationScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <CheckCircle size={64} color={COLORS.success} />
                </View>
                <Text style={styles.title}>Order Placed!</Text>
                <Text style={styles.subtitle}>Your order has been successfully placed and is being processed.</Text>

                <View style={styles.orderInfo}>
                    <Text style={styles.orderLabel}>Order ID</Text>
                    <Text style={styles.orderValue}>#LV-839201</Text>
                </View>

                <Button
                    title="Continue Shopping"
                    onPress={() => navigation.navigate('Main')}
                    style={styles.button}
                />

                <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
                    <Text style={styles.linkText}>View Order Details</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
    },
    content: {
        padding: 24,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    orderInfo: {
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    orderLabel: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
    orderValue: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.text,
    },
    button: {
        width: '100%',
        marginBottom: 16,
    },
    linkText: {
        color: COLORS.primary,
        fontWeight: '600',
        fontSize: 16,
    },
});
