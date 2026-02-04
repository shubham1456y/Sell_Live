import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Switch, Share as RNShare, Platform } from 'react-native';
import { PREMIUM_COLORS } from '../constants/premiumColors';
import { TYPOGRAPHY } from '../constants/typography';
import { LAYOUT } from '../constants/layout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import CollapsibleSection from '../components/CollapsibleSection';
import MediaUploader from '../components/MediaUploader';
import TagInput from '../components/TagInput';
import CategoryPicker from '../components/CategoryPicker';
import { ChevronLeft, Calendar, Repeat, Users, Shield, Share2, Link as LinkIcon } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const REPEAT_OPTIONS = ['One-time', 'Daily', 'Weekly', 'Custom'];

export default function StartLiveScreen({ navigation }) {
    // Show Basics
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [tags, setTags] = useState([]);
    const [showCategoryPicker, setShowCategoryPicker] = useState(false);

    // Scheduling (REQUIRED)
    const [scheduledDate, setScheduledDate] = useState(null);
    const [scheduledTime, setScheduledTime] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [repeatOption, setRepeatOption] = useState('One-time');

    // Media
    const [thumbnail, setThumbnail] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);

    // Moderation
    const [moderators, setModerators] = useState([]);
    const [explicitContent, setExplicitContent] = useState(false);
    const [muteWords, setMuteWords] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    // Distribution
    const [shareToFacebook, setShareToFacebook] = useState(false);
    const [shareToTwitter, setShareToTwitter] = useState(false);
    const [shareToInstagram, setShareToInstagram] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        if (!title.trim()) {
            Alert.alert('Required Field', 'Please enter a show title');
            return false;
        }

        if (title.length > 100) {
            Alert.alert('Title Too Long', 'Title must be 100 characters or less');
            return false;
        }

        if (!category) {
            Alert.alert('Required Field', 'Please select a category');
            return false;
        }

        if (!scheduledDate) {
            Alert.alert('Required Field', 'Please select a date for your stream');
            return false;
        }

        if (!scheduledTime) {
            Alert.alert('Required Field', 'Please select a time for your stream');
            return false;
        }

        // Combine date and time
        const scheduledDateTime = new Date(scheduledDate);
        scheduledDateTime.setHours(scheduledTime.getHours());
        scheduledDateTime.setMinutes(scheduledTime.getMinutes());

        if (scheduledDateTime < new Date()) {
            Alert.alert('Invalid Date', 'Scheduled time must be in the future');
            return false;
        }

        if (description.length > 500) {
            Alert.alert('Description Too Long', 'Description must be 500 characters or less');
            return false;
        }

        return true;
    };

    // Check if form is valid for enabling submit button
    const isFormValid = () => {
        return (
            title.trim().length > 0 &&
            title.length <= 100 &&
            category !== null &&
            scheduledDate !== null &&
            scheduledTime !== null
        );
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Combine date and time for final scheduled datetime
        const scheduledDateTime = new Date(scheduledDate);
        scheduledDateTime.setHours(scheduledTime.getHours());
        scheduledDateTime.setMinutes(scheduledTime.getMinutes());

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            Alert.alert(
                'Stream Scheduled!',
                `Your show "${title}" has been scheduled for ${scheduledDateTime.toLocaleString()}`,
                [
                    { text: 'Go to Stream (Demo)', onPress: () => navigation.navigate('SellerLive', { streamTitle: title }) },
                    { text: 'Done', onPress: () => navigation.goBack() }
                ]
            );
            // TODO: Implement actual API call
            // await scheduleStream({ title, description, category, tags, scheduledDateTime, ... });
        }, 1500);
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const generateShareLink = async () => {
        const link = `https://app.example.com/live/${Date.now()}`;

        try {
            await RNShare.share({
                message: `Check out my upcoming live stream: ${title}\n${link}`,
                title: 'Share Live Stream'
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setScheduledDate(selectedDate);
        }
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setScheduledTime(selectedTime);
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    activeOpacity={0.6}
                >
                    <ChevronLeft color={PREMIUM_COLORS.neutral.textPrimary} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Start Live Stream</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Show Basics */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Show Basics</Text>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Title <Text style={styles.required}>*</Text></Text>
                        <Input
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter show title"
                            maxLength={100}
                        />
                        <Text style={styles.charCount}>{title.length}/100</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Description</Text>
                        <Input
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Tell viewers what your show is about"
                            multiline
                            numberOfLines={4}
                            maxLength={500}
                            style={styles.textArea}
                        />
                        <Text style={styles.charCount}>{description.length}/500</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Category <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity
                            style={styles.categoryButton}
                            onPress={() => setShowCategoryPicker(true)}
                        >
                            <Text style={[styles.categoryButtonText, !category && styles.placeholder]}>
                                {category || 'Select a category'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Tags</Text>
                        <TagInput
                            tags={tags}
                            onTagsChange={setTags}
                            category={category}
                            placeholder="Add tags to improve discoverability"
                        />
                    </View>
                </View>

                {/* Scheduling - REQUIRED */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Scheduling <Text style={styles.required}>*</Text>
                    </Text>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Date <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity
                            style={[styles.dateButton, !scheduledDate && styles.errorBorder]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Calendar size={20} color={PREMIUM_COLORS.neutral.textSecondary} />
                            <Text style={[styles.dateButtonText, !scheduledDate && styles.placeholder]}>
                                {scheduledDate
                                    ? scheduledDate.toLocaleDateString()
                                    : 'Select date'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Time <Text style={styles.required}>*</Text></Text>
                        <TouchableOpacity
                            style={[styles.dateButton, !scheduledTime && styles.errorBorder]}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Calendar size={20} color={PREMIUM_COLORS.neutral.textSecondary} />
                            <Text style={[styles.dateButtonText, !scheduledTime && styles.placeholder]}>
                                {scheduledTime
                                    ? scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : 'Select time'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Time Zone</Text>
                        <View style={styles.timeZoneDisplay}>
                            <Text style={styles.timeZoneText}>{timeZone}</Text>
                        </View>
                        <Text style={styles.hint}>Auto-detected from your device</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Repeat</Text>
                        <View style={styles.repeatOptions}>
                            {REPEAT_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.repeatOption,
                                        repeatOption === option && styles.repeatOptionActive
                                    ]}
                                    onPress={() => setRepeatOption(option)}
                                >
                                    <Text style={[
                                        styles.repeatOptionText,
                                        repeatOption === option && styles.repeatOptionTextActive
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Media Assets */}
                <CollapsibleSection title="Media Assets" defaultExpanded={false}>
                    <MediaUploader
                        type="image"
                        aspectRatio="11:17"
                        maxSizeMB={10}
                        label="Thumbnail"
                        hint="11:17 aspect ratio, max 10MB"
                        onMediaSelected={setThumbnail}
                    />
                    <MediaUploader
                        type="video"
                        aspectRatio="9:16"
                        maxSizeMB={50}
                        label="Preview Video"
                        hint="9:16 aspect ratio, max 50MB"
                        onMediaSelected={setPreviewVideo}
                    />
                </CollapsibleSection>

                {/* Moderation & Access */}
                <CollapsibleSection title="Moderation & Access" defaultExpanded={false}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Content Settings</Text>

                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>Explicit Content</Text>
                            <Switch
                                value={explicitContent}
                                onValueChange={setExplicitContent}
                                trackColor={{
                                    false: PREMIUM_COLORS.neutral.divider,
                                    true: PREMIUM_COLORS.primary.main
                                }}
                            />
                        </View>

                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>Private Stream</Text>
                            <Switch
                                value={isPrivate}
                                onValueChange={setIsPrivate}
                                trackColor={{
                                    false: PREMIUM_COLORS.neutral.divider,
                                    true: PREMIUM_COLORS.primary.main
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Mute Words</Text>
                        <Input
                            value={muteWords}
                            onChangeText={setMuteWords}
                            placeholder="Enter words to mute, separated by commas"
                        />
                        <Text style={styles.hint}>Messages containing these words will be hidden</Text>
                    </View>
                </CollapsibleSection>

                {/* Distribution */}
                <CollapsibleSection title="Distribution & Sharing" defaultExpanded={false}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Share to Social Media</Text>

                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>Facebook</Text>
                            <Switch
                                value={shareToFacebook}
                                onValueChange={setShareToFacebook}
                                trackColor={{
                                    false: PREMIUM_COLORS.neutral.divider,
                                    true: PREMIUM_COLORS.primary.main
                                }}
                            />
                        </View>

                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>Twitter</Text>
                            <Switch
                                value={shareToTwitter}
                                onValueChange={setShareToTwitter}
                                trackColor={{
                                    false: PREMIUM_COLORS.neutral.divider,
                                    true: PREMIUM_COLORS.primary.main
                                }}
                            />
                        </View>

                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>Instagram</Text>
                            <Switch
                                value={shareToInstagram}
                                onValueChange={setShareToInstagram}
                                trackColor={{
                                    false: PREMIUM_COLORS.neutral.divider,
                                    true: PREMIUM_COLORS.primary.main
                                }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.shareLinkButton} onPress={generateShareLink}>
                        <LinkIcon size={20} color={PREMIUM_COLORS.primary.main} />
                        <Text style={styles.shareLinkText}>Generate Shareable Link</Text>
                    </TouchableOpacity>
                </CollapsibleSection>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Button
                        title={isSubmitting ? 'Scheduling...' : 'Schedule Show'}
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

            {/* Date Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={scheduledDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    minimumDate={new Date()}
                />
            )}

            {/* Time Picker */}
            {showTimePicker && (
                <DateTimePicker
                    value={scheduledTime || new Date()}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onTimeChange}
                />
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
    section: {
        marginBottom: LAYOUT.spacing.lg,
    },
    sectionTitle: {
        fontSize: TYPOGRAPHY.scale.h3.fontSize,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: PREMIUM_COLORS.neutral.textPrimary,
        marginBottom: LAYOUT.spacing.md,
    },
    fieldGroup: {
        marginBottom: LAYOUT.spacing.md,
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
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: LAYOUT.spacing.md,
    },
    categoryButton: {
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
        borderRadius: LAYOUT.radius.md,
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    categoryButtonText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    placeholder: {
        color: PREMIUM_COLORS.neutral.textTertiary,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: LAYOUT.spacing.sm,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
        borderRadius: LAYOUT.radius.md,
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    dateButtonText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    errorBorder: {
        borderColor: PREMIUM_COLORS.accent.error,
        borderWidth: 2,
    },
    timeZoneDisplay: {
        padding: LAYOUT.spacing.md,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
        borderRadius: LAYOUT.radius.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
    },
    timeZoneText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
    },
    clearButton: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.primary.main,
        marginTop: LAYOUT.spacing.xs,
    },
    repeatOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: LAYOUT.spacing.sm,
    },
    repeatOption: {
        paddingHorizontal: LAYOUT.spacing.md,
        paddingVertical: LAYOUT.spacing.sm,
        borderRadius: LAYOUT.radius.full,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.neutral.divider,
        backgroundColor: PREMIUM_COLORS.neutral.surface,
    },
    repeatOptionActive: {
        backgroundColor: PREMIUM_COLORS.primary.main,
        borderColor: PREMIUM_COLORS.primary.main,
    },
    repeatOptionText: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    repeatOptionTextActive: {
        color: '#FFF',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: LAYOUT.spacing.sm,
    },
    switchLabel: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        color: PREMIUM_COLORS.neutral.textPrimary,
    },
    hint: {
        fontSize: TYPOGRAPHY.scale.caption.fontSize,
        color: PREMIUM_COLORS.neutral.textSecondary,
        marginTop: LAYOUT.spacing.xs,
    },
    shareLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: LAYOUT.spacing.sm,
        padding: LAYOUT.spacing.md,
        borderRadius: LAYOUT.radius.md,
        borderWidth: 1,
        borderColor: PREMIUM_COLORS.primary.main,
        backgroundColor: PREMIUM_COLORS.primary.light,
    },
    shareLinkText: {
        fontSize: TYPOGRAPHY.scale.body.fontSize,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: PREMIUM_COLORS.primary.main,
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
});
