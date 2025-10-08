export const API_BASE_URL = '';

export const API_ENDPOINTS = {
  CREATE_STORY: '/stories/create',
  GET_JOB_STATUS: (jobId) => `/jobs/${jobId}`,
  GET_STORY: (storyId) => `/stories/${storyId}/complete`,
};
