'use client'

import { useId, useMemo, useState } from 'react'

type QAItem = {
	q: string
	a: string
}

const DATA: QAItem[] = [
	{
		q: 'Какие юридические гарантии мне предоставляются?',
		a: 'Ваши права и обязанности определяются Федеральным законом № 53-ФЗ “О воинской обязанности и военной службе” и контрактом, который подписывается с Министерством обороны РФ. Все выплаты, льготы и социальные гарантии закреплены в законодательстве и предоставляются государством',
	},
	{
		q: 'Смогу ли я поддерживать связь с близкими?',
		a: 'Да. Возможность связи зависит от конкретного места службы, но личные телефоны разрешены, если это не противоречит требованиям безопасности. Связь можно поддерживать через мобильные сети, мессенджеры и почтовую службу части',
	},
	{
		q: 'Когда лучше заключить контракт на СВО?',
		a: 'Контракт можно заключить в любое время. Оптимальный период — когда у вас есть полный комплект документов и понимание, какую специальность и часть вы хотите выбрать. Мы помогаем оценить требования и подобрать подходящий вариант',
	},
	{
		q: 'Может ли осужденный подписать контракт?',
		a: 'Решение зависит от категории и срока погашения судимости. Мы можем помочь предварительно оценить вашу ситуацию и подсказать, возможна ли подача документов',
	},
	{
		q: 'Какие реальные условия службы?',
		a: 'Условия службы зависят от выбранной части, специальности и региона. Мы заранее разъясняем порядок службы, требования, бытовые условия, порядок обеспечения и предоставляем актуальную информацию.',
	},
	{
		q: 'На какой срок можно заключить контракт?',
		a: 'Минимальный срок — 1 год, далее возможны продления на 3, 5 лет и более. Срок зависит от условий конкретного предложения и вашей специализации',
	},
	{
		q: 'Предусмотрен ли отпуск для добровольцев?',
		a: 'Да. Ежегодный оплачиваемый отпуск, а также дополнительные отпуска предоставляются в соответствии с законодательством РФ и условиями военной службы',
	},
	{
		q: 'Будут ли выплаты осуществляться вовремя?',
		a: 'Выплаты осуществляются Министерством обороны РФ по установленному графику. Размеры выплат, надбавки и компенсации определяются федеральными нормативными актами. Мы заранее объясняем порядок выплат и помогаем подготовить документы для их получения',
	},
	{
		q: 'Что делать если я потерял один из документов для подписания контракта?',
		a: 'Мы подскажем порядок восстановления — паспорт, СНИЛС, ИНН, военный билет и другие документы можно восстановить через МФЦ, МВД или военкомат. В большинстве случаев восстановление занимает от 1 до 7 рабочих дней',
	},
	{
		q: 'Можно ли заключить контракт на СВО без военного билета?',
		a: 'Да, возможно подписать контракт при наличии удостоверения личности и прохождении ВВК. Военный билет можно восстановить или оформить при сопровождении специалистов',
	},
	{
		q: 'Что будет с моей семьей, если со мной что-то случится?',
		a: 'Членам семьи предусмотрены выплаты, компенсации и социальная поддержка в соответствии с законами РФ. Подробный перечень зависит от конкретных обстоятельств и статуса военнослужащего',
	},
	{
		q: 'Что делать, если я не проходил срочную службу?',
		a: 'Это не препятствует подписанию контракта. Контракт принимают и тех, кто не служил ранее, — при условии прохождения ВВК и соответствия требованиям',
	},
	{
		q: 'Как проходит распределение контрактников?',
		a: 'Распределение зависит от ваших навыков, состояния здоровья, опыта и требований конкретных частей. Мы помогаем подобрать варианты и объясняем, на что вы можете рассчитывать.',
	},
	{
		q: 'Кто получает выплаты при гибели участника СВО?',
		a: 'Выплаты предоставляются членам семьи или законным наследникам в соответствии с нормативными актами РФ. Мы объясняем порядок оформления и какие документы нужны для получения компенсаций',
	},
]

function IconToggle({ open }: { open: boolean }) {
	return (
		<svg
			width='20'
			height='20'
			viewBox='0 0 18 18'
			fill='none'
			aria-hidden='true'
			className={[
				'origin-center transition-transform duration-300 ease-in-out',
				open ? 'rotate-45' : 'rotate-0',
			].join(' ')}
		>
			<path
				d='M9 3.25v11.5'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
			/>
			<path
				d='M3.25 9h11.5'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
			/>
		</svg>
	)
}

type AccordionItemProps = {
	q: string
	a: string
	isOpen: boolean
	onToggle: () => void
	btnId: string
	panelId: string
}

