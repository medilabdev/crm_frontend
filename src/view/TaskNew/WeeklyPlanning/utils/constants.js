/**
 * Weekly Planning Constants
 * Centralized configuration and constants for the Weekly Planning feature
 */

// API Endpoints - Updated to match backend routes exactly
export const API_ENDPOINTS = {
  WEEKLY_PLANNING: {
    BASE: '/weekly-planning',
    BRANCHES: '/weekly-planning/branches',
    PLAN_MASTERS: '/weekly-planning/weekly-plan-masters',
    PLANNINGS: '/weekly-planning/plannings',
    PLANNING_DETAIL: (uid) => `/weekly-planning/plannings/${uid}`,
    WEEKS: (planningUid) => `/weekly-planning/plannings/${planningUid}/weeks`,
    WEEK_DETAIL: (planningUid, weekUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}`,
    DAYS: (planningUid, weekUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days`,
    DAYS_BULK: (planningUid, weekUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/bulk`,
    DAY_DETAIL: (planningUid, weekUid, dayUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}`,
    PLANNING_DETAILS: (planningUid, weekUid, dayUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/details`,
    PLANNING_DETAIL_ITEM: (planningUid, weekUid, dayUid, detailUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/details/${detailUid}`,
    OUTSIDE_DETAILS: (planningUid, weekUid, dayUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/outside-details`,
    OUTSIDE_DETAIL_ITEM: (planningUid, weekUid, dayUid, outsideDetailUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/outside-details/${outsideDetailUid}`,
    REPORT_SUGGESTIONS: '/weekly-planning/report-suggestions',
    REPORT_USAGE: '/weekly-planning/report-suggestions/usage',
    DAY_TOGGLE_WORKING: (planningUid, weekUid, dayUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/toggle-working`,
  }
};

// Planning Status (Keep simple - always editable)
export const PLANNING_STATUS = {
  DRAFT: 'draft'  // Default status, fully editable CRUD
};

// Day Names (Indonesian)
export const DAY_NAMES = [
  'Senin',
  'Selasa', 
  'Rabu',
  'Kamis',
  'Jumat',
];

// Form Validation Rules
export const VALIDATION_RULES = {
  PLAN_TEXT: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 1000
  },
  NOTES: {
    MAX_LENGTH: 1000
  },
  WEEK_NAME: {
    MAX_LENGTH: 100
  },
  NEW_OPTION: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 500 // Or appropriate length
  }
};

// UI Constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 15,
  MODAL_SIZES: {
    SMALL: 'sm',
    MEDIUM: 'md', 
    LARGE: 'lg',
    EXTRA_LARGE: 'xl'
  },
  TOAST_DURATION: 3000
};

// Calculation Thresholds (for performance indicators)
export const CALCULATION_THRESHOLDS = {
  HIGH_PERFORMANCE: 80,
  MEDIUM_PERFORMANCE: 60,
  LOW_PERFORMANCE: 40
};

// Default Values
export const DEFAULT_VALUES = {
  WEEK_START_HOUR: 8,
  WEEK_END_HOUR: 17,
  DEFAULT_BRANCH: null,
  DEFAULT_PLANNING_STATUS: PLANNING_STATUS.DRAFT
};
