'use client'

import type { HeroProps } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo } from 'react'

import Heroicons from '@/components/ui/Heroicons'
import Modal from '@/components/ui/Modal'
import Popup from '@/components/ui/Popup'
import Popupok from '@/components/ui/Popupok'
import { usePopupFlow } from '@/hooks/usePopupFlow'

const DEFAULT_CONTENT = {
	title: 'Оформление контракта на СВО',
	subtitle: 'официальное сопровождение и выплаты до 7 000 000 руб.',
	text: [
		'Поможем пройти ВВК, подготовим документы и сопроводим до пункта подписания.',
		'Единовременная выплата до 3 000 000 руб. и ежемесячное довольствие от 210 000 руб.',
		'Работаем официально. Все условия - по приказам и постановлениям Минобороны РФ',
	],
} satisfies {
	title: string
	subtitle: string
	text: string[]
}

export default function HeroClient({ title, subtitle, text }: HeroProps) {
	const popup = usePopupFlow()

	const finalTitle = title ?? DEFAULT_CONTENT.title
	const finalSubtitle = subtitle ?? DEFAULT_CONTENT.subtitle

	const paragraphs = useMemo(() => {
		if (Array.isArray(text)) return text
		if (typeof text === 'string' && text.trim()) return [text]
		return DEFAULT_CONTENT.text
	}, [text])

	return (
		<section className='px-2.5 lg:px-5'>
			<div
				className={[
					'relative mx-auto w-full overflow-hidden rounded-[30px]',
					'w-full md:max-w-[1200px]',
					'min-h-[clamp(420px,55vw,620px)]',
					'flex',
					'px-[clamp(20px,3vw,44px)] py-[clamp(20px,3.2vw,48px)]',
					'text-white',
					// ВАЖНО: базовый фон, чтобы не просвечивало по углам
					'bg-black',
					'bg-cover bg-center bg-no-repeat',
				].join(' ')}
				style={{
					backgroundImage: 'url(/images/herobg.webp)',
				}}
			>
				{/* Оверлей как в ::before, но без CSS-модуля */}
				<div className='pointer-events-none absolute inset-0 rounded-[30px] bg-black/35' />

				<div className='relative z-10 flex w-full'>
					<div className='flex w-full items-end md:items-center'>
						<div className='flex w-full max-w-[350px] flex-col min-[550px]:max-w-[500px] md:max-w-[550px] xl:max-w-[650px]'>
							<div className='font-golos pb-[15px] min-[425px]:pb-[10px] min-[559px]:pb-[50px] xl:pb-[25px]'>
								<h1 className='text-[20px] font-semibold md:text-[24px] lg:text-[30px] xl:text-[45px]'>
									{finalTitle}
								</h1>

								<p className='mt-[clamp(6px,1vw,10px)] text-[18px] font-normal md:text-[22px] lg:text-[26px] xl:text-[35px]'>
									{finalSubtitle}
								</p>
							</div>

							<div className='font-golos mb-0 flex flex-col gap-2.5 text-[14px] min-[375px]:gap-5 min-[426px]:mb-2.5 md:text-[16px] lg:text-[21px]'>
								{paragraphs.map((p, idx) => (
									<p key={idx}>{p}</p>
								))}
							</div>

							<motion.button
								type='button'
								onClick={popup.open}
								className={[
									'w-full md:max-w-[450px]',
									'h-[37px] md:h-[62px]',
									'rounded-[10px]',
									'bg-contrast/90 shadow-btn hover:bg-contrast active:bg-contrast/70',
									'transition-colors duration-150 ease-in-out',
									'text-[14px] md:text-[18px] font-inter font-semibold',
									'cursor-pointer',
									'mt-[clamp(20px,1.2vw,14px)] min-[960px]:mt-[50px] xl:mt-[20px]',
									'px-4 sm:px-6',
								].join(' ')}
								whileTap={{ scale: 0.97 }}
								transition={{ duration: 0.15, ease: 'easeInOut' }}
							>
								Записаться на оформление контракта
							</motion.button>
						</div>
					</div>
				</div>
			</div>

			<Heroicons />

			<Modal isOpen={popup.isOpen} onClose={popup.close}>
				<AnimatePresence mode='wait'>
					{popup.isSuccess ? (
						<motion.div
							key='success'
							initial={{ opacity: 0, y: 10, scale: 0.99 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -8, scale: 0.99 }}
							transition={{ duration: 0.18 }}
						>
							<Popupok onClose={popup.close} />
						</motion.div>
					) : (
						<motion.div
							key='form'
							initial={{ opacity: 0, y: 10, scale: 0.99 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -8, scale: 0.99 }}
							transition={{ duration: 0.18 }}
						>
							<Popup onSuccess={popup.success} />
						</motion.div>
					)}
				</AnimatePresence>
			</Modal>
		</section>
	)
}
