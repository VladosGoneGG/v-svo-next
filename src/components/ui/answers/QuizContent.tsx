'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useEffect, useRef } from 'react'

import OptionButton from '@/components/ui/answers/OptionButton'

import type { QuizContentProps } from './types'

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1]
const DURATION = 0.3

const listSwap = {
	initial: { opacity: 0, y: 0 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 0 },
} as const

export default function QuizContent({
	currentStep,
	pickedValue,
	onPick,
	register,
}: QuizContentProps) {
	if (!currentStep) return null

	// определяем “новые блоки” или “те же, но другие тексты”
	const prevLenRef = useRef(currentStep.options.length)
	const len = currentStep.options.length
	const lengthChanged = prevLenRef.current !== len

	useEffect(() => {
		prevLenRef.current = len
	}, [len])

	const listKey = `${currentStep.field}-${currentStep.id}`

	return (
		<LayoutGroup id='quiz'>
			<motion.div className='flex flex-col gap-2.5 p-2.5'>
				{/* hidden поля (чтобы RHF считал их required) */}
				<input type='hidden' {...register('military', { required: true })} />
				<input type='hidden' {...register('health', { required: true })} />
				<input type='hidden' {...register('spec', { required: true })} />
				<input type='hidden' {...register('interest', { required: true })} />
				<input type='hidden' {...register('priority', { required: true })} />

				{/* Список */}
				<motion.div
					layout
					transition={{ duration: DURATION, ease: EASE }}
					style={{ overflow: 'hidden' }}
				>
					{lengthChanged ? (
						<AnimatePresence initial={false} mode='wait'>
							<motion.div
								key={listKey}
								variants={listSwap}
								initial='initial'
								animate='animate'
								exit='exit'
								transition={{ duration: DURATION, ease: EASE }}
								className='flex flex-col gap-2.5'
							>
								{currentStep.options.map(opt => (
									<motion.div
										key={`${currentStep.field}-${opt.id}`}
										layout='position'
										transition={{ duration: DURATION, ease: EASE }}
										style={{ willChange: 'transform' }}
									>
										<OptionButton
											opt={opt}
											checked={pickedValue === opt.id}
											onPick={onPick}
										/>
									</motion.div>
								))}
							</motion.div>
						</AnimatePresence>
					) : (
						<motion.div className='flex flex-col gap-2.5'>
							{currentStep.options.map(opt => (
								<motion.div
									key={`${currentStep.field}-${opt.id}`}
									layout='position'
									transition={{ duration: DURATION, ease: EASE }}
									style={{ willChange: 'transform' }}
								>
									<OptionButton
										opt={opt}
										checked={pickedValue === opt.id}
										onPick={onPick}
										animateLabel
									/>
								</motion.div>
							))}
						</motion.div>
					)}
				</motion.div>
			</motion.div>
		</LayoutGroup>
	)
}
