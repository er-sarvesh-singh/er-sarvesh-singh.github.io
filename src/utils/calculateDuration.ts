/**
 * Calculate the duration between two dates in a human-readable format
 * @param startDate - Start date in ISO format (YYYY-MM-DD)
 * @param endDate - End date in ISO format (YYYY-MM-DD) or null for present
 * @returns Duration string in format "X yrs Y mos"
 */
export function calculateDuration(startDate: string, endDate: string | null = null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  // Total number of months between dates
  let totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  // Include current month if end day >= start day
  if (end.getDate() >= start.getDate()) {
    totalMonths += 1;
  }
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Format the output
  const parts: string[] = [];
  
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  }
  
  if (months > 0 || parts.length === 0) {
    parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  }
  
  return parts.join(' ');
}
