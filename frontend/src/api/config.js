export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  CREATE_STORY: '/stories/create',
  GET_JOB_STATUS: (jobId) => `/jobs/${jobId}`,
  GET_STORY: (storyId) => `/stories/${storyId}/complete`,
};
