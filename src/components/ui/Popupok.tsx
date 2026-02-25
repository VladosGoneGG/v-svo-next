'use client'

type PopupokProps = {
	onClose: () => void
}

const Popupok = ({ onClose }: PopupokProps) => {
	return (
		<div className='relative w-full max-w-[700px]'>
			{/* Close button */}
			<button
				type='button'
				onClick={e => {
					e.stopPropagation()
					onClose()
				}}
				aria-label='Закрыть'
				className='absolute right-3 top-4 md:right-6  inline-flex items-center justify-center p-2 cursor-pointer'
			>
				<img
					src='/icons/closeicon.svg'
					alt=''
					className='h-[14px] w-[14px] pointer-events-none'
					loading='lazy'
					decoding='async'
				/>
			</button>

			{/* Clickable content */}
			<button
				type='button'
				onClick={onClose}
				className='w-full flex flex-col bg-[#F9F9F9] rounded-[30px] text-left cursor-pointer'
			>
				<div className='flex flex-col gap-2.5 md:gap-5 font-golos p-5 md:px-15 md:py-10 lg:p-20'>
					<p className='font-semibold text-contrast text-[24px] md:text-[30px] lg:text-[40px] text-center'>
						Ваша заявка зарегистрирована!
					</p>
					<p className='font-normal text-[16px] md:text-[21px] text-center'>
						Мы перезваниваем в течение 5-30 минут, если сейчас рабочее время (с
						9:00 до 20:00 по Московскому времени)
					</p>
					<p className='mt-2 text-center text-[12px] opacity-70'>
						Нажмите, чтобы закрыть
					</p>
				</div>
			</button>
		</div>
	)
}

export default Popupok
