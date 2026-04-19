import type { MetadataRoute } from 'next'
import { countries } from '@/data/countries'
import { getAllPosts } from '@/data/blog/posts'
import { toSlug } from '@/utils/countrySlug'
import { getAllChannelParams } from '@/lib/channelManifest'

const BASE = 'https://cartotv.com'
const LANGS = ['en','es','fr','pt','ar','de','hi','zh','sw','id','ru'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // ─── Home pages (11) ──────────────────────────────────────────────────────
  for (const lang of LANGS) {
    entries.push({ url: `${BASE}/${lang}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 })
  }

  // ─── Watch index (11) ─────────────────────────────────────────────────────
  for (const lang of LANGS) {
    entries.push({ url: `${BASE}/${lang}/watch`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 })
  }

  // ─── Country pages (179 × 11 = 1,969) ────────────────────────────────────
  for (const country of countries) {
    const slug = toSlug(country.name)
    for (const lang of LANGS) {
      entries.push({ url: `${BASE}/${lang}/watch/${slug}`, lastModified: now, changeFrequency: 'daily', priority: 0.8 })
    }
  }

  // ─── Channel pages (8,398 × 11 = 92,378) ─────────────────────────────────
  // Only add en/ canonical to the sitemap — hreflang handles the rest.
  // Submitting 92k+ entries per lang would bloat the sitemap unnecessarily.
  const channelParams = getAllChannelParams()
  for (const { country, channel } of channelParams) {
    entries.push({ url: `${BASE}/en/watch/${country}/${channel}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 })
  }

  // ─── Blog listing (11) ────────────────────────────────────────────────────
  for (const lang of LANGS) {
    entries.push({ url: `${BASE}/${lang}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 })
  }

  // ─── Blog posts (24 × 11 = 264) ───────────────────────────────────────────
  const posts = getAllPosts()
  for (const post of posts) {
    for (const lang of LANGS) {
      entries.push({ url: `${BASE}/${lang}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: 'monthly', priority: 0.6 })
    }
  }

  // ─── Static pages (3 × 11 = 33) ───────────────────────────────────────────
  for (const page of ['who-we-are', 'terms', 'privacy']) {
    for (const lang of LANGS) {
      entries.push({ url: `${BASE}/${lang}/${page}`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 })
    }
  }

  return entries
}
