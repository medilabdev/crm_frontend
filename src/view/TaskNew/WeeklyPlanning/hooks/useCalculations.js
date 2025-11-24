/**
 * useCalculations.js — FINAL PATCHED VERSION
 * 
 * ✅ Sinkron penuh dengan BE (planning, on_planning, off_planning, total_visit, planning_pct, outside_pct)
 * ✅ Backward compatible dengan struktur lama (total_weekly_plan, dll)
 * ✅ Fix persentase Plan & Outside (tidak 0%)
 * ✅ Aman untuk Daily, Weekly, dan Monthly Recap
 */

import { useMemo, useCallback } from 'react';
import {
  calculateWeekStatistics,
  calculatePlanningStatistics,
  getPerformanceIndicator,
  formatPercentage,
  calculateTrend,
} from '../utils/calculationUtils';

// ------------------------------------------------------------
// 🔧 Normalizer (mapping otomatis schema baru ↔ lama)
// ------------------------------------------------------------
const normalizeDayStats = (raw = {}) => ({
  total_weekly_plan: raw.total_weekly_plan ?? raw.planning ?? 0,
  total_weekly_report: raw.total_weekly_report ?? raw.on_planning ?? 0,
  total_outside: raw.total_outside ?? raw.off_planning ?? 0,
  total_report: raw.total_report ?? raw.total_visit ?? 0,
  daily_planning_pct: raw.daily_planning_pct ?? raw.planning_pct ?? 0,
  daily_outside_pct: raw.daily_outside_pct ?? raw.outside_pct ?? 0,
});

// ------------------------------------------------------------
// 🧠 Custom Hook
// ------------------------------------------------------------
export const useCalculations = (planningData) => {
  const safePlanningData = planningData || {};
  const { weeks = [] } = safePlanningData;

  // === Weekly Statistics ===
  const weekStatistics = useMemo(() => {
    return weeks.map((week) => {
      const weekStats = calculateWeekStatistics(week);
      return {
        ...week,
        statistics: weekStats,
      };
    });
  }, [weeks]);

  // === Monthly / Planning Level Statistics ===
  const planningStatistics = useMemo(() => {
    return calculatePlanningStatistics({ ...safePlanningData, weeks: weekStatistics });
  }, [safePlanningData, weekStatistics]);

  // ------------------------------------------------------------
  // ⚙️ Helper functions
  // ------------------------------------------------------------
  const getPerformanceLevel = useCallback((percentage) => {
    return getPerformanceIndicator(percentage);
  }, []);

  const formatPercent = useCallback((percentage) => {
    return formatPercentage(percentage);
  }, []);

  const analyzeTrend = useCallback((historicalData) => {
    return calculateTrend(historicalData);
  }, []);

  // ------------------------------------------------------------
  // 📅 DAY LEVEL PERFORMANCE
  // ------------------------------------------------------------
  const getDayPerformanceSummary = useCallback((dayData = {}) => {
    const stats = normalizeDayStats(dayData.calculations);

    const performance = getPerformanceIndicator(stats.daily_planning_pct);

    return {
      ...stats,
      performance,
      formatted: {
        planning_pct: formatPercentage(stats.daily_planning_pct),
        outside_pct: formatPercentage(stats.daily_outside_pct),
      },
    };
  }, []);

  // ------------------------------------------------------------
  // 🗓️ WEEK LEVEL PERFORMANCE
  // ------------------------------------------------------------
  const getWeekPerformanceSummary = useCallback((weekData = {}) => {
    const stats = calculateWeekStatistics(weekData);
    const performance = getPerformanceIndicator(stats.week_planning_pct);

    return {
      ...stats,
      performance,
      formatted: {
        planning_pct: formatPercentage(stats.week_planning_pct),
        outside_pct: formatPercentage(stats.week_outside_pct),
      },
    };
  }, []);

  // ------------------------------------------------------------
  // 📆 MONTH / PLANNING LEVEL PERFORMANCE
  // ------------------------------------------------------------
  const getPlanningPerformanceSummary = useMemo(() => {
    const stats = planningStatistics;
    const performance = getPerformanceIndicator(stats.planning_completion_pct);

    return {
      ...stats,
      performance,
      formatted: {
        completion_pct: formatPercentage(stats.planning_completion_pct),
        outside_pct: formatPercentage(stats.planning_outside_pct),
      },
    };
  }, [planningStatistics]);

  // ------------------------------------------------------------
  // 🧾 DASHBOARD SUMMARY
  // ------------------------------------------------------------
  const getDashboardStats = useMemo(() => {
    const planning = getPlanningPerformanceSummary;

    return {
      totals: {
        planned_activities: planning.total_weekly_plan,
        completed_reports: planning.total_weekly_report,
        outside_activities: planning.total_outside,
        total_reported: planning.total_report,
        active_weeks: planning.active_weeks,
        total_weeks: planning.total_weeks,
      },
      performance: {
        completion_rate: planning.planning_completion_pct,
        outside_rate: planning.planning_outside_pct,
        performance_level: planning.performance,
      },
      formatted: planning.formatted,
    };
  }, [getPlanningPerformanceSummary]);

  // ------------------------------------------------------------
  // 🧩 UTILITY CHECK
  // ------------------------------------------------------------
  const hasSignificantData = useMemo(() => {
    return planningStatistics.total_report > 0;
  }, [planningStatistics]);

  // ------------------------------------------------------------
  // 🧠 Return Hook Object
  // ------------------------------------------------------------
  return {
    // Utility functions
    getPerformanceLevel,
    formatPercent,
    analyzeTrend,

    // Computed statistics
    weekStatistics,
    planningStatistics,

    // Summaries
    getDayPerformanceSummary,
    getWeekPerformanceSummary,
    getPlanningPerformanceSummary,

    // Dashboard
    getDashboardStats,

    // Utility flag
    hasSignificantData,
  };
};
