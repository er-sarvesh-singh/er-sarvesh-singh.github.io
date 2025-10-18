import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import projectsData from '@/data/projects.json';

export interface Stat {
  label: string;
  value: string;
}

/**
 * Calculate years of experience from a start date
 * @param startDate - The date when the career started
 * @returns Number of years of experience
 */
export function calculateYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const current = new Date();
  const years = current.getFullYear() - start.getFullYear();
  const months = current.getMonth() - start.getMonth();
  
  // If we haven't reached the anniversary month yet, subtract a year
  if (months < 0 || (months === 0 && current.getDate() < start.getDate())) {
    return years - 1;
  }
  
  return years;
}

export const CAREER_START_DATE = '2018-05-01';

export const calculateStats = (): Stat[] => {
  // Calculate years of experience using centralized function
  const yearsOfExperience = calculateYearsOfExperience(CAREER_START_DATE);

  // Calculate total technologies from skills data
  const totalTechnologies = skillsData.categories.reduce((total, category) => {
    return total + category.skills.length;
  }, 0);

  // Calculate awards from experience data
  let totalAwards = 0;
  experienceData.companies.forEach(company => {
    company.positions.forEach(position => {
      if (position.achievements) {
        // Count specific awards mentioned in achievements
        position.achievements.forEach((achievement: string) => {
          if (achievement.toLowerCase().includes('award') ||
              achievement.toLowerCase().includes('recognized') ||
              achievement.toLowerCase().includes('stars') ||
              achievement.toLowerCase().includes('orienter')) {
            totalAwards++;
          }
        });
      }
    });
  });

  // Projects count from projects data
  const projectsCount = projectsData.projects.length;

  // You can add more projects if you have additional ones not in the JSON
  const estimatedTotalProjects = projectsCount * 8; // Assuming these are featured projects

  return [
    {
      label: 'Years of Experience',
      value: `${yearsOfExperience}+`
    },
    {
      label: 'Projects Completed',
      value: `${estimatedTotalProjects}+`
    },
    {
      label: 'Technologies Mastered',
      value: `${totalTechnologies}+`
    },
    {
      label: 'Awards Received',
      value: `${totalAwards}+`
    }
  ];
};

// Calculate experience duration in years and months
export const calculateDuration = (startDate: string, endDate: string | 'Present'): string => {
  const start = new Date(startDate);
  const end = endDate === 'Present' ? new Date() : new Date(endDate);
  
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  } else if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
};