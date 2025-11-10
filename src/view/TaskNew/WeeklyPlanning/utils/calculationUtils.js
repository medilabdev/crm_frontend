// ------------------------------------------------------------
// ✅ calculationUtils.js — Final Unified Version (Daily / Weekly / Monthly)
// ------------------------------------------------------------

// --- 🔧 Helper Normalizer ---
// Memastikan kompatibilitas antara schema lama (total_weekly_*) dan baru (planning/on_planning/off_planning/total_visit)
const normalizeDayStats = (raw = {}) => {
  return {
    total_weekly_plan: raw.total_weekly_plan ?? raw.planning ?? 0,
    total_weekly_report: raw.total_weekly_report ?? raw.on_planning ?? 0,
    total_outside: raw.total_outside ?? raw.off_planning ?? 0,
    total_report: raw.total_report ?? raw.total_visit ?? 0,
  };
};

export const calculateWeekStatistics = (weekData = {}) => {
    console.log("[DEBUG] WeekData masuk:", weekData);

  const { days = [] } = weekData;
  

  let totalWeeklyPlan = 0;
  let totalWeeklyReport = 0;
  let totalOutside = 0;
  let totalReport = 0;

  // hitung semua hari
  days.forEach((day) => {
    const calc = day?.calculations || {};
    const normalized = {
      plan: calc.total_weekly_plan ?? calc.planning ?? 0,
      report: calc.total_weekly_report ?? calc.on_planning ?? 0,
      outside: calc.total_outside ?? calc.off_planning ?? 0,
      total: calc.total_report ?? calc.total_visit ?? 0,
    };

    totalWeeklyPlan += normalized.plan;
    totalWeeklyReport += normalized.report;
    totalOutside += normalized.outside;
    totalReport += normalized.total;
  });

  const workingDays = days.filter((d) => d.is_working_day).length || 1;

  const weekPlanningPct =
    totalWeeklyPlan > 0
      ? Math.round((totalWeeklyReport / totalWeeklyPlan) * 100)
      : 0;

  const weekOutsidePct =
    totalWeeklyPlan > 0
      ? Math.round((totalOutside / totalWeeklyPlan) * 100)
      : 0;

  const weekTotalVisitPct =
    totalWeeklyPlan > 0
      ? Math.round((totalReport / totalWeeklyPlan) * 100)
      : 0;

  return {
    total_weekly_plan: totalWeeklyPlan,
    total_weekly_report: totalWeeklyReport,
    total_outside: totalOutside,
    total_report: totalReport,
    working_days: workingDays,
    week_planning_pct: weekPlanningPct,
    week_outside_pct: weekOutsidePct,
    week_total_visit_pct: weekTotalVisitPct,
  };
};


// ------------------------------------------------------------
// 📅 Bulanan / Recap (Level: Planning)
// ------------------------------------------------------------
export const calculatePlanningStatistics = (planningData = {}) => {
  const weeks = planningData.weeks || [];

  let planningTotals = {
    total_weekly_plan: 0,
    total_weekly_report: 0,
    total_outside: 0,
    total_report: 0,
    total_weeks: weeks.length,
    active_weeks: 0,
  };

  weeks.forEach((week) => {
    // ✅ Normalisasi data week statistics
    const weekStats = normalizeDayStats(week.statistics);

    planningTotals.total_weekly_plan += weekStats.total_weekly_plan;
    planningTotals.total_weekly_report += weekStats.total_weekly_report;
    planningTotals.total_outside += weekStats.total_outside;
    planningTotals.total_report += weekStats.total_report;

    if (weekStats.total_report > 0) {
      planningTotals.active_weeks += 1;
    }
  });

  const planningCompletionPct =
    planningTotals.total_weekly_plan > 0
      ? Math.round(
          (planningTotals.total_weekly_report /
            planningTotals.total_weekly_plan) *
            100
        )
      : 0;

  const planningOutsidePct =
    planningTotals.total_weekly_plan > 0
      ? Math.round(
          (planningTotals.total_outside /
            planningTotals.total_weekly_plan) *
            100
        )
      : 0;

  return {
    ...planningTotals,
    planning_completion_pct: Number.isFinite(planningCompletionPct)
      ? planningCompletionPct
      : 0,
    planning_outside_pct: Number.isFinite(planningOutsidePct)
      ? planningOutsidePct
      : 0,
  };
};

// ------------------------------------------------------------
// 📊 UI Helpers (unchanged)
// ------------------------------------------------------------
export const getPerformanceIndicator = (percentage) => {
  if (percentage >= 80) {
    return {
      level: "high",
      label: "Excellent",
      color: "success",
      bgColor: "#d4edda",
      textColor: "#155724",
    };
  } else if (percentage >= 60) {
    return {
      level: "medium",
      label: "Good",
      color: "warning",
      bgColor: "#fff3cd",
      textColor: "#856404",
    };
  } else if (percentage >= 40) {
    return {
      level: "low",
      label: "Fair",
      color: "info",
      bgColor: "#d1ecf1",
      textColor: "#0c5460",
    };
  } else {
    return {
      level: "poor",
      label: "Needs Improvement",
      color: "danger",
      bgColor: "#f8d7da",
      textColor: "#721c24",
    };
  }
};

export const formatPercentage = (percentage) => {
  return `${Math.round(percentage || 0)}%`;
};

// ------------------------------------------------------------
// 📈 Trend Analyzer (unchanged)
// ------------------------------------------------------------
export const calculateTrend = (historicalData = []) => {
  if (historicalData.length < 2) {
    return { trend: "stable", change: 0, direction: "none" };
  }

  const current = historicalData[historicalData.length - 1];
  const previous = historicalData[historicalData.length - 2];
  const change = current - previous;

  let trend = "stable";
  let direction = "none";

  if (Math.abs(change) > 5) {
    trend = change > 0 ? "improving" : "declining";
    direction = change > 0 ? "up" : "down";
  }

  return {
    trend,
    change: Math.round(change),
    direction,
    current: Math.round(current),
    previous: Math.round(previous),
  };
};
