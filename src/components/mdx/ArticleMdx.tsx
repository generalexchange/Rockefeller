import Image from 'next/image'
import type { ImgHTMLAttributes } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

function parseDim(value: string | number | undefined, fallback: number): number {
  if (typeof value === 'number' && !Number.isNaN(value)) return value
  if (typeof value === 'string') {
    const n = Number.parseInt(value, 10)
    if (!Number.isNaN(n)) return n
  }
  return fallback
}

function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, width, height } = props
  if (!src || typeof src !== 'string') return null
  const w = parseDim(width, 1200)
  const h = parseDim(height, 675)
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt ?? ''}
        width={w}
        height={h}
        className="h-auto w-full"
        sizes="(max-width: 680px) 100vw, 680px"
      />
    </figure>
  )
}

const components = {
  img: MdxImage,
}

export function ArticleMdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
