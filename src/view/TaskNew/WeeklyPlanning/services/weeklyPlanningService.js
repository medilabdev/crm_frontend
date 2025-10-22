/**
 * Weekly Planning API Service
 * Handles all HTTP requests to the backend API following existing project patterns
 */

import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

// Get authentication token from localStorage (following existing pattern)
const getToken = () => localStorage.getItem('token');

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add auth token to all requests
const getAuthHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found.');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Branch Service
 */
export const branchService = {
  /**
   * Get all branches for dropdown selection
   */
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.BRANCHES, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  },

  /**
   * Create new branch
   */
  async create(branchData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.BRANCHES, branchData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating branch:', error);
      throw error;
    }
  }
};

/**
 * Weekly Plan Master Service
 */
export const weeklyPlanMasterService = {
  /**
   * Get all weekly plan masters for CreatableSelect
   */
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.PLAN_MASTERS, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly plan masters:', error);
      throw error;
    }
  },

  /**
   * Create new weekly plan master (from CreatableSelect)
   */
  async create(planData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.PLAN_MASTERS, planData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating weekly plan master:', error);
      throw error;
    }
  },

  /**
   * Update weekly plan master
   */
  async update(uid, planData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.WEEKLY_PLANNING.PLAN_MASTERS}/${uid}`, planData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating weekly plan master:', error);
      throw error;
    }
  },

  /**
   * Delete weekly plan master (soft delete)
   */
  async delete(uid) {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.WEEKLY_PLANNING.PLAN_MASTERS}/${uid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting weekly plan master:', error);
      throw error;
    }
  }
};

/**
 * Weekly Planning Service
 */
export const weeklyPlanningService = {
  /**
   * Get all weekly plannings with optional filters
   */
  async getAll(filters = {}) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.PLANNINGS, {
        headers: getAuthHeaders(),
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly plannings:', error);
      throw error;
    }
  },

  /**
   * Get specific weekly planning by UID
   */
  async getById(uid) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.WEEKLY_PLANNING.PLANNINGS}/${uid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly planning:', error);
      throw error;
    }
  },

  /**
   * Create new weekly planning
   */
  async create(planningData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.PLANNINGS, planningData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating weekly planning:', error);
      throw error;
    }
  },

  /**
   * Update weekly planning
   */
  async update(uid, planningData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.WEEKLY_PLANNING.PLANNINGS}/${uid}`, planningData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating weekly planning:', error);
      throw error;
    }
  },

  /**
   * Delete weekly planning
   */
  async delete(uid) {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.WEEKLY_PLANNING.PLANNINGS}/${uid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting weekly planning:', error);
      throw error;
    }
  }
};

/**
 * Weekly Planning Week Service
 */
export const weeklyPlanningWeekService = {
  /**
   * Get all weeks for a planning
   */
  async getAll(planningUid) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.WEEKS(planningUid), {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weeks:', error);
      throw error;
    }
  },

  /**
   * Get specific week
   */
  async getById(planningUid, weekUid) {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.WEEKLY_PLANNING.WEEKS(planningUid)}/${weekUid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching week:', error);
      throw error;
    }
  },

  /**
   * Create new week
   */
  async create(planningUid, weekData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.WEEKS(planningUid), weekData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating week:', error);
      throw error;
    }
  },

  /**
   * Update week
   */
  async update(planningUid, weekUid, weekData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.WEEKLY_PLANNING.WEEKS(planningUid)}/${weekUid}`, weekData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating week:', error);
      throw error;
    }
  },

  /**
   * Delete week
   */
  async delete(planningUid, weekUid) {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.WEEKLY_PLANNING.WEEKS(planningUid)}/${weekUid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting week:', error);
      throw error;
    }
  }
};

/**
 * Weekly Planning Day Service
 */
export const weeklyPlanningDayService = {
  /**
   * Get all days for a week
   */
  async getAll(planningUid, weekUid) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.DAYS(planningUid, weekUid), {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching days:', error);
      throw error;
    }
  },

  /**
   * Create new day
   */
  async create(planningUid, weekUid, dayData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.DAYS(planningUid, weekUid), dayData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating day:', error);
      throw error;
    }
  },

  /**
   * Bulk create days
   */
  async bulkCreate(planningUid, weekUid, daysData) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.WEEKLY_PLANNING.DAYS(planningUid, weekUid)}/bulk`, daysData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error bulk creating days:', error);
      throw error;
    }
  },

  /**
   * Update day
   */
  async update(planningUid, weekUid, dayUid, dayData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.WEEKLY_PLANNING.DAYS(planningUid, weekUid)}/${dayUid}`, dayData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating day:', error);
      throw error;
    }
  }
};

/**
 * Weekly Planning Detail Service
 */
export const weeklyPlanningDetailService = {
  /**
   * Get all details for a day
   */
  async getAll(planningUid, weekUid, dayUid) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.DETAILS(planningUid, weekUid, dayUid), {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching planning details:', error);
      throw error;
    }
  },

  /**
   * Create new planning detail
   */
  async create(planningUid, weekUid, dayUid, detailData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.DETAILS(planningUid, weekUid, dayUid), detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating planning detail:', error);
      throw error;
    }
  },

  /**
   * Update planning detail
   */
  async update(planningUid, weekUid, dayUid, detailUid, detailData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.WEEKLY_PLANNING.DETAILS(planningUid, weekUid, dayUid)}/${detailUid}`, detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating planning detail:', error);
      throw error;
    }
  },

  /**
   * Delete planning detail
   */
  async delete(planningUid, weekUid, dayUid, detailUid) {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.WEEKLY_PLANNING.DETAILS(planningUid, weekUid, dayUid)}/${detailUid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting planning detail:', error);
      throw error;
    }
  }
};

/**
 * Outside Planning Detail Service
 */
export const outsidePlanningDetailService = {
  /**
   * Get all outside details for a day
   */
  async getAll(planningUid, weekUid, dayUid) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.OUTSIDE_DETAILS(planningUid, weekUid, dayUid), {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching outside planning details:', error);
      throw error;
    }
  },

  /**
   * Create new outside planning detail
   */
  async create(planningUid, weekUid, dayUid, detailData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.OUTSIDE_DETAILS(planningUid, weekUid, dayUid), detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating outside planning detail:', error);
      throw error;
    }
  },

  /**
   * Update outside planning detail
   */
  async update(planningUid, weekUid, dayUid, detailUid, detailData) {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.WEEKLY_PLANNING.OUTSIDE_DETAILS(planningUid, weekUid, dayUid)}/${detailUid}`, detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating outside planning detail:', error);
      throw error;
    }
  },

  /**
   * Delete outside planning detail
   */
  async delete(planningUid, weekUid, dayUid, detailUid) {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.WEEKLY_PLANNING.OUTSIDE_DETAILS(planningUid, weekUid, dayUid)}/${detailUid}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting outside planning detail:', error);
      throw error;
    }
  }
};

/**
 * Report Suggestions Service
 */
export const reportSuggestionsService = {
  /**
   * Get report suggestions for user
   */
  async getSuggestions() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.REPORT_SUGGESTIONS, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching report suggestions:', error);
      throw error;
    }
  },

  /**
   * Track usage of report text
   */
  async addUsage(reportText) {
    try {
      const response = await apiClient.post(`${API_ENDPOINTS.WEEKLY_PLANNING.REPORT_SUGGESTIONS}/usage`, {
        report_text: reportText
      }, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error tracking report usage:', error);
      throw error;
    }
  }
};
