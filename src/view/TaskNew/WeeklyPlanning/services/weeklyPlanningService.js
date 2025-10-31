import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

const getToken = () => localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

let lastGetAllTime = 0;
let lastGetAllCache = null;
const MIN_INTERVAL_MS = 1000; // 1 second

const rateLimitedGetAll = async (filters = {}) => {
  const now = Date.now();
  const isRecent = now - lastGetAllTime < MIN_INTERVAL_MS;

  if (isRecent && lastGetAllCache) {
    console.warn('⚡ Returning cached planning data (prevented spam)');
    return lastGetAllCache; // ✅ kirim data lama, bukan kosong
  }

  const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.PLANNINGS, {
    headers: getAuthHeaders(),
    params: filters,
  });

  lastGetAllTime = now;
  lastGetAllCache = response.data; // ✅ simpan data terakhir
  return response.data;
};



const getAuthHeaders = () => {
  const token = getToken();
  if (!token) {
    throw new Error('No authentication token found.');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const branchService = {
  
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


export const weeklyPlanMasterService = {
  
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

export const weeklyPlanningService = {
    async getAll(filters = {}) {
    try {
      const response = await rateLimitedGetAll(filters);
      return response;
    } catch (error) {
      console.error('Error fetching weekly plannings:', error);
      throw error;
    }
  },

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

export const weeklyPlanningWeekService = {
  
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

export const weeklyPlanningDayService = {
 
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
  },

  // Di weeklyPlanningDayService
  async toggleWorking(planningUid, weekUid, dayUid) {
      try {
          // Asumsi API_ENDPOINTS.WEEKLY_PLANNING.DAY_TOGGLE_WORKING(...) sudah dibuat
          const apiUrl = API_ENDPOINTS.WEEKLY_PLANNING.DAY_TOGGLE_WORKING(planningUid, weekUid, dayUid);
          const response = await apiClient.put(apiUrl, {}, { // Kirim body kosong jika tidak perlu data
              headers: getAuthHeaders() 
          });
          return response.data; // Harusnya berisi objek Day yang diupdate
      } catch (error) {
          console.error('Error toggling day working status:', error);
          throw error;
      }
  }
};

export const weeklyPlanningDetailService = {
  
  async getAll(planningUid, weekUid, dayUid) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.PLANNING_DETAILS(planningUid, weekUid, dayUid), {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching planning details:', error);
      throw error;
    }
  },

  async create(planningUid, weekUid, dayUid, detailData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.PLANNING_DETAILS(planningUid, weekUid, dayUid), detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating planning detail:', error);
      throw error;
    }
  },


  async update(planningUid, weekUid, dayUid, detailUid, detailData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.WEEKLY_PLANNING.PLANNING_DETAIL_ITEM(planningUid, weekUid, dayUid, detailUid), detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating planning detail:', error);
      throw error;
    }
  },

  async delete(planningUid, weekUid, dayUid, detailUid) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.WEEKLY_PLANNING.PLANNING_DETAIL_ITEM(planningUid, weekUid, dayUid, detailUid), {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting planning detail:', error);
      throw error;
    }
  }
};

export const outsidePlanningDetailService = {

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

  async update(planningUid, weekUid, dayUid, detailUid, detailData) {
    try {
      const response = await apiClient.put(API_ENDPOINTS.WEEKLY_PLANNING.OUTSIDE_DETAIL_ITEM(planningUid, weekUid, dayUid, detailUid), detailData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error updating outside planning detail:', error);
      throw error;
    }
  },

 
  async delete(planningUid, weekUid, dayUid, detailUid) {
    try {
      const apiUrl = API_ENDPOINTS.WEEKLY_PLANNING.OUTSIDE_DETAIL_ITEM(planningUid, weekUid, dayUid, detailUid);
      console.log(`Sending DELETE request to: ${apiClient.defaults.baseURL}${apiUrl}`); // Pastikan baseURL ada

      const response = await apiClient.delete(apiUrl, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      console.error('Error deleting outside planning detail:', error);
      throw error;
    }
  }
};

export const reportSuggestionsService = {
 
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

export const weeklyCategoryService = {
  async getAll() {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.CATEGORIES, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly categories:', error);
      throw error;
    }
  }
}

export const masterImportService = {
  async importExcel(fileData) {
    try {
      const headers = getAuthHeaders();
      const response = await apiClient.post(API_ENDPOINTS.WEEKLY_PLANNING.MASTER_IMPORT, fileData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error importing Excel file:', error);
      throw error;
    }
  },
};

export const planningRecapService = {
  async getRecap(month) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.WEEKLY_PLANNING.PLANNING_RECAP, {
        headers: getAuthHeaders(),
        params: { month: month }, // Kirim sebagai query param
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching planning recap:', error);
      throw error;
    }
  }
}


