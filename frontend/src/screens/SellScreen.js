import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ArrowLeft } from 'lucide-react-native';

export default function SellScreen({ navigation, route }) {
    const [isSeller, setIsSeller] = useState(false);
    const initialView = route.params?.view || 'LANDING';
    const [viewState, setViewState] = useState(initialView); // LANDING, DASHBOARD, ADD_PRODUCT

    // Seller Data (Mock)
    const [shopName, setShopName] = useState('My Awesome Shop');

    // Add Product State
    const [prodName, setProdName] = useState('');
    const [prodPrice, setProdPrice] = useState('');
    const [prodQty, setProdQty] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');

    React.useEffect(() => {
        if (route.params?.view) {
            setViewState(route.params.view);
            if (route.params.view === 'DASHBOARD') setIsSeller(true);
        }
    }, [route.params]);

    const navigateTo = (state) => setViewState(state);

    const handleAddProduct = () => {
        // Mock API Call
        setViewState('DASHBOARD');
        // Reset form
        setProdName('');
        setProdPrice('');
        setProdQty('');
        setProdDesc('');
    };

    const renderLanding = () => (
        <View style={styles.centerContent}>
            <Text style={styles.emoji}>🔒</Text>
            <Text style={styles.title}>Start Your Shop</Text>
            <Text style={styles.subtitle}>Join thousands of sellers streaming live.</Text>
            <Button title="Apply Now" onPress={() => navigation.navigate('SellerApplication')} style={{ marginTop: 20, width: 200 }} />
        </View>
    );

    const renderDashboard = () => (
        <View style={styles.centerContent}>
            <Text style={styles.emoji}>📹</Text>
            <Text style={styles.title}>{shopName || 'My Shop'}</Text>
            <Text style={styles.subtitle}>Ready to go live?</Text>
            <Button title="Go Live" variant="primary" onPress={() => navigation.navigate('StartLive')} style={{ marginTop: 20, width: 200, backgroundColor: COLORS.accent }} />
            <Button title="Add Product" variant="secondary" onPress={() => navigation.navigate('AddProduct')} style={{ marginTop: 12, width: 200 }} />
            <Button title="My Products" variant="secondary" onPress={() => navigation.navigate('ProductListings')} style={{ marginTop: 12, width: 200 }} />
        </View>
    );

    const renderAddProduct = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigateTo('DASHBOARD')}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitleInline}>Add New Product</Text>
            </View>

            <Input label="Product Name" placeholder="e.g. Air Jordan 1" value={prodName} onChangeText={setProdName} />
            <Input label="Price ($)" placeholder="0.00" keyboardType="numeric" value={prodPrice} onChangeText={setProdPrice} />
            <Input label="Quantity" placeholder="1" keyboardType="numeric" value={prodQty} onChangeText={setProdQty} />
            <Input label="Description" placeholder="Condition, size, details..." value={prodDesc} onChangeText={setProdDesc} multiline />
            <Input label="Shipping Address" placeholder="Same as shop address" value={shippingAddress} onChangeText={setShippingAddress} />

            <Button title="List Product" onPress={handleAddProduct} style={{ marginTop: 24 }} />
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                {viewState === 'LANDING' && renderLanding()}
                {viewState === 'DASHBOARD' && renderDashboard()}
                {viewState === 'ADD_PRODUCT' && renderAddProduct()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    scrollContent: { padding: 24 },
    title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 16 },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center' },
    emoji: { fontSize: 48 },
    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 12 },
    headerTitleInline: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
});
