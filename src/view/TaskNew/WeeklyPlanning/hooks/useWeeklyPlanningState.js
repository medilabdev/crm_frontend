
import { useState, useCallback, useMemo } from 'react';
import { calculateWeekStatistics, calculatePlanningStatistics } from '../utils/calculationUtils';

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
    console.log(`[STATE UPDATE] updateSingleDay: Mengupdate hari ${updatedDayData.uid} di minggu ${weekUid}`);
    // Log #1: Data day baru yang diterima dari handler (index.jsx)
    console.log(`[STATE UPDATE] 1. Data Day Baru Diterima:`, JSON.stringify(updatedDayData, null, 2));

    setWeeks(prevWeeks => {
        const newWeeks = prevWeeks.map(week => {
            if (week.uid === weekUid) {
                console.log(`[STATE UPDATE] -> Mencocokkan Week UID: ${weekUid}`);
                const updatedDays = week.days?.map(day => {
                    if (day.uid === updatedDayData.uid) {
                        console.log(`   --> Mencocokkan Day UID: ${updatedDayData.uid}`);
                        // Log #2: Nilai is_working_day DARI updatedDayData (API)
                        console.log(`       2. is_working_day DARI API:`, updatedDayData?.is_working_day);

                        const finalUpdatedDay = { // Buat objek final
                            ...updatedDayData,
                            weeklyPlanningDetails: updatedDayData.weeklyPlanningDetails || updatedDayData.weekly_planning_details || [],
                            outsidePlanningDetails: updatedDayData.outsidePlanningDetails || updatedDayData.outside_planning_details || []
                        };

                        // Log #3: Nilai is_working_day DI OBJEK FINAL hari ini
                        console.log(`       3. is_working_day DI OBJEK FINAL:`, finalUpdatedDay?.is_working_day);
                        return finalUpdatedDay; // Kembalikan objek yang sudah digabung
                    }
                    return day; // Kembalikan hari lain apa adanya
                });

                // Log #4: Cek is_working_day di array updatedDays (setelah map selesai)
                const checkDayInUpdated = updatedDays?.find(d => d.uid === updatedDayData.uid);
                console.log(`   <-- 4. is_working_day DI updatedDays (setelah map):`, checkDayInUpdated?.is_working_day);


                // Hitung ulang statistik mingguan
                const updatedWeekStats = calculateWeekStatistics({
                    ...week, // Gunakan metadata week lama
                    days: updatedDays, // Gunakan array days baru
                });
                console.log(`   <-- Statistik Minggu Dihitung Ulang:`, updatedWeekStats);

                // Kembalikan objek week baru
                const finalUpdatedWeek = { ...week, days: updatedDays, statistics: updatedWeekStats };

                 // Log #5: Cek is_working_day di objek week final (sebelum return)
                 const checkDayInFinalWeek = finalUpdatedWeek.days?.find(d => d.uid === updatedDayData.uid);
                 console.log(` <- 5. is_working_day DI OBJEK WEEK FINAL:`, checkDayInFinalWeek?.is_working_day);

                return finalUpdatedWeek;
            }
            // Jika bukan minggu yang dicari, kembalikan apa adanya
            return week;
        });

        // Log #6: Seluruh state weeks baru SEBELUM di-set
        console.log('[STATE UPDATE] 6. State weeks BARU (akan di-set):', JSON.stringify(newWeeks, null, 2));

        return newWeeks; // Kembalikan state baru ke setWeeks
    });

  }, [calculateWeekStatistics]); // Pastikan dependensi benar


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
    planning,
    weeks, // This now contains days with BE calculations and calculated week stats
    activeWeekUid,
    activeDayUid,
    activeWeek,
    activeDay,
    selectedItems,
    viewMode,
    filters,
    hasUnsavedChanges,
    updateWeeks,
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