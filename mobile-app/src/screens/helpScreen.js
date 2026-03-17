import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

export default function HelpScreen() {

    return (

        <View style={styles.container}>

            <Text style={styles.header}>Help Center</Text>

            <Text style={styles.item}>FAQ</Text>
            <Text style={styles.item}>Contact Support</Text>
            <Text style={styles.item}>Report a Problem</Text>

            <Text style={styles.email}>support@setwemu.com</Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.background.secondary,
        padding: 20
    },

    header: {
        fontSize: 24,
        fontWeight: "bold"
    },

    item: {
        marginTop: 18,
        fontSize: 16
    },

    email: {
        marginTop: 20,
        color: COLORS.text.link
    }

});
