export const calculateWeekStatistics = (week = {}) => {
  const days = week.days || [];

  let weekTotals = {
    total_weekly_plan: 0,
    total_weekly_report: 0,
    total_outside: 0,
    total_report: 0, // total_weekly_report + total_outside
    working_days: 0,
  };

  days.forEach(day => {
    // ✅ Use pre-calculated stats from BE, provide default 0s if null/missing
    const dayStats = day.calculations || {
      total_weekly_plan: 0,
      total_weekly_report: 0,
      total_outside: 0,
      total_report: 0,
      // daily_planning_pct, daily_outside_pct might not be needed for SUM
    };

    weekTotals.total_weekly_plan += dayStats.total_weekly_plan;
    weekTotals.total_weekly_report += dayStats.total_weekly_report;
    weekTotals.total_outside += dayStats.total_outside;
    weekTotals.total_report += dayStats.total_report; // SUM the combined report

    // ✅ Adjusted working_days logic: Count if there was any plan OR any outside activity reported
    if (dayStats.total_weekly_plan > 0 || dayStats.total_outside > 0) {
      weekTotals.working_days += 1;
    }
  });

  // ✅ Use BE/Static logic for week-level percentages
  const weekPlanningPct = weekTotals.total_weekly_plan > 0
    ? Math.round((weekTotals.total_weekly_report / weekTotals.total_weekly_plan) * 100)
    : 0;

  // ✅ Use BE/Static logic: Outside percentage AGAINST total plan
  const weekOutsidePct = weekTotals.total_weekly_plan > 0
    ? Math.round((weekTotals.total_outside / weekTotals.total_weekly_plan) * 100)
    : 0;

  return {
    ...weekTotals,
    // 🗑️ No need for total_activities
    week_planning_pct: weekPlanningPct,
    week_outside_pct: weekOutsidePct,
  };
};

/**
 * Calculates overall planning statistics SUMMING UP week statistics.
 * Assumes planningData.weeks contains weeks with a 'statistics' property
 * which is the result of the SOLVED calculateWeekStatistics.
 */
export const calculatePlanningStatistics = (planningData = {}) => {
  const weeks = planningData.weeks || []; // Expect weeks processed by useCalculations

  let planningTotals = {
    total_weekly_plan: 0,
    total_weekly_report: 0,
    total_outside: 0,
    total_report: 0,
    total_weeks: weeks.length,
    active_weeks: 0,
  };

  weeks.forEach(week => {
    // ✅ Use pre-calculated week stats from useCalculations
    const weekStats = week.statistics || { // Use the 'statistics' key added by useCalculations
      total_weekly_plan: 0,
      total_weekly_report: 0,
      total_outside: 0,
      total_report: 0,
      // week_planning_pct, week_outside_pct might not be needed for SUM
    };

    planningTotals.total_weekly_plan += weekStats.total_weekly_plan;
    planningTotals.total_weekly_report += weekStats.total_weekly_report;
    planningTotals.total_outside += weekStats.total_outside;
    planningTotals.total_report += weekStats.total_report;

    // ✅ Adjusted active_weeks logic: Count if there was any report during the week
    if (weekStats.total_report > 0) {
      planningTotals.active_weeks += 1;
    }
  });

  // ✅ Use BE/Static logic for planning-level percentages
  const planningCompletionPct = planningTotals.total_weekly_plan > 0
    ? Math.round((planningTotals.total_weekly_report / planningTotals.total_weekly_plan) * 100)
    : 0;

  // ✅ Use BE/Static logic: Outside percentage AGAINST total plan
  const planningOutsidePct = planningTotals.total_weekly_plan > 0
    ? Math.round((planningTotals.total_outside / planningTotals.total_weekly_plan) * 100)
    : 0;

  return {
    ...planningTotals,
    // 🗑️ No need for total_activities
    planning_completion_pct: planningCompletionPct,
    planning_outside_pct: planningOutsidePct,
  };
};

// --- Helper functions remain the same ---

export const getPerformanceIndicator = (percentage) => {
  // ... (no changes needed) ...
   if (percentage >= 80) {
     return {
       level: 'high',
       label: 'Excellent',
       color: 'success',
       bgColor: '#d4edda',
       textColor: '#155724'
     };
   } else if (percentage >= 60) {
     return {
       level: 'medium',
       label: 'Good',
       color: 'warning',
       bgColor: '#fff3cd',
       textColor: '#856404'
     };
   } else if (percentage >= 40) {
     return {
       level: 'low',
       label: 'Fair',
       color: 'info',
       bgColor: '#d1ecf1',
       textColor: '#0c5460'
     };
   } else {
     return {
       level: 'poor',
       label: 'Needs Improvement',
       color: 'danger',
       bgColor: '#f8d7da',
       textColor: '#721c24'
     };
   }
};

export const formatPercentage = (percentage) => {
  return `${Math.round(percentage || 0)}%`;
};

export const calculateTrend = (historicalData = []) => {
  // ... (no changes needed) ...
   if (historicalData.length < 2) {
     return { trend: 'stable', change: 0, direction: 'none' };
   }
   
   const current = historicalData[historicalData.length - 1];
   const previous = historicalData[historicalData.length - 2];
   const change = current - previous;
   
   let trend = 'stable';
   let direction = 'none';
   
   if (Math.abs(change) > 5) { // 5% threshold for significant change
     trend = change > 0 ? 'improving' : 'declining';
     direction = change > 0 ? 'up' : 'down';
   }
   
   return {
     trend,
     change: Math.round(change),
     direction,
     current: Math.round(current),
     previous: Math.round(previous)
   };
};