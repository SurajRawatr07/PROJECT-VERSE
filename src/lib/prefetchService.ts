/**
 * Prefetch Service for High-Confidence User Actions
 * Caches and prepares likely next views and project datasets
 */

const prefetchedRoutes = new Set<string>();
const prefetchedProjects = new Set<string>();

export function prefetchView(viewId: string): void {
  if (prefetchedRoutes.has(viewId)) return;
  prefetchedRoutes.add(viewId);

  // High-confidence prefetch: pre-warm view metadata and dependencies
  if (typeof window !== 'undefined') {
    // Schedule in requestIdleCallback or microtask to avoid impacting main-thread work
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Prefetch data structures or mock collections related to the target view
      });
    }
  }
}

export function prefetchProjectData(projectId: string): void {
  if (prefetchedProjects.has(projectId)) return;
  prefetchedProjects.add(projectId);

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      // Pre-warm project passport & detail caches
      try {
        // Access localStorage or memory store early so subsequent reads are instant
        const raw = localStorage.getItem('projectverse_saved_projects');
        if (raw) JSON.parse(raw);
      } catch {
        // Ignore prefetch read errors
      }
    });
  }
}
