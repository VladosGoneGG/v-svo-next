import YandexMetrika from '@/components/analytics/YandexMetrika'
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import type { Metadata } from 'next'
import { Golos_Text, Inter } from 'next/font/google'
import { Suspense } from 'react'

import './globals.css'

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://v-svo.ru'

const YM_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? '107015573')

export const metadata: Metadata = {
	metadataBase: new URL(SITE_ORIGIN),

	title: {
		default: 'Контрактная служба — оформление и выплаты | v-svo.ru',
		template: '%s | v-svo.ru',
	},

	description:
		'Оформление контракта на службу. Выплаты, требования, вакансии, помощь с документами и ВВК.',

	verification: {
		yandex: '3a521b4c4990fccd',
	},

	alternates: {
		canonical: '/',
	},

	icons: {
		icon: '/favicon.svg',
		shortcut: '/favicon.svg',
		apple: '/favicon.svg',
	},

	openGraph: {
		type: 'website',
		url: SITE_ORIGIN,
		siteName: 'v-svo.ru',
		title: 'Контрактная служба — оформление и выплаты',
		description:
			'Оформление контракта на службу. Выплаты, требования, вакансии, помощь с документами и ВВК.',
		locale: 'ru_RU',
	},
}

const golos = Golos_Text({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-golos',
	display: 'swap',
})

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru' className={`${golos.variable} ${inter.variable}`}>
			<body className='font-golos'>
				<div className='min-h-screen flex flex-col w-full max-w-300 min-[1200px]:mx-auto'>
					<Header />
					<main className='flex-1 lg:mt-2.5'>{children}</main>
					<Footer />
				</div>

				{/* Yandex Metrika (обязательно через Suspense) */}
				<Suspense fallback={null}>
					<YandexMetrika
						id={YM_ID}
						enabled={process.env.NODE_ENV === 'production'}
					/>
				</Suspense>
			</body>
		</html>
	)
}
