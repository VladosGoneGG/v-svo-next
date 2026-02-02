'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

type BenefitItem = {
	title: string
	text: string
	liClass?: string
}

const BUTTONS = [{ label: 'Военнослужащим' }, { label: 'Семьям' }] as const

const START_NUM: Record<number, number> = {
	0: 1,
	1: 10,
}

const BENEFITS: readonly BenefitItem[] = [
	{
		title: 'Статус ветерана боевых действий',
		text: 'Предоставляется после выполнения условий участия. Дает расширенный перечень льгот, включая надбавки к денежному довольствию, налоговые послабления и социальные гарантии',
	},
	{
		title: 'Отсрочка по аренде жилья и имуществу',
		text: 'На период службы и дополнительно 90 дней после ее завершения. В отдельных случаях срок отсрочки может быть продлен при прохождении лечения',
	},
	{
		title: 'Оплачиваемый отпуск',
		text: 'Двухнедельный оплачиваемый отпуск не реже одного раза в полгода, а также ежегодный дополнительный отпуск 15 суток',
	},
	{
		title: 'Кредитные и налоговые каникулы',
		text: 'Предоставляются на срок службы + 30 дней. Включают приостановку выплат по кредитам и льготный порядок налогообложения согласно федеральным мерам поддержки',
	},
	{
		title: 'Бесплатное лечение и санаторно-курортная терапия',
		text: 'Бесплатное обследование, лечение, реабилитация и санаторные программы. Для членов семьи — скидка до 50% на путевки',
	},
	{
		title: 'Военная пенсия с повышающим коэффициентом',
		text: 'Год службы в зоне СВО засчитывается с коэффициентом 1.5. Боевые выплаты и надбавки ускоряют назначение пенсии и увеличивают ее размер',
	},
	{
		title: 'Страхование жизни и здоровья',
		text: 'Государственное страхование за счет федерального бюджета, включая выплаты при травмах, ранениях или иных страховых случаях',
	},
	{
		title: 'Накопительно-ипотечная система (НИС)',
		text: 'Возможность приобрести жильё за счёт средств Минобороны через НИС после трёх лет службы',
	},
	{
		title: 'Психологическая поддержка',
		text: 'Бесплатная квалифицированная помощь для восстановления эмоционального состояния во время службы и после возвращения',
		liClass: 'md:col-span-2 lg:col-span-1',
	},
] as const

const FAMILY_BENEFITS: readonly BenefitItem[] = [
	{
		title: 'Льготы на образование детей',
		text: 'Детский сад вне очереди, бесплатное питание в детском саду, школе, бесплатная продленка, бесплатное обучение в колледже и т. д.',
	},
	{
		title: 'Бюджетные места для обучения детей в вузах',
		text: 'Дети раненых и погибших могут поступить без вступительных испытаний.',
	},
	{
		title: 'Бесплатный отдых в лагерях для детей',
		text: 'Для этого необходимо заполнить заявку на сайте центра «Ял». Ребенок отправится в лагерь после проверки данных.',
	},
	{
		title: 'Бесплатный проезд на транспорте',
		text: 'Льгота предоставляется детям от 8 до 18 лет (включительно) на все виды общественного транспорта (трамвай, троллейбус, автобус, метро).',
	},
	{
		title: 'Подарки новорожденным',
		text: 'Подарочные комплекты детских принадлежностей всем семьям с новорожденными.',
	},
	{
		title: 'Путевки в организации отдыха',
		text: 'Один раз в год предоставляются путевки на лечение по себестоимости семьям с детьми от 7 до 17 лет (включительно).',
	},
] as const

const liCls = 'flex gap-5'
const numWrapCls =
	'flex items-center justify-center w-[45px] h-[45px] min-w-[45px] rounded-full bg-[#797c85] flex-shrink-0'
const titleCls = 'font-golos font-semibold text-contrast text-[20px]'
const textCls = 'font-golos font-medium text-black text-[14px]'

export default function BenefitsClient() {
	const [active, setActive] = useState<0 | 1>(0)

	const activeBenefits = useMemo(
		() => (active === 0 ? BENEFITS : FAMILY_BENEFITS),
		[active],
	)

	const btnBase =
		'relative flex-1 min-w-0 h-[37px] lg:h-[49px] ' +
		'flex items-center justify-center ' +
		'px-7.5 ' +
		'rounded-[10px] ' +
		'font-golos font-semibold max-[325px]:text-[12px] text-[14px] lg:text-[16px] ' +
		'cursor-pointer select-none ' +
		'transition-colors duration-300'

	const listMinH =
		active === 0 ? 'md:min-h-[737px] lg:min-h-[559px]' : 'md:min-h-0 lg:min-h-0'

	return (
		<section
			id='benefits'
			className='flex flex-col items-center mb-5 lg:mb-[30px] xl:mb-[40px] pt-5 lg:pt-7.5 xl:pt-10 scroll-mt-20'
		>
			<div className='flex w-full flex-col gap-5 px-2.5 xl:gap-7.5 xl:px-[20px]'>
				<div className='w-full max-w-[405px] max-[766px]:max-w-none md:max-w-none'>
					<h2 className='w-full max-w-[365px] max-[766px]:max-w-none px-5 font-golos text-[20px] font-semibold text-contrast md:max-w-none md:text-[24px] lg:text-[30px] xl:text-[40px]'>
						Льготы и гарантии участникам СВО от государства
					</h2>
				</div>

				{/* Переключатель */}
				<div className='relative isolate flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-[20px] border-2 border-dashed border-[#797c85] bg-[#ebebeb] p-2.5'>
					{BUTTONS.map((b, idx) => {
						const isActive = idx === active

						return (
							<button
								key={b.label}
								type='button'
								onClick={() => setActive(idx as 0 | 1)}
								className={[btnBase, 'bg-transparent shadow-none'].join(' ')}
							>
								{isActive && (
									<motion.span
										layoutId='benefits-pill'
										className='absolute inset-0 rounded-[10px] bg-contrast/90 shadow-btn hover:bg-contrast active:bg-contrast/70 transition-colors duration-150 ease-in-out'
										transition={{
											type: 'spring',
											stiffness: 520,
											damping: 48,
											mass: 0.9,
										}}
									/>
								)}

								<motion.span
									className='relative z-10'
									animate={{ color: isActive ? '#ffffff' : '#000000' }}
									transition={{
										type: 'spring',
										stiffness: 520,
										damping: 48,
										mass: 0.9,
									}}
								>
									{b.label}
								</motion.span>
							</button>
						)
					})}
				</div>

				{/* Список */}
				<AnimatePresence mode='wait'>
					<motion.ul
						key={active}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.25, ease: 'easeOut' }}
						className={[
							'w-full flex flex-col gap-7.5 md:grid md:grid-cols-2 md:gap-y-7.5 md:gap-x-7.5 lg:grid-cols-3',
							listMinH,
						].join(' ')}
					>
						{activeBenefits.map((b, idx) => {
							const start = START_NUM[active] ?? 1
							const num = String(start + idx).padStart(2, '0')

							return (
								<li key={b.title} className={`${liCls} ${b.liClass ?? ''}`}>
									<div className={numWrapCls}>
										<span className='font-inter text-[16px] font-semibold text-white'>
											{num}
										</span>
									</div>

									<div className='flex flex-col gap-2.5'>
										<p className={titleCls}>{b.title}</p>
										<p className={textCls}>{b.text}</p>
									</div>
								</li>
							)
						})}
					</motion.ul>
				</AnimatePresence>
			</div>
		</section>
	)
}
