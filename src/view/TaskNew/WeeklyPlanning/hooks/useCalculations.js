/**
 * Calculations Hook
 * Custom hook for managing Excel-like calculations with real-time updates
 */

import { useMemo, useCallback } from 'react';
import { 
  calculateDayStatistics, 
  calculateWeekStatistics, 
  calculatePlanningStatistics,
  getPerformanceIndicator,
  formatPercentage,
  calculateTrend
} from '../utils/calculationUtils';

/**
 * Hook for handling all calculation logic in weekly planning
 * @param {Object} planningData - Complete planning data structure
 * @returns {Object} Calculated statistics and helper functions
 */
export const useCalculations = (planningData = {}) => {
  const { weeks = [] } = planningData;

  /**
   * Calculate statistics for a specific day
   */
  const calculateDayStats = useCallback((planningDetails = [], outsideDetails = []) => {
    return calculateDayStatistics(planningDetails, outsideDetails);
  }, []);

  /**
   * Memoized week-level statistics
   */
  const weekStatistics = useMemo(() => {
    return weeks.map(week => {
      if (!week.days) return { ...week, statistics: null };
      
      // Calculate stats for each day first
      const daysWithStats = week.days.map(day => ({
        ...day,
        calculations: calculateDayStatistics(
          day.weeklyPlanningDetails || [],
          day.outsidePlanningDetails || []
        )
      }));
      
      // Then calculate week-level stats
      const weekStats = calculateWeekStatistics(daysWithStats);
      
      return {
        ...week,
        days: daysWithStats,
        statistics: weekStats
      };
    });
  }, [weeks]);

  /**
   * Memoized planning-level statistics
   */
  const planningStatistics = useMemo(() => {
    return calculatePlanningStatistics(weekStatistics);
  }, [weekStatistics]);

  /**
   * Get performance indicator for any percentage
   */
  const getPerformanceLevel = useCallback((percentage) => {
    return getPerformanceIndicator(percentage);
  }, []);

  /**
   * Format percentage for display
   */
  const formatPercent = useCallback((percentage) => {
    return formatPercentage(percentage);
  }, []);

  /**
   * Calculate trend analysis from historical data
   */
  const analyzeTrend = useCallback((historicalData) => {
    return calculateTrend(historicalData);
  }, []);

  /**
   * Get day-level performance summary
   */
  const getDayPerformanceSummary = useCallback((dayData) => {
    const stats = calculateDayStatistics(
      dayData.weeklyPlanningDetails || [],
      dayData.outsidePlanningDetails || []
    );
    
    const performance = getPerformanceIndicator(stats.daily_planning_pct);
    
    return {
      ...stats,
      performance,
      formatted: {
        planning_pct: formatPercentage(stats.daily_planning_pct),
        outside_pct: formatPercentage(stats.daily_outside_pct)
      }
    };
  }, []);

  /**
   * Get week-level performance summary
   */
  const getWeekPerformanceSummary = useCallback((weekData) => {
    const daysWithStats = weekData.days?.map(day => ({
      ...day,
      calculations: calculateDayStatistics(
        day.weeklyPlanningDetails || [],
        day.outsidePlanningDetails || []
      )
    })) || [];
    
    const stats = calculateWeekStatistics(daysWithStats);
    const performance = getPerformanceIndicator(stats.week_planning_pct);
    
    return {
      ...stats,
      performance,
      formatted: {
        planning_pct: formatPercentage(stats.week_planning_pct),
        outside_pct: formatPercentage(stats.week_outside_pct)
      }
    };
  }, []);

  /**
   * Get overall planning performance summary
   */
  const getPlanningPerformanceSummary = useMemo(() => {
    const stats = planningStatistics;
    const performance = getPerformanceIndicator(stats.planning_completion_pct);
    
    return {
      ...stats,
      performance,
      formatted: {
        completion_pct: formatPercentage(stats.planning_completion_pct),
        outside_pct: formatPercentage(stats.planning_outside_pct)
      }
    };
  }, [planningStatistics]);

  /**
   * Get consolidated statistics for dashboard display
   */
  const getDashboardStats = useMemo(() => {
    const planning = getPlanningPerformanceSummary;
    
    return {
      totals: {
        planned_activities: planning.total_weekly_plan,
        completed_reports: planning.total_weekly_report,
        outside_activities: planning.total_outside,
        total_activities: planning.total_activities,
        active_weeks: planning.active_weeks,
        total_weeks: planning.total_weeks
      },
      performance: {
        completion_rate: planning.planning_completion_pct,
        outside_rate: planning.planning_outside_pct,
        performance_level: planning.performance
      },
      formatted: planning.formatted
    };
  }, [getPlanningPerformanceSummary]);

  /**
   * Check if planning data has sufficient content for meaningful stats
   */
  const hasSignificantData = useMemo(() => {
    return planningStatistics.total_activities > 0;
  }, [planningStatistics]);

  return {
    // Raw calculation functions
    calculateDayStats,
    getPerformanceLevel,
    formatPercent,
    analyzeTrend,
    
    // Computed statistics
    weekStatistics,
    planningStatistics,
    
    // Performance summaries
    getDayPerformanceSummary,
    getWeekPerformanceSummary,
    getPlanningPerformanceSummary,
    
    // Dashboard data
    getDashboardStats,
    
    // Utility
    hasSignificantData
  };
};
