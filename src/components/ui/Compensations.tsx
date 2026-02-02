import Fullbleed from '@/components/ui/Fullbleed'

type CompensationItem = {
	title: string
	amount: string
	desc: string
	h: string
	minH: string
	col: string
}

const ITEMS: readonly CompensationItem[] = [
	{
		title: 'Единовременная выплата',
		amount: 'до 3 000 000 руб.',
		desc: 'по региональным и федеральным программам',
		h: 'h-[96px]',
		minH: 'max-[425px]:min-h-[96px]',
		col: 'md:col-span-2 lg:col-span-1',
	},
	{
		title: 'Ежемесячная оплата труда',
		amount: 'от 210 000 руб.',
		desc: 'с учетом всех надбавок и премий за службу в зоне СВО',
		h: 'h-[115px]',
		minH: 'max-[425px]:min-h-[115px]',
		col: 'md:col-span-2 lg:col-span-1',
	},
	{
		title: 'Выплата при ранении',
		amount: 'до 3 000 000 руб.',
		desc: 'по степени тяжести',
		h: 'h-[96px]',
		minH: 'max-[425px]:min-h-[96px]',
		col: 'md:col-span-2 lg:col-span-1',
	},
	{
		title: 'Страховая выплата семье военнослужащего',
		amount: '12 400 000 руб.',
		desc: 'по федеральному законодательству',
		h: 'h-[96px]',
		minH: 'max-[425px]:min-h-[96px]',
		col: 'md:col-span-2 lg:col-span-1',
	},
	{
		title: 'Списание долгов и кредитов',
		amount: 'до 10 000 000 руб.',
		desc: 'для участников боевых действий',
		h: 'h-[96px]',
		minH: 'max-[425px]:min-h-[96px]',
		col: 'md:col-span-2 lg:col-span-1',
	},
	{
		title: 'Выплата за уничтожение техники противника',
		amount: 'до 500 000 руб.',
		desc: 'в зависимости от типа цели',
		h: 'h-[96px]',
		minH: 'max-[425px]:min-h-[96px]',
		col: 'md:col-span-2 lg:col-span-1',
	},
	{
		title: 'Доплата за продижение',
		amount: '50 000 руб.',
		desc: 'за каждый километр',
		h: 'h-[96px]',
		minH: 'max-[425px]:min-h-[96px]',
		col: 'md:col-span-3 lg:col-span-1',
	},
	{
		title: 'Выплата за захват техники',
		amount: '1 000 000 руб.',
		desc: 'по установленным нормативам Министерства Обороны',
		h: 'h-[115px]',
		minH: 'max-[425px]:min-h-[115px]',
		col: 'md:col-span-3 lg:col-span-1',
	},
] as const

const liBase =
	'flex items-center shadow-item max-[425px]:items-start ' +
	'max-[425px]:h-auto ' +
	'md:h-auto md:min-h-0 md:items-start ' +
	'w-full rounded-[20px] bg-[#1d1e21]'

const innerBase =
	'flex flex-col justify-center items-start w-full ' +
	'h-[66px] max-[425px]:h-auto md:h-auto ' +
	'px-[25px] py-[15px] lg:px-[30px] lg:pt-[20px] lg:pb-[28px] xl:px-[40px] xl:py-[30px]'

export default function Compensations() {
	return (
		<section
			id='payments'
			className='relative flex flex-col items-center pt-7.5 pb-5 lg:pb-[30px] xl:pb-[40px] scroll-mt-20'
		>
			<Fullbleed className='bg-white' />

			<div
				className='
          relative flex w-full flex-col gap-5
          px-2.5 min-[1199px]:px-[20px]
          max-[425px]:h-auto
        '
			>
				<div className='w-full max-w-[405px] max-[766px]:max-w-none md:max-w-none'>
					<h2 className='w-full max-w-[365px] max-[766px]:max-w-none px-5 font-inter text-[20px] font-semibold md:max-w-none md:text-[24px] lg:pb-2.5 lg:text-[30px] xl:text-[40px]'>
						Выплаты и компенсации по контракту СВО в 2025 году
					</h2>
				</div>

				<div className='w-full'>
					<ul
						className='
              flex w-full flex-col gap-2.5
              md:grid md:min-h-[428px] md:grid-cols-6 md:gap-2.5
              lg:min-h-[550px] lg:grid-cols-2
              min-[1199px]:min-h-[652px]
            '
					>
						{ITEMS.map(item => (
							<li
								key={item.title}
								className={`${liBase} ${item.h} ${item.minH} ${item.col}`}
							>
								<div className={innerBase}>
									<p className='font-inter text-[14px] font-normal text-white lg:text-[21px]'>
										{item.title}
									</p>

									<p className='font-inter font-semibold text-contrast lg:text-[24px] xl:text-[30px]'>
										{item.amount}
									</p>

									<p className='font-golos text-[14px] font-medium text-[#797c85]'>
										{item.desc}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div className='flex w-full max-w-[405px] items-center justify-center max-[766px]:max-w-none max-[425px]:h-auto md:max-w-none'>
					<h3 className='w-full max-w-[365px] px-5 font-inter text-[18px] font-semibold text-black max-[766px]:max-w-none md:max-w-none md:text-[22px] lg:pt-2.5 lg:text-[24px] xl:text-[30px]'>
						Все выплаты - официальные. Помогаем разобраться в условиях и
						получить положенные суммы
					</h3>
				</div>
			</div>
		</section>
	)
}
