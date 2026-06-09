import { MetadataRoute } from 'next'

const LANGUAGES = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'hi', 'sw', 'id', 'ru']
const BASE_URL = 'https://cartotv.com'

// Sample countries - replace with actual country data from src/data/countries.ts
const SAMPLE_COUNTRIES = [
  'united-states',
  'united-kingdom',
  'canada',
  'australia',
  'germany',
  'france',
  'spain',
  'italy',
  'brazil',
  'mexico',
]

const SAMPLE_BLOG_POSTS = [
  'how-to-stream-live-tv',
  'best-channels-2024',
  'streaming-tips',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Home page for each language
  LANGUAGES.forEach((lang) => {
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  })

  // Watch page for each language
  LANGUAGES.forEach((lang) => {
    entries.push({
      url: `${BASE_URL}/${lang}/watch`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    })
  })

  // Country pages for each language
  LANGUAGES.forEach((lang) => {
    SAMPLE_COUNTRIES.forEach((country) => {
      entries.push({
        url: `${BASE_URL}/${lang}/watch/${country}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      })
    })
  })

  // Blog pages for each language
  LANGUAGES.forEach((lang) => {
    entries.push({
      url: `${BASE_URL}/${lang}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })

    SAMPLE_BLOG_POSTS.forEach((slug) => {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  })

  // Static pages for each language
  const staticPages = ['who-we-are', 'terms', 'privacy']
  LANGUAGES.forEach((lang) => {
    staticPages.forEach((page) => {
      entries.push({
        url: `${BASE_URL}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.5,
      })
    })
  })

  return entries
}
