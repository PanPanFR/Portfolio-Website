import useSWR, { mutate } from 'swr';
import { 
  fetchAchievements, 
  fetchProject, 
  fetchTranslations, 
  fetchTechStack, 
  fetchCurrentlyLearning, 
  fetchBlogPosts,
  fetchSupportedLangs
} from './sheets';
import { fetchContributions } from './github';
import {
  defaultContributions,
  type Achievement,
  type Contributions,
  type Project,
  type SupportedLang,
  type Translations,
  type TechStack,
} from './schemas';

// Fetcher function for SWR
// const fetcher = async (fn: () => Promise<any>) => {
//   return await fn();
// };

// Function to invalidate all caches
export function invalidateAllCaches() {
  mutate('supportedLangs');
  mutate('projects');
  mutate('achievements');
  mutate('techStack');
  mutate('contributions');
  mutate('currentlyLearning');
  mutate('blogPosts');
}

// Function to invalidate specific cache
export function invalidateCache(key: string) {
  mutate(key);
}

// Hook for fetching supported languages
export function useSupportedLangs() {
  return useSWR<SupportedLang[]>(
    'supportedLangs',
    () => fetchSupportedLangs(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 60000, // 1 minute
    }
  );
}

// Hook for fetching translations
export function useTranslations(langCode: string) {
  return useSWR<Translations>(
    ['translations', langCode],
    () => fetchTranslations(langCode),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 300000, // 5 minutes
    }
  );
}

// Hook for fetching projects
export function useProjects() {
  return useSWR<Project[]>(
    'projects',
    () => fetchProject(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 900000, // 15 minutes
      dedupingInterval: 300000, // 5 minutes
    }
  );
}

// Hook for fetching achievements
export function useAchievements() {
  return useSWR<Achievement[]>(
    'achievements',
    () => fetchAchievements(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 900000, // 15 minutes
      dedupingInterval: 300000, // 5 minutes
    }
  );
}

// Hook for fetching tech stack
export function useTechStack() {
  return useSWR<TechStack[]>(
    'techStack',
    () => fetchTechStack(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1800000, // 30 minutes
      dedupingInterval: 600000, // 10 minutes
    }
  );
}

// Hook for fetching contributions
export function useContributions() {
  return useSWR<Contributions>(
    'contributions',
    () => fetchContributions(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 1800000, // 30 minutes
      dedupingInterval: 600000, // 10 minutes
      fallbackData: defaultContributions,
    }
  );
}

// Hook for fetching currently learning items
export function useCurrentlyLearning() {
  return useSWR<{name: string, description: string, status: string}[]>(
    'currentlyLearning',
    () => fetchCurrentlyLearning(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000, // 1 hour
      dedupingInterval: 1800000, // 30 minutes
    }
  );
}

// Hook for fetching blog posts
export function useBlogPosts() {
  return useSWR<{title: string, description: string, link: string, thumbnail: string, date: string, category: string}[]>(
    'blogPosts',
    () => fetchBlogPosts(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000, // 1 hour
      dedupingInterval: 1800000, // 30 minutes
    }
  );
}