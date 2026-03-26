import apiClient from './apiClient';

/**
 * Service to handle event-related API calls
 */
const eventService = {
  /**
   * Fetch all events managed by the current logged-in user
   * @returns {Promise<Array>} List of events
   */
  getMyEvents: async () => {
    try {
      const response = await apiClient.get('/events/managed/me');
      return response.data;
    } catch (error) {
      console.error('Error in getMyEvents:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Fetch a single event by ID with full details
   * @param {string} eventId 
   * @returns {Promise<Object>} Event details
   */
  getEventById: async (eventId) => {
    try {
      const response = await apiClient.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error in getEventById for ${eventId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Fetch all event categories
   * @returns {Promise<Array>} List of categories
   */
  getCategories: async () => {
    try {
      const response = await apiClient.get('/events/categories');
      return response.data;
    } catch (error) {
      console.error('Error in getCategories:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Create a new event with its ticket tiers
   * @param {Object} eventData 
   * @returns {Promise<Object>} Created event data
   */
  createEvent: async (eventData) => {
    try {
      const response = await apiClient.post('/events/create', eventData);
      return response.data;
    } catch (error) {
      console.error('Error in createEvent:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Search for events by query string
   * @param {string} query 
   * @returns {Promise<Array>} List of matching events
   */
  searchEvents: async (query) => {
    try {
      const response = await apiClient.get(`/events/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error in searchEvents:', error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Upload an event cover image
   * @param {string} userId 
   * @param {Object} file { uri, name, type }
   * @returns {Promise<string>} Public URL of the uploaded image
   */
  uploadEventImage: async (userId, file) => {
    try {
      // In a real app, this would perform a multipart upload to Supabase Storage
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name || `event_${Date.now()}.jpg`,
        type: file.type || 'image/jpeg',
      });

      // Simulation: Return the local URI for now
      console.warn("Event image upload is a simulated success for demo purposes.");
      return file.uri;
    } catch (error) {
      console.error('Error in uploadEventImage:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default eventService;
