import { leaveTypes } from "../Form/data";

export function calculateRemainingBalances(employeeID, leaves) {
  // Calculate used days
  const usedDaysMap = new Map();

  leaves.forEach(leave => {
    if (leave.employeeID === employeeID) {
      let days = (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24) + 1;
      if (leave.type === 'Décès' && leave.subType) {
        const subType = leaveTypes.find(type => type.name === leave.type).subtypes.find(sub => sub.name === leave.subType);
        days = subType ? subType.nbjour : days;
      }
      if (!usedDaysMap.has(leave.type)) {
        usedDaysMap.set(leave.type, 0);
      }
      usedDaysMap.set(leave.type, usedDaysMap.get(leave.type) + days);
    }
  });

  // Calculate remaining balance
  return leaveTypes.map(type => {
    const usedDays = usedDaysMap.get(type.name) || 0;
    const balance = (type.nbjour || 0) - usedDays;
    return { ...type, remainingBalance: balance };
  });
}
