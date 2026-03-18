import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Реквизиты',
	description: 'Реквизиты ИП Цуркан А.А.',
	alternates: {
		canonical: '/requisites',
	},
}

export default function RequisitesPage() {
	return (
		<section className='px-4 py-10 md:px-6 md:py-14'>
			<div className='mx-auto w-full max-w-4xl'>
				<h1 className='text-3xl font-bold uppercase tracking-tight md:text-4xl'>
					Реквизиты
				</h1>

				<div className='mt-8 rounded-3xl border border-black/10 bg-white p-5 shadow-sm md:p-8'>
					<div className='space-y-4 text-base leading-7 text-black/80 md:text-lg'>
						<p>
							<span className='font-semibold text-black'>Наименование:</span> ИП
							Цуркан А.А.
						</p>

						<p>
							<span className='font-semibold text-black'>ИНН:</span>{' '}
							525622036858
						</p>

						<p>
							<span className='font-semibold text-black'>
								Адрес для корреспонденции:
							</span>{' '}
							603041, г. Н. Новгород, Молодежный пр., д. 56, кв.3
						</p>

						<p>
							<span className='font-semibold text-black'>
								Официальная почта:
							</span>{' '}
							<a
								href='mailto:vsvo.tsenter@yandex.ru'
								className='underline underline-offset-4 transition-opacity hover:opacity-70'
							>
								vsvo.tsenter@yandex.ru
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
