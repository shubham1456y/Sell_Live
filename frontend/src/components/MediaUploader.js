import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MediaUploader({
    type = 'image', // 'image' or 'video'
    aspectRatio = '16:9', // '11:17', '9:16', '16:9'
    maxSizeMB = 10,
    onMediaSelected,
    label,
    hint
}) {
    const [mediaUri, setMediaUri] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const pickMedia = async () => {
        // Request permission
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Please grant media library permissions.');
                return;
            }
        }

        const mediaTypes = type === 'video'
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images;

        // Launch picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes,
            allowsEditing: true,
            aspect: aspectRatio === '11:17' ? [11, 17] : aspectRatio === '9:16' ? [9, 16] : [16, 9],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            // Check file size (approximate for web)
            if (asset.fileSize && asset.fileSize > maxSizeMB * 1024 * 1024) {
                Alert.alert('File too large', `Please select a ${type} smaller than ${maxSizeMB}MB`);
                return;
            }

            setMediaUri(asset.uri);
            if (onMediaSelected) {
                onMediaSelected(asset.uri);
            }
        }
    };

    const removeMedia = () => {
        setMediaUri(null);
        if (onMediaSelected) {
            onMediaSelected(null);
        }
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            {!mediaUri ? (
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickMedia}
                    activeOpacity={0.7}
                >
                    {type === 'video' ? (
                        <Video size={32} color={PREMIUM_COLORS.primary.main} />
                    ) : (
                        <ImageIcon size={32} color={PREMIUM_COLORS.primary.main} />
                    )}
                    <Text style={styles.uploadText}>
                        Upload {type === 'video' ? 'Video' : 'Image'}
                    </Text>
                    {hint && <Text style={styles.hint}>{hint}</Text>}
                </TouchableOpacity>
            ) : (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: mediaUri }} style={styles.preview} />
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={removeMedia}
                    >
                        <X size={16} color="#FFF" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: LAYOUT.spacing.md,
    },
    label: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.sm,
    },
    uploadButton: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: PREMIUM_COLORS.neutral.divider,
        borderRadius: LAYOUT.radius.md,
        padding: LAYOUT.spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PREMIUM_COLORS.neutral.background,
    },
    uploadText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.primary.main,
        marginTop: LAYOUT.spacing.sm,
    },
    hint: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginTop: LAYOUT.spacing.xs,
        textAlign: 'center',
    },
    previewContainer: {
        position: 'relative',
        borderRadius: LAYOUT.radius.md,
        overflow: 'hidden',
    },
    preview: {
        width: '100%',
        height: 200,
        backgroundColor: PREMIUM_COLORS.neutral.divider,
    },
    removeButton: {
        position: 'absolute',
        top: LAYOUT.spacing.sm,
        right: LAYOUT.spacing.sm,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
