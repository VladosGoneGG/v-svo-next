'use client'

import type { HeroProps } from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useMemo } from 'react'

import Heroicons from '@/components/ui/Heroicons'
import Modal from '@/components/ui/Modal'
import Popup from '@/components/ui/Popup'
import Popupok from '@/components/ui/Popupok'
import { usePopupFlow } from '@/hooks/usePopupFlow'

const DEFAULT_CONTENT = {
	title: 'СВО по контракту:',
	subtitle: 'Служба по контракту в армии РФ',
	text: ['до 3 000 000 единовременно', 'от 210 000 ежемесячно'],
} satisfies { title: string; subtitle: string; text: string[] }

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
		<section className='px-2.5 xl:px-5'>
			<div
				className={[
					'relative isolate mx-auto w-full overflow-hidden rounded-[40px]',
					'w-full',
					'min-h-[420px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[650px]',
					'flex',
					'px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-11 xl:py-12',
					'text-white',
				].join(' ')}
			>
				{/* BACKDROP: заполняет блок без пустот */}
				<div className='pointer-events-none absolute inset-0 -z-10'>
					<Image
						src='/images/herobg.webp'
						alt=''
						fill
						priority
						sizes='(max-width: 768px) 100vw, 1200px'
						className='object-cover object-center scale-110 '
					/>
				</div>

				{/* Content */}
				<div className='relative z-10 flex w-full '>
					<div className='flex w-full items-end '>
						<div className='flex w-full max-w-[350px] flex-col min-[550px]:max-w-[500px] md:max-w-[550px] xl:max-w-[650px] backdrop-blur-[2px]'>
							<div className='font-golos pb-[15px] min-[425px]:pb-[10px]  xl:pb-[25px]'>
								<h1 className='text-[20px] font-semibold md:text-[24px] lg:text-[30px] xl:text-[45px]'>
									{finalTitle}
								</h1>

								<p className='mt-2 sm:mt-2.5 md:mt-2.5 lg:mt-3 text-[18px] font-normal md:text-[22px] lg:text-[26px] xl:text-[35px]'>
									{finalSubtitle}
								</p>
							</div>

							<div className='font-golos mb-0 flex flex-row gap-2.5 text-[14px] min-[375px]:gap-5 min-[426px]:mb-2.5 md:text-[16px] lg:text-[21px]'>
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
									'mt-5 sm:mt-4 md:mt-6 min-[960px]:mt-[50px] xl:mt-5',
									'px-4 sm:px-6',
								].join(' ')}
								whileTap={{ scale: 0.97 }}
								transition={{ duration: 0.15, ease: 'easeInOut' }}
							>
								Получить бесплатную консультацию
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
							<Popup onSuccess={popup.success} onClose={popup.close} />
						</motion.div>
					)}
				</AnimatePresence>
			</Modal>
		</section>
	)
}
