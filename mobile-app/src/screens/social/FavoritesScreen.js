import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";

const initialFavorites = [
    {
        id: "1",
        title: "Colombo Music Festival",
        date: "Oct 12",
        image: "https://picsum.photos/400/200"
    },
    {
        id: "2",
        title: "Street Food Carnival",
        date: "Oct 18",
        image: "https://picsum.photos/401/200"
    }
];

export default function FavoritesScreen() {

    const [favorites, setFavorites] = useState(initialFavorites);

    const removeFavorite = (id, title) => {

        Alert.alert(
            "Remove Favorite",
            `Remove ${title} from favorites?`,
            [
                { text: "Cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {

                        setFavorites(prev => prev.filter(item => item.id !== id));

                    }
                }
            ]
        );

    };

    const renderItem = ({ item }) => (

        <View style={styles.card}>

            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.content}>

                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.date}>{item.date}</Text>

                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFavorite(item.id, item.title)}
                >
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>

            </View>

        </View>

    );

    return (

        <View style={styles.container}>

            <Text style={styles.header}>Favorite Events</Text>

            <FlatList
                data={favorites}
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

    card: {
        backgroundColor: "#0E2A47",
        borderRadius: 15,
        marginBottom: 15,
        overflow: "hidden"
    },

    image: {
        width: "100%",
        height: 150
    },

    content: {
        padding: 12
    },

    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },

    date: {
        color: "#aaa",
        marginTop: 3
    },

    removeBtn: {
        marginTop: 10,
        backgroundColor: "#FF5C5C",
        padding: 8,
        borderRadius: 8,
        alignItems: "center"
    },

    removeText: {
        color: "#fff",
        fontWeight: "bold"
    }

});
