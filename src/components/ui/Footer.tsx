import { fetchFooterLinks } from '@/lib/footerLinks'
import FooterClient from '@ui/FooterClient'
import Link from 'next/link'

type SeoItem = { slug: string; label: string; type?: string }

const SeoLinks = ({ seo }: { seo?: any }) => {
	if (!seo) return null

	const specAndProfAll: SeoItem[] = seo.specAndProfAll ?? []
	const unitsAll: SeoItem[] = seo.unitsAll ?? []
	const citiesAll: SeoItem[] = seo.citiesAll ?? []
	const blogsAll: SeoItem[] = seo.blogsAll ?? []

	return (
		<div className='sr-only'>
			<nav aria-label='SEO links'>
				{specAndProfAll.map((item: any) => {
					const to =
						item.type === 'profession'
							? `/profession/${item.slug}`
							: `/specialization/${item.slug}`

					return (
						<Link key={`seo-sp-${item.type}-${item.slug}`} href={to}>
							{item.label}
						</Link>
					)
				})}

				{unitsAll.map((item: any) => (
					<Link key={`seo-unit-${item.slug}`} href={`/unit/${item.slug}`}>
						{item.label}
					</Link>
				))}

				{citiesAll.map((item: any) => (
					<Link key={`seo-city-${item.slug}`} href={`/city/${item.slug}`}>
						{item.label}
					</Link>
				))}

				{blogsAll.map((item: any) => (
					<Link key={`seo-blog-${item.slug}`} href={`/blog/${item.slug}`}>
						{item.label}
					</Link>
				))}
			</nav>
		</div>
	)
}

export default async function Footer() {
	const data = await fetchFooterLinks()

	return (
		<footer className='relative w-full'>
			<div className='absolute inset-0 left-1/2 -translate-x-1/2 w-screen bg-[#1d1e21] -z-10' />

			<div
				className='
          w-full mx-auto
          max-w-106.25 min-[426px]:max-w-239.75 min-[960px]:max-w-300
          px-2.5 pt-5 pb-5
          lg:pt-7.5 lg:pb-7.5 xl:pb-7.5
          min-[960px]:px-5
          flex flex-col gap-5
          text-white
        '
			>
				<div className='flex flex-col pl-10 items-center gap-5 min-[426px]:flex-row min-[426px]:items-start min-[426px]:justify-between'>
					<FooterClient
						specAndProf={data.specAndProf}
						units={data.units}
						cities={data.cities}
					/>
				</div>

				<div className='w-full flex justify-center pl-10'>
					<div className='w-full font-inter font-normal text-[14px] text-center flex flex-col items-start '>
						<Link
							href='/privacy'
							target='_blank'
							rel='noopener noreferrer'
							className='underline underline-offset-3 cursor-pointer'
						>
							Политика конфиденциальности
						</Link>
						<Link
							href='/requisites'
							rel='noopener noreferrer'
							target='_blank'
							className='underline underline-offset-3 cursor-pointer mt-[5px]'
						>
							Реквизиты
						</Link>
						<div className='w-full my-[10px] h-[0.5px] bg-[#797C85]/60 rounded' />
						<div className='flex flex-col items-start  '>
							<p className='text-[#797C85] text-[14px] text-left'>
								Компания занимается информированием и сопровождением кандидатов
								при заключении контракта
							</p>
							<p className='text-[#797C85] text-[14px]'>2022 - 2026 г.</p>
						</div>
					</div>
				</div>
			</div>

			<SeoLinks seo={data.seo} />
		</footer>
	)
}
