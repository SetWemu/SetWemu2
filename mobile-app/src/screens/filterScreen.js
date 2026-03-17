import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Animated,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
    bg: { primary: '#141416', card: '#1C1C1E', elevated: '#242428' },
    blue: {
        light: '#ADF3FF',
        brand: '#4CC1D4',
        glow: 'rgba(173,243,255,0.10)',
        border: 'rgba(173,243,255,0.22)'
    },
    text: {
        primary: '#F2F2F7',
        secondary: '#ABABAB',
        tertiary: '#6B6B6B',
        inverse: '#141416'
    },
    border: {
        subtle: 'rgba(255,255,255,0.06)',
        light: 'rgba(255,255,255,0.10)'
    },
    error: '#FF453A'
};

const FilterModal = ({ visible, onClose, onApply }) => {

    const [selectedDate, setSelectedDate] = useState("Anytime");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState(0);

    const slideAnim = useState(new Animated.Value(-400))[0];

    React.useEffect(() => {
        if (visible) {
            slideAnim.setValue(-400);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const dateOptions = ["Anytime", "Today", "Tomorrow", "This Weekend", "Next Week"];
    const categoryOptions = [
        "Live Music", "Nightlife", "Food & Drink", "Arts & Culture",
        "Sports", "Networking", "Comedy", "Health & Wellness"
    ];

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

        const filters = {
            date: selectedDate,
            categories: selectedCategories,
            price: price,
        };

        console.log("APPLY FILTERS:", filters);

        if (onApply) {
            onApply(filters);
        }

        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="none">

            <View style={styles.overlay}>

                {/* CLICK OUTSIDE */}
                <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />

                <Animated.View style={[
                    styles.modal,
                    { transform: [{ translateY: slideAnim }] }
                ]}>

                    {/* DRAG HANDLE */}
                    <View style={styles.handle} />

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

                        {/* PRICE */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Price: Rs {price === 0 ? "Free" : price}
                            </Text>

                            <Slider
                                minimumValue={0}
                                maximumValue={5000}
                                step={500}
                                value={price}
                                onValueChange={(val) => setPrice(val)}
                                minimumTrackTintColor={COLORS.blue.brand}
                                maximumTrackTintColor={COLORS.border.light}
                                thumbTintColor={COLORS.blue.light}
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
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "70%",
        backgroundColor: COLORS.bg.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.border.subtle,
    },

    handle: {
        width: 40,
        height: 5,
        backgroundColor: COLORS.border.light,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 10
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10
    },

    title: {
        color: COLORS.text.primary,
        fontSize: 18,
        fontWeight: "700"
    },

    reset: {
        color: COLORS.error,
        fontSize: 14
    },

    cancel: {
        color: COLORS.text.secondary,
        fontSize: 14
    },

    section: {
        paddingHorizontal: 20,
        paddingVertical: 12
    },

    sectionTitle: {
        color: COLORS.text.primary,
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10
    },

    pills: {
        flexDirection: "row",
        flexWrap: "wrap"
    },

    pill: {
        backgroundColor: COLORS.bg.card,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: COLORS.border.subtle
    },

    selected: {
        backgroundColor: COLORS.blue.glow,
        borderColor: COLORS.blue.border
    },

    pillText: {
        color: COLORS.text.secondary,
        fontSize: 13
    },

    selectedText: {
        color: COLORS.blue.light,
        fontWeight: "600"
    },

    footer: {
        padding: 20
    },

    applyBtn: {
        backgroundColor: COLORS.blue.brand,
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: "center",
        shadowColor: COLORS.blue.brand,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },

    applyText: {
        color: COLORS.text.inverse,
        fontSize: 16,
        fontWeight: "900"
    },

    priceLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5
    },

    priceText: {
        color: COLORS.text.tertiary,
        fontSize: 12
    }

});