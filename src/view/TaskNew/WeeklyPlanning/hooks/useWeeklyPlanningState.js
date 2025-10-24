/**
 * useWeeklyPlanningState.js - SOLVED VERSION
 * Hook for managing weekly planning state, relying on BE for day calculations.
 */
import { useState, useCallback, useMemo } from 'react';
// ⛔️ No longer importing calculateDayStatistics
// ✅ Import SOLVED versions from utils
import { calculateWeekStatistics, calculatePlanningStatistics } from '../utils/calculationUtils';

// Helper to provide default calculations if BE returns null/undefined
const getDefaultCalculations = () => ({
  total_weekly_plan: 0,
  total_weekly_report: 0,
  daily_planning_pct: 0,
  total_outside: 0,
  daily_outside_pct: 0,
  total_report: 0,
});

/**
 * Hook for managing weekly planning state with calculations from BE.
 */
export const useWeeklyPlanningState = (initialData = null) => {
  // Main planning data
  const [planning, setPlanning] = useState(initialData); // Overall planning metadata
  const [weeks, setWeeks] = useState(initialData?.weeks || []); // Array of weeks, expecting days with 'calculations'
  const [activeWeekUid, setActiveWeekUid] = useState(null);
  const [activeDayUid, setActiveDayUid] = useState(null);

  // UI state (remains the same)
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('week');
  const [filters, setFilters] = useState({ /* ... */ });

  const updatePlanning = useCallback((newPlanningData) => {
    setPlanning(prev => ({ ...prev, ...newPlanningData }));
  }, []);

  const updateWeeks = useCallback((newWeeks = []) => {
    const processedWeeks = newWeeks.map((week) => {
      const daysWithValidatedCalculations =
        week.days?.map((day) => ({
          ...day,
          calculations: day.calculations || getDefaultCalculations(),
          weeklyPlanningDetails:
            day.weeklyPlanningDetails ||
            day.weekly_planning_details ||
            [],
          outsidePlanningDetails:
            day.outsidePlanningDetails ||
            day.outside_planning_details ||
            [],
      })) || [];

      const weekStats = calculateWeekStatistics({
        ...week,
        days: daysWithValidatedCalculations,
      });

      return {
        ...week,
        days: daysWithValidatedCalculations,
        statistics: weekStats,
      };
    });

    // ✅ 2. Hanya set state weeks
    setWeeks(processedWeeks);

  }, []); 

  const addPlanningDetailOptimistic = useCallback((weekUid, dayUid, detailData) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedDetails = [...day.weeklyPlanningDetails, detailData];
            // ⛔️ NO RECALCULATION HERE! Trust the refetch to bring correct calculations.
            return { ...day, weeklyPlanningDetails: updatedDetails };
          }
          return day;
        }) || [];
        // Optionally, could mark week/day as stale or temporarily reset week stats
        return { ...week, days: updatedDays /* statistics: undefined */ };
      }
      return week;
    }));
  }, []);

  // Example: Simplified deletePlanningDetail (just updates array, no recalc)
  const deletePlanningDetailOptimistic = useCallback((weekUid, dayUid, detailUid) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedDetails = day.weeklyPlanningDetails.filter(detail => detail.uid !== detailUid);
            // ⛔️ NO RECALCULATION HERE!
            return { ...day, weeklyPlanningDetails: updatedDetails };
          }
          return day;
        }) || [];
        // Optionally mark week as stale
        return { ...week, days: updatedDays /* statistics: undefined */ };
      }
      return week;
    }));
  }, []);

  const updateSingleDay = useCallback((weekUid, updatedDayData) => {
    console.log(`updateSingleDay: Mengupdate hari ${updatedDayData.uid} di minggu ${weekUid}`);

    setWeeks(prevWeeks => prevWeeks.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === updatedDayData.uid) {
            return {
                ...updatedDayData, 
                weeklyPlanningDetails: updatedDayData.weeklyPlanningDetails || updatedDayData.weekly_planning_details || [],
                outsidePlanningDetails: updatedDayData.outsidePlanningDetails || updatedDayData.outside_planning_details || []
            };
          }
          return day;
        });

        const updatedWeekStats = calculateWeekStatistics({
          ...week,
          days: updatedDays,
        });
        return { ...week, days: updatedDays, statistics: updatedWeekStats };
      }

      return week;
    }))

  }, [calculateWeekStatistics]);


  // --- Selection management (remains the same) ---
  const toggleItemSelection = useCallback(/* ... */);
  const clearSelection = useCallback(/* ... */);
  const selectAll = useCallback(/* ... */);

  // --- Computed values (remains the same) ---
  const activeWeek = useMemo(() => {
    return weeks.find(week => week.uid === activeWeekUid) || null;
  }, [weeks, activeWeekUid]);

  const activeDay = useMemo(() => {
    // Make sure to access validated calculations
    const foundDay = activeWeek?.days?.find(day => day.uid === activeDayUid) || null;
    // if (foundDay && !foundDay.calculations) {
    //   foundDay.calculations = getDefaultCalculations(); // Ensure calculations object exists
    // }
    return foundDay;
  }, [activeWeek, activeDayUid]);

  const hasUnsavedChanges = useMemo(() => {
    return false; // Implement actual logic if needed
  }, []);

  // --- Filter methods (remains the same) ---
  const updateFilters = useCallback(/* ... */);
  const clearFilters = useCallback(/* ... */);

  return {
    // Data state
    planning,
    weeks, // This now contains days with BE calculations and calculated week stats
    activeWeekUid,
    activeDayUid,
    activeWeek,
    activeDay,

    // UI state
    selectedItems,
    viewMode,
    filters,
    hasUnsavedChanges,

    // ✅ Central data update function (expects BE data)
    updateWeeks,

    // Data mutations (Metadata only, or simplified optimistic updates)
    updatePlanning,
    // addWeek, // Need to be adjusted if used optimistically
    // updateWeek,
    // addDayToWeek,
    // updateDayInWeek,
    addPlanningDetailOptimistic, // Renamed for clarity
    // updatePlanningDetail,
    deletePlanningDetailOptimistic,
    updateSingleDay,
    // Renamed for clarity
    // addOutsideDetail,
    // updateOutsideDetail,
    // deleteOutsideDetail,

    // UI actions
    setActiveWeekUid,
    setActiveDayUid,
    setViewMode,
    toggleItemSelection,
    clearSelection,
    selectAll,
    updateFilters,
    clearFilters,
  };
};