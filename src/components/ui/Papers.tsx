import DashedBorder from '@/components/ui/DashedBorder'
import Fullbleed from '@/components/ui/Fullbleed'

const DEFAULT_TITLE = 'Необходимые документы для службы по контракту'

export type PapersProps = {
	title?: string
}

type PaperCard = {
	title: string
	desc: string
	imgSrc: string
	imgAlt: string
}

const CARDS: PaperCard[] = [
	{
		title: 'Паспорт гражданина РФ',
		desc: 'Оригинал + копия. Нужен для установления личности',
		imgSrc: '/images/passport.webp',
		imgAlt: 'Паспорт',
	},
	{
		title: 'СНИЛС',
		desc: 'Копия. Используется для оформления выплат и учёта',
		imgSrc: '/images/snils.webp',
		imgAlt: 'СНИЛС',
	},
	{
		title: 'ИНН',
		desc: 'Копия. Требуется для начисления денежного довольствия',
		imgSrc: '/images/inn.webp',
		imgAlt: 'ИНН',
	},
	{
		title: 'Военный билет или удостоверение призывника',
		desc: 'Для определения категории годности и учёта службы',
		imgSrc: '/images/bilet.webp',
		imgAlt: 'Военный билет',
	},
]

export default function Papers({ title }: PapersProps) {
	const finalTitle = title ?? DEFAULT_TITLE

	return (
		<section
			id='documents'
			className='relative scroll-mt-20 py-5 lg:py-[30px] xl:py-[40px]'
		>
			<Fullbleed className='bg-white' />

			<div className='flex w-full flex-col items-start gap-5 px-2.5 font-golos min-[1199px]:px-[20px]'>
				<div className='flex flex-col gap-5 px-2.5 md:px-5'>
					<h2 className='w-full font-inter text-[20px] font-semibold text-contrast md:text-[24px] lg:text-[30px] xl:text-[40px]'>
						{finalTitle}
					</h2>

					<div className='flex flex-col gap-2.5 text-[16px] lg:text-[21px]'>
						<p>
							Для оформления контракта требуется подготовить стандартный
							комплект документов
						</p>
						<p>
							Если какой-то документ утерян — мы поможем восстановить или
							оформить недостающие бумаги
						</p>
					</div>
				</div>

				<div className='flex w-full flex-col gap-5 lg:gap-7.5'>
					<ul className='grid w-full grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-5'>
						{CARDS.map(c => (
							<li
								key={c.title}
								className='relative h-full overflow-hidden rounded-[10px] bg-white'
							>
								<DashedBorder
									radius={20}
									dashArray='10 10'
									stroke='#D14E15'
									strokeWidth={2}
								/>

								<div className='relative z-10 flex items-start justify-between px-7.5 py-5'>
									<div className='flex flex-col gap-1.5'>
										<p className='text-[18px] font-semibold text-black min-[811px]:text-[20px]'>
											{c.title}
										</p>
										<p className='text-[14px] font-medium min-[425px]:text-[16px]'>
											{c.desc}
										</p>
									</div>

									<img
										src={c.imgSrc}
										alt={c.imgAlt}
										className='h-[100px] w-[100px] object-contain'
										loading='lazy'
										decoding='async'
									/>
								</div>
							</li>
						))}
					</ul>

					<div>
						<p className='text-[16px] font-semibold text-contrast lg:text-[21px]'>
							Для иностранных граждан:
						</p>
						<ul className='mt-2.5 list-disc pl-7 font-golos text-[16px] font-normal lg:text-[21px]'>
							<li>Паспорт иностранного гражданина</li>
							<li>Миграционная карта</li>
							<li>Документ о праве пребывания в РФ</li>
							<li>Перевод всех документов на русский язык</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
