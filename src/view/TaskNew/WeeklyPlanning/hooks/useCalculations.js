/**
 * useCalculations.js - SOLVED VERSION
 * Custom hook for managing calculations using pre-calculated BE data for days.
 */

import { useMemo, useCallback } from 'react';
import {
  // ⛔️ No longer importing calculateDayStatistics
  calculateWeekStatistics,      // ✅ Using the SOLVED version
  calculatePlanningStatistics, // ✅ Using the SOLVED version
  getPerformanceIndicator,
  formatPercentage,
  calculateTrend,
} from '../utils/calculationUtils'; // Assuming utils is now SOLVED

/**
 * Hook for handling calculation logic using BE data.
 * @param {Object} planningData - Complete planning data structure from BE,
 * where each day object includes a 'calculations' property.
 * @returns {Object} Calculated statistics and helper functions
 */
export const useCalculations = (planningData) => {
  const safePlanningData = planningData || {};
  const { weeks = [] } = safePlanningData;
  
  const weekStatistics = useMemo(() => {
    return weeks.map(week => { // <-- Ini sudah aman, 'weeks' adalah []
      const weekStats = calculateWeekStatistics(week);
      return {
        ...week,
        statistics: weekStats,
      };
    });
  }, [weeks]); // Dependency remains 'weeks' from planningData

  const planningStatistics = useMemo(() => {
    return calculatePlanningStatistics({ ...safePlanningData, weeks: weekStatistics });
  }, [safePlanningData, weekStatistics]);
  
  /**
   * Get performance indicator (no change needed).
   */
  const getPerformanceLevel = useCallback((percentage) => {
    return getPerformanceIndicator(percentage);
  }, []);

  /**
   * Format percentage (no change needed).
   */
  const formatPercent = useCallback((percentage) => {
    return formatPercentage(percentage);
  }, []);

  /**
   * Calculate trend (no change needed).
   */
  const analyzeTrend = useCallback((historicalData) => {
    return calculateTrend(historicalData);
  }, []);

  /**
   * Get day-level performance summary using BE calculations.
   */
  const getDayPerformanceSummary = useCallback((dayData = {}) => {
    // ✅ Directly use the 'calculations' object from the dayData (provided by BE).
    // Use default 0s if calculations is null/undefined.
    const stats = dayData.calculations || {
      total_weekly_plan: 0,
      total_weekly_report: 0,
      daily_planning_pct: 0,
      total_outside: 0,
      daily_outside_pct: 0,
      total_report: 0,
    };

    const performance = getPerformanceIndicator(stats.daily_planning_pct);

    return {
      ...stats, // Spread the actual calculations from BE
      performance,
      formatted: {
        planning_pct: formatPercentage(stats.daily_planning_pct),
        // ✅ Use the outside percentage calculated by BE (vs total plan)
        outside_pct: formatPercentage(stats.daily_outside_pct),
      },
    };
  }, []); // No dependencies needed as it operates purely on input

  /**
   * Get week-level performance summary using calculated week stats.
   */
  const getWeekPerformanceSummary = useCallback((weekData = {}) => {
    // ✅ Pass the weekData directly to the SOLVED calculateWeekStatistics
    const stats = calculateWeekStatistics(weekData);
    const performance = getPerformanceIndicator(stats.week_planning_pct);

    return {
      ...stats,
      performance,
      formatted: {
        planning_pct: formatPercentage(stats.week_planning_pct),
        // ✅ Use the outside percentage calculated by the SOLVED util (vs total plan)
        outside_pct: formatPercentage(stats.week_outside_pct),
      },
    };
  }, []); // No dependencies needed

  /**
   * Get overall planning performance summary (adjusted for solved stats).
   */
  const getPlanningPerformanceSummary = useMemo(() => {
    // ✅ planningStatistics already uses the SOLVED utils
    const stats = planningStatistics;
    const performance = getPerformanceIndicator(stats.planning_completion_pct);

    return {
      ...stats,
      performance,
      formatted: {
        completion_pct: formatPercentage(stats.planning_completion_pct),
        // ✅ Use the outside percentage calculated by the SOLVED util (vs total plan)
        outside_pct: formatPercentage(stats.planning_outside_pct),
      },
    };
  }, [planningStatistics]);

  /**
   * Get consolidated statistics for dashboard display (adjusted).
   */
  const getDashboardStats = useMemo(() => {
    const planning = getPlanningPerformanceSummary;

    return {
      totals: {
        planned_activities: planning.total_weekly_plan,
        completed_reports: planning.total_weekly_report, // Reports matching plan
        outside_activities: planning.total_outside,    // Reports outside plan
        total_reported: planning.total_report,         // Combined reports
        // 🗑️ Removed total_activities
        active_weeks: planning.active_weeks,
        total_weeks: planning.total_weeks,
      },
      performance: {
        completion_rate: planning.planning_completion_pct, // Based on plan
        outside_rate: planning.planning_outside_pct,    // Based on plan
        performance_level: planning.performance,
      },
      formatted: planning.formatted,
    };
  }, [getPlanningPerformanceSummary]);

  /**
   * Check if planning data has sufficient content (adjusted).
   */
  const hasSignificantData = useMemo(() => {
    // ✅ Check based on total_report (any reported activity)
    return planningStatistics.total_report > 0;
  }, [planningStatistics]);

  return {
    // ⛔️ Removed calculateDayStats
    getPerformanceLevel,
    formatPercent,
    analyzeTrend,

    // ✅ Computed statistics using SOLVED utils and BE data
    weekStatistics,
    planningStatistics,

    // ✅ Performance summaries using SOLVED utils and BE data
    getDayPerformanceSummary,
    getWeekPerformanceSummary,
    getPlanningPerformanceSummary,

    // ✅ Dashboard data reflecting SOLVED structure
    getDashboardStats,

    // ✅ Utility check adjusted
    hasSignificantData,
  };
};