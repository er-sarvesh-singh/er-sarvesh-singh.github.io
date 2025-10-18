/**
 * Format a date range for display
 * @param startDate - Start date in ISO format (YYYY-MM-DD)
 * @param endDate - End date in ISO format (YYYY-MM-DD) or null for present
 * @returns Formatted date range string (e.g., "Oct 2021 - Present")
 */
export function formatDateRange(startDate: string, endDate: string | null = null): string {
  const start = new Date(startDate);
  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const startYear = start.getFullYear();
  
  if (!endDate) {
    return `${startMonth} ${startYear} - Present`;
  }
  
  const end = new Date(endDate);
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  const endYear = end.getFullYear();
  
  return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
}
