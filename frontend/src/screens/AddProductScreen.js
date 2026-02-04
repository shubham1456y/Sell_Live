import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import CategoryPicker from '../components/CategoryPicker';
import { ChevronLeft, Upload, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

const SHIPPING_PROFILES = [
    'Standard Shipping (3-5 days)',
    'Express Shipping (1-2 days)',
    'Free Shipping',
    'Local Pickup Only',
    'International Shipping'
];

export default function AddProductScreen({ navigation, route }) {
    const editMode = route.params?.product || null;

    // Form state
    const [category, setCategory] = useState(editMode?.category || null);
    const [productName, setProductName] = useState(editMode?.name || '');
    const [description, setDescription] = useState(editMode?.description || '');
    const [price, setPrice] = useState(editMode?.price || '');
    const [quantity, setQuantity] = useState(editMode?.quantity || '');
    const [shippingProfile, setShippingProfile] = useState(editMode?.shippingProfile || null);
    const [photos, setPhotos] = useState(editMode?.photos || []);

    const [showCategoryPicker, setShowCategoryPicker] = useState(false);
    const [showShippingPicker, setShowShippingPicker] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!category) {
            Alert.alert('Required Field', 'Please select a category');
            return false;
        }

        if (!productName.trim()) {
            Alert.alert('Required Field', 'Please enter a product name');
            return false;
        }

        if (productName.length > 100) {
            Alert.alert('Name Too Long', 'Product name must be 100 characters or less');
            return false;
        }

        if (!price || parseFloat(price) <= 0) {
            Alert.alert('Invalid Price', 'Please enter a valid price greater than 0');
            return false;
        }

        if (!quantity || parseInt(quantity) <= 0) {
            Alert.alert('Invalid Quantity', 'Please enter a valid quantity greater than 0');
            return false;
        }

        if (!shippingProfile) {
            Alert.alert('Required Field', 'Please select a shipping profile');
            return false;
        }

        if (photos.length === 0) {
            Alert.alert('Required Field', 'Please add at least one product photo');
            return false;
        }

        if (description.length > 500) {
            Alert.alert('Description Too Long', 'Description must be 500 characters or less');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                'Success',
                editMode ? 'Product updated successfully!' : 'Product added successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
            // TODO: Implement actual API call
            // await saveProduct({ category, productName, description, price, quantity, shippingProfile, photos });
        }, 1500);
    };

    const pickImage = async () => {
        if (photos.length >= 10) {
            Alert.alert('Maximum Photos', 'You can only add up to 10 photos');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            const newPhoto = result.assets[0].uri;
            setPhotos([...photos, newPhoto]);
        }
    };

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const isFormValid = () => {
        return (
            category !== null &&
            productName.trim().length > 0 &&
            productName.length <= 100 &&
            price && parseFloat(price) > 0 &&
            quantity && parseInt(quantity) > 0 &&
            shippingProfile !== null &&
            photos.length > 0
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.6}
                >
                    <ChevronLeft color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {editMode ? 'Edit Product' : 'Add Product'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Category */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Category <Text style={styles.required}>*</Text></Text>
                    <TouchableOpacity
                        style={styles.picker}
                        onPress={() => setShowCategoryPicker(true)}
                    >
                        <Text style={[styles.pickerText, !category && styles.placeholder]}>
                            {category || 'Select a category'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Product Name */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Product Name <Text style={styles.required}>*</Text></Text>
                    <Input
                        value={productName}
                        onChangeText={setProductName}
                        placeholder="Enter product name"
                        maxLength={100}
                    />
                    <Text style={styles.charCount}>{productName.length}/100</Text>
                </View>

                {/* Description */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Description</Text>
                    <Input
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Describe your product"
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                        style={styles.textArea}
                    />
                    <Text style={styles.charCount}>{description.length}/500</Text>
                </View>

                {/* Price */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Price <Text style={styles.required}>*</Text></Text>
                    <Input
                        value={price}
                        onChangeText={setPrice}
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                        style={styles.priceInput}
                    />
                    <Text style={styles.hint}>Enter price in USD</Text>
                </View>

                {/* Quantity */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Quantity <Text style={styles.required}>*</Text></Text>
                    <Input
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="0"
                        keyboardType="number-pad"
                    />
                    <Text style={styles.hint}>Available inventory</Text>
                </View>

                {/* Shipping Profile */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Shipping Profile <Text style={styles.required}>*</Text></Text>
                    <TouchableOpacity
                        style={styles.picker}
                        onPress={() => setShowShippingPicker(true)}
                    >
                        <Text style={[styles.pickerText, !shippingProfile && styles.placeholder]}>
                            {shippingProfile || 'Select shipping profile'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Product Photos */}
                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Product Photos <Text style={styles.required}>*</Text></Text>
                    <Text style={styles.hint}>Add 1-10 photos (max 10MB each)</Text>

                    <View style={styles.photoGrid}>
                        {photos.map((photo, index) => (
                            <View key={index} style={styles.photoContainer}>
                                <Image source={{ uri: photo }} style={styles.photo} />
                                <TouchableOpacity
                                    style={styles.removePhotoButton}
                                    onPress={() => removePhoto(index)}
                                >
                                    <X size={16} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {photos.length < 10 && (
                            <TouchableOpacity style={styles.addPhotoButton} onPress={pickImage}>
                                <Upload size={24} color={PREMIUM_COLORS.neutral.textSecondary} />
                                <Text style={styles.addPhotoText}>Add Photo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Button
                        title={isSubmitting ? 'Saving...' : 'Save Listing'}
                        onPress={handleSubmit}
                        disabled={isSubmitting || !isFormValid()}
                        variant="primary"
                    />
                </View>
            </View>

            {/* Category Picker Modal */}
            <CategoryPicker
                visible={showCategoryPicker}
                onClose={() => setShowCategoryPicker(false)}
                selectedCategory={category}
                onSelectCategory={setCategory}
            />

            {/* Shipping Profile Picker Modal */}
            {showShippingPicker && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Shipping Profile</Text>
                        <ScrollView>
                            {SHIPPING_PROFILES.map((profile) => (
                                <TouchableOpacity
                                    key={profile}
                                    style={[
                                        styles.modalOption,
                                        shippingProfile === profile && styles.modalOptionSelected
                                    ]}
                                    onPress={() => {
                                        setShippingProfile(profile);
                                        setShowShippingPicker(false);
                                    }}
                                >
                                    <Text style={styles.modalOptionText}>{profile}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <Button
                            title="Cancel"
                            variant="secondary"
                            onPress={() => setShowShippingPicker(false)}
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PREMIUM_COLORS.neutral.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: PREMIUM_COLORS.neutral.divider,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    backButton: {
        padding: LAYOUT.spacing.md,
        marginRight: LAYOUT.spacing.xs,
    },
    headerTitle: {
        ...TYPOGRAPHY.scale.h3,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: LAYOUT.spacing.md,
        paddingBottom: 100,
    },
    fieldGroup: {
        marginBottom: LAYOUT.spacing.lg,
    },
    label: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.sm,
    },
    required: {
        color: PREMIUM_COLORS.accent.error,
    },
    charCount: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textTertiary,
        textAlign: 'right',
        marginTop: LAYOUT.spacing.xs,
    },
    hint: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginTop: LAYOUT.spacing.xs,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: LAYOUT.spacing.md,
    },
    priceInput: {
        fontSize: TYPOGRAPHY.scale.h3.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
    },
    picker: {
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
        borderRadius: LAYOUT.radius.md,
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    pickerText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    placeholder: {
        color: PREMIUM_COLORS.neutral.textTertiary,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: LAYOUT.spacing.sm,
        marginTop: LAYOUT.spacing.sm,
    },
    photoContainer: {
        width: 100,
        height: 100,
        borderRadius: LAYOUT.radius.md,
        overflow: 'hidden',
        position: 'relative',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    removePhotoButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoButton: {
        width: 100,
        height: 100,
        borderRadius: LAYOUT.radius.md,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: PREMIUM_COLORS.neutral.divider,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    addPhotoText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginTop: LAYOUT.spacing.xs,
    },
    actionBar: {
        flexDirection: 'row',
        gap: LAYOUT.spacing.md,
        padding: LAYOUT.spacing.md,
        borderTopWidth: 1,
        borderTopColor: PREMIUM_COLORS.neutral.divider,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    cancelButton: {
        paddingVertical: LAYOUT.spacing.md,
        paddingHorizontal: LAYOUT.spacing.lg,
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textSecondary,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.lg,
        padding: LAYOUT.spacing.lg,
        width: '80%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: TYPOGRAPHY.scale.h3.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.md,
    },
    modalOption: {
        padding: LAYOUT.spacing.md,
        borderRadius: LAYOUT.radius.md,
        marginBottom: LAYOUT.spacing.sm,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
    },
    modalOptionSelected: {
        backgroundColor: PREMIUM_COLORS.primary.light,
        borderColor: PREMIUM_COLORS.primary.main,
    },
    modalOptionText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
});
