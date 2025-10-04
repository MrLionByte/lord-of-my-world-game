import apiClient from './axios';
import { API_ENDPOINTS } from './config';

export const storyService = {
  createStory: async (theme) => {
    const response = await apiClient.post(API_ENDPOINTS.CREATE_STORY, { theme });
    return response.data;
  },

  getJobStatus: async (jobId) => {
    const response = await apiClient.get(API_ENDPOINTS.GET_JOB_STATUS(jobId));
    return response.data;
  },

  getStory: async (storyId) => {
    const response = await apiClient.get(API_ENDPOINTS.GET_STORY(storyId));
    return response.data;
  },
};
