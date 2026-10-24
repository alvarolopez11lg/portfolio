// Helpers for listing projects in order.
import { getCollection } from 'astro:content';

export async function getProjects(status: 'completed' | 'in-progress') {
  const all = await getCollection('projects', (p) => p.data.status === status);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function projectPaths(status: 'completed' | 'in-progress', base: string) {
  const list = await getProjects(status);
  return list.map((project, i) => ({
    params: { slug: project.id },
    props: {
      project,
      prev: i > 0 ? { href: `${base}/${list[i - 1].id}`, title: list[i - 1].data.title } : undefined,
      next: i < list.length - 1 ? { href: `${base}/${list[i + 1].id}`, title: list[i + 1].data.title } : undefined,
    },
  }));
}
