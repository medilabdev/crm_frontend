/**
 * Weekly Planning State Management Hook
 * Manages local state for weekly planning data with optimistic updates
 */

import { useState, useCallback, useMemo } from 'react';
import { calculateDayStatistics, calculateWeekStatistics, calculatePlanningStatistics } from '../utils/calculationUtils';

/**
 * Hook for managing weekly planning state with calculations
 */
export const useWeeklyPlanningState = (initialData = null) => {
  // Main planning data
  const [planning, setPlanning] = useState(initialData);
  const [weeks, setWeeks] = useState([]);
  const [activeWeekUid, setActiveWeekUid] = useState(null);
  const [activeDayUid, setActiveDayUid] = useState(null);
  
  // UI state
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('week'); // 'week' | 'month' | 'list'
  const [filters, setFilters] = useState({
    branch: null,
    dateRange: null,
    status: null
  });

  // Update planning data
  const updatePlanning = useCallback((newPlanningData) => {
    setPlanning(prev => ({
      ...prev,
      ...newPlanningData
    }));
  }, []);

  // Update weeks data with automatic calculation updates
  const updateWeeks = useCallback((newWeeks) => {
    // Calculate statistics for each week and day
    const weeksWithCalculations = newWeeks.map(week => {
      const daysWithCalculations = week.days?.map(day => {
        const calculations = calculateDayStatistics(
          day.weekly_planning_details || day.weeklyPlanningDetails || [],
          day.outside_planning_details || day.outsidePlanningDetails || []
        );
        
        return {
          ...day,
          calculations
        };
      }) || [];

      const weekStatistics = calculateWeekStatistics(daysWithCalculations);
      
      return {
        ...week,
        days: daysWithCalculations,
        statistics: weekStatistics
      };
    });

    setWeeks(weeksWithCalculations);
    
    // Update planning-level statistics
    if (planning) {
      const planningStatistics = calculatePlanningStatistics(weeksWithCalculations);
      updatePlanning({ statistics: planningStatistics });
    }
  }, [planning, updatePlanning]);

  // Add new week
  const addWeek = useCallback((weekData) => {
    const newWeek = {
      ...weekData,
      days: [],
      statistics: {
        total_weekly_plan: 0,
        total_weekly_report: 0,
        total_outside: 0,
        total_report: 0,
        total_activities: 0,
        working_days: 0,
        week_planning_pct: 0,
        week_outside_pct: 0
      }
    };
    
    setWeeks(prev => [...prev, newWeek]);
    return newWeek;
  }, []);

  // Update specific week
  const updateWeek = useCallback((weekUid, weekData) => {
    setWeeks(prev => prev.map(week => 
      week.uid === weekUid ? { ...week, ...weekData } : week
    ));
  }, []);

  // Add day to specific week
  const addDayToWeek = useCallback((weekUid, dayData) => {
    const newDay = {
      ...dayData,
      weekly_planning_details: [],
      outside_planning_details: [],
      calculations: {
        total_weekly_plan: 0,
        total_weekly_report: 0,
        daily_planning_pct: 0,
        total_outside: 0,
        daily_outside_pct: 0,
        total_report: 0,
        total_activities: 0
      }
    };

    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = [...(week.days || []), newDay];
        const weekStatistics = calculateWeekStatistics(updatedDays);
        
        return {
          ...week,
          days: updatedDays,
          statistics: weekStatistics
        };
      }
      return week;
    }));
    
    return newDay;
  }, []);

  // Update day in specific week
  const updateDayInWeek = useCallback((weekUid, dayUid, dayData) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedDay = { ...day, ...dayData };
            // Recalculate day statistics
            updatedDay.calculations = calculateDayStatistics(
              updatedDay.weekly_planning_details || updatedDay.weeklyPlanningDetails || [],
              updatedDay.outside_planning_details || updatedDay.outsidePlanningDetails || []
            );
            return updatedDay;
          }
          return day;
        }) || [];

        // Recalculate week statistics
        const weekStatistics = calculateWeekStatistics(updatedDays);
        
        return {
          ...week,
          days: updatedDays,
          statistics: weekStatistics
        };
      }
      return week;
    }));
  }, []);

  // Add planning detail to specific day
  const addPlanningDetail = useCallback((weekUid, dayUid, detailData) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedDetails = [...(day.weekly_planning_details || day.weeklyPlanningDetails || []), detailData];
            const updatedDay = {
              ...day,
              weekly_planning_details: updatedDetails,
              weeklyPlanningDetails: updatedDetails
            };
            
            // Recalculate statistics
            updatedDay.calculations = calculateDayStatistics(
              updatedDetails,
              day.outside_planning_details || day.outsidePlanningDetails || []
            );
            
            return updatedDay;
          }
          return day;
        }) || [];

        const weekStatistics = calculateWeekStatistics(updatedDays);
        return { ...week, days: updatedDays, statistics: weekStatistics };
      }
      return week;
    }));
  }, []);

  // Add outside detail to specific day
  const addOutsideDetail = useCallback((weekUid, dayUid, detailData) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedOutsideDetails = [...(day.outside_planning_details || day.outsidePlanningDetails || []), detailData];
            const updatedDay = {
              ...day,
              outside_planning_details: updatedOutsideDetails,
              outsidePlanningDetails: updatedOutsideDetails
            };
            
            // Recalculate statistics
            updatedDay.calculations = calculateDayStatistics(
              day.weekly_planning_details || day.weeklyPlanningDetails || [],
              updatedOutsideDetails
            );
            
            return updatedDay;
          }
          return day;
        }) || [];

        const weekStatistics = calculateWeekStatistics(updatedDays);
        return { ...week, days: updatedDays, statistics: weekStatistics };
      }
      return week;
    }));
  }, []);

  // Selection management
  const toggleItemSelection = useCallback((itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const selectAll = useCallback((itemIds) => {
    setSelectedItems(itemIds);
  }, []);

  // Computed values
  const activeWeek = useMemo(() => {
    return weeks.find(week => week.uid === activeWeekUid) || null;
  }, [weeks, activeWeekUid]);

  const activeDay = useMemo(() => {
    if (!activeWeek || !activeDayUid) return null;
    return activeWeek.days?.find(day => day.uid === activeDayUid) || null;
  }, [activeWeek, activeDayUid]);

  const hasUnsavedChanges = useMemo(() => {
    // Logic to detect unsaved changes
    // This can be expanded based on specific requirements
    return false;
  }, []);

  // Filter methods
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      branch: null,
      dateRange: null,
      status: null
    });
  }, []);

  return {
    // Data state
    planning,
    weeks,
    activeWeekUid,
    activeDayUid,
    activeWeek,
    activeDay,
    
    // UI state
    selectedItems,
    viewMode,
    filters,
    hasUnsavedChanges,
    
    // Data mutations
    updatePlanning,
    updateWeeks,
    addWeek,
    updateWeek,
    addDayToWeek,
    updateDayInWeek,
    addPlanningDetail,
    addOutsideDetail,
    
    // UI actions
    setActiveWeekUid,
    setActiveDayUid,
    setViewMode,
    toggleItemSelection,
    clearSelection,
    selectAll,
    updateFilters,
    clearFilters
  };
};
