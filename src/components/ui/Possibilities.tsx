const DEFAULTS = {
	title: 'Лучшие возможности по выбору части',
	text: 'Мы помогаем кандидатам выбрать подходящую воинскую часть и специальность с учетом навыков, опыта и желаемых условий службы',
} as const

export type PossibilitiesProps = {
	title?: string
	text?: string
}

export default function Possibilities(props: PossibilitiesProps) {
	const finalTitle = props.title ?? DEFAULTS.title
	const finalText = props.text ?? DEFAULTS.text

	return (
		<section className='relative py-5 pb-5 lg:py-[30px] xl:py-[40px]'>
			{/* ФОН */}
			<div className='absolute inset-0 left-1/2 w-screen -translate-x-1/2 -z-10' />

			<div className='w-full px-2.5 min-[1199px]:px-[20px]'>
				{/* Верх: текст + картинка */}
				<div className='flex flex-col items-start gap-5 md:flex-row md:items-stretch md:gap-5'>
					{/* Лево: текст */}
					<div className='flex-1 min-w-0 font-golos'>
						<h2 className='w-full font-golos text-[20px] font-semibold text-contrast md:text-[24px] lg:text-[30px] xl:text-[40px]'>
							{finalTitle}
						</h2>

						<div className='mt-5 max-w-[560px]'>
							<p className='font-golos text-[16px] font-normal lg:text-[21px]'>
								{finalText}
							</p>

							<p className='mt-2.5 text-[16px] font-semibold text-contrast lg:text-[21px]'>
								Наша задача — обеспечить вам прозрачность, актуальную информацию
								и профессиональное сопровождение на всех этапах
							</p>

							<ul className='mt-2.5 flex flex-col gap-2.5 text-[14px]'>
								<li className='relative flex gap-2'>
									<span className='absolute left-[10px] top-[4px] mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-black' />
									<div>
										<p className='pl-6 font-golos text-[16px] font-semibold text-black lg:text-[21px]'>
											Подбор оптимального варианта
										</p>
										<p className='font-inter text-[14px] font-normal text-[#797c85] lg:text-[21px]'>
											Расскажем, где предусмотрены более высокие выплаты, какие
											части принимают быстрее и какие требования предъявляются к
											кандидатам
										</p>
									</div>
								</li>

								<li className='relative flex gap-2'>
									<span className='absolute left-[10px] top-[4px] mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-black' />
									<div>
										<p className='pl-6 font-golos text-[16px] font-semibold text-black lg:text-[21px]'>
											Профессиональное сопровождение
										</p>
										<p className='font-inter text-[14px] font-normal text-[#797c85] lg:text-[21px]'>
											Кураторы с опытом работы в подборе контрактников объяснят
											условия службы, подготовят документы и помогут пройти
											оформление
										</p>
									</div>
								</li>

								<li className='relative flex gap-2'>
									<span className='absolute left-[10px] top-[4px] mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-black' />
									<div>
										<p className='pl-6 font-golos text-[16px] font-semibold text-black lg:text-[21px]'>
											Организация выезда и прибытия
										</p>
										<p className='font-inter text-[14px] font-normal text-[#797c85] lg:text-[21px]'>
											Мы подскажем по билетам, маршрутам, подготовке к поездке и
											обеспечим поддержку на месте оформления
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>

					{/* Право: картинка */}
					<div className='flex-1 min-w-0 w-full md:flex md:justify-end'>
						<img
							src='/images/dronm.webp'
							alt='Дрон'
							className='hidden h-full w-full rounded-[30px] object-cover md:block'
							loading='lazy'
							decoding='async'
						/>
						<img
							src='/images/drons.webp'
							alt='Дрон'
							className='w-full rounded-[30px] object-cover md:hidden'
							loading='lazy'
							decoding='async'
						/>
					</div>
				</div>

				{/* Низ: статистика */}
				<div className='mt-5 rounded-[20px] bg-white p-5 shadow-item lg:mt-10'>
					<ul className='grid grid-cols-1 gap-5 font-golos md:grid-cols-5 lg:gap-13'>
						<StatItem value='2022' label='Начало работы организации' />
						<StatItem
							value='11'
							label='Городов, с которыми мы сотрудничаем напрямую'
						/>
						<StatItem
							value='2500+'
							label='Кандидатов выбрали части с нашей помощью'
						/>
						<StatItem
							value='15+'
							label='Направлений и войск, куда проходит набор'
						/>
						<StatItem
							value='99%'
							label='Кандидатов рекомендуют нас после оформления'
						/>
					</ul>
				</div>
			</div>
		</section>
	)
}

function StatItem({ value, label }: { value: string; label: string }) {
	return (
		<li className='flex w-full flex-col gap-2.5 md:max-w-[130px] lg:max-w-[190px]'>
			<p className='text-[20px] font-semibold leading-none text-contrast'>
				{value}
			</p>
			<p className='text-[14px] font-medium text-black'>{label}</p>
		</li>
	)
}
