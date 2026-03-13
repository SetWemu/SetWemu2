import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar
} from "react-native";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CreateStoryScreen = ({ navigation }) => {

    const [mediaUri, setMediaUri] = useState(null);

    const openCamera = () => {
        launchCamera(
            { mediaType: "photo", quality: 1 },
            response => {
                if (response.assets) {
                    setMediaUri(response.assets[0].uri);
                }
            }
        );
    };

    const openGallery = () => {
        launchImageLibrary(
            { mediaType: "photo" },
            response => {
                if (response.assets) {
                    setMediaUri(response.assets[0].uri);
                }
            }
        );
    };

    const handleShare = () => {
        alert("Story shared!");
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* MEDIA PREVIEW */}
            {mediaUri ? (
                <Image source={{ uri: mediaUri }} style={styles.media} />
            ) : (
                <View style={styles.emptyPreview}>
                    <Text style={{ color: "#fff" }}>Capture or upload a story</Text>
                </View>
            )}

            {/* TOP TOOLBAR */}
            <View style={styles.topBar}>

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={26} color="#fff" />
                </TouchableOpacity>

                <View style={styles.rightIconsContainer}>

                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialCommunityIcons name="draw" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="type" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="happy-outline" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="sliders" size={24} color="#fff" />
                    </TouchableOpacity>

                </View>

            </View>

            {/* CAMERA CONTROLS */}
            {!mediaUri && (
                <View style={styles.bottomBar}>

                    <TouchableOpacity
                        style={styles.galleryButton}
                        onPress={openGallery}>
                        <Ionicons name="images-outline" size={26} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.captureButtonRing}
                        onPress={openCamera}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.swapCamButton}>
                        <Ionicons name="camera-reverse-outline" size={26} color="#fff" />
                    </TouchableOpacity>

                </View>
            )}

            {/* SHARE BAR */}
            {mediaUri && (
                <View style={styles.shareBottomBar}>

                    <TouchableOpacity
                        style={styles.yourStoryButton}
                        onPress={handleShare}>

                        <Ionicons name="add-circle" size={20} color="#fff" />
                        <Text style={styles.shareText}>Your Story</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButtonOuter}
                        onPress={handleShare}>
                        <Ionicons name="arrow-forward" size={22} color="#000" />
                    </TouchableOpacity>

                </View>
            )}

        </SafeAreaView>
    );
};

export default CreateStoryScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000"
    },

    media: {
        flex: 1,
        resizeMode: "cover"
    },

    emptyPreview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    topBar: {
        position: "absolute",
        top: 20,
        left: 15,
        right: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    rightIconsContainer: {
        flexDirection: "row",
        gap: 12
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },

    bottomBar: {
        position: "absolute",
        bottom: 40,
        left: 30,
        right: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    galleryButton: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },

    captureButtonRing: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },

    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#fff"
    },

    swapCamButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },

    shareBottomBar: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    yourStoryButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0095f6",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 25
    },

    shareText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600"
    },

    nextButtonOuter: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    }

});
