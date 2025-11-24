import { useState, useCallback, useMemo } from 'react';
import { calculateWeekStatistics, calculatePlanningStatistics } from '../utils/calculationUtils';

// ------------------------------------------------------------
// 🔧 Normalizer (sama seperti di useCalculations.js)
// ------------------------------------------------------------
const normalizeDayStats = (raw = {}) => ({
  total_weekly_plan: raw.total_weekly_plan ?? raw.planning ?? 0,
  total_weekly_report: raw.total_weekly_report ?? raw.on_planning ?? 0,
  total_outside: raw.total_outside ?? raw.off_planning ?? 0,
  total_report: raw.total_report ?? raw.total_visit ?? 0,
  daily_planning_pct: raw.daily_planning_pct ?? raw.planning_pct ?? 0,
  daily_outside_pct: raw.daily_outside_pct ?? raw.outside_pct ?? 0,
});

const getDefaultCalculations = () => ({
  total_weekly_plan: 0,
  total_weekly_report: 0,
  daily_planning_pct: 0,
  total_outside: 0,
  daily_outside_pct: 0,
  total_report: 0,
});

// ------------------------------------------------------------
// 🧠 Hook for managing weekly planning state with BE calculations
// ------------------------------------------------------------
export const useWeeklyPlanningState = (initialData = null) => {
  // Main planning data
  const [planning, setPlanning] = useState(initialData);
  const [weeks, setWeeks] = useState(initialData?.weeks || []);
  const [activeWeekUid, setActiveWeekUid] = useState(null);
  const [activeDayUid, setActiveDayUid] = useState(null);

  // UI state
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('week');
  const [filters, setFilters] = useState({});

  // ------------------------------------------------------------
  // 🧩 Update Planning
  // ------------------------------------------------------------
  const updatePlanning = useCallback((newPlanningData) => {
    setPlanning(prev => ({ ...prev, ...newPlanningData }));
  }, []);

  // ------------------------------------------------------------
  // 🧩 Update Weeks (apply BE + re-calc stats)
  // ------------------------------------------------------------
  const updateWeeks = useCallback((newWeeks = []) => {
    const processedWeeks = newWeeks.map((week) => {
      const daysWithValidatedCalculations =
        week.days?.map((day) => {
          const normalized = normalizeDayStats(day.calculations || {});
          return {
            ...day,
            calculations: normalized,
            weeklyPlanningDetails: day.weeklyPlanningDetails || day.weekly_planning_details || [],
            outsidePlanningDetails: day.outsidePlanningDetails || day.outside_planning_details || [],
          };
        }) || [];

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

    setWeeks(processedWeeks);
  }, []);

  // ------------------------------------------------------------
  // 🧩 Optimistic Add/Delete Planning Details
  // ------------------------------------------------------------
  const addPlanningDetailOptimistic = useCallback((weekUid, dayUid, detailData) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedDetails = [...day.weeklyPlanningDetails, detailData];
            return { ...day, weeklyPlanningDetails: updatedDetails };
          }
          return day;
        }) || [];
        return { ...week, days: updatedDays };
      }
      return week;
    }));
  }, []);

  const deletePlanningDetailOptimistic = useCallback((weekUid, dayUid, detailUid) => {
    setWeeks(prev => prev.map(week => {
      if (week.uid === weekUid) {
        const updatedDays = week.days?.map(day => {
          if (day.uid === dayUid) {
            const updatedDetails = day.weeklyPlanningDetails.filter(detail => detail.uid !== detailUid);
            return { ...day, weeklyPlanningDetails: updatedDetails };
          }
          return day;
        }) || [];
        return { ...week, days: updatedDays };
      }
      return week;
    }));
  }, []);

  // ------------------------------------------------------------
  // 🧩 Update Single Day (used after API update)
  // ------------------------------------------------------------
  const updateSingleDay = useCallback((weekUid, updatedDayData) => {
    setWeeks(prevWeeks => {
      const newWeeks = prevWeeks.map(week => {
        if (week.uid === weekUid) {
          const updatedDays = week.days?.map(day => {
            if (day.uid === updatedDayData.uid) {
              const normalized = normalizeDayStats(updatedDayData.calculations || {});
              return {
                ...updatedDayData,
                calculations: normalized,
                weeklyPlanningDetails: updatedDayData.weeklyPlanningDetails || updatedDayData.weekly_planning_details || [],
                outsidePlanningDetails: updatedDayData.outsidePlanningDetails || updatedDayData.outside_planning_details || [],
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
      });

      return newWeeks;
    });
  }, []);

  // ------------------------------------------------------------
  // 🔧 Selection & Filters
  // ------------------------------------------------------------
  const toggleItemSelection = useCallback(() => {}, []);
  const clearSelection = useCallback(() => {}, []);
  const selectAll = useCallback(() => {}, []);
  const updateFilters = useCallback(() => {}, []);
  const clearFilters = useCallback(() => {}, []);

  // ------------------------------------------------------------
  // 🧠 Derived Values
  // ------------------------------------------------------------
  const activeWeek = useMemo(() => {
    return weeks.find(week => week.uid === activeWeekUid) || null;
  }, [weeks, activeWeekUid]);

  const activeDay = useMemo(() => {
    const foundDay = activeWeek?.days?.find(day => day.uid === activeDayUid) || null;
    return foundDay;
  }, [activeWeek, activeDayUid]);

  const hasUnsavedChanges = useMemo(() => false, []);

  // ------------------------------------------------------------
  // 🧩 Return
  // ------------------------------------------------------------
  return {
    planning,
    weeks,
    activeWeekUid,
    activeDayUid,
    activeWeek,
    activeDay,
    selectedItems,
    viewMode,
    filters,
    hasUnsavedChanges,

    // Updaters
    updateWeeks,
    updatePlanning,
    addPlanningDetailOptimistic,
    deletePlanningDetailOptimistic,
    updateSingleDay,

    // UI setters
    setActiveWeekUid,
    setActiveDayUid,
    setViewMode,

    // Utility methods
    toggleItemSelection,
    clearSelection,
    selectAll,
    updateFilters,
    clearFilters,
  };
};
