import Image, { type ImageProps } from 'next/image'
import type { ReactNode } from 'react'

type GrainImageProps = Omit<ImageProps, 'alt'> & {
  alt: string
  children?: ReactNode
}

/**
 * Wraps next/image with a subtle SVG noise overlay for a printed-paper feel.
 */
export function GrainImage({ className = '', alt, children, sizes, ...props }: GrainImageProps) {
  return (
    <span className={`relative inline-block w-full overflow-hidden ${className}`}>
      <Image
        {...props}
        alt={alt}
        className="h-auto w-full object-cover"
        sizes={sizes ?? '(max-width: 768px) 100vw, 66vw'}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </span>
  )
}
