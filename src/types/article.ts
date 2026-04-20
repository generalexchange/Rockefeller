export type Section = 'politics' | 'business' | 'culture' | 'opinion' | 'tech'

export interface ArticleAuthor {
  name: string
  role: string
  slug: string
}

export interface HeroImage {
  src: string
  alt: string
  credit?: string
  caption?: string
}

export interface ArticleFrontmatter {
  title: string
  deck: string
  section: Section
  author: ArticleAuthor
  publishedAt: string
  updatedAt?: string
  heroImage?: HeroImage
  tags: string[]
  featured?: boolean
  /** When true, hero spans full viewport width above the headline */
  heroFullBleed?: boolean
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string
}

export interface ParsedArticle {
  meta: ArticleMeta
  content: string
}
