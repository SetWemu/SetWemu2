import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const TestScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SetWemu Test Lab</Text>
        <Text style={styles.subtitle}>Screen Testing Environment</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EventDetail')}
        >
          <Text style={styles.buttonText}>Event Detail Screen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tickets</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyTickets')}
        >
          <Text style={styles.buttonText}>My Tickets Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TicketDetail')}
        >
          <Text style={styles.buttonText}>Ticket Detail Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.buttonText}>Checkout Screen</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.buttonText}>Favorites Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Following')}
        >
          <Text style={styles.buttonText}>Following Screen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071B2E',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0E2A47',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TestScreen;