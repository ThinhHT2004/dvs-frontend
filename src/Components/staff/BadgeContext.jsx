
import React, { createContext, useState, useContext } from 'react';

const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
  const [badgeCounts, setBadgeCounts] = useState({
    "Incomming Request": 0,
    "Diamonds Appraisal": 0,
    "Pending Request": 0,
    "Request": 0,
    "Receipt": 0,
    "Report": 0,
    "Form": 0,
  });

  const updateBadgeCount = (icon, count) => {
    setBadgeCounts(prevCounts => ({
      ...prevCounts,
      [icon]: count
    }));
  };

  return (
    <BadgeContext.Provider value={{ badgeCounts, updateBadgeCount }}>
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadge = () => useContext(BadgeContext);
