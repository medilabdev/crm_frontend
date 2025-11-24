import { DAY_NAMES } from './constants';

export const getWeekStartDate = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

export const getWeekEndDate = (date) => {
    const startDate = getWeekStartDate(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return endDate;
}

export const generateWeeksForMonth = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const weeks = [];
    let weekNumber = 1;

    let currentWeekStart = getWeekStartDate(firstDay);

    while (currentWeekStart <= lastDay) {
        const weekEnd = getWeekEndDate(currentWeekStart);
        weeks.push({
            weekNumber,
            startDate: new Date(currentWeekStart),
            endDate: new Date(weekEnd),
            weekName: `Minggu ${weekNumber} - ${formatDateRange(currentWeekStart, weekEnd)}`
        });

        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        weekNumber++;
    }

    return weeks;
}

export const generateDaysForWeek = (weekStartDate) => {
    const days = [];
    const startDate = new Date(weekStartDate);

    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);

        days.push({
            dayDate: new Date(dayDate),
            dayName: DAY_NAMES[i],
            dayNumber: i + 1,
            isWeekend: i >= 5, // Saturday and Sunday
            dateString: formatDate(dayDate)
        });
    }

    return days;
}

export const formatDateForAPI = (date) => {
  return date.toISOString().split('T')[0];
};

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateRange = (startDate, endDate) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isPastDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export const getCurrentWeekInfo = () => {
  const today = new Date();
  const weekStart = getWeekStartDate(today);
  const weekEnd = getWeekEndDate(today);
  
  return {
    startDate: weekStart,
    endDate: weekEnd,
    weekNumber: getWeekNumberInMonth(today),
    isCurrentWeek: true
  };
};

export const getWeekNumberInMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstWeekStart = getWeekStartDate(firstDay);
  const currentWeekStart = getWeekStartDate(date);
  
  const diffTime = currentWeekStart - firstWeekStart;
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  
  return diffWeeks + 1;
};
