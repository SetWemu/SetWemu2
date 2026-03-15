import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    Modal,
    TextInput,
    ScrollView,
    PanResponder,
    Animated
} from "react-native";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CreateStoryScreen = ({ navigation }) => {

    const [mediaUri, setMediaUri] = useState(null);

    // Tool states
    const [showDrawTool, setShowDrawTool] = useState(false);
    const [showTextTool, setShowTextTool] = useState(false);
    const [showStickerTool, setShowStickerTool] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);

    // Story elements
    const [textElements, setTextElements] = useState([]); // Array of text objects
    const [drawingPaths, setDrawingPaths] = useState([]); // Array of drawing paths
    const [emojis, setEmojis] = useState([]); // Array of emojis
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Draw tool states
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [brushSize, setBrushSize] = useState(5);
    const [currentPath, setCurrentPath] = useState([]);

    // Text tool states
    const [textInput, setTextInput] = useState("");
    const [selectedFont, setSelectedFont] = useState("normal");
    const [textSize, setTextSize] = useState(32);
    const [textColor, setTextColor] = useState("#FFFFFF");

    // Drag states
    const [isDragging, setIsDragging] = useState(false);
    const [showTrash, setShowTrash] = useState(false);

    // Sticker submenu state
    const [stickerTab, setStickerTab] = useState("emoji");

    // Color palette
    const colors = [
        "#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF",
        "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080"
    ];

    // Font options
    const fonts = [
        { name: "Classic", value: "normal" },
        { name: "Modern", value: "sans-serif" },
        { name: "Neon", value: "monospace" },
        { name: "Strong", value: "serif" },
        { name: "Typewriter", value: "courier" }
    ];

    // Emojis list
    const emojiList = [
        "😀", "😂", "🤣", "😍", "😎", "🥳", "😭", "🤔",
        "👍", "❤️", "🔥", "✨", "🎉", "💯", "🙌", "👏",
        "💪", "🙏", "🎂", "🎁", "🌟", "⭐", "💫", "✅"
    ];

    // Stickers
    const stickers = [
        "🎨", "🎭", "🎪", "🎬", "🎤", "🎧", "🎼", "🎹",
        "📷", "📸", "🎥", "📺", "🎮", "🎯", "🎲", "🎰"
    ];

    // Locations
    const locations = [
        "New York City, NY",
        "Los Angeles, CA",
        "London, UK",
        "Paris, France",
        "Tokyo, Japan",
        "Dubai, UAE",
        "Sydney, Australia",
        "Singapore"
    ];

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

    const handleClose = () => {
        setMediaUri(null);
        setTextElements([]);
        setDrawingPaths([]);
        setEmojis([]);
        setSelectedLocation(null);
        navigation.goBack();
    };

    // ========== DRAW TOOL ==========
    const handleDrawOpen = () => {
        setShowDrawTool(true);
        setCurrentPath([]);
    };

    const handleDrawDone = () => {
        if (currentPath.length > 0) {
            setDrawingPaths([...drawingPaths, {
                id: Date.now(),
                path: currentPath,
                color: selectedColor,
                size: brushSize
            }]);
        }
        setShowDrawTool(false);
        setCurrentPath([]);
    };

    const startDrawing = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath([{ x: locationX, y: locationY }]);
    };

    const continueDrawing = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        setCurrentPath([...currentPath, { x: locationX, y: locationY }]);
    };

    // ========== TEXT TOOL ==========
    const handleTextOpen = () => {
        setTextInput("");
        setShowTextTool(true);
    };

    const handleTextDone = () => {
        if (textInput.trim()) {
            setTextElements([...textElements, {
                id: Date.now(),
                text: textInput,
                font: selectedFont,
                size: textSize,
                color: textColor,
                x: 150,
                y: 300
            }]);
        }
        setShowTextTool(false);
        setTextInput("");
    };

    // ========== STICKER/EMOJI TOOL ==========
    const handleStickerOpen = () => {
        setShowStickerTool(true);
    };

    const handleEmojiSelect = (emoji) => {
        setEmojis([...emojis, {
            id: Date.now(),
            emoji: emoji,
            x: 150,
            y: 300,
            size: 60
        }]);
        setShowStickerTool(false);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setShowStickerTool(false);
    };

    // ========== SHARE ==========
    const handleShareButton = () => {
        setShowShareOptions(true);
    };

    const shareToYourStory = () => {
        alert("Shared to Your Story!");
        setShowShareOptions(false);
        navigation.goBack();
    };

    const shareToCloseFriends = () => {
        alert("Shared to Close Friends!");
        setShowShareOptions(false);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* MEDIA PREVIEW WITH OVERLAYS */}
            <View style={styles.storyCanvas}>
                {mediaUri ? (
                    <Image source={{ uri: mediaUri }} style={styles.media} />
                ) : (
                    <View style={styles.emptyPreview}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>Capture or upload a story</Text>
                    </View>
                )}

                {/* RENDER DRAWINGS */}
                {drawingPaths.map((drawing) => (
                    <DrawingPath key={drawing.id} drawing={drawing} />
                ))}

                {/* RENDER TEXT ELEMENTS */}
                {textElements.map((textEl) => (
                    <DraggableText
                        key={textEl.id}
                        textElement={textEl}
                        onDragStart={() => setShowTrash(true)}
                        onDragEnd={() => setShowTrash(false)}
                        onDelete={(id) => {
                            setTextElements(textElements.filter(t => t.id !== id));
                            setShowTrash(false);
                        }}
                        onUpdate={(id, newX, newY) => {
                            setTextElements(textElements.map(t =>
                                t.id === id ? { ...t, x: newX, y: newY } : t
                            ));
                        }}
                    />
                ))}

                {/* RENDER EMOJIS */}
                {emojis.map((emojiObj) => (
                    <DraggableEmoji
                        key={emojiObj.id}
                        emojiObj={emojiObj}
                        onDragStart={() => setShowTrash(true)}
                        onDragEnd={() => setShowTrash(false)}
                        onDelete={(id) => {
                            setEmojis(emojis.filter(e => e.id !== id));
                            setShowTrash(false);
                        }}
                        onUpdate={(id, newX, newY) => {
                            setEmojis(emojis.map(e =>
                                e.id === id ? { ...e, x: newX, y: newY } : e
                            ));
                        }}
                    />
                ))}

                {/* LOCATION TAG */}
                {selectedLocation && (
                    <View style={styles.locationTag}>
                        <Ionicons name="location" size={16} color="#fff" />
                        <Text style={styles.locationTagText}>{selectedLocation}</Text>
                    </View>
                )}

                {/* TRASH BIN (shows when dragging) */}
                {showTrash && (
                    <View style={styles.trashBin}>
                        <Ionicons name="trash-outline" size={32} color="#fff" />
                        <Text style={styles.trashText}>Drag here to delete</Text>
                    </View>
                )}
            </View>

            {/* TOP TOOLBAR */}
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleClose}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>

                <View style={styles.rightIconsContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleDrawOpen}>
                        <MaterialCommunityIcons name="draw" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleTextOpen}>
                        <Feather name="type" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleStickerOpen}>
                        <Ionicons name="happy-outline" size={24} color="#fff" />
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
                        onPress={handleShareButton}>
                        <Ionicons name="add-circle" size={20} color="#fff" />
                        <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.nextButtonOuter}
                        onPress={handleShareButton}>
                        <Ionicons name="arrow-forward" size={22} color="#000" />
                    </TouchableOpacity>
                </View>
            )}

            {/* ==================== DRAW TOOL MODAL ==================== */}
            <Modal
                visible={showDrawTool}
                animationType="slide"
                transparent={false}>
                <View style={styles.toolFullScreen}>

                    <View style={styles.toolHeader}>
                        <TouchableOpacity onPress={() => setShowDrawTool(false)}>
                            <Ionicons name="arrow-back" size={28} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.toolTitle}>Draw</Text>
                        <TouchableOpacity onPress={handleDrawDone}>
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={styles.canvasArea}
                        onStartShouldSetResponder={() => true}
                        onResponderGrant={startDrawing}
                        onResponderMove={continueDrawing}>

                        {mediaUri && (
                            <Image source={{ uri: mediaUri }} style={styles.canvasImage} />
                        )}

                        {/* Render current drawing */}
                        {currentPath.map((point, index) => (
                            index > 0 && (
                                <View
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        left: point.x,
                                        top: point.y,
                                        width: brushSize,
                                        height: brushSize,
                                        borderRadius: brushSize / 2,
                                        backgroundColor: selectedColor
                                    }}
                                />
                            )
                        ))}
                    </View>

                    <View style={styles.colorPickerContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.colorScroll}>
                            {colors.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.selectedColorCircle
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.brushSizeContainer}>
                        <Text style={styles.brushLabel}>Brush Size: {brushSize}px</Text>
                        <View style={styles.brushSizeButtons}>
                            <TouchableOpacity
                                style={styles.sizeButton}
                                onPress={() => setBrushSize(Math.max(1, brushSize - 1))}>
                                <Text style={styles.sizeButtonText}>-</Text>
                            </TouchableOpacity>

                            <View style={styles.sizePreview}>
                                <View style={[
                                    styles.brushPreview,
                                    {
                                        width: brushSize * 2,
                                        height: brushSize * 2,
                                        backgroundColor: selectedColor
                                    }
                                ]} />
                            </View>

                            <TouchableOpacity
                                style={styles.sizeButton}
                                onPress={() => setBrushSize(Math.min(20, brushSize + 1))}>
                                <Text style={styles.sizeButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ==================== TEXT TOOL MODAL ==================== */}
            <Modal
                visible={showTextTool}
                animationType="slide"
                transparent={false}>
                <View style={styles.toolFullScreen}>

                    <View style={styles.toolHeader}>
                        <TouchableOpacity onPress={() => setShowTextTool(false)}>
                            <Ionicons name="arrow-back" size={28} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.toolTitle}>Add Text</Text>
                        <TouchableOpacity onPress={handleTextDone}>
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textPreviewArea}>
                        <TextInput
                            style={[
                                styles.liveTextInput,
                                {
                                    fontSize: textSize,
                                    color: textColor,
                                    fontFamily: selectedFont
                                }
                            ]}
                            placeholder="Type something..."
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            value={textInput}
                            onChangeText={setTextInput}
                            multiline
                            textAlign="center"
                            autoFocus
                        />
                    </View>

                    <View style={styles.fontContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.fontScroll}>
                            {fonts.map((font, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.fontButton,
                                        selectedFont === font.value && styles.selectedFont
                                    ]}
                                    onPress={() => setSelectedFont(font.value)}>
                                    <Text style={[
                                        styles.fontButtonText,
                                        { fontFamily: font.value }
                                    ]}>
                                        {font.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.textSizeContainer}>
                        <Text style={styles.brushLabel}>Text Size: {textSize}px</Text>
                        <View style={styles.brushSizeButtons}>
                            <TouchableOpacity
                                style={styles.sizeButton}
                                onPress={() => setTextSize(Math.max(16, textSize - 4))}>
                                <Text style={styles.sizeButtonText}>-</Text>
                            </TouchableOpacity>

                            <Text style={[styles.textSizePreview, { fontSize: Math.min(textSize, 40) }]}>Aa</Text>

                            <TouchableOpacity
                                style={styles.sizeButton}
                                onPress={() => setTextSize(Math.min(72, textSize + 4))}>
                                <Text style={styles.sizeButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.colorPickerContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.colorScroll}>
                            {colors.map((color, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color },
                                        textColor === color && styles.selectedColorCircle
                                    ]}
                                    onPress={() => setTextColor(color)}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* ==================== STICKER MODAL ==================== */}
            <Modal
                visible={showStickerTool}
                animationType="slide"
                transparent={true}>
                <View style={styles.stickerModalContainer}>
                    <TouchableOpacity
                        style={styles.stickerModalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowStickerTool(false)}
                    />

                    <View style={styles.stickerModalContent}>
                        <View style={styles.stickerTabs}>
                            <TouchableOpacity
                                style={[styles.stickerTab, stickerTab === "emoji" && styles.activeTab]}
                                onPress={() => setStickerTab("emoji")}>
                                <Ionicons
                                    name="happy-outline"
                                    size={24}
                                    color={stickerTab === "emoji" ? "#000" : "#999"}
                                />
                                <Text style={[styles.tabText, stickerTab === "emoji" && styles.activeTabText]}>
                                    Emoji
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.stickerTab, stickerTab === "sticker" && styles.activeTab]}
                                onPress={() => setStickerTab("sticker")}>
                                <Ionicons
                                    name="images-outline"
                                    size={24}
                                    color={stickerTab === "sticker" ? "#000" : "#999"}
                                />
                                <Text style={[styles.tabText, stickerTab === "sticker" && styles.activeTabText]}>
                                    Sticker
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.stickerTab, stickerTab === "location" && styles.activeTab]}
                                onPress={() => setStickerTab("location")}>
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color={stickerTab === "location" ? "#000" : "#999"}
                                />
                                <Text style={[styles.tabText, stickerTab === "location" && styles.activeTabText]}>
                                    Location
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.stickerContent}>
                            {stickerTab === "emoji" && (
                                <View style={styles.emojiGrid}>
                                    {emojiList.map((emoji, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.emojiItem}
                                            onPress={() => handleEmojiSelect(emoji)}>
                                            <Text style={styles.emojiText}>{emoji}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {stickerTab === "sticker" && (
                                <View style={styles.emojiGrid}>
                                    {stickers.map((sticker, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.emojiItem}
                                            onPress={() => handleEmojiSelect(sticker)}>
                                            <Text style={styles.stickerText}>{sticker}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {stickerTab === "location" && (
                                <View style={styles.locationList}>
                                    {locations.map((location, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.locationItem}
                                            onPress={() => handleLocationSelect(location)}>
                                            <Ionicons name="location" size={20} color="#0095f6" />
                                            <Text style={styles.locationText}>{location}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* ==================== SHARE MODAL ==================== */}
            <Modal
                visible={showShareOptions}
                animationType="slide"
                transparent={true}>
                <View style={styles.shareModalContainer}>
                    <TouchableOpacity
                        style={styles.shareModalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowShareOptions(false)}
                    />

                    <View style={styles.shareModalContent}>
                        <Text style={styles.shareModalTitle}>Share Story</Text>

                        <TouchableOpacity
                            style={styles.shareOption}
                            onPress={shareToYourStory}>
                            <View style={styles.shareOptionLeft}>
                                <View style={styles.yourStoryIcon}>
                                    <Ionicons name="add-circle" size={24} color="#0095f6" />
                                </View>
                                <Text style={styles.shareOptionText}>Your Story</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.shareOption}
                            onPress={shareToCloseFriends}>
                            <View style={styles.shareOptionLeft}>
                                <View style={styles.closeFriendsIcon}>
                                    <Ionicons name="star" size={20} color="#fff" />
                                </View>
                                <View>
                                    <Text style={styles.shareOptionText}>Close Friends</Text>
                                    <Text style={styles.shareOptionSubtext}>Share with close friends only</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowShareOptions(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

// ========== DRAGGABLE TEXT COMPONENT ==========
const DraggableText = ({ textElement, onDragStart, onDragEnd, onDelete, onUpdate }) => {
    const pan = new Animated.ValueXY({ x: textElement.x, y: textElement.y });

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            onDragStart();
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false
        }),
        onPanResponderRelease: (evt, gestureState) => {
            const newX = textElement.x + gestureState.dx;
            const newY = textElement.y + gestureState.dy;

            // Check if dropped in trash area (top 100px)
            if (newY < 100) {
                onDelete(textElement.id);
            } else {
                onUpdate(textElement.id, newX, newY);
            }
            onDragEnd();
        }
    });

    return (
        <Animated.View
            style={[
                styles.draggableText,
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }]
                }
            ]}
            {...panResponder.panHandlers}>
            <Text style={[
                styles.storyText,
                {
                    fontSize: textElement.size,
                    color: textElement.color,
                    fontFamily: textElement.font
                }
            ]}>
                {textElement.text}
            </Text>
        </Animated.View>
    );
};

// ========== DRAGGABLE EMOJI COMPONENT ==========
const DraggableEmoji = ({ emojiObj, onDragStart, onDragEnd, onDelete, onUpdate }) => {
    const pan = new Animated.ValueXY({ x: emojiObj.x, y: emojiObj.y });

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            onDragStart();
        },
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
            useNativeDriver: false
        }),
        onPanResponderRelease: (evt, gestureState) => {
            const newX = emojiObj.x + gestureState.dx;
            const newY = emojiObj.y + gestureState.dy;

            if (newY < 100) {
                onDelete(emojiObj.id);
            } else {
                onUpdate(emojiObj.id, newX, newY);
            }
            onDragEnd();
        }
    });

    return (
        <Animated.View
            style={[
                styles.draggableEmoji,
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }]
                }
            ]}
            {...panResponder.panHandlers}>
            <Text style={{ fontSize: emojiObj.size }}>
                {emojiObj.emoji}
            </Text>
        </Animated.View>
    );
};

