import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';

export default function TermsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Terms and Conditions</Text>
                <Text style={styles.lastUpdated}>Last Updated: January 30, 2026</Text>
                <Text style={styles.intro}>
                    Welcome to LiveShop ("App", "Platform", "we", "our", "us").
                    By accessing or using our mobile application or website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Platform.
                </Text>

                <Section title="1. Eligibility">
                    You must be at least 18 years old to use this Platform.{'\n'}
                    By using the App, you confirm that all information provided by you is accurate and complete.{'\n'}
                    Sellers must comply with all applicable local laws and regulations.
                </Section>

                <Section title="2. Account Registration">
                    You must create an account to buy or sell on the Platform.{'\n'}
                    You are responsible for maintaining the confidentiality of your login credentials.{'\n'}
                    You are fully responsible for all activities that occur under your account.{'\n'}
                    We reserve the right to suspend or terminate accounts that violate our policies.
                </Section>

                <Section title="3. Seller Responsibilities">
                    If you register as a seller:{'\n'}
                    You must provide accurate product descriptions, pricing, and availability.{'\n'}
                    You must ensure products are legal, authentic, and not prohibited.{'\n'}
                    You are responsible for order fulfillment, shipping, refunds, and customer support.{'\n'}
                    Live streams must not include misleading claims, abusive language, or illegal content.{'\n'}
                    Seller verification may be required before listing or going live.
                </Section>

                <Section title="4. Buyer Responsibilities">
                    As a buyer:{'\n'}
                    You agree to provide accurate delivery and payment information.{'\n'}
                    You understand that purchases made during live streams are final unless otherwise stated.{'\n'}
                    You agree not to misuse refund or dispute mechanisms.
                </Section>

                <Section title="5. Payments & Transactions">
                    Payments are processed through third-party payment gateways.{'\n'}
                    We do not store your card or banking details.{'\n'}
                    Platform fees or commissions (if any) will be clearly disclosed to sellers.{'\n'}
                    We are not responsible for payment failures caused by third-party services.
                </Section>

                <Section title="6. Live Streaming Rules">
                    During live selling sessions:{'\n'}
                    No offensive, abusive, misleading, or illegal content is allowed.{'\n'}
                    No impersonation or false identity representation.{'\n'}
                    We reserve the right to terminate any live stream that violates our policies.{'\n'}
                    Recorded live sessions may be stored for quality, safety, or legal purposes.
                </Section>

                <Section title="7. OTP & Verification">
                    Mobile number verification via OTP is mandatory.{'\n'}
                    You are responsible for keeping your phone number secure.{'\n'}
                    We are not responsible for OTP delays caused by network issues.
                </Section>

                <Section title="8. Cancellations, Returns & Refunds">
                    Refund and return policies are set by individual sellers.{'\n'}
                    The Platform acts as a technology intermediary and does not own products.{'\n'}
                    Any disputes should first be resolved between buyer and seller.{'\n'}
                    We may assist in dispute resolution but are not liable for outcomes.
                </Section>

                <Section title="9. Prohibited Activities">
                    You agree not to:{'\n'}
                    Use the Platform for fraud, scams, or illegal activities{'\n'}
                    Sell counterfeit, stolen, or banned products{'\n'}
                    Harass, threaten, or abuse other users{'\n'}
                    Manipulate prices or engage in fake bidding or fake orders{'\n'}
                    Reverse engineer or misuse the app’s technology
                </Section>

                <Section title="10. Intellectual Property">
                    All app content, logos, UI designs, and trademarks belong to LiveShop.{'\n'}
                    You may not copy, distribute, or modify any part of the Platform without permission.
                </Section>

                <Section title="11. Account Suspension & Termination">
                    We reserve the right to:{'\n'}
                    Suspend or terminate accounts without notice for policy violations{'\n'}
                    Remove content that violates our guidelines{'\n'}
                    Restrict access to features at our discretion
                </Section>

                <Section title="12. Limitation of Liability">
                    We act only as a platform connecting buyers and sellers.{'\n'}
                    We are not responsible for product quality, delivery delays, or seller behavior.{'\n'}
                    Our liability is limited to the maximum extent permitted by law.
                </Section>

                <Section title="13. Privacy">
                    Your data is handled according to our Privacy Policy.{'\n'}
                    We do not sell your personal data to third parties.
                </Section>

                <Section title="14. Modifications">
                    We may update these Terms at any time.{'\n'}
                    Continued use of the Platform means you accept the updated Terms.
                </Section>

                <Section title="15. Governing Law">
                    These Terms shall be governed by and interpreted in accordance with the laws of India.
                </Section>

                <Section title="16. Contact Us">
                    For questions or support, contact us at:{'\n'}
                    📧 support@liveshop.com
                </Section>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const Section = ({ title, children }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{children}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 16,
    },
    intro: {
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 24,
        lineHeight: 24,
    },
    lastUpdated: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 16,
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 8,
    },
    sectionContent: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 22,
    },
});
