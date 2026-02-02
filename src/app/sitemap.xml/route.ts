import { SITE_CONFIG } from '@/config/site'
import { fetchDynamicIndex, type PageType } from '@/lib/dynamicPages'

const PAGE_TYPES: PageType[] = ['city', 'specialization', 'profession', 'unit']

type UrlItem = { loc: string; changefreq?: string; priority?: string }

function apiOrigin(): string {
	// серверный origin для API
	const env = process.env.API_ORIGIN?.trim()
	if (env) return env.replace(/\/+$/, '')

	// fallback: хотя бы домен сайта
	return SITE_CONFIG.domain.replace(/\/+$/, '')
}

async function fetchBlogKeys(): Promise<string[]> {
	// ожидаем: { "test": {meta, content}, "news": {...}, ... }
	const url = `${apiOrigin()}/api/blog/all`

	const res = await fetch(url, {
		method: 'GET',
		headers: { Accept: 'application/json' },
		// sitemap можно кэшировать на уровне next/vercel/nginx
		// next: { revalidate: 3600 },
	})

	if (!res.ok) return []

	const json = (await res.json()) as unknown
	if (!json || typeof json !== 'object' || Array.isArray(json)) return []

	return Object.keys(json as Record<string, unknown>).filter(Boolean)
}

function toXml(urls: UrlItem[]) {
	const body = urls
		.map(u => {
			const changefreq = u.changefreq
				? `<changefreq>${u.changefreq}</changefreq>`
				: ''
			const priority = u.priority ? `<priority>${u.priority}</priority>` : ''
			return `<url><loc>${u.loc}</loc>${changefreq}${priority}</url>`
		})
		.join('')

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`
}

export async function GET() {
	// 1) статические страницы
	const urls: UrlItem[] = [
		{ loc: `${SITE_CONFIG.domain}/`, changefreq: 'daily', priority: '1.0' },

		// блог-лендинг
		{
			loc: `${SITE_CONFIG.domain}/blog`,
			changefreq: 'weekly',
			priority: '0.7',
		},

		{
			loc: `${SITE_CONFIG.domain}/privacy`,
			changefreq: 'yearly',
			priority: '0.2',
		},
	]

	// 2) блог-категории (динамика: /blog/<categoryKey>)
	try {
		const blogKeys = await fetchBlogKeys()
		for (const key of blogKeys) {
			urls.push({
				loc: `${SITE_CONFIG.domain}/blog/${encodeURIComponent(key)}`,
				changefreq: 'weekly',
				priority: '0.6',
			})
		}
	} catch {
		// если блог API временно упал — просто не добавим blog/<key>
	}

	// 3) динамические страницы (city/unit/...)
	for (const type of PAGE_TYPES) {
		let index: Record<string, unknown> | null = null

		try {
			index = (await fetchDynamicIndex(type)) as Record<string, unknown>
		} catch {
			index = null
		}

		if (!index) continue

		for (const slug of Object.keys(index)) {
			urls.push({
				loc: `${SITE_CONFIG.domain}/${type}/${slug}`,
				changefreq: 'weekly',
				priority: type === 'city' ? '0.8' : '0.6',
			})
		}
	}

	const xml = toXml(urls)

	return new Response(xml, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	})
}
