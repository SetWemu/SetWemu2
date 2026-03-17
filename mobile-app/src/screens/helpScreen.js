import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ================= DESIGN SYSTEM ================= */
const COLORS = {
    bg: { primary: '#141416', card: '#1C1C1E' },
    blue: {
        light: '#ADF3FF',
        brand: '#4CC1D4',
        border: 'rgba(173,243,255,0.22)'
    },
    text: {
        primary: '#F2F2F7',
        secondary: '#ABABAB',
        tertiary: '#6B6B6B',
        inverse: '#141416'
    },
    border: {
        subtle: 'rgba(255,255,255,0.06)'
    }
};

const HelpScreen = ({ navigation }) => {

    const handleEmailSupport = () => {
        Linking.openURL("mailto:support@setwemu.com?subject=SetWemu Support Request");
    };

    // BACK PLACEHOLDER (replace later if needed)
    const handleBack = () => {
        console.log("GO BACK");
        if (navigation) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.headerContainer}>

                    <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                        <Text style={styles.backText}>‹</Text>
                    </TouchableOpacity>

                    <Text style={styles.header}>Help Center</Text>
                    <Text style={styles.subHeader}>Need help? We got you.</Text>
                </View>

                {/* ================= General ================= */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>FAQ</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Report a Problem</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* ================= Contact ================= */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact</Text>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Contact Support Form</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row} onPress={handleEmailSupport}>
                        <View>
                            <Text style={styles.rowText}>Email Support</Text>
                            <Text style={styles.subText}>
                                support@setwemu.com
                            </Text>
                        </View>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                </View>

                {/* ================= About ================= */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Terms of Service</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Privacy Policy</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={styles.rowText}>App Version</Text>
                        <Text style={styles.version}>1.0.0</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />

            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg.primary,
    },

    headerContainer: {
        padding: 20,
        paddingTop: 20,
    },

    backBtn: {
        marginBottom: 10,
    },

    backText: {
        color: COLORS.blue.light,
        fontSize: 20,
        fontWeight: "600",
    },

    header: {
        fontSize: 25,
        fontWeight: "900",
        color: COLORS.text.primary,
        marginBottom: 6,
        letterSpacing: -0.4,
    },

    subHeader: {
        fontSize: 14,
        color: COLORS.text.secondary,
    },

    section: {
        marginTop: 15,
        backgroundColor: COLORS.bg.card,
        borderRadius: 16,
        marginHorizontal: 16,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: COLORS.border.subtle,
    },

    sectionTitle: {
        color: COLORS.text.tertiary,
        fontSize: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.border.subtle,
    },

    rowText: {
        color: COLORS.text.primary,
        fontSize: 15,
        fontWeight: "500",
    },

    subText: {
        color: COLORS.text.secondary,
        fontSize: 12,
        marginTop: 4,
    },

    arrow: {
        color: COLORS.text.tertiary,
        fontSize: 20,
    },

    version: {
        color: COLORS.text.secondary,
        fontSize: 14,
    },
});