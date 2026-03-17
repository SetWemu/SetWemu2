import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Animated,
    Dimensions
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const FilterModal = ({ visible, onClose, onApply }) => {

    // --- STATE ---
    const [selectedDate, setSelectedDate] = useState("Anytime");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(0);

    // Animation for TOP SLIDE
    const slideAnim = useState(new Animated.Value(-height))[0];

    React.useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // --- OPTIONS ---
    const dateOptions = ["Anytime", "Today", "Tomorrow", "This Weekend", "Next Week"];
    const categoryOptions = [
        "Live Music",
        "Nightlife",
        "Food & Drink",
        "Arts & Culture",
        "Sports",
        "Networking",
        "Comedy",
        "Health & Wellness"
    ];

    // --- FUNCTIONS ---
    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleReset = () => {
        setSelectedDate("Anytime");
        setSelectedCategories([]);
        setPrice(0);
    };

    const handleApply = () => {
        onApply({
            date: selectedDate,
            categories: selectedCategories,
            price: price,
        });
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="none">

            <View style={styles.overlay}>

                <Animated.View
                    style={[
                        styles.modal,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >

                    {/* HEADER */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleReset}>
                            <Text style={styles.reset}>Reset</Text>
                        </TouchableOpacity>

                        <Text style={styles.title}>Filters</Text>

                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* DATE */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>When are you going?</Text>

                            <View style={styles.pills}>
                                {dateOptions.map((d) => (
                                    <TouchableOpacity
                                        key={d}
                                        style={[
                                            styles.pill,
                                            selectedDate === d && styles.selected
                                        ]}
                                        onPress={() => setSelectedDate(d)}
                                    >
                                        <Text style={[
                                            styles.pillText,
                                            selectedDate === d && styles.selectedText
                                        ]}>
                                            {d}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* CATEGORY */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Categories</Text>

                            <View style={styles.pills}>
                                {categoryOptions.map((c) => (
                                    <TouchableOpacity
                                        key={c}
                                        style={[
                                            styles.pill,
                                            selectedCategories.includes(c) && styles.selected
                                        ]}
                                        onPress={() => toggleCategory(c)}
                                    >
                                        <Text style={[
                                            styles.pillText,
                                            selectedCategories.includes(c) && styles.selectedText
                                        ]}>
                                            {c}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* PRICE SLIDER */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Price: Rs {price}</Text>

                            <Slider
                                minimumValue={0}
                                maximumValue={5000}
                                step={500}
                                value={price}
                                onValueChange={(val) => setPrice(val)}
                                minimumTrackTintColor="#4a86c4"
                                maximumTrackTintColor="#1E3A5F"
                                thumbTintColor="#ffffff"
                            />

                            <View style={styles.priceLabels}>
                                <Text style={styles.priceText}>Free</Text>
                                <Text style={styles.priceText}>5000+</Text>
                            </View>
                        </View>

                    </ScrollView>

                    {/* APPLY BUTTON */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                            <Text style={styles.applyText}>Show Results</Text>
                        </TouchableOpacity>
                    </View>

                    <SafeAreaView edges={["bottom"]} />

                </Animated.View>

            </View>
        </Modal>
    );
};

export default FilterModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)"
    },

    modal: {
        backgroundColor: "#071B2E",
        height: "100%",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingTop: 20
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10
    },

    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },

    reset: {
        color: "#ff4d4d"
    },

    cancel: {
        color: "#6b8cb3"
    },

    section: {
        padding: 20
    },

    sectionTitle: {
        color: "white",
        fontSize: 16,
        marginBottom: 10
    },

    pills: {
        flexDirection: "row",
        flexWrap: "wrap"
    },

    pill: {
        backgroundColor: "#0E2A47",
        padding: 10,
        borderRadius: 20,
        margin: 5
    },

    selected: {
        backgroundColor: "#2b5c8f"
    },

    pillText: {
        color: "#aaa"
    },

    selectedText: {
        color: "#fff"
    },

    footer: {
        padding: 20
    },

    applyBtn: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },

    applyText: {
        color: "#071B2E",
        fontWeight: "bold"
    },

    priceLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },

    priceText: {
        color: "#aaa"
    }

});
