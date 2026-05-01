// hooks/useProjects.ts
import { useInfiniteQuery } from "@tanstack/react-query";

// မင်းရဲ့ Database Schema နဲ့ Appwrite JSON Response အတိုင်း အတိအကျ ကြေညာထားပါတယ်
export interface Project {
  // Appwrite Default System Fields
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $sequence?: string;
  $permissions?: string[];
  $databaseId?: string;
  $tableId?: string;

  // Required Fields (မဖြစ်မနေ ပါမယ့် အရာများ)
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  github: string;
  md_file_en: string;
  md_file_mm: string;
  rate: number;
  status: string;

  // Nullable Fields (Null ဖြစ်နိုင်တဲ့ အရာတွေကို '?' နဲ့ '| null' သုံးထားပါတယ်)
  techStack?: string[] | null;
  demoLink?: string | null;
}

interface ProjectsResponse {
  projects: Project[];
  total: number;
}

export function useProjects(limit = 6) {
  return useInfiniteQuery<ProjectsResponse>({
    queryKey: ["projects"],
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        `/api/projects?limit=${limit}&offset=${pageParam}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      return response.json();
    },

    getNextPageParam: (lastPage, allPages) => {
      const fetchedItemsCount = allPages.reduce(
        (total, page) => total + page.projects.length,
        0,
      );

      if (fetchedItemsCount < lastPage.total) {
        return fetchedItemsCount;
      }
      return undefined;
    },
  });
}
