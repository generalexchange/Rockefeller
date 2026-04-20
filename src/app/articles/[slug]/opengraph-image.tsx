import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/lib/articles'

export const alt = 'Article preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: Promise<{ slug: string }> }

export default async function OgImage({ params }: Props) {
  const { slug } = await params
  const post = getArticleBySlug(slug)
  if (!post) {
    return new Response('Not found', { status: 404 })
  }

  const { title, deck } = post.meta

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: '#faf8f5',
          color: '#14120f',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7a5c00' }}>
          Rockefeller.press
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxHeight: 280,
            overflow: 'hidden',
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: '#4a4740',
            maxHeight: 120,
            overflow: 'hidden',
          }}
        >
          {deck}
        </div>
      </div>
    ),
    { ...size },
  )
}
