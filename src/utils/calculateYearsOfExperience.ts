export const calculateYearsOfExperience = (startDate: string = '2018-05-01'): string => {
  const start = new Date(startDate);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  
  // Round to nearest 0.5
  return (Math.round(diffInYears * 2) / 2).toString();
};