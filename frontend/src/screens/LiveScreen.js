import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../constants/colors';
import { MOCK_PRODUCT } from '../constants/data';
import { Button } from '../components/Button';
import { X, Heart, MessageCircle, Share2, ShoppingBag } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LiveScreen({ route, navigation }) {
    const { seller } = route.params;
    const [messages, setMessages] = useState([
        { id: 1, user: 'alex_99', text: 'How is the sizing?' },
        { id: 2, user: 'sarah_k', text: 'Cop or drop? 🔥' },
        { id: 3, user: 'mike_t', text: 'Shipping to CA?' },
    ]);

    return (
        <View style={styles.container}>
            {/* Background Video Placeholder */}
            <Image source={{ uri: seller.image }} style={styles.videoPlaceholder} resizeMode="cover" />
            <View style={styles.overlay} />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.sellerInfo}>
                        <Image source={{ uri: seller.image }} style={styles.avatar} />
                        <View>
                            <Text style={styles.sellerName}>{seller.name}</Text>
                            <View style={styles.liveTag}>
                                <Text style={styles.liveText}>LIVE</Text>
                                <Text style={styles.viewers}>{seller.viewers}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                        <X color="#FFF" size={24} />
                    </TouchableOpacity>
                </View>

                {/* Floating Interactions */}
                <View style={styles.contentContainer}>

                    {/* Messages Area (Simplified) */}
                    <View style={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <View key={msg.id} style={styles.messageRow}>
                                <Text style={styles.messageUser}>{msg.user}</Text>
                                <Text style={styles.messageText}>{msg.text}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Shop Button */}
                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => navigation.navigate('SellerStore', { seller })}
                    >
                        <ShoppingBag color="#FFF" size={20} />
                        <Text style={styles.shopButtonText}>Shop Store</Text>
                    </TouchableOpacity>

                    {/* Bottom Actions */}
                    <View style={styles.actionsBar}>
                        <InputPlaceholder />
                        <View style={styles.actionButtons}>
                            <ActionButton icon={Heart} />
                            <ActionButton icon={Share2} />
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    );
}

const ActionButton = ({ icon: Icon }) => (
    <TouchableOpacity style={styles.iconButton}>
        <Icon color="#FFF" size={24} />
    </TouchableOpacity>
);

const InputPlaceholder = () => {
    const inputRef = React.useRef(null);
    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.chatInput}
                        placeholder="Say something..."
                        placeholderTextColor="rgba(255,255,255,0.7)"
                    />
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.sendButton}>
                <MessageCircle color="#FFF" size={20} />
            </TouchableOpacity>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    videoPlaceholder: {
        position: 'absolute',
        width: width,
        height: height,
        opacity: 0.8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    sellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.accent,
    },
    sellerName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    liveTag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    liveText: {
        color: '#FFF',
        backgroundColor: COLORS.accent,
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 4,
        borderRadius: 4,
        marginRight: 4,
    },
    viewers: {
        color: '#FFF',
        fontSize: 12,
    },
    closeButton: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    contentContainer: {
        padding: 16,
        justifyContent: 'flex-end',
    },
    messagesContainer: {
        height: 150,
        justifyContent: 'flex-end',
        marginBottom: 16,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 12,
    },
    messageUser: {
        color: 'rgba(255,255,255,0.7)',
        fontWeight: 'bold',
        marginRight: 6,
    },
    messageText: {
        color: '#FFF',
    },
    shopButton: {
        backgroundColor: COLORS.accent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginBottom: 16,
        gap: 8,
    },
    shopButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    actionsBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    chatInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 14,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        marginLeft: 12,
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
