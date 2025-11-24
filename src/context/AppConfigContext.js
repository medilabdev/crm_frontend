import React, { createContext, useContext, useState, useEffect } from 'react';
import { appConfigService } from '../view/TaskNew/WeeklyPlanning/services/weeklyPlanningService';

const AppConfigContext = createContext({
  min_daily_plan_target: 5,
});

export const AppConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    min_daily_plan_target: 5,
  });

  useEffect(() => {
    appConfigService
      .getAppConfig()
      .then((response) => {
        if (response && response.data) {
          setConfig(response.data);
        }
      })
      .catch((err) => {
        console.error('⚠️ Gagal memuat App Config, menggunakan nilai default.', err);
      });
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
