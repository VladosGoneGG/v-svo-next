export default function Heroicons() {
	return (
		<div
			className='
        mx-auto w-full px-2 pb-2
        max-w-[505px] md:max-w-none
        h-auto min-[959px]:min-h-[75px]
      '
		>
			<ul
				className='
          grid grid-cols-2 gap-5
          md:grid-cols-4 md:gap-2
          py-2.5 md:pb-0
          font-golos font-medium text-black
          max-[330px]:text-[12px] text-[14px]
        '
			>
				<li className='flex items-center gap-4 h-[74px]'>
					<span
						className="
			h-[22px] w-[22px] shrink-0
			bg-contrast
			[mask-image:url('/icons/hi-1.svg')]
			[mask-repeat:no-repeat]
			[mask-position:center]
			[mask-size:contain]
		"
						aria-hidden
					/>
					<p className='max-w-[205.75px]'>
						Предоставляем <br className='block min-[765px]:hidden' /> отношение
					</p>
				</li>

				<li
					className='
            flex items-center gap-4
            w-full max-[360px]:justify-start
            h-[74px]
            min-[959px]:h-[74px] min-[959px]:max-w-[289.75px]
          '
				>
					<img
						src='/icons/hi-2.svg'
						alt='Проезд'
						className='h-[22px] w-[22px] shrink-0'
					/>
					<p className='w-full max-w-[205.75px] h-auto'>
						Оплатим проезд и проживание
					</p>
				</li>

				<li
					className='
            flex items-center gap-4
            w-full max-[360px]:justify-start
            h-auto min-[959px]:h-[74px]
            min-[959px]:max-w-[289.75px]
          '
				>
					<img
						src='/icons/hi-3.svg'
						alt='Экипировка'
						className='h-[22px] w-[22px] shrink-0'
					/>
					<p className='w-full max-w-[205.75px] h-auto'>
						Современная экипировка и вооружение
					</p>
				</li>

				<li
					className='
            flex items-center gap-4
            w-full max-[360px]:justify-start
            h-auto min-[959px]:h-[74px]
            min-[959px]:max-w-[289.75px]
          '
				>
					<img
						src='/icons/hi-4.svg'
						alt='Условия'
						className='h-[22px] w-[22px] shrink-0'
					/>
					<p className='w-full max-w-[205.75px] h-auto'>
						Подберём регион с лучшими условиями
					</p>
				</li>
			</ul>
		</div>
	)
}