// ========== DRAWING PATH COMPONENT ==========
const DrawingPath = ({ drawing }) => {
    return (
        <>
            {drawing.path.map((point, index) => (
                index > 0 && (
                    <View
                        key={`${drawing.id}-${index}`}
                        style={{
                            position: 'absolute',
                            left: point.x,
                            top: point.y,
                            width: drawing.size,
                            height: drawing.size,
                            borderRadius: drawing.size / 2,
                            backgroundColor: drawing.color
                        }}
                    />
                )
            ))}
        </>
    );
};

export default CreateStoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    storyCanvas: {
        flex: 1,
        position: 'relative'
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

    // Draggable elements
    draggableText: {
        position: 'absolute',
        padding: 10
    },
    storyText: {
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    draggableEmoji: {
        position: 'absolute'
    },

    // Location tag
    locationTag: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    locationTagText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '600'
    },

    // Trash bin
    trashBin: {
        position: 'absolute',
        top: 20,
        left: '50%',
        marginLeft: -75,
        width: 150,
        height: 80,
        backgroundColor: 'rgba(255,59,48,0.9)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    trashText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
        fontWeight: '600'
    },

    topBar: {
        position: "absolute",
        top: 60,
        left: 15,
        right: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10
    },
    rightIconsContainer: {
        flexDirection: "row"
    },
    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12
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
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25
    },
    shareText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600",
        fontSize: 15
    },
    nextButtonOuter: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },

    toolFullScreen: {
        flex: 1,
        backgroundColor: "#000"
    },
    toolHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    toolTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600"
    },
    doneText: {
        color: "#0095f6",
        fontSize: 16,
        fontWeight: "600"
    },

    canvasArea: {
        flex: 1,
        backgroundColor: "#1a1a1a"
    },
    canvasImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },

    colorPickerContainer: {
        paddingVertical: 15,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    colorScroll: {
        paddingHorizontal: 20,
        alignItems: "center"
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 8,
        borderWidth: 2,
        borderColor: "#333"
    },
    selectedColorCircle: {
        borderColor: "#fff",
        borderWidth: 3
    },

    brushSizeContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    brushLabel: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center"
    },
    brushSizeButtons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    sizeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center"
    },
    sizeButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    sizePreview: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20
    },
    brushPreview: {
        borderRadius: 50
    },

    textPreviewArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
        padding: 20
    },
    liveTextInput: {
        width: "100%",
        padding: 20,
        fontWeight: "bold",
        color: '#fff'
    },
    fontContainer: {
        paddingVertical: 15,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    fontScroll: {
        paddingHorizontal: 20
    },
    fontButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#333",
        marginHorizontal: 5
    },
    selectedFont: {
        backgroundColor: "#0095f6"
    },
    fontButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600"
    },
    textSizeContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "rgba(0,0,0,0.9)"
    },
    textSizePreview: {
        color: "#fff",
        marginHorizontal: 30,
        fontWeight: "bold"
    },

    stickerModalContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    stickerModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    stickerModalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "70%"
    },
    stickerTabs: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0"
    },
    stickerTab: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: "transparent"
    },
    activeTab: {
        borderBottomColor: "#000"
    },
    tabText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#999"
    },
    activeTabText: {
        color: "#000",
        fontWeight: "600"
    },
    stickerContent: {
        padding: 15
    },
    emojiGrid: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    emojiItem: {
        width: "20%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emojiText: {
        fontSize: 32
    },
    stickerText: {
        fontSize: 40
    },
    locationList: {
        paddingBottom: 20
    },
    locationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0"
    },
    locationText: {
        marginLeft: 12,
        fontSize: 16,
        color: "#000"
    },

    shareModalContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    shareModalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    shareModalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40
    },
    shareModalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: "#000"
    },
    shareOption: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0"
    },
    shareOptionLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    yourStoryIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#e8f5ff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    closeFriendsIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    shareOptionText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000"
    },
    shareOptionSubtext: {
        fontSize: 12,
        color: "#666",
        marginTop: 2
    },
    cancelButton: {
        marginTop: 20,
        paddingVertical: 15,
        alignItems: "center"
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#0095f6"
    }
});