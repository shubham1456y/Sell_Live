import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ChevronLeft, Plus, MapPin, CreditCard, Check, Truck, Banknote, Wallet, Tag, User, Activity, Locate } from 'lucide-react-native';

const TABS = ['Addresses', 'Payments'];

export default function PaymentsShippingScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [showAddressForm, setShowAddressForm] = useState(false);

    // Address Form State
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: false
    });

    // Mock Saved Data
    const [savedAddresses, setSavedAddresses] = useState([
        { id: 1, name: 'Home', address: '123 Main St, New York, NY 10001, USA', isDefault: true }
    ]);

    const [paymentMethods, setPaymentMethods] = useState([
        { id: 1, type: 'Visa', last4: '4242', icon: CreditCard },
        { id: 2, type: 'Google Pay', icon: Wallet },
    ]);

    const handleSaveAddress = () => {
        // Logic to save address
        const newId = Date.now();
        // Format address string to match visual style
        const addressString = `${addressForm.address1}, ${addressForm.address2 ? addressForm.address2 + ', ' : ''}${addressForm.city}, ${addressForm.state} ${addressForm.postalCode}, ${addressForm.country}`;

        const newAddr = {
            ...addressForm,
            id: newId,
            name: addressForm.fullName,
            address: addressString
        };

        if (newAddr.isDefault) {
            setSavedAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
        } else {
            setSavedAddresses([...savedAddresses, newAddr]);
        }
        setShowAddressForm(false);
        // Reset form
        setAddressForm({
            fullName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            isDefault: false
        });
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ChevronLeft color={COLORS.text} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payments & Shipping</Text>
        </View>
    );

    const renderTabs = () => (
        <View style={styles.tabs}>
            {TABS.map(tab => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tab, activeTab === tab && styles.activeTab]}
                    onPress={() => setActiveTab(tab)}
                >
                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderAddressForm = () => (
        <Modal visible={showAddressForm} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add New Address</Text>
                    <TouchableOpacity onPress={() => setShowAddressForm(false)}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.formContent}>
                    <TouchableOpacity style={styles.locateButton} onPress={() => alert('Getting location...')}>
                        <Locate size={20} color={COLORS.primary} />
                        <Text style={styles.locateText}>Use Current Location</Text>
                    </TouchableOpacity>

                    <Input
                        placeholder="Full Name"
                        value={addressForm.fullName}
                        onChangeText={t => setAddressForm({ ...addressForm, fullName: t })}
                    />
                    <Input
                        placeholder="Address Line 1"
                        value={addressForm.address1}
                        onChangeText={t => setAddressForm({ ...addressForm, address1: t })}
                        style={{ marginTop: 16 }}
                    />
                    <Input
                        placeholder="Address Line 2 (Optional)"
                        value={addressForm.address2}
                        onChangeText={t => setAddressForm({ ...addressForm, address2: t })}
                        style={{ marginTop: 16 }}
                    />
                    <Input
                        placeholder="City"
                        value={addressForm.city}
                        onChangeText={t => setAddressForm({ ...addressForm, city: t })}
                        style={{ marginTop: 16 }}
                    />
                    <View style={styles.row}>
                        <Input
                            placeholder="State/Province"
                            value={addressForm.state}
                            onChangeText={t => setAddressForm({ ...addressForm, state: t })}
                            style={{ flex: 1, marginRight: 8, marginTop: 16 }}
                        />
                        <Input
                            placeholder="Postal Code"
                            value={addressForm.postalCode}
                            onChangeText={t => setAddressForm({ ...addressForm, postalCode: t })}
                            style={{ flex: 1, marginLeft: 8, marginTop: 16 }}
                        />
                    </View>
                    <Input
                        placeholder="Country"
                        value={addressForm.country}
                        onChangeText={t => setAddressForm({ ...addressForm, country: t })}
                        style={{ marginTop: 16 }}
                    />

                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Default shipping/return address</Text>
                        <Switch
                            value={addressForm.isDefault}
                            onValueChange={v => setAddressForm({ ...addressForm, isDefault: v })}
                            trackColor={{ false: '#767577', true: COLORS.primary }}
                        />
                    </View>

                    <Button title="Save Address" onPress={handleSaveAddress} style={{ marginTop: 32 }} />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );

    const renderDeliveryMethods = () => (
        <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowAddressForm(true)}>
                <Plus color={COLORS.primary} size={20} />
                <Text style={styles.addButtonText}>Add New Address</Text>
            </TouchableOpacity>

            {savedAddresses.map(addr => (
                <View key={addr.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <MapPin size={20} color={COLORS.text} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>{addr.name}</Text>
                            <Text style={styles.cardSubtitle}>{addr.address}</Text>
                        </View>
                        {addr.isDefault && <Check size={20} color={COLORS.primary} />}
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    const renderPaymentMethods = () => (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Payment Options</Text>

            {/* Credit/Debit Card */}
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                        <CreditCard size={20} color="#1976D2" />
                    </View>
                    <Text style={styles.cardTitle}>Credit or Debit Card</Text>
                </View>
            </TouchableOpacity>

            {/* Google Pay */}
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                        <Wallet size={20} color="#388E3C" />
                    </View>
                    <Text style={styles.cardTitle}>Google Pay</Text>
                </View>
            </TouchableOpacity>

            {/* COD */}
            <TouchableOpacity style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                        <Banknote size={20} color="#F57C00" />
                    </View>
                    <Text style={styles.cardTitle}>Cash on Delivery</Text>
                </View>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Saved Methods</Text>
            {paymentMethods.map(pm => (
                <View key={pm.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconContainer}>
                            <pm.icon size={20} color={COLORS.text} />
                        </View>
                        <Text style={styles.cardTitle}>
                            {pm.type} {pm.last4 ? `•••• ${pm.last4}` : ''}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    const renderNotifications = () => (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {[
                { id: 1, title: 'Order Shipped', desc: 'Your Vintage Tee is on the way!', time: '2h ago', icon: Truck, color: '#2196F3' },
                { id: 2, title: 'Price Drop', desc: 'Rolex Submariner is now 10% off.', time: '5h ago', icon: Tag, color: '#4CAF50' },
                { id: 3, title: 'New Follower', desc: 'Sarah J. started following you.', time: '1d ago', icon: User, color: '#9C27B0' },
                { id: 4, title: 'Live Now', desc: 'Vintage Vault is live streaming!', time: 'Now', icon: Activity, color: '#F44336' }
            ].map(notif => (
                <View key={notif.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.iconContainer, { backgroundColor: notif.color + '20' }]}>
                            <notif.icon size={20} color={notif.color} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.cardTitle}>{notif.title}</Text>
                                <Text style={{ fontSize: 12, color: COLORS.textSecondary }}>{notif.time}</Text>
                            </View>
                            <Text style={styles.cardSubtitle}>{notif.desc}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderTabs()}
            {activeTab === 'Addresses' && renderDeliveryMethods()}
            {activeTab === 'Payments' && renderPaymentMethods()}
            {renderAddressForm()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: { marginRight: 16 },
    headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text },

    tabs: {
        flexDirection: 'row',
        padding: 4,
        margin: 16,
        backgroundColor: COLORS.surface,
        borderRadius: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: COLORS.background,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    activeTabText: {
        color: COLORS.text,
    },
    content: {
        padding: 16,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 8,
        borderStyle: 'dashed',
        marginBottom: 24,
        gap: 8,
    },
    addButtonText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    card: {
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: '#F7F7F7', // Slightly different background
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedIconContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    selectedCardText: {
        color: COLORS.primary,
    },
    cardSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 12,
    },

    // Modal Styles
    modalContainer: { flex: 1, backgroundColor: COLORS.background },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalTitle: { fontSize: 18, fontWeight: '700' },
    cancelText: { color: COLORS.primary, fontSize: 16 },
    formContent: { padding: 16 },
    row: { flexDirection: 'row' },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    switchLabel: { fontSize: 16, color: COLORS.text },
    locateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: COLORS.surface,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: 24,
        gap: 8,
    },
    locateText: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});
