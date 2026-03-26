import apiClient from './apiClient';

/**
 * Service to handle profile-related API calls
 */
const profileService = {
  /**
   * Fetch a user's profile by ID
   * @param {string} userId 
   * @returns {Promise<Object>} Profile data
   */
  getProfile: async (userId) => {
    try {
      const response = await apiClient.get(`/profiles/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error in getProfile for ${userId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Update the current user's profile
   * @param {string} userId 
   * @param {Object} profileData 
   * @returns {Promise<Object>} Updated profile data
   */
  updateProfile: async (userId, profileData) => {
    try {
      const response = await apiClient.patch(`/profiles/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error(`Error in updateProfile for ${userId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Upload a profile photo to Supabase Storage
   * Note: This assumes the 'avatars' bucket exists and is public
   * @param {string} userId 
   * @param {Object} file { uri, name, type }
   * @returns {Promise<string>} Public URL of the uploaded image
   */
  uploadAvatar: async (userId, file) => {
    try {
      // In a real app, you might use the Supabase client directly for storage 
      // or a dedicated backend endpoint that handles the multipart upload.
      // For this implementation, we assume a backend route or direct Supabase usage.
      
      // Since we don't have a specific 'upload' endpoint in the backend yet,
      // and we want to keep it simple, we'll suggest using a placeholder logic 
      // or a simple base64/form-data upload.
      
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name || `avatar_${userId}.jpg`,
        type: file.type || 'image/jpeg',
      });

      // Dummy implementation for now - in a real scenario, this would be:
      // const response = await apiClient.post(`/profiles/${userId}/avatar`, formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });
      // return response.data.url;

      // For now, return the URI as if it was uploaded
      console.warn("Avatar upload is a simulated success for demo purposes.");
      return file.uri; 
    } catch (error) {
      console.error('Error in uploadAvatar:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default profileService;
