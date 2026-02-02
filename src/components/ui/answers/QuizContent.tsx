'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useEffect, useRef } from 'react'

import BirthDateField from '@/components/ui/answers/BirthDateField'
import OptionButton from '@/components/ui/answers/OptionButton'

import type { QuizContentProps } from './types'

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1]
const DURATION = 0.3

const appear = {
	initial: { opacity: 0, y: 6 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -6 },
} as const

const listSwap = {
	initial: { opacity: 0, y: 8 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -8 },
} as const

export default function QuizContent({
	currentStep,
	pickedValue,
	onPick,
	register,
	errors,
	birthDateValidate,
	birthDatePlacement,
}: QuizContentProps) {
	if (!currentStep) return null

	// 3 шаг: поле "свой вариант" (завязано на spec)
	const isThirdStep = currentStep.field === 'spec'

	// BirthDate показываем как раньше, но не на 3 шаге
	const showBirth = birthDatePlacement !== 'none' && !isThirdStep
	const showBirthTop = birthDatePlacement === 'top'
	const showBirthBottom = birthDatePlacement === 'bottom'

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

				{/* BirthDate TOP */}
				{showBirthTop && (
					<motion.div layout transition={{ duration: DURATION, ease: EASE }}>
						<AnimatePresence initial={false} mode='sync'>
							{showBirth && (
								<motion.div
									key={`birthdate-top-${currentStep.id}`}
									layout
									variants={appear}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{ duration: DURATION, ease: EASE }}
								>
									<BirthDateField
										register={register}
										error={errors.birthDate}
										validate={birthDateValidate}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}

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

				{/* На 3 шаге — поле "Свой вариант" */}
				{isThirdStep && (
					<motion.div
						layout
						variants={appear}
						initial='initial'
						animate='animate'
						exit='exit'
						transition={{ duration: DURATION, ease: EASE }}
					>
						<input
							{...register('customSpec', {
								validate: v => {
									if (pickedValue !== 'custom') return true
									const s = String(v ?? '').trim()
									if (s.length === 0) return 'Введите свой вариант'
									if (s.length < 2) return 'Слишком коротко'
									return true
								},
							})}
							placeholder='Свой вариант'
							className='w-full h-[55px] max-[426px]:h-[44px] rounded-[10px] bg-white px-4 text-black outline-none'
							onChange={e => {
								const v = e.target.value.trim()
								if (v.length > 0) onPick('custom')
								// если стерли — можно сбросить выбор (пустая строка)
								else onPick('')
							}}
						/>

						{errors.customSpec?.message ? (
							<p className='mt-1 text-[14px] leading-tight text-red-400 max-[426px]:text-[12px]'>
								{String(errors.customSpec.message)}
							</p>
						) : null}
					</motion.div>
				)}

				{/* BirthDate BOTTOM */}
				{showBirthBottom && (
					<motion.div layout transition={{ duration: DURATION, ease: EASE }}>
						<AnimatePresence initial={false} mode='sync'>
							{showBirth && (
								<motion.div
									key={`birthdate-bottom-${currentStep.id}`}
									layout
									variants={appear}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{ duration: DURATION, ease: EASE }}
								>
									<BirthDateField
										register={register}
										error={errors.birthDate}
										validate={birthDateValidate}
									/>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</motion.div>
		</LayoutGroup>
	)
}
