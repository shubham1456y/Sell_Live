import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ChevronLeft, Camera, User } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation, route }) {
    const currentProfile = route.params?.profile || {
        name: 'Harsh',
        username: 'kingjames098123',
        bio: '',
        image: null,
    };

    const [name, setName] = useState(currentProfile.name || '');
    const [username, setUsername] = useState(currentProfile.username || '');
    const [bio, setBio] = useState(currentProfile.bio || '');
    const [profileImage, setProfileImage] = useState(currentProfile.image || null);
    const [isSaving, setIsSaving] = useState(false);

    const pickImage = async () => {
        // Request permission
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Please grant camera roll permissions to upload a profile picture.');
                return;
            }
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        // Validation
        if (!name.trim()) {
            Alert.alert('Error', 'Display name is required');
            return;
        }

        if (!username.trim()) {
            Alert.alert('Error', 'Username is required');
            return;
        }

        // Username validation (alphanumeric and underscores only)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            Alert.alert('Error', 'Username can only contain letters, numbers, and underscores');
            return;
        }

        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            Alert.alert('Success', 'Profile updated successfully', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]);
            // TODO: Implement actual API call to save profile
            // await updateProfile({ name, username, bio, profileImage });
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Picture */}
                <View style={styles.imageSection}>
                    <View style={styles.imageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <User size={60} color={PREMIUM_COLORS.primary.main} />
                            </View>
                        )}
                        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                            <Camera size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.imageHint}>Tap to change profile picture</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.formSection}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Display Name</Text>
                        <Input
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your display name"
                            maxLength={50}
                        />
                        <Text style={styles.charCount}>{name.length}/50</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Username</Text>
                        <Input
                            value={username}
                            onChangeText={(text) => setUsername(text.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                            placeholder="Enter your username"
                            maxLength={30}
                            autoCapitalize="none"
                        />
                        <Text style={styles.hint}>Letters, numbers, and underscores only</Text>
                        <Text style={styles.charCount}>{username.length}/30</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Bio</Text>
                        <Input
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Tell us about yourself"
                            multiline
                            numberOfLines={4}
                            maxLength={150}
                            style={styles.bioInput}
                        />
                        <Text style={styles.charCount}>{bio.length}/150</Text>
                    </View>
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={isSaving ? "Saving..." : "Save Changes"}
                        onPress={handleSave}
                        disabled={isSaving}
                        variant="primary"
                    />
                </View>
            </ScrollView>
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
        padding: LAYOUT.spacing.xs,
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
        padding: LAYOUT.spacing.lg,
        paddingBottom: 100,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: LAYOUT.spacing.xl,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: LAYOUT.spacing.sm,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: PREMIUM_COLORS.neutral.divider,
    },
    placeholderImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: PREMIUM_COLORS.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: PREMIUM_COLORS.primary.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: PREMIUM_COLORS.neutral.surface,
        ...LAYOUT.shadow.md,
    },
    imageHint: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginTop: LAYOUT.spacing.xs,
    },
    formSection: {
        gap: LAYOUT.spacing.lg,
    },
    fieldGroup: {
        gap: LAYOUT.spacing.xs,
    },
    label: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.xs,
    },
    hint: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginTop: LAYOUT.spacing.xs,
    },
    charCount: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textTertiary,
        textAlign: 'right',
        marginTop: LAYOUT.spacing.xs,
    },
    bioInput: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: LAYOUT.spacing.md,
    },
    buttonContainer: {
        marginTop: LAYOUT.spacing.xl,
    },
});
