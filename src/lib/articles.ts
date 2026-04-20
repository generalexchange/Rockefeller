import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ArticleFrontmatter, ArticleMeta, ParsedArticle } from '@/types/article'
import { isSection } from '@/lib/sections'

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

function parseFrontmatter(data: Record<string, unknown>, slug: string): ArticleFrontmatter {
  const title = data.title
  const deck = data.deck
  const section = data.section
  const author = data.author as Record<string, unknown> | undefined
  const publishedAt = data.publishedAt
  const tags = data.tags

  if (typeof title !== 'string' || !title.trim()) {
    throw new Error(`Article "${slug}": missing or invalid title`)
  }
  if (typeof deck !== 'string' || !deck.trim()) {
    throw new Error(`Article "${slug}": missing or invalid deck`)
  }
  if (typeof section !== 'string' || !isSection(section)) {
    throw new Error(`Article "${slug}": section must be politics|business|culture|opinion|tech`)
  }
  if (!author || typeof author.name !== 'string' || typeof author.role !== 'string' || typeof author.slug !== 'string') {
    throw new Error(`Article "${slug}": author must include name, role, slug (strings)`)
  }
  if (typeof publishedAt !== 'string' || !publishedAt.trim()) {
    throw new Error(`Article "${slug}": publishedAt is required (ISO date)`)
  }
  if (!Array.isArray(tags) || !tags.every((t): t is string => typeof t === 'string')) {
    throw new Error(`Article "${slug}": tags must be an array of strings`)
  }

  const heroImage = data.heroImage as ArticleFrontmatter['heroImage']
  if (heroImage !== undefined) {
    if (
      typeof heroImage !== 'object' ||
      heroImage === null ||
      typeof heroImage.src !== 'string' ||
      typeof heroImage.alt !== 'string'
    ) {
      throw new Error(`Article "${slug}": heroImage must have src and alt strings`)
    }
  }

  const updatedAt = data.updatedAt
  const featured = data.featured
  const heroFullBleed = data.heroFullBleed

  return {
    title,
    deck,
    section,
    author: {
      name: author.name,
      role: author.role,
      slug: author.slug,
    },
    publishedAt,
    updatedAt: typeof updatedAt === 'string' ? updatedAt : undefined,
    heroImage,
    tags,
    featured: typeof featured === 'boolean' ? featured : undefined,
    heroFullBleed: typeof heroFullBleed === 'boolean' ? heroFullBleed : undefined,
  }
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return []
  }
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getArticleBySlug(slug: string): ParsedArticle | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) {
    return null
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const meta: ArticleMeta = {
    ...parseFrontmatter(data as Record<string, unknown>, slug),
    slug,
  }
  return { meta, content }
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is ParsedArticle => a !== null)
    .map((a) => a.meta)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticlesBySection(section: ArticleMeta['section']): ArticleMeta[] {
  return getAllArticles().filter((a) => a.section === section)
}
