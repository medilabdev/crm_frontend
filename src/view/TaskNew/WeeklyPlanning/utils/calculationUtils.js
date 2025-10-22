export const calculateDayStatistics = (planningDetails = [], outsideDetails = []) => {
    const totalWeeklyPlan = planningDetails.filter(item => item.weekly_plan_text && item.weekly_plan_text.trim().length > 0).length;

    const totalWeeklyReport = planningDetails.filter(item => item.weekly_report_text && item.weekly_report_text.trim().length > 0).length

    const totalOutside = outsideDetails.filter(item => 
        item.activity_text && item.activity_text.trim().length > 0
    ).length;
    const dailyPlanningPct = totalWeeklyPlan > 0 
        ? Math.round((totalWeeklyReport / totalWeeklyPlan) * 100) 
    : 0;

    const totalActivities = totalWeeklyPlan + totalOutside;
    const dailyOutsidePct = totalActivities > 0
        ? Math.round((totalOutside / totalActivities) * 100)
    : 0;

    const totalReported = totalWeeklyReport + totalOutside;

    return {
        total_weekly_plan: totalWeeklyPlan,
        total_weekly_report: totalWeeklyReport,
        daily_planning_pct: dailyPlanningPct,
        total_outside: totalOutside,
        daily_outside_pct: dailyOutsidePct,
        total_report: totalReport,
        total_activities: totalActivities
    };
}

export const calculateWeekStatistics = (days = []) => {
  let weekTotals = {
    total_weekly_plan: 0,
    total_weekly_report: 0,
    total_outside: 0,
    total_report: 0,
    total_activities: 0,
    working_days: 0
  };
  
  days.forEach(day => {
    if (day.calculations) {
      weekTotals.total_weekly_plan += day.calculations.total_weekly_plan || 0;
      weekTotals.total_weekly_report += day.calculations.total_weekly_report || 0;
      weekTotals.total_outside += day.calculations.total_outside || 0;
      weekTotals.total_report += day.calculations.total_report || 0;
      weekTotals.total_activities += day.calculations.total_activities || 0;
      
      // Count as working day if has any activities
      if (day.calculations.total_activities > 0) {
        weekTotals.working_days += 1;
      }
    }
  });
  
  // Calculate week-level percentages
  const weekPlanningPct = weekTotals.total_weekly_plan > 0
    ? Math.round((weekTotals.total_weekly_report / weekTotals.total_weekly_plan) * 100)
    : 0;
    
  const weekOutsidePct = weekTotals.total_activities > 0
    ? Math.round((weekTotals.total_outside / weekTotals.total_activities) * 100)
    : 0;
  
  return {
    ...weekTotals,
    week_planning_pct: weekPlanningPct,
    week_outside_pct: weekOutsidePct
  };
};

export const calculatePlanningStatistics = (weeks = []) => {
  let planningTotals = {
    total_weekly_plan: 0,
    total_weekly_report: 0,
    total_outside: 0,
    total_report: 0,
    total_activities: 0,
    total_weeks: weeks.length,
    active_weeks: 0
  };
  
  weeks.forEach(week => {
    if (week.statistics) {
      planningTotals.total_weekly_plan += week.statistics.total_weekly_plan || 0;
      planningTotals.total_weekly_report += week.statistics.total_weekly_report || 0;
      planningTotals.total_outside += week.statistics.total_outside || 0;
      planningTotals.total_report += week.statistics.total_report || 0;
      planningTotals.total_activities += week.statistics.total_activities || 0;
      
      // Count as active week if has any activities
      if (week.statistics.total_activities > 0) {
        planningTotals.active_weeks += 1;
      }
    }
  });
  
  // Calculate planning-level percentages
  const planningCompletionPct = planningTotals.total_weekly_plan > 0
    ? Math.round((planningTotals.total_weekly_report / planningTotals.total_weekly_plan) * 100)
    : 0;
    
  const planningOutsidePct = planningTotals.total_activities > 0
    ? Math.round((planningTotals.total_outside / planningTotals.total_activities) * 100)
    : 0;
  
  return {
    ...planningTotals,
    planning_completion_pct: planningCompletionPct,
    planning_outside_pct: planningOutsidePct
  };
};

export const getPerformanceIndicator = (percentage) => {
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
