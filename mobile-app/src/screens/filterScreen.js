import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    SafeAreaView,
} from "react-native";

const FilterModal = ({ visible, onClose, onApply }) => {
    // --- State for Filters ---
    const [selectedDate, setSelectedDate] = useState("Anytime");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("Any");

    // --- Filter Options ---
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
    const priceOptions = ["Any", "Free", "$", "$$", "$$$"];

    // --- Helper Functions ---
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
        setSelectedPrice("Any");
    };

    const handleApply = () => {
        if (onApply) {
            onApply({
                date: selectedDate,
                categories: selectedCategories,
                price: selectedPrice,
            });
        }
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>

                    {/* --- HEADER --- */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleReset} style={styles.headerButton}>
                            <Text style={styles.resetText}>Reset</Text>
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Filters</Text>

                        <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                            <Text style={styles.closeText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                    {/* --- FILTER SECTIONS --- */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                        {/* 1. Date Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>When are you going?</Text>
                            <View style={styles.pillContainer}>
                                {dateOptions.map((date) => (
                                    <TouchableOpacity
                                        key={date}
                                        style={[
                                            styles.pill,
                                            selectedDate === date && styles.pillSelected
                                        ]}
                                        onPress={() => setSelectedDate(date)}
                                    >
                                        <Text style={[
                                            styles.pillText,
                                            selectedDate === date && styles.pillTextSelected
                                        ]}>
                                            {date}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* 2. Category Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Categories</Text>
                            <View style={styles.pillContainer}>
                                {categoryOptions.map((category) => (
                                    <TouchableOpacity
                                        key={category}
                                        style={[
                                            styles.pill,
                                            selectedCategories.includes(category) && styles.pillSelected
                                        ]}
                                        onPress={() => toggleCategory(category)}
                                    >
                                        <Text style={[
                                            styles.pillText,
                                            selectedCategories.includes(category) && styles.pillTextSelected
                                        ]}>
                                            {category}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* 3. Price Section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Price</Text>
                            <View style={styles.pillContainer}>
                                {priceOptions.map((price) => (
                                    <TouchableOpacity
                                        key={price}
                                        style={[
                                            styles.pill,
                                            selectedPrice === price && styles.pillSelected
                                        ]}
                                        onPress={() => setSelectedPrice(price)}
                                    >
                                        <Text style={[
                                            styles.pillText,
                                            selectedPrice === price && styles.pillTextSelected
                                        ]}>
                                            {price}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={{ height: 40 }} />
                    </ScrollView>

                    {/* --- FOOTER / APPLY BUTTON --- */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                            <Text style={styles.applyButtonText}>Show Results</Text>
                        </TouchableOpacity>
                    </View>

                    <SafeAreaView edges={['bottom']} />
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#071B2E",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: "85%",
        overflow: "hidden",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#1E3A5F",
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    headerButton: {
        paddingVertical: 5,
    },
    resetText: {
        color: "#ff4d4d",
        fontSize: 16,
    },
    closeText: {
        color: "#6b8cb3",
        fontSize: 16,
    },

    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
    },

    pillContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    pill: {
        backgroundColor: "#0E2A47",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#1E3A5F",
        marginRight: 8,
        marginBottom: 8,
    },
    pillSelected: {
        backgroundColor: "#2b5c8f",
        borderColor: "#4a86c4",
    },
    pillText: {
        color: "#aaa",
        fontSize: 14,
        fontWeight: "500",
    },
    pillTextSelected: {
        color: "white",
        fontWeight: "600",
    },

    footer: {
        padding: 20,
        paddingBottom: 30,
        borderTopWidth: 0.5,
        borderTopColor: "#1E3A5F",
        backgroundColor: "#071B2E",
    },
    applyButton: {
        backgroundColor: "#ffffff",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    applyButtonText: {
        color: "#071B2E",
        fontSize: 16,
        fontWeight: "bold",
    },
});