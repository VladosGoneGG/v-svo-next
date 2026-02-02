export type PageType = 'city' | 'specialization' | 'profession' | 'unit'

const ENDPOINTS: Record<PageType, string> = {
	city: '/api/noteData/city',
	specialization: '/api/noteData/specialization',
	profession: '/api/noteData/profession',
	unit: '/api/noteData/unit',
}

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://v-svo.ru'

type ApiError = Error & { status?: number }

export type DynamicIndexEntry = {
	meta?: Record<string, unknown>
	content?: Record<string, unknown>
	seo?: {
		title?: string
		description?: string
	} | null
}

export type DynamicIndex = Record<string, DynamicIndexEntry>

export type DynamicPageData = {
	meta: Record<string, unknown>
	content: Record<string, unknown>
	seo?: {
		title?: string
		description?: string
	} | null
}

function absUrl(path: string): string {
	return new URL(path, SITE_ORIGIN).toString()
}

async function apiGetJson<T>(path: string): Promise<T> {
	const res = await fetch(absUrl(path), {
		method: 'GET',
		headers: { Accept: 'application/json' },
		// аналог staleTime 5 минут
		next: { revalidate: 300 },
	})

	if (!res.ok) {
		const text = await res.text().catch(() => '')
		const err: ApiError = new Error(text || `HTTP ${res.status}`)
		err.status = res.status
		throw err
	}

	return (await res.json()) as T
}

export async function fetchDynamicIndex(
	pageType: PageType,
): Promise<DynamicIndex> {
	return apiGetJson<DynamicIndex>(ENDPOINTS[pageType])
}

export async function fetchDynamicPage(
	pageType: PageType,
	slug: string,
): Promise<DynamicPageData> {
	const index = await fetchDynamicIndex(pageType)
	const page = index?.[slug]

	if (!page) {
		const err: ApiError = new Error('Not found')
		err.status = 404
		throw err
	}

	return {
		meta: (page.meta ?? {}) as Record<string, unknown>,
		content: (page.content ?? {}) as Record<string, unknown>,
		seo: page.seo ?? undefined,
	}
}
