import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image
} from "react-native";

const notifications = [
    {
        id: "1",
        user: "Sarah",
        message: "started following you",
        time: "2m",
        avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
        id: "2",
        user: "EventHub",
        message: "New event near you",
        time: "10m",
        avatar: "https://i.pravatar.cc/150?img=45"
    },
    {
        id: "3",
        user: "John",
        message: "liked your review",
        time: "1h",
        avatar: "https://i.pravatar.cc/150?img=50"
    },
    {
        id: "4",
        user: "Beach Party",
        message: "Event reminder tonight",
        time: "3h",
        avatar: "https://i.pravatar.cc/150?img=15"
    }
];

export default function NotificationsScreen() {

    const renderItem = ({ item }) => (
        <View style={styles.row}>

            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            <View style={{ flex: 1 }}>
                <Text style={styles.text}>
                    <Text style={styles.bold}>{item.user}</Text> {item.message}
                </Text>

                <Text style={styles.time}>{item.time}</Text>
            </View>

        </View>
    );

    return (

        <View style={styles.container}>

            <Text style={styles.header}>Notifications</Text>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#071B2E",
        padding: 15
    },

    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 20,
        marginTop: 35
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        backgroundColor: "#0E2A47",
        padding: 12,
        borderRadius: 12
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22,
        marginRight: 12
    },

    text: {
        color: "#fff"
    },

    bold: {
        fontWeight: "bold"
    },

    time: {
        color: "#aaa",
        fontSize: 12,
        marginTop: 2
    }

});
