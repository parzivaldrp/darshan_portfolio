import type { CreateProjectRequest } from '@/types/project';

export async function fetchProjects() {
  const res = await fetch('/api/getProject');
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function createProject(projectData: CreateProjectRequest) {
  const res = await fetch('/api/createProject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create project');
  }
  
  return res.json();
} 