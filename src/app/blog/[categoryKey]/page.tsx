// src/app/blog/[categoryKey]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Answers from '@/components/ui/Answers'
import Blogsection from '@/components/ui/Blogsection'
import Consultation from '@/components/ui/Consultation'
import Hero from '@/components/ui/Hero'
import Requirements from '@/components/ui/Requirements'

import { SITE_CONFIG } from '@/config/site'
import { fetchBlogKeys, fetchBlogPage } from '@/lib/blogPages'

type PageProps = { params: Promise<{ categoryKey: string }> }

function clamp(str: string, max = 160): string {
	const s = String(str ?? '')
		.replace(/\s+/g, ' ')
		.trim()
	if (!s) return ''
	return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s
}

// опционально: чтобы next заранее знал все категории
export async function generateStaticParams() {
	const keys = await fetchBlogKeys()
	return keys.map(categoryKey => ({ categoryKey }))
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { categoryKey } = await params

	try {
		const data = await fetchBlogPage(categoryKey)

		const titleBase =
			data.seo?.title ||
			(typeof data.meta?.name === 'string' ? (data.meta.name as string) : '') ||
			'Блог'

		const title = `${titleBase}${SITE_CONFIG.brandSuffix ?? ''}`.trim()

		const hero = (data.content?.hero ?? {}) as Record<string, unknown>
		const heroSubtitle = typeof hero.subtitle === 'string' ? hero.subtitle : ''
		const heroText = typeof hero.text === 'string' ? hero.text : ''
		const description = clamp(
			data.seo?.description || heroSubtitle || heroText || 'Полезные статьи.',
		)

		const canonicalPath = `/blog/${encodeURIComponent(categoryKey)}`

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
	} catch (e) {
		return {}
	}
}

export default async function BlogCategoryPage({ params }: PageProps) {
	const { categoryKey } = await params

	let data: Awaited<ReturnType<typeof fetchBlogPage>>
	try {
		data = await fetchBlogPage(categoryKey)
	} catch (e) {
		const err = e as { status?: number }
		if (err?.status === 404) notFound()
		throw e
	}

	const heroProps = (data.content?.hero ?? {}) as Record<string, unknown>
	const blog1 = (data.content?.blog1 ?? {}) as Record<string, unknown>
	const blog2 = (data.content?.blog2 ?? {}) as Record<string, unknown>
	const blog3 = (data.content?.blog3 ?? {}) as Record<string, unknown>
	const requirements = (data.content?.requirements ?? {}) as Record<
		string,
		unknown
	>

	return (
		<>
			<Hero {...heroProps} />

			<Blogsection data={blog1} />
			<Answers />
			<Blogsection data={blog2} />

			<Requirements
				title={
					typeof requirements.title === 'string'
						? requirements.title
						: undefined
				}
				text={
					typeof requirements.text === 'string' ? requirements.text : undefined
				}
			/>

			<Blogsection data={blog3} />
			<Consultation />
		</>
	)
}
