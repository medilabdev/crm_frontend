/**
 * Weekly Planning API Hook
 * Custom hook for managing API operations with loading, error states, and caching
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  branchService, 
  weeklyPlanMasterService, 
  weeklyPlanningService,
  weeklyPlanningWeekService,
  weeklyPlanningDayService,
  weeklyPlanningDetailService,
  outsidePlanningDetailService,
  reportSuggestionsService
} from '../services/weeklyPlanningService';

/**
 * Hook for managing API operations with consistent loading/error states
 */
export const useWeeklyPlanningAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Generic API call wrapper with loading/error handling
  const apiCall = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  }, []);

  // Branch operations
  const branches = {
    getAll: useCallback(() => apiCall(branchService.getAll), [apiCall]),
    create: useCallback((data) => apiCall(branchService.create, data), [apiCall])
  };

  // Weekly Plan Master operations
  const planMasters = {
    getAll: useCallback(() => apiCall(weeklyPlanMasterService.getAll), [apiCall]),
    create: useCallback((data) => apiCall(weeklyPlanMasterService.create, data), [apiCall]),
    update: useCallback((uid, data) => apiCall(weeklyPlanMasterService.update, uid, data), [apiCall]),
    delete: useCallback((uid) => apiCall(weeklyPlanMasterService.delete, uid), [apiCall])
  };

  // Weekly Planning operations
  const plannings = {
    getAll: useCallback((filters) => apiCall(weeklyPlanningService.getAll, filters), [apiCall]),
    getById: useCallback((uid) => apiCall(weeklyPlanningService.getById, uid), [apiCall]),
    create: useCallback((data) => apiCall(weeklyPlanningService.create, data), [apiCall]),
    update: useCallback((uid, data) => apiCall(weeklyPlanningService.update, uid, data), [apiCall]),
    delete: useCallback((uid) => apiCall(weeklyPlanningService.delete, uid), [apiCall])
  };

  // Weekly Planning Week operations
  const weeks = {
    getAll: useCallback((planningUid) => apiCall(weeklyPlanningWeekService.getAll, planningUid), [apiCall]),
    getById: useCallback((planningUid, weekUid) => apiCall(weeklyPlanningWeekService.getById, planningUid, weekUid), [apiCall]),
    create: useCallback((planningUid, data) => apiCall(weeklyPlanningWeekService.create, planningUid, data), [apiCall]),
    update: useCallback((planningUid, weekUid, data) => apiCall(weeklyPlanningWeekService.update, planningUid, weekUid, data), [apiCall]),
    delete: useCallback((planningUid, weekUid) => apiCall(weeklyPlanningWeekService.delete, planningUid, weekUid), [apiCall])
  };

  // Weekly Planning Day operations
  const days = {
    getAll: useCallback((planningUid, weekUid) => apiCall(weeklyPlanningDayService.getAll, planningUid, weekUid), [apiCall]),
    create: useCallback((planningUid, weekUid, data) => apiCall(weeklyPlanningDayService.create, planningUid, weekUid, data), [apiCall]),
    bulkCreate: useCallback((planningUid, weekUid, data) => apiCall(weeklyPlanningDayService.bulkCreate, planningUid, weekUid, data), [apiCall]),
    update: useCallback((planningUid, weekUid, dayUid, data) => apiCall(weeklyPlanningDayService.update, planningUid, weekUid, dayUid, data), [apiCall])
  };

  // Weekly Planning Detail operations
  const details = {
    getAll: useCallback((planningUid, weekUid, dayUid) => apiCall(weeklyPlanningDetailService.getAll, planningUid, weekUid, dayUid), [apiCall]),
    create: useCallback((planningUid, weekUid, dayUid, data) => apiCall(weeklyPlanningDetailService.create, planningUid, weekUid, dayUid, data), [apiCall]),
    update: useCallback((planningUid, weekUid, dayUid, detailUid, data) => apiCall(weeklyPlanningDetailService.update, planningUid, weekUid, dayUid, detailUid, data), [apiCall]),
    delete: useCallback((planningUid, weekUid, dayUid, detailUid) => apiCall(weeklyPlanningDetailService.delete, planningUid, weekUid, dayUid, detailUid), [apiCall])
  };

  // Outside Planning Detail operations
  const outsideDetails = {
    getAll: useCallback((planningUid, weekUid, dayUid) => apiCall(outsidePlanningDetailService.getAll, planningUid, weekUid, dayUid), [apiCall]),
    create: useCallback((planningUid, weekUid, dayUid, data) => apiCall(outsidePlanningDetailService.create, planningUid, weekUid, dayUid, data), [apiCall]),
    update: useCallback((planningUid, weekUid, dayUid, detailUid, data) => apiCall(outsidePlanningDetailService.update, planningUid, weekUid, dayUid, detailUid, data), [apiCall]),
    delete: useCallback((planningUid, weekUid, dayUid, detailUid) => apiCall(outsidePlanningDetailService.delete, planningUid, weekUid, dayUid, detailUid), [apiCall])
  };

  // Report Suggestions operations
  const reportSuggestions = {
    get: useCallback(() => apiCall(reportSuggestionsService.getSuggestions), [apiCall]),
    addUsage: useCallback((reportText) => apiCall(reportSuggestionsService.addUsage, reportText), [apiCall])
  };

  return {
    loading,
    error,
    clearError,
    branches,
    planMasters,
    plannings,
    weeks,
    days,
    details,
    outsideDetails,
    reportSuggestions
  };
};

/**
 * Hook for fetching and caching branches data
 */
export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranches = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await branchService.getAll();
      setBranches(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch branches');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  return {
    branches,
    loading,
    error,
    refetch: fetchBranches
  };
};

/**
 * Hook for fetching and caching weekly plan masters
 */
export const useWeeklyPlanMasters = () => {
  const [planMasters, setPlanMasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlanMasters = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await weeklyPlanMasterService.getAll();
      setPlanMasters(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch plan masters');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPlanMaster = useCallback(async (planText) => {
    try {
      const response = await weeklyPlanMasterService.create({ plan_text: planText });
      // Add to local state for immediate UI update
      setPlanMasters(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create plan master');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchPlanMasters();
  }, [fetchPlanMasters]);

  return {
    planMasters,
    loading,
    error,
    createPlanMaster,
    refetch: fetchPlanMasters
  };
};
