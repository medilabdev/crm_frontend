/**
 * Weekly Planning API Hook
 * Custom hook for managing API operations with loading, error states, and caching
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

export const useWeeklyPlanningAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cache = useRef({});

  // Clear error state (stabil)
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Generic API call wrapper (stabil)
  const apiCall = useCallback(async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      throw err; // ensure the caller can handle the error
    } finally {
      setLoading(false);
    }
  }, []);

  // --- Bungkus semua objek dengan useMemo untuk stabilitas ---

  // Branch operations
  const branches = useMemo(
    () => ({
      getAll: () => apiCall(branchService.getAll),
      create: (data) => apiCall(branchService.create, data),
    }),
    [apiCall]
  );

  // Weekly Plan Master operations
  const planMasters = useMemo(
    () => ({
      getAll: () => apiCall(weeklyPlanMasterService.getAll),
      create: (data) => apiCall(weeklyPlanMasterService.create, data),
      update: (uid, data) => apiCall(weeklyPlanMasterService.update, uid, data),
      delete: (uid) => apiCall(weeklyPlanMasterService.delete, uid),
    }),
    [apiCall]
  );

  // Weekly Planning operations
  const plannings = useMemo(
    () => ({
      getAll: async (filters) => {
        const cacheKey = JSON.stringify(filters);
        if (cache.current[cacheKey]) return cache.current[cacheKey];

        const result = await apiCall(weeklyPlanningService.getAll, filters);
        cache.current[cacheKey] = result;
        return result;
      },
      getById: (uid) => apiCall(weeklyPlanningService.getById, uid),
      create: (data) => apiCall(weeklyPlanningService.create, data),
      update: (uid, data) =>
        apiCall(weeklyPlanningService.update, uid, data),
      delete: (uid) => apiCall(weeklyPlanningService.delete, uid),
    }),
    [apiCall]
  );

  // Weekly Planning Week operations
  const weeks = useMemo(
    () => ({
      getAll: (planningUid) =>
        apiCall(weeklyPlanningWeekService.getAll, planningUid),
      getById: (planningUid, weekUid) =>
        apiCall(weeklyPlanningWeekService.getById, planningUid, weekUid),
      create: (planningUid, data) =>
        apiCall(weeklyPlanningWeekService.create, planningUid, data),
      update: (planningUid, weekUid, data) =>
        apiCall(weeklyPlanningWeekService.update, planningUid, weekUid, data),
      delete: (planningUid, weekUid) =>
        apiCall(weeklyPlanningWeekService.delete, planningUid, weekUid),
    }),
    [apiCall]
  );

  // Weekly Planning Day operations
  const days = useMemo(
    () => ({
      getAll: (planningUid, weekUid) =>
        apiCall(weeklyPlanningDayService.getAll, planningUid, weekUid),
      create: (planningUid, weekUid, data) =>
        apiCall(weeklyPlanningDayService.create, planningUid, weekUid, data),
      bulkCreate: (planningUid, weekUid, data) =>
        apiCall(weeklyPlanningDayService.bulkCreate, planningUid, weekUid, data),
      update: (planningUid, weekUid, dayUid, data) =>
        apiCall(
          weeklyPlanningDayService.update,
          planningUid,
          weekUid,
          dayUid,
          data
        ),
      toggleWorking: (pUid, wUid, dUid) => apiCall(weeklyPlanningDayService.toggleWorking, pUid, wUid, dUid),
    }),
    [apiCall]
  );

  // Weekly Planning Detail operations
  const details = useMemo(
    () => ({
      getAll: (planningUid, weekUid, dayUid) =>
        apiCall(weeklyPlanningDetailService.getAll, planningUid, weekUid, dayUid),
      create: (planningUid, weekUid, dayUid, data) =>
        apiCall(
          weeklyPlanningDetailService.create,
          planningUid,
          weekUid,
          dayUid,
          data
        ),
      update: (planningUid, weekUid, dayUid, detailUid, data) =>
        apiCall(
          weeklyPlanningDetailService.update,
          planningUid,
          weekUid,
          dayUid,
          detailUid,
          data
        ),
      delete: (planningUid, weekUid, dayUid, detailUid) =>
        apiCall(
          weeklyPlanningDetailService.delete,
          planningUid,
          weekUid,
          dayUid,
          detailUid
        ),
    }),
    [apiCall]
  );

  // Outside Planning Detail operations
  const outsideDetails = useMemo(
    () => ({
      getAll: (planningUid, weekUid, dayUid) =>
        apiCall(outsidePlanningDetailService.getAll, planningUid, weekUid, dayUid),
      create: (planningUid, weekUid, dayUid, data) =>
        apiCall(
          outsidePlanningDetailService.create,
          planningUid,
          weekUid,
          dayUid,
          data
        ),
      update: (planningUid, weekUid, dayUid, detailUid, data) =>
        apiCall(
          outsidePlanningDetailService.update,
          planningUid,
          weekUid,
          dayUid,
          detailUid,
          data
        ),
      delete: (planningUid, weekUid, dayUid, detailUid) =>
        apiCall(
          outsidePlanningDetailService.delete,
          planningUid,
          weekUid,
          dayUid,
          detailUid
        ),
    }),
    [apiCall]
  );

  // Report Suggestions operations
  const reportSuggestions = useMemo(
    () => ({
      get: () => apiCall(reportSuggestionsService.getSuggestions),
      addUsage: (reportText) =>
        apiCall(reportSuggestionsService.addUsage, reportText),
    }),
    [apiCall]
  );

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
    reportSuggestions,
  };
};

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
