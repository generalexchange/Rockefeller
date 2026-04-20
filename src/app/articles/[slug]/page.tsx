import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug, getArticleSlugs } from '@/lib/articles'
import { SECTION_LABEL } from '@/lib/sections'
import { ArticleMdx } from '@/components/mdx/ArticleMdx'
import { GrainImage } from '@/components/GrainImage'
import { ArticleJsonLd } from '@/components/ArticleJsonLd'
import { formatShortDate, estimateReadingTimeMinutes, absoluteUrl } from '@/lib/format'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getArticleBySlug(slug)
  if (!post) return { title: 'Not found' }

  const url = absoluteUrl(`/articles/${slug}`)
  const title = post.meta.title
  const description = post.meta.deck

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.meta.publishedAt,
      modifiedTime: post.meta.updatedAt ?? post.meta.publishedAt,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  }
}

function EndMark() {
  return (
    <p className="mt-16 flex justify-center font-display text-2xl text-gold" aria-hidden>
      ◆
    </p>
  )
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getArticleBySlug(slug)
  if (!post) notFound()

  const { meta, content } = post
  const minutes = estimateReadingTimeMinutes(content)
  const more = getAllArticles()
    .filter((a) => a.slug !== meta.slug)
    .slice(0, 4)

  const hero = meta.heroImage
  const fullBleed = meta.heroFullBleed === true && hero

  const headerBlock = (
    <header className="mx-auto max-w-measure px-4 sm:px-0">
      <p className="font-label text-[0.65rem] uppercase tracking-[0.22em] text-gold-dim">{SECTION_LABEL[meta.section]}</p>
      <h1 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-ink">
        {meta.title}
      </h1>
      <p className="mt-5 font-body text-xl italic leading-relaxed text-muted md:text-2xl">{meta.deck}</p>
      <div className="mt-6 font-label text-sm text-muted">
        <address className="not-italic">
          By{' '}
          <Link href={`/authors/${meta.author.slug}`} className="text-ink underline-offset-4 hover:underline">
            {meta.author.name}
          </Link>
          , {meta.author.role}
        </address>
        <p className="mt-2">
          <time dateTime={meta.publishedAt}>{formatShortDate(meta.publishedAt)}</time>
          {meta.updatedAt ? (
            <>
              {' '}
              · Updated <time dateTime={meta.updatedAt}>{formatShortDate(meta.updatedAt)}</time>
            </>
          ) : null}
          {' · '}
          {minutes} min read
        </p>
      </div>
    </header>
  )

  return (
    <>
      <ArticleJsonLd meta={meta} />
      <article>
        {fullBleed && hero ? (
          <>
            <div className="w-full">
              <GrainImage
                src={hero.src}
                alt={hero.alt}
                width={1600}
                height={900}
                priority
                className="w-full"
              />
              {(hero.caption || hero.credit) && (
                <div className="mx-auto max-w-measure px-4 pt-3 sm:px-0">
                  <p className="font-label text-sm text-muted">
                    {hero.caption}
                    {hero.credit ? ` ${hero.credit}` : null}
                  </p>
                </div>
              )}
            </div>
            <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">{headerBlock}</div>
          </>
        ) : (
          <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
            {headerBlock}
            {hero ? (
              <figure className="mx-auto mt-10 max-w-measure">
                <GrainImage
                  src={hero.src}
                  alt={hero.alt}
                  width={1200}
                  height={675}
                  priority
                  className="w-full"
                />
                {(hero.caption || hero.credit) && (
                  <figcaption className="mt-3 font-label text-sm text-muted">
                    {hero.caption}
                    {hero.credit ? ` ${hero.credit}` : null}
                  </figcaption>
                )}
              </figure>
            ) : null}
          </div>
        )}

        <div
          className={`article-body mx-auto max-w-measure px-4 sm:px-0 ${fullBleed ? 'mt-12' : hero ? 'mt-10' : 'mt-12'}`}
        >
          <ArticleMdx source={content} />
        </div>

        <EndMark />

        {more.length > 0 ? (
          <section className="mx-auto mt-16 max-w-6xl border-t border-line px-4 pt-12 sm:px-6" aria-labelledby="more-stories">
            <h2 id="more-stories" className="font-display text-2xl font-semibold text-ink">
              More stories
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((a) => (
                <li key={a.slug}>
                  <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-gold-dim">
                    {SECTION_LABEL[a.section]}
                  </p>
                  <Link href={`/articles/${a.slug}`} className="headline-link mt-2 block font-display text-lg font-semibold leading-snug text-ink">
                    {a.title}
                  </Link>
                  <p className="mt-2 line-clamp-3 font-body text-sm italic text-muted">{a.deck}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  )
}
