import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HashScroll } from '@/components/HashScroll'

import Answers from '@/components/ui/Answers'
import Benefits from '@/components/ui/Benefits'
import Compensations from '@/components/ui/Compensations'
import Consultation from '@/components/ui/Consultation'
import Equipment from '@/components/ui/Equipment'
import Feedback from '@/components/ui/Feedback'
import Foreigners from '@/components/ui/Foreigners'
import Hero from '@/components/ui/Hero'
import Papers from '@/components/ui/Papers'
import Possibilities from '@/components/ui/Possibilities'
import Questions from '@/components/ui/Questions'
import Requirements from '@/components/ui/Requirements'
import Specialties from '@/components/ui/Specialties'
import Stages from '@/components/ui/Stages'
import Vacancies from '@/components/ui/Vacancies'

import { SITE_CONFIG } from '@/config/site'
import { fetchDynamicPage, type PageType } from '@/lib/dynamicPages'

type Params = { pageType: string; slug: string }

function clamp(str: string, max = 160): string {
	const s = String(str ?? '')
		.replace(/\s+/g, ' ')
		.trim()
	if (!s) return ''
	return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s
}

type HeroBlock = {
	title?: string
	subtitle?: string
	text?: string | string[] | null
} & Record<string, unknown>

function firstTextLine(hero: HeroBlock | undefined): string {
	const t = hero?.text
	if (Array.isArray(t)) return t.find(Boolean) ?? ''
	if (typeof t === 'string') return t
	return ''
}

// --- "в Москве / в Казани" (с исключениями) ---
function toLocativeRu(name: string): string {
	const n = String(name ?? '').trim()
	if (!n) return ''
	const key = n.toLowerCase()

	const exceptions: Record<string, string> = {
		москва: 'Москве',
		'санкт-петербург': 'Санкт-Петербурге',
		'нижний новгород': 'Нижнем Новгороде',
		екатеринбург: 'Екатеринбурге',
		новосибирск: 'Новосибирске',
		краснодар: 'Краснодаре',
		владивосток: 'Владивостоке',
		'ростов-на-дону': 'Ростове-на-Дону',
		казань: 'Казани',
		сочи: 'Сочи',
	}

	if (exceptions[key]) return exceptions[key]
	if (/^\s*в\s+/i.test(n)) return n.replace(/^\s*в\s+/i, '').trim()

	if (n.endsWith('а')) return `${n.slice(0, -1)}е`
	if (n.endsWith('я')) return `${n.slice(0, -1)}е`
	if (n.endsWith('ь')) return `${n.slice(0, -1)}и`

	return n
}

function makeCityDescription(cityName: string, hero?: HeroBlock): string {
	const loc = toLocativeRu(cityName)
	const subtitle = hero?.subtitle ? clamp(hero.subtitle, 90) : ''
	const base = `Служба по контракту в ${loc}: вакансии, выплаты, льготы, требования и бесплатная консультация.`
	return subtitle ? `${base} ${subtitle}` : base
}

function isPageType(x: string): x is PageType {
	return (
		x === 'city' || x === 'specialization' || x === 'profession' || x === 'unit'
	)
}

function prettyType(pageType: PageType): string {
	switch (pageType) {
		case 'city':
			return 'Город'
		case 'specialization':
			return 'Специализация'
		case 'profession':
			return 'Профессия'
		case 'unit':
			return 'Войска'
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>
}): Promise<Metadata> {
	const { pageType: pageTypeRaw, slug } = await params

	if (!isPageType(pageTypeRaw)) return {}

	const pageType = pageTypeRaw

	let data: Awaited<ReturnType<typeof fetchDynamicPage>>
	try {
		data = await fetchDynamicPage(pageType, slug)
	} catch (e) {
		const err = e as { status?: number }
		if (err?.status === 404) return {}
		return {}
	}

	const meta = data.meta ?? {}
	const content = data.content ?? {}
	const hero = (content.hero ?? {}) as HeroBlock

	const metaName = typeof meta.name === 'string' ? meta.name : ''
	const baseTitle =
		data.seo?.title ||
		metaName ||
		(typeof hero.title === 'string' ? hero.title : '') ||
		'Страница'

	const title = `${baseTitle}${SITE_CONFIG.brandSuffix ?? ''}`.trim()

	const cityName =
		metaName || (typeof hero.title === 'string' ? hero.title : '') || baseTitle

	const baseDescription =
		data.seo?.description ||
		(pageType === 'city' ? makeCityDescription(cityName, hero) : null) ||
		(typeof hero.subtitle === 'string' ? hero.subtitle : '') ||
		firstTextLine(hero)

	const description = clamp(baseDescription || '')
	const canonicalPath = `/${pageType}/${slug}`

	return {
		title,
		description: description || undefined,
		alternates: { canonical: canonicalPath },
		openGraph: {
			type: 'website',
			title,
			description: description || undefined,
			url: `${SITE_CONFIG.domain}${canonicalPath}`,
			siteName: SITE_CONFIG.brandName,
			locale: SITE_CONFIG.locale || 'ru_RU',
		},
	}
}

