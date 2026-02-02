// src/lib/blogPages.ts

export type BlogIndex = Record<
	string,
	{
		meta?: Record<string, unknown>
		content?: Record<string, unknown>
		seo?: { title?: string; description?: string }
	}
>

export type BlogPage = {
	categoryKey: string
	seo?: { title?: string; description?: string }
	meta: Record<string, unknown>
	content: Record<string, unknown>
}

function notFoundError(): Error & { status: number } {
	const err = new Error('Not found') as Error & { status: number }
	err.status = 404
	return err
}

/**
 * ВАЖНО:
 * - generateStaticParams() вызывается без request scope -> headers() нельзя
 * - поэтому origin берём ТОЛЬКО из env
 */
function apiOrigin(): string {
	// 1) явный origin (лучший вариант)
	const envOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim()
	if (envOrigin) return envOrigin.replace(/\/+$/, '')

	// 2) Vercel (если есть)
	const vercelUrl = process.env.VERCEL_URL?.trim()
	if (vercelUrl) return `https://${vercelUrl.replace(/\/+$/, '')}`

	// 3) локальный дефолт (dev)
	return 'http://localhost:3000'
}

async function apiGet<T>(path: string): Promise<T> {
	const origin = apiOrigin()
	const url = `${origin}${path.startsWith('/') ? path : `/${path}`}`

	const res = await fetch(url, {
		method: 'GET',
		headers: { Accept: 'application/json' },
		cache: 'no-store',
	})

	if (res.status === 404) throw notFoundError()
	if (!res.ok) {
		const text = await res.text().catch(() => '')
		const err = new Error(text || `HTTP ${res.status}`) as Error & {
			status?: number
		}
		err.status = res.status
		throw err
	}

	return res.json() as Promise<T>
}

/** Всегда грузим /api/blog/all */
export async function fetchBlogIndex(): Promise<BlogIndex> {
	const raw = await apiGet<BlogIndex>('/api/blog/all')
	if (!raw || typeof raw !== 'object') throw notFoundError()
	return raw
}

/**
 * Если categoryKey не передан — берём первый ключ.
 * Если передан и нет в словаре — 404.
 */
export async function fetchBlogPage(categoryKey?: string): Promise<BlogPage> {
	const index = await fetchBlogIndex()
	const keys = Object.keys(index)
	if (!keys.length) throw notFoundError()

	const key = categoryKey ? categoryKey : keys[0]
	const page = index[key]
	if (!page) throw notFoundError()

	return {
		categoryKey: key,
		seo: page.seo ?? undefined,
		meta: page.meta ?? {},
		content: page.content ?? {},
	}
}

/** Для generateStaticParams() */
export async function fetchBlogKeys(): Promise<string[]> {
	const index = await fetchBlogIndex()
	return Object.keys(index)
}
