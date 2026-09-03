export const STORAGE_KEY_SAVED_PROJECTS = 'projectverse_saved_projects';

export function getSavedProjectIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_PROJECTS);
    if (!raw) {
      // Default seed saved project for immediate demonstration
      const initial = ['proj-1'];
      localStorage.setItem(STORAGE_KEY_SAVED_PROJECTS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read saved projects from localStorage', err);
    return ['proj-1'];
  }
}

export function isProjectSaved(projectId: string): boolean {
  const ids = getSavedProjectIds();
  return ids.includes(projectId);
}

export function toggleSaveProject(projectId: string): boolean {
  const ids = getSavedProjectIds();
  let updated: string[];
  let isNowSaved: boolean;

  if (ids.includes(projectId)) {
    updated = ids.filter(id => id !== projectId);
    isNowSaved = false;
  } else {
    updated = [...ids, projectId];
    isNowSaved = true;
  }

  try {
    localStorage.setItem(STORAGE_KEY_SAVED_PROJECTS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save bookmarks to localStorage', err);
  }

  return isNowSaved;
}
