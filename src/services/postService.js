import { posts, authors } from "@/data/posts";

export function getAllPosts({ page = 1, limit = 9, sort, search, category } = {}) {
  let filtered = [...posts];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "popular") {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sort === "trending") {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { posts: paginated, total, totalPages, page };
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getFeaturedPosts() {
  return posts.filter((p) => p.featured);
}

export function getRecentPosts(limit = 6) {
  return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
}

export function getPopularPosts(limit = 5) {
  return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
}

export function getRelatedPosts(currentSlug, limit = 4) {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== currentSlug && (p.category === current.category || p.tags.some((t) => current.tags.includes(t))))
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export function getAdjacentPosts(currentSlug) {
  const index = posts.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getAuthors() {
  return authors;
}

export function getPostsByAuthor(authorName) {
  return posts.filter((p) => p.author.name === authorName);
}