export default async function DynamicPage({
	params,
}: {
	params: Promise<Params>
}) {
	const { pageType: pageTypeRaw, slug } = await params

	if (!isPageType(pageTypeRaw)) notFound()

	const pageType = pageTypeRaw

	let data: Awaited<ReturnType<typeof fetchDynamicPage>>
	try {
		data = await fetchDynamicPage(pageType, slug)
	} catch (e) {
		const err = e as { status?: number }
		if (err?.status === 404) notFound()
		throw e
	}

	const meta = data.meta ?? {}
	const c = data.content ?? {}
	const hero = (c.hero ?? {}) as HeroBlock

	const metaName = typeof meta.name === 'string' ? meta.name : ''
	const baseTitle =
		data.seo?.title ||
		metaName ||
		(typeof hero.title === 'string' ? hero.title : '') ||
		'Страница'

	const title = `${baseTitle}${SITE_CONFIG.brandSuffix ?? ''}`.trim()

	const cityName =
		metaName || (typeof hero.title === 'string' ? hero.title : '') || baseTitle

	const baseDescription =
		data.seo?.description ||
		(pageType === 'city' ? makeCityDescription(cityName, hero) : null) ||
		(typeof hero.subtitle === 'string' ? hero.subtitle : '') ||
		firstTextLine(hero)

	const description = clamp(baseDescription || '')
	const canonicalUrl = `${SITE_CONFIG.domain}/${pageType}/${slug}`

	const schemaOrgJson = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${SITE_CONFIG.domain}#organization`,
				name: SITE_CONFIG.organizationName || SITE_CONFIG.brandName,
				url: SITE_CONFIG.domain,
				logo: `${SITE_CONFIG.domain}${SITE_CONFIG.logoPath}`,
				sameAs: Array.isArray(SITE_CONFIG.sameAs) ? SITE_CONFIG.sameAs : [],
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_CONFIG.domain}#website`,
				url: SITE_CONFIG.domain,
				name: SITE_CONFIG.brandName,
				publisher: { '@id': `${SITE_CONFIG.domain}#organization` },
				inLanguage: 'ru-RU',
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${canonicalUrl}#breadcrumbs`,
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Главная',
						item: SITE_CONFIG.domain,
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: prettyType(pageType),
						item: `${SITE_CONFIG.domain}/${pageType}`,
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: baseTitle,
						item: canonicalUrl,
					},
				],
			},
			{
				'@type': 'WebPage',
				'@id': `${canonicalUrl}#webpage`,
				url: canonicalUrl,
				name: title,
				description: description || undefined,
				isPartOf: { '@id': `${SITE_CONFIG.domain}#website` },
				about: { '@id': `${SITE_CONFIG.domain}#organization` },
				breadcrumb: { '@id': `${canonicalUrl}#breadcrumbs` },
				inLanguage: 'ru-RU',
			},
		],
	} as const

	// контент блоки приходят объектами — передаем как props
	const heroProps = (c.hero ?? {}) as Record<string, unknown>
	const compensationsProps = (c.compensations ?? {}) as Record<string, unknown>
	const benefitsProps = (c.benifits ?? {}) as Record<string, unknown>
	const vacanciesProps = (c.vacansies ?? {}) as Record<string, unknown>
	const answersProps = (c.answers ?? {}) as Record<string, unknown>
	const equipmentProps = (c.equipment ?? {}) as Record<string, unknown>
	const requirementsProps = (c.requirements ?? {}) as Record<string, unknown>
	const specialtiesProps = (c.specialties ?? {}) as Record<string, unknown>
	const stagesProps = (c.stages ?? {}) as Record<string, unknown>
	const possibilitiesProps = (c.possibilities ?? {}) as Record<string, unknown>
	const papersProps = (c.papers ?? {}) as Record<string, unknown>
	const foreignersProps = (c.foreigners ?? {}) as Record<string, unknown>
	const feedbackProps = (c.feedback ?? {}) as Record<string, unknown>
	const questionsProps = (c.questions ?? {}) as Record<string, unknown>
	const consultationProps = (c.consultation ?? {}) as Record<string, unknown>

	return (
		<>
			<HashScroll />

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJson) }}
			/>

			<Hero {...heroProps} />
			<Compensations {...compensationsProps} />
			<Answers {...answersProps} />
			<Benefits {...benefitsProps} />
			<Vacancies {...vacanciesProps} />
			<Equipment {...equipmentProps} />
			<Requirements {...requirementsProps} />
			<Specialties {...specialtiesProps} />
			<Stages {...stagesProps} />
			<Possibilities {...possibilitiesProps} />
			<Papers {...papersProps} />
			<Foreigners {...foreignersProps} />
			<Feedback {...feedbackProps} />
			<Questions {...questionsProps} />
			<Consultation {...consultationProps} />
		</>
	)
}
