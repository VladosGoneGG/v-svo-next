'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { NavButtonsProps } from './types'

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1]
const DURATION = 0.3

const backBtn = {
	initial: { opacity: 0, scale: 0.96, x: -6 },
	animate: { opacity: 1, scale: 1, x: 0 },
	exit: { opacity: 0, scale: 0.96, x: -6 },
} as const

const labelSwap = {
	initial: { opacity: 0, y: 6 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -6 },
} as const

export default function NavButtons({
	step,
	isContacts,
	canNextQuiz,
	canSubmit,
	isSubmitting,
	onBack,
	onNext,
}: NavButtonsProps) {
	const showBack = step > 1 || isContacts
	const mainDisabled = isContacts ? !canSubmit || isSubmitting : !canNextQuiz

	return (
		<motion.div
			layout
			transition={{ duration: DURATION, ease: EASE }}
			className='flex gap-5'
		>
			<AnimatePresence initial={false}>
				{showBack && (
					<motion.button
						key='back'
						type='button'
						onClick={onBack}
						variants={backBtn}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: DURATION, ease: EASE }}
						whileHover={{ filter: 'brightness(1.08)' }}
						whileTap={{ scale: 0.97, y: 1 }}
						className='flex h-[62px] w-[78px] cursor-pointer items-center justify-center rounded-[15px] bg-[#6b6e76] transition duration-150 ease-in-out'
						aria-label='Назад'
					>
						<span className='rotate-180'>
							<img src='/icons/next.svg' alt='' className='h-5 w-5' />
						</span>
					</motion.button>
				)}
			</AnimatePresence>

			{/* Основная кнопка */}
			<motion.button
				layout
				type={isContacts ? 'submit' : 'button'}
				form={isContacts ? 'contactsForm' : undefined}
				onClick={isContacts ? undefined : onNext}
				disabled={mainDisabled}
				transition={{ duration: DURATION, ease: EASE }}
				whileTap={mainDisabled ? undefined : { scale: 0.97, y: 1 }}
				className={[
					'w-full h-[62px] rounded-[15px] bg-contrast/90 hover:bg-contrast text-white',
					'font-inter font-semibold text-[18px]',
					'disabled:opacity-50 flex items-center justify-center gap-5 cursor-pointer',
					'transition-colors duration-150 ease-in-out',
				].join(' ')}
			>
				<AnimatePresence mode='wait' initial={false}>
					<motion.span
						key={isContacts ? 'submit' : 'next'}
						variants={labelSwap}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: DURATION, ease: EASE }}
						className='inline-flex items-center'
					>
						{isContacts ? 'Получить условия' : 'Далее'}
					</motion.span>
				</AnimatePresence>

				<AnimatePresence initial={false}>
					{!isContacts && (
						<motion.span
							key='nextIcon'
							initial={{ opacity: 0, x: -4 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -4 }}
							transition={{ duration: DURATION, ease: EASE }}
							className='inline-flex'
						>
							<img src='/icons/next.svg' alt='' className='h-5 w-5' />
						</motion.span>
					)}
				</AnimatePresence>
			</motion.button>
		</motion.div>
	)
}
