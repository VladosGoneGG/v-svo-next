export const ENDPOINTS = {
	city: '/api/noteData/city',
	specialization: '/api/noteData/specialization',
	profession: '/api/noteData/profession',
	unit: '/api/noteData/unit',
	blogAll: '/api/blog/all', // лучше заменить на /api/blog/index
} as const

type AnyPage = any

export type CityItem = {
	slug: string
	type: 'city'
	label: string
}

export type UnitItem = {
	slug: string
	type: 'unit'
	label: string
}

export type SpecItem = {
	slug: string
	type: 'specialization'
	label: string
}

export type ProfItem = {
	slug: string
	type: 'profession'
	label: string
}

export type BlogItem = {
	slug: string
	type: 'blog'
	label: string
}

export type SpecAndProfItem = SpecItem | ProfItem

export type FooterLinksResult = {
	cities: CityItem[]
	units: UnitItem[]
	specAndProf: SpecAndProfItem[]
	blogs: BlogItem[]
	seo: {
		citiesAll: CityItem[]
		unitsAll: UnitItem[]
		specAndProfAll: SpecAndProfItem[]
		blogsAll: BlogItem[]
	}
}

function getLabel(slug: string, page: AnyPage) {
	return page?.meta?.name || page?.content?.hero?.title || slug
}

// быстрее чем localeCompare в sort
const collator = new Intl.Collator('ru', { sensitivity: 'base' })
const byLabel = <T extends { label: string }>(a: T, b: T) =>
	collator.compare(a.label || '', b.label || '')

const VISIBLE_LIMIT = 12

const topSorted = <T extends { label: string }>(
	arr: T[],
	limit = VISIBLE_LIMIT,
) => {
	const copy = arr.slice()
	copy.sort(byLabel)
	return copy.slice(0, limit)
}

async function apiGet(path: string, { signal }: { signal?: AbortSignal } = {}) {
	const origin = process.env.API_ORIGIN?.replace(/\/$/, '')
	if (!origin) throw new Error('API_ORIGIN is not set')

	const url = `${origin}${path}`

	const res = await fetch(url, {
		method: 'GET',
		headers: { Accept: 'application/json' },
		signal,
		next: { revalidate: 1800 }, // 30 мин
	})

	if (!res.ok) {
		const text = await res.text().catch(() => '')
		const err: any = new Error(text || `HTTP ${res.status}`)
		err.status = res.status
		throw err
	}

	return res.json()
}

export async function fetchFooterLinks({
	signal,
}: { signal?: AbortSignal } = {}): Promise<FooterLinksResult> {
	const [
		cityIndex,
		specializationIndex,
		professionIndex,
		unitIndex,
		blogIndex,
	] = await Promise.all([
		apiGet(ENDPOINTS.city, { signal }),
		apiGet(ENDPOINTS.specialization, { signal }),
		apiGet(ENDPOINTS.profession, { signal }),
		apiGet(ENDPOINTS.unit, { signal }),
		apiGet(ENDPOINTS.blogAll, { signal }),
	])

	const citiesAll: CityItem[] = Object.entries(cityIndex ?? {}).map(
		([slug, page]) => ({
			slug,
			type: 'city',
			label: getLabel(slug, page as AnyPage),
		}),
	)

	const specializationsAll: SpecItem[] = Object.entries(
		specializationIndex ?? {},
	).map(([slug, page]) => ({
		slug,
		type: 'specialization',
		label: getLabel(slug, page as AnyPage),
	}))

	const professionsAll: ProfItem[] = Object.entries(professionIndex ?? {}).map(
		([slug, page]) => ({
			slug,
			type: 'profession',
			label: getLabel(slug, page as AnyPage),
		}),
	)

	const unitsAll: UnitItem[] = Object.entries(unitIndex ?? {}).map(
		([slug, page]) => ({
			slug,
			type: 'unit',
			label: getLabel(slug, page as AnyPage),
		}),
	)

	const blogsAll: BlogItem[] = Object.entries(blogIndex ?? {}).map(
		([categoryKey, page]) => ({
			slug: categoryKey,
			type: 'blog',
			label: (page as AnyPage)?.meta?.name || categoryKey,
		}),
	)

	// UI: только топ-12 отсортированных
	const cities = topSorted(citiesAll)
	const units = topSorted(unitsAll)
	const specAndProf = topSorted([...specializationsAll, ...professionsAll])

	// SEO: полный список (без сортировки — быстрее)
	return {
		cities,
		units,
		specAndProf,

		blogs: topSorted(blogsAll),
		seo: {
			citiesAll,
			unitsAll,
			specAndProfAll: [...specializationsAll, ...professionsAll],
			blogsAll,
		},
	}
}
