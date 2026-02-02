import Fullbleed from '@/components/ui/Fullbleed'
import VacanciesButton from '@/components/ui/VacanciesButton'
import VacancyRow from '@/components/ui/VacancyRow'

type Vacancy = {
	title: string
	tags: readonly string[]
}

type VacanciesProps = {
	/** из админки */
	title?: string | null
	text?: string | null
}

const VACANCIES: readonly Vacancy[] = [
	{ title: 'Артиллерия', tags: ['Спецподготовка', 'Отношение'] },
	{ title: 'Подразделение РЭБ', tags: ['Спецподготовка', 'Отношение'] },
	{
		title: 'Африканский корпус',
		tags: ['Спецподготовка', 'Отношение', 'Возможность распределения'],
	},
	{
		title: 'ВДВ',
		tags: [
			'Спецподготовка',
			'Отношение',
			'Возможность гарантированного распределения',
		],
	},
	{
		title: 'Ракетные войска',
		tags: ['Спецподготовка', 'Отношение', 'Приоритетное поступление'],
	},
	{
		title: 'Водитель категории C, D, E',
		tags: ['Спецподготовка', 'Отношение', 'Высокий спрос'],
	},
	{
		title: 'Оператор БПЛА',
		tags: [
			'Спецподготовка',
			'Отношение',
			'Возможность гарантированного распределения',
		],
	},
	{
		title: 'Морская пехота (810 бригада)',
		tags: ['Спецподготовка', 'Отношение'],
	},
	{
		title: 'Мотострелковый полк',
		tags: [
			'Спецподготовка',
			'Отношение',
			'Возможность распределения',
			'Высокий спрос',
		],
	},
] as const

const DEFAULT_TEXT = {
	leftTitle: 'Помогаем поступить в выбранные войска по вашей специализации',
	leftText:
		'Мы оформляем отношение в воинскую часть и сопровождаем на всех этапах распределения. В ряде подразделений возможно гарантированное поступление при выполнении требований.',
} as const

export default function Vacancies({ title, text }: VacanciesProps) {
	const finalLeftTitle = title ?? DEFAULT_TEXT.leftTitle
	const finalLeftText = text ?? DEFAULT_TEXT.leftText

	return (
		<section
			id='specializations'
			className='relative flex flex-col items-center pb-5 lg:pb-[30px] xl:pb-[40px] pt-5 lg:pt-7.5 scroll-mt-20'
		>
			<Fullbleed className='bg-white' />

			<div className='flex w-full flex-col items-center gap-5 px-2.5 min-[1199px]:px-[20px] lg:gap-7.5'>
				<div className='w-full'>
					<h2
						className='
              w-full text-contrast min-[766px]:max-w-none
              px-5
              font-inter font-semibold text-[20px]
              md:max-w-none md:text-[24px]
              lg:text-[30px]
              xl:text-[40px]
            '
					>
						Гарантированная помощь в поступлении в желаемые войска
					</h2>
				</div>

				<div className='flex w-full flex-col gap-2.5 md:flex-row sm:items-stretch'>
					{/* ЛЕВЫЙ */}
					<div className='min-w-0 flex-1'>
						<div className='sm:p-2.5'>
							<img
								src='/images/garant.webp'
								alt='Парад'
								className='bg-cover bg-center bg-no-repeat'
							/>
						</div>

						<div className='flex flex-col gap-2.5 p-5 text-black'>
							<h3 className='font-golos text-contrast font-medium text-[18px] md:text-[22px] lg:text-[24px] xl:text-[30px]'>
								{finalLeftTitle}
							</h3>

							<p className='font-golos font-medium text-[14px] text-gray-500'>
								{finalLeftText}
							</p>

							<p className='font-golos font-semibold text-contrast text-[16px] lg:text-[21px]'>
								Отношение — это официальный документ о готовности части принять
								кандидата.
							</p>

							<p className='font-golos font-medium text-[14px]'>
								Условия поступления:
							</p>

							<ul className='flex list-disc flex-col gap-2.5 pl-6 font-golos text-[14px] font-medium'>
								<li>Подтверждённое здоровье и отсутствие противопоказаний</li>
								<li>
									Достаточный уровень физподготовки (зависит от рода войск)
								</li>
								<li>
									Опыт не обязателен — в большинстве специальностей
									предусмотрено обучение
								</li>
								<li>Готовность пройти ВВК и установленные проверки</li>
							</ul>
						</div>
					</div>

					{/* ПРАВЫЙ */}
					<div className='min-w-0 flex-1 rounded-[30px] border-x-[1px] border-solid border-[#ebebeb] bg-white p-5'>
						<p className='font-inter font-medium text-[18px] md:text-[22px] lg:text-[24px] xl:text-[30px]'>
							Активные вакансии:
						</p>

						<div className='mt-4 flex flex-col gap-2.5'>
							{VACANCIES.map(v => (
								<VacancyRow key={v.title} title={v.title} tags={v.tags} />
							))}
						</div>
					</div>
				</div>
				<div className='hidden'>
					<VacanciesButton />
				</div>
			</div>
		</section>
	)
}
