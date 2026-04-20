const fs = require('fs')
const path = require('path')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rockefeller.press',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  additionalPaths: async () => {
    const dir = path.join(process.cwd(), 'content', 'articles')
    const articlePaths = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => f.endsWith('.mdx'))
          .map((f) => `/articles/${f.replace(/\.mdx$/, '')}`)
      : []
    const sectionPaths = ['politics', 'business', 'culture', 'opinion', 'tech'].map((s) => `/section/${s}`)
    return [...articlePaths, ...sectionPaths, '/subscribe']
  },
}
