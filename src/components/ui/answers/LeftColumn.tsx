'use client'

import { AnimatePresence, motion } from 'motion/react'

import DashedBorder from '@/components/ui/DashedBorder'
import ContactsForm from '@/components/ui/answers/ContactsForm'
import LeftHeader from '@/components/ui/answers/LeftHeader'
import QuizContent from '@/components/ui/answers/QuizContent'

import type { LeftColumnProps } from './types'

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1]
const DURATION = 0.3

const fadeSwap = {
	initial: { opacity: 0, y: 6 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -6 },
} as const

export default function LeftColumn({
	meta,
	isContacts,
	currentStep,
	pickedValue,
	onPick,
	register,
	errors,
	agree,
	onToggleAgree,
	onContactsSubmit,
	birthDateValidate,
}: LeftColumnProps) {
	const headerKey = `${isContacts ? 'contacts' : 'step'}-${currentStep?.id ?? 0}`
	const bodyKey = isContacts ? 'contacts' : `step-${currentStep?.id ?? 0}`

	const birthDatePlacement =
		currentStep?.id === 2 ? 'top' : currentStep?.id === 3 ? 'bottom' : 'none'

	return (
		<div className='order-2 md:order-1 relative flex w-full flex-col md:min-w-[414px]'>
			<div className='pointer-events-none absolute -inset-[0px]'>
				<DashedBorder strokeWidth={2} dashArray='10 10' radius={20} />
			</div>

			<AnimatePresence mode='wait'>
				<motion.div
					key={headerKey}
					variants={fadeSwap}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={{ duration: DURATION, ease: EASE }}
				>
					<LeftHeader counter={meta.counter} title={meta.title} />
				</motion.div>
			</AnimatePresence>

			{/* контейнер анимирует только size */}
			<motion.div
				layout='size'
				transition={{ duration: DURATION, ease: EASE }}
				className='relative overflow-hidden'
			>
				<AnimatePresence mode='popLayout' initial={false}>
					<motion.div
						key={bodyKey}
						layout='position'
						variants={fadeSwap}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: DURATION, ease: EASE }}
					>
						{isContacts ? (
							<ContactsForm
								register={register}
								errors={errors}
								agree={agree}
								onToggleAgree={onToggleAgree}
								onSubmit={onContactsSubmit}
							/>
						) : (
							<QuizContent
								currentStep={currentStep}
								pickedValue={pickedValue}
								onPick={onPick}
								register={register}
								errors={errors}
								birthDateValidate={birthDateValidate}
								birthDatePlacement={birthDatePlacement}
							/>
						)}
					</motion.div>
				</AnimatePresence>
			</motion.div>
		</div>
	)
}
