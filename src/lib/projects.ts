// Helpers for listing projects in order.
import { getCollection } from 'astro:content';

// Everything shown under Projects: finished and in-progress projects, unless hidden.
export async function getListed() {
  const all = await getCollection(
    'projects',
    (p) => (p.data.status === 'completed' || p.data.status === 'in-progress') && !p.data.hidden,
  );
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function projectPaths(base: string) {
  const list = await getListed();
  return list.map((project, i) => ({
    params: { slug: project.id },
    props: {
      project,
      prev: i > 0 ? { href: `${base}/${list[i - 1].id}`, title: list[i - 1].data.title } : undefined,
      next: i < list.length - 1 ? { href: `${base}/${list[i + 1].id}`, title: list[i + 1].data.title } : undefined,
    },
  }));
}
