import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { ChevronLeft, CheckCircle, MapPin, CreditCard, Wallet, Banknote, ChevronRight, Truck } from 'lucide-react-native';

const STEPS = ['Address', 'Payment', 'Review'];

export default function CheckoutScreen({ navigation, route }) {
    const { product } = route.params;
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState('card');

    // Mock Data
    const addresses = [
        { id: 1, name: 'Home', address: '123 Main St, New York, NY 10001', phone: '+1 234 567 8900' },
        { id: 2, name: 'Office', address: '456 Market St, San Francisco, CA 94105', phone: '+1 987 654 3210' },
    ];

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
        { id: 'gpay', name: 'Google Pay', icon: Wallet },
        { id: 'cod', name: 'Cash on Delivery', icon: Banknote },
    ];

    const totalPrice = product.price + 5.00; // Adding shipping

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Place Order
            navigation.replace('OrderConfirmation');
        }
    };

    const renderStepIndicator = () => (
        <View style={styles.stepContainer}>
            {STEPS.map((step, index) => (
                <View key={step} style={styles.stepWrapper}>
                    <View style={[
                        styles.stepCircle,
                        index <= currentStep && styles.activeStepCircle
                    ]}>
                        {index < currentStep ? (
                            <CheckCircle size={16} color="#FFF" />
                        ) : (
                            <Text style={[
                                styles.stepNumber,
                                index <= currentStep && styles.activeStepNumber
                            ]}>{index + 1}</Text>
                        )}
                    </View>
                    <Text style={[
                        styles.stepText,
                        index <= currentStep && styles.activeStepText
                    ]}>{step}</Text>
                    {index < STEPS.length - 1 && (
                        <View style={[
                            styles.stepLine,
                            index < currentStep && styles.activeStepLine
                        ]} />
                    )}
                </View>
            ))}
        </View>
    );

    const renderAddressStep = () => (
        <View>
            <Text style={styles.sectionTitle}>Select Delivery Address</Text>
            {addresses.map((addr) => (
                <TouchableOpacity
                    key={addr.id}
                    style={[
                        styles.addressCard,
                        selectedAddress === addr.id && styles.selectedCard
                    ]}
                    onPress={() => setSelectedAddress(addr.id)}
                >
                    <View style={styles.addressHeader}>
                        <View style={styles.row}>
                            <MapPin size={18} color={selectedAddress === addr.id ? COLORS.primary : COLORS.textSecondary} />
                            <Text style={styles.addressName}>{addr.name}</Text>
                        </View>
                        {selectedAddress === addr.id && <CheckCircle size={20} color={COLORS.primary} />}
                    </View>
                    <Text style={styles.addressText}>{addr.address}</Text>
                    <Text style={styles.addressPhone}>{addr.phone}</Text>
                </TouchableOpacity>
            ))}
            <Button
                title="+ Add New Address"
                variant="outline"
                style={{ marginTop: 16 }}
                onPress={() => navigation.navigate('Address')}
            />
        </View>
    );

    const renderPaymentStep = () => (
        <View>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentMethods.map((method) => (
                <TouchableOpacity
                    key={method.id}
                    style={[
                        styles.paymentCard,
                        selectedPayment === method.id && styles.selectedCard
                    ]}
                    onPress={() => setSelectedPayment(method.id)}
                >
                    <View style={styles.row}>
                        <View style={styles.iconBox}>
                            <method.icon size={24} color={COLORS.text} />
                        </View>
                        <Text style={styles.paymentName}>{method.name}</Text>
                    </View>
                    {selectedPayment === method.id ? (
                        <View style={styles.radioSelected} />
                    ) : (
                        <View style={styles.radio} />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderReviewStep = () => (
        <View>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <View style={styles.orderSummaryCard}>
                <View style={styles.productRow}>
                    <Image source={{ uri: product.image }} style={styles.summaryImage} />
                    <View style={styles.summaryInfo}>
                        <Text style={styles.summaryName} numberOfLines={2}>{product.name}</Text>
                        <Text style={styles.summaryPrice}>${product.price.toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Subtotal</Text>
                    <Text style={styles.costValue}>${product.price.toFixed(2)}</Text>
                </View>
                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Shipping</Text>
                    <Text style={styles.costValue}>$5.00</Text>
                </View>
                <View style={[styles.costRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.deliveryInfoCard}>
                <View style={styles.row}>
                    <Truck size={20} color={COLORS.primary} />
                    <Text style={styles.deliveryDate}>Estimated Delivery: Jan 31 - Feb 2</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
            </View>

            {renderStepIndicator()}

            <ScrollView contentContainerStyle={styles.content}>
                {currentStep === 0 && renderAddressStep()}
                {currentStep === 1 && renderPaymentStep()}
                {currentStep === 2 && renderReviewStep()}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.footerTotalLabel}>Total</Text>
                    <Text style={styles.footerTotalValue}>${totalPrice.toFixed(2)}</Text>
                </View>
                <Button
                    title={currentStep === 2 ? "Place Order" : "Continue"}
                    onPress={handleNext}
                    style={styles.nextButton}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 24,
    },
    stepWrapper: {
        alignItems: 'center',
        position: 'relative',
        flex: 1,
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        zIndex: 2,
    },
    activeStepCircle: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    stepNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
    },
    activeStepNumber: {
        color: '#FFF',
    },
    stepText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    activeStepText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    stepLine: {
        position: 'absolute',
        top: 15,
        left: '50%',
        width: '100%',
        height: 2,
        backgroundColor: COLORS.border,
        zIndex: 1,
    },
    activeStepLine: {
        backgroundColor: COLORS.primary,
    },
    content: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: COLORS.text,
    },
    addressCard: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        backgroundColor: COLORS.surface,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: '#F9F9F9',
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressName: {
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
    addressText: {
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    addressPhone: {
        color: COLORS.textSecondary,
    },
    paymentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: COLORS.surface,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    paymentName: {
        fontSize: 16,
        fontWeight: '600',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.border,
    },
    radioSelected: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 6,
        borderColor: COLORS.primary,
    },
    orderSummaryCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    productRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    summaryImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
    },
    summaryInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    summaryName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    summaryPrice: {
        color: COLORS.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: 16,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    costLabel: {
        color: COLORS.textSecondary,
    },
    costValue: {
        fontWeight: '600',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    totalLabel: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: COLORS.primary,
    },
    deliveryInfoCard: {
        backgroundColor: '#E8F5E9',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deliveryDate: {
        color: '#2E7D32',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalContainer: {
        flex: 1,
    },
    footerTotalLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    footerTotalValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    nextButton: {
        width: 150,
    },
});
