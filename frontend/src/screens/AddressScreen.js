import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ChevronLeft, Plus, MapPin, Check, Locate } from 'lucide-react-native';

export default function AddressScreen({ navigation }) {
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

    const [selectedAddressId, setSelectedAddressId] = useState(1);

    // Mock Saved Data
    const [savedAddresses, setSavedAddresses] = useState([
        { id: 1, name: 'Home', address: '123 Main St, New York, NY 10001, USA', isDefault: true }
    ]);

    const handleSaveAddress = () => {
        // Logic to save address
        const newId = Date.now();
        const addressString = `${addressForm.address1}, ${addressForm.address2 ? addressForm.address2 + ', ' : ''}${addressForm.city}, ${addressForm.state} ${addressForm.postalCode}, ${addressForm.country}`;
        const newAddr = {
            ...addressForm,
            id: newId,
            name: addressForm.fullName,
            address: addressString
        };

        if (newAddr.isDefault) {
            setSavedAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
            setSelectedAddressId(newId);
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

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ChevronLeft color={COLORS.text} size={28} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Addresses</Text>
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
                    <Button
                        title="Cancel"
                        variant="secondary"
                        onPress={() => setShowAddressForm(false)}
                        style={{ marginTop: 16, borderColor: 'transparent' }}
                    />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.addButton} onPress={() => setShowAddressForm(true)}>
                    <Plus color={COLORS.primary} size={20} />
                    <Text style={styles.addButtonText}>Add New Address</Text>
                </TouchableOpacity>

                {savedAddresses.map(addr => (
                    <TouchableOpacity
                        key={addr.id}
                        style={[
                            styles.card,
                            selectedAddressId === addr.id && styles.selectedCard
                        ]}
                        onPress={() => handleSelectAddress(addr.id)}
                    >
                        <View style={styles.cardHeader}>
                            <View style={[
                                styles.iconContainer,
                                selectedAddressId === addr.id && styles.selectedIconContainer
                            ]}>
                                <MapPin
                                    size={20}
                                    color={selectedAddressId === addr.id ? COLORS.primary : COLORS.text}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[
                                    styles.cardTitle,
                                    selectedAddressId === addr.id && styles.selectedCardText
                                ]}>{addr.name}</Text>
                                <Text style={styles.cardSubtitle}>{addr.address}</Text>
                            </View>
                            {(addr.isDefault || selectedAddressId === addr.id) && (
                                <Check size={20} color={COLORS.primary} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

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
    content: { padding: 16 },
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
        backgroundColor: '#F7F7F7',
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
