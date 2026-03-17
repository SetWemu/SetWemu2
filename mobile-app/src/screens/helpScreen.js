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

const HelpScreen = () => {
    // Function to open the phone's default email app
    const handleEmailSupport = () => {
        Linking.openURL("mailto:support@setwemu.com?subject=SetWemu Support Request");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <Text style={styles.header}>Help Center</Text>

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
                            {/* Inline style for subtext to keep your main StyleSheet exactly the same */}
                            <Text style={{ color: "#6b8cb3", fontSize: 13, marginTop: 4 }}>
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
                        <Text style={[styles.arrow, { fontSize: 15 }]}>1.0.0</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />

            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpScreen;

// EXACT styles from your SettingsScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#071B2E",
    },

    header: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
        padding: 20,
    },

    section: {
        marginTop: 15,
        backgroundColor: "#0E2A47",
        borderRadius: 12,
        marginHorizontal: 15,
        paddingVertical: 5,
    },

    sectionTitle: {
        color: "#aaa",
        fontSize: 13,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 15,
        borderTopWidth: 0.5,
        borderTopColor: "#1E3A5F",
    },

    rowText: {
        color: "white",
        fontSize: 16,
    },

    arrow: {
        color: "#888",
        fontSize: 18,
    },
});