function AccordionItem({
	q,
	a,
	isOpen,
	onToggle,
	btnId,
	panelId,
}: AccordionItemProps) {
	return (
		<div className='relative'>
			<div
				className={[
					'pointer-events-none absolute left-0 right-0 top-0 h-px bg-[#c3c6d0]',
					'transition-opacity duration-300 ease-in-out',
					isOpen ? 'opacity-100' : 'opacity-0',
				].join(' ')}
			/>
			<div
				className={[
					'pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#c3c6d0]',
					'transition-opacity duration-300 ease-in-out',
					isOpen ? 'opacity-100' : 'opacity-0',
				].join(' ')}
			/>
			<div
				className={[
					'pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-[#c3c6d0]',
					'transition-opacity duration-300 ease-in-out',
					isOpen ? 'opacity-0' : 'opacity-100',
				].join(' ')}
			/>

			<div className='flex flex-col pl-[20px]'>
				<button
					type='button'
					onClick={onToggle}
					aria-expanded={isOpen}
					aria-controls={panelId}
					id={btnId}
					className='w-full cursor-pointer text-left'
				>
					<div
						className={[
							'relative pt-[15px]',
							!isOpen ? 'min-h-[74px]' : 'min-h-0',
						].join(' ')}
					>
						<span
							className={[
								'block pr-[64px]',
								'font-golos text-[18px] font-semibold',
								'transition-colors duration-300 ease-in-out',
								isOpen ? 'text-contrast' : 'text-[#1D1E21]',
							].join(' ')}
						>
							{q}
						</span>

						<span
							className={[
								'absolute right-0 top-[15px]',
								'grid place-items-center rounded-full',
								'h-[39px] w-[39px] shrink-0',
								'text-[#1D1E21]',
								'transition-[background-color,transform] duration-300 ease-in-out',
								isOpen
									? 'bg-[#E6E8EE] translate-y-[2px]'
									: 'bg-white translate-y-0',
							].join(' ')}
						>
							<IconToggle open={isOpen} />
						</span>
					</div>
				</button>

				<div
					id={panelId}
					role='region'
					aria-labelledby={btnId}
					className={[
						'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
						isOpen
							? 'grid-rows-[1fr] opacity-100'
							: 'grid-rows-[0fr] opacity-0',
					].join(' ')}
				>
					<div className='overflow-hidden'>
						<div
							className={[
								'flex flex-col pb-[15px] pt-[20px]',
								'transition-[transform,opacity] duration-300 ease-in-out will-change-transform',
								isOpen
									? 'translate-y-0 opacity-100'
									: '-translate-y-1 opacity-0',
							].join(' ')}
						>
							<p className='max-w-[486px] font-golos text-[14px] font-medium text-black'>
								{a}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function QuestionsClient() {
	const uid = useId()
	const [openIndexes, setOpenIndexes] = useState<Set<number>>(
		() => new Set<number>(),
	)

	const mid = useMemo(() => Math.ceil(DATA.length / 2), [])
	const left = useMemo(() => DATA.slice(0, mid), [mid])
	const right = useMemo(() => DATA.slice(mid), [mid])

	const toggle = (idx: number) => {
		setOpenIndexes(prev => {
			const next = new Set(prev)
			if (next.has(idx)) next.delete(idx)
			else next.add(idx)
			return next
		})
	}

	return (
		<section className='py-5 lg:py-7.5 xl:py-10'>
			<div className='mx-auto w-full max-w-[1200px] px-2.5 lg:px-5'>
				<h2 className='font-inter text-[20px] font-bold text-[#D85A1A] md:text-[36px] lg:text-[44px]'>
					Отвечаем на часто задаваемые вопросы
				</h2>

				{/* у тебя было `lg:7-5` — это опечатка, заменил на `lg:mt-7.5` */}
				<div className='mt-5 lg:mt-7.5 xl:mt-10'>
					{/* Mobile */}
					<div className='md:hidden'>
						<div className='flex flex-col gap-2.5'>
							{DATA.map((item, idx) => (
								<AccordionItem
									key={item.q}
									q={item.q}
									a={item.a}
									isOpen={openIndexes.has(idx)}
									onToggle={() => toggle(idx)}
									btnId={`${uid}-btn-${idx}`}
									panelId={`${uid}-panel-${idx}`}
								/>
							))}
						</div>
					</div>

					{/* Desktop */}
					<div className='relative hidden md:grid md:min-h-[558px] md:grid-cols-2 md:gap-5'>
						<div className='grid auto-rows-max gap-5'>
							{left.map((item, i) => {
								const idx = i
								return (
									<AccordionItem
										key={item.q}
										q={item.q}
										a={item.a}
										isOpen={openIndexes.has(idx)}
										onToggle={() => toggle(idx)}
										btnId={`${uid}-btn-${idx}`}
										panelId={`${uid}-panel-${idx}`}
									/>
								)
							})}
						</div>

						<div className='grid auto-rows-max gap-5'>
							{right.map((item, i) => {
								const idx = mid + i
								return (
									<AccordionItem
										key={item.q}
										q={item.q}
										a={item.a}
										isOpen={openIndexes.has(idx)}
										onToggle={() => toggle(idx)}
										btnId={`${uid}-btn-${idx}`}
										panelId={`${uid}-panel-${idx}`}
									/>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
