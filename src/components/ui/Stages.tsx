import DashedBorder from '@/components/ui/DashedBorder'
import Fullbleed from '@/components/ui/Fullbleed'

type BorderProps = {
	stroke: string
	strokeWidth: number
	dashArray: string
	radius: number
}

function MaskIcon({
	src,
	className,
	colorClassName = 'bg-[#797c85]',
}: {
	src: string
	className?: string
	colorClassName?: string
}) {
	return (
		<span
			aria-hidden='true'
			className={[
				'inline-block shrink-0',
				// размер иконки можно подстроить, пока оставляю средний
				'h-[28px] w-[28px]',
				colorClassName,
				className ?? '',
			].join(' ')}
			style={{
				WebkitMaskImage: `url(${src})`,
				maskImage: `url(${src})`,
				WebkitMaskRepeat: 'no-repeat',
				maskRepeat: 'no-repeat',
				WebkitMaskPosition: 'center',
				maskPosition: 'center',
				WebkitMaskSize: 'contain',
				maskSize: 'contain',
			}}
		/>
	)
}

export default function Stages() {
	const dashedCard =
		'relative overflow-hidden flex gap-2.5 bg-white rounded-[20px] pl-7.5 p-5'

	const borderProps: BorderProps = {
		stroke: 'rgba(121,124,133,0.6)',
		strokeWidth: 2,
		dashArray: '10 10',
		radius: 20,
	}

	return (
		<section className='relative flex flex-col items-start justify-center px-2.5 py-5 min-[1199px]:px-[20px] lg:py-[30px] xl:py-[40px]'>
			<Fullbleed className='bg-white' />

			<div className='w-full max-w-[405px] max-[766px]:max-w-none md:max-w-none'>
				<div className='w-full max-w-[405px] max-[766px]:max-w-none md:max-w-none'>
					<h2 className='w-full max-w-[365px] font-inter text-[20px] font-semibold text-contrast max-[766px]:max-w-none md:max-w-none md:text-[24px] lg:text-[30px] xl:text-[40px]'>
						Этапы заключения контракта
					</h2>
				</div>

				<div className='mt-5 flex w-full items-center justify-center lg:mt-7.5'>
					<ul className='flex flex-col gap-5 font-golos md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-2.5 lg:grid-cols-3 xl:min-h-[491px]'>
						{/* 1 */}
						<li className={dashedCard}>
							<DashedBorder {...borderProps} />

							<div className='relative z-10 flex w-full flex-col gap-2.5 min-[425px]:max-w-[414px] min-[525px]:max-w-[600px]'>
								<p className='text-[20px] font-semibold text-contrast'>
									Оставьте заявку
								</p>
								<p className='text-[14px] font-medium'>
									Оставьте заявку заранее, чтобы мы проверили вашу годность,
									подготовили необходимые документы и предоставили актуальную
									информацию о службе по контракту
								</p>
							</div>

							<div className='relative z-10 mt-2.5 flex h-[90px] w-[45px] flex-col items-center justify-center gap-5'>
								<MaskIcon src='/icons/st-1.svg' />
								<p className='text-[18px] font-semibold text-contrast'>01</p>
							</div>
						</li>

						{/* 2 */}
						<li className={dashedCard}>
							<DashedBorder {...borderProps} />

							<div className='relative z-10 flex w-full flex-col gap-2.5 min-[425px]:max-w-[414px] min-[525px]:max-w-[600px]'>
								<p className='text-[20px] font-semibold text-contrast'>
									Консультация
								</p>
								<p className='text-[14px] font-medium'>
									Куратор ответит на ваши вопросы, разъяснит условия службы,
									выплаты, требования ВВК и поможет выбрать подходящее
									направление. С этого момента вы будете сопровождаться на
									каждом этапе оформления
								</p>
							</div>

							<div className='relative z-10 mt-2.5 flex h-[90px] w-[45px] flex-col items-center justify-center gap-5'>
								<MaskIcon src='/icons/st-2.svg' />
								<p className='text-[18px] font-semibold text-contrast'>02</p>
							</div>
						</li>

						{/* 3 */}
						<li className={`${dashedCard} lg:col-start-1 lg:row-start-2`}>
							<DashedBorder {...borderProps} />

							<div className='relative z-10 flex w-full flex-col gap-2.5 min-[425px]:max-w-[414px] min-[525px]:max-w-[600px]'>
								<p className='text-[20px] font-semibold text-contrast'>
									Подготовка и выезд
								</p>
								<p className='text-[14px] font-medium'>
									Мы согласуем удобную дату прибытия, проконсультируем по
									билетам и маршруту, а также поможем с организационными
									вопросами для приезжих. На месте вас встретят и проведут к
									пункту оформления
								</p>
							</div>

							<div className='relative z-10 mt-2.5 flex h-[90px] w-[45px] flex-col items-center justify-center gap-5'>
								<MaskIcon src='/icons/st-3.svg' />
								<p className='text-[18px] font-semibold text-contrast'>03</p>
							</div>
						</li>

						{/* 4 */}
						<li className={`${dashedCard} lg:col-start-2 lg:row-start-2`}>
							<DashedBorder {...borderProps} />

							<div className='relative z-10 flex w-full flex-col gap-2.5 min-[425px]:max-w-[414px] min-[525px]:max-w-[600px]'>
								<p className='text-[20px] font-semibold text-contrast'>
									Оформление и подписание контракта
								</p>
								<p className='text-[14px] font-medium'>
									В течение 1–2 дней вы пройдете оформление документов, ВВК (при
									необходимости) и подпишете контракт с Министерством обороны
									РФ. После подписания вы получаете право на все предусмотренные
									выплаты и льготы
								</p>
							</div>

							<div className='relative z-10 mt-2.5 flex h-[90px] w-[45px] flex-col items-center justify-center gap-5'>
								<MaskIcon src='/icons/st-4.svg' />
								<p className='text-[18px] font-semibold text-contrast'>04</p>
							</div>
						</li>

						{/* правая колонка (lg): 5 + 6 */}
						<li className='hidden lg:col-start-3 lg:row-start-1 lg:row-span-2 lg:block'>
							<div className='flex h-full flex-col gap-2.5'>
								{/* 5 */}
								<div className={`${dashedCard} lg:min-h-[312px]`}>
									<DashedBorder {...borderProps} />

									<div className='relative z-10 flex w-full flex-col gap-2.5'>
										<p className='text-[20px] font-semibold text-contrast'>
											Начало службы
										</p>
										<p className='text-[14px] font-medium'>
											После оформления вам выдадут{' '}
											<br className='hidden xl:block' /> экипировку, проведут
											обучение и <br className='hidden xl:block' /> направят в
											выбранную часть. <br className='hidden xl:block' />{' '}
											Сопровождение сохраняется на всех{' '}
											<br className='hidden xl:block' /> этапах, включая период
											адаптации
										</p>
									</div>

									<div className='relative z-10 mt-2.5 flex h-[90px] w-[45px] flex-col items-center justify-center gap-5'>
										<MaskIcon src='/icons/st-5.svg' />
										<p className='text-[18px] font-semibold text-contrast'>
											05
										</p>
									</div>
								</div>

								{/* 6 */}
								<div className='flex gap-2.5 rounded-[20px] bg-black p-2.5 shadow-item md:p-5 md:pl-7.5'>
									<div className='flex w-full flex-col gap-2.5'>
										<p className='text-[20px] font-semibold text-white'>
											Мы сопровождаем кандидата от первого обращения до начала
											службы
										</p>
										<p className='text-[14px] font-medium text-white'>
											— разъясняем требования, помогаем подготовиться и
											контролируем все этапы оформления
										</p>
									</div>
								</div>
							</div>
						</li>

						{/* 5 и 6 для md / sm */}
						<li className={`${dashedCard} lg:hidden`}>
							<DashedBorder {...borderProps} />

							<div className='relative z-10 flex w-full gap-2.5 rounded-[20px]'>
								<div className='flex w-full flex-col gap-2.5'>
									<p className='text-[20px] font-semibold text-contrast'>
										Начало службы
									</p>
									<p className='text-[14px] font-medium'>
										После оформления вам выдадут экипировку, проведут обучение и
										направят в выбранную часть. Сопровождение сохраняется на
										всех этапах, включая период адаптации
									</p>
								</div>

								<div className='mt-2.5 flex h-[90px] w-[45px] flex-col items-center justify-center gap-5'>
									<MaskIcon src='/icons/st-5.svg' />
									<p className='text-[18px] font-semibold text-contrast'>05</p>
								</div>
							</div>
						</li>

						<li className='flex w-full gap-2.5 rounded-[20px] bg-black p-5 pl-7.5 shadow-item lg:hidden'>
							<div className='flex w-full gap-2.5 rounded-[20px]'>
								<div className='flex w-full flex-col gap-2.5'>
									<p className='text-[20px] font-semibold text-white'>
										Мы сопровождаем кандидата от первого обращения до начала
										службы
									</p>
									<p className='text-[14px] font-medium text-white'>
										— разъясняем требования, помогаем подготовиться и
										контролируем все этапы оформления
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
