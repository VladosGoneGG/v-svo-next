'use client'

import { useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { usePopupFlow } from '@/hooks/usePopupFlow'

import Header from '@/components/ui/answers/Header'
import LeftColumn from '@/components/ui/answers/LeftColumn'
import RightColumn from '@/components/ui/answers/RightColumn'

import { STEPS } from '@/components/ui/answers/steps'
import type { QuizFormValues } from '@/components/ui/answers/types'
import { makeOptionsLabelMap } from '@/components/ui/answers/utils'
import {
	isValidBirthDate,
	isValidRuPhone,
} from '@/components/ui/answers/validators'

import Modal from '@/components/ui/Modal'
import Popupok from '@/components/ui/Popupok'

type StepId = (typeof STEPS)[number]['id']
type Step = (typeof STEPS)[number]
type StepField = Step['field']

const FIRST_STEP_ID = STEPS[0]?.id ?? 1
const LAST_STEP_ID = STEPS[STEPS.length - 1]?.id ?? 5

export default function AnswersClient() {
	const [step, setStep] = useState<StepId>(FIRST_STEP_ID as StepId)
	const [isContacts, setIsContacts] = useState(false)

	const okPopup = usePopupFlow()

	// фронтовой антиспам (временное решение)
	const [isSending, setIsSending] = useState(false)
	const lastSentAtRef = useRef(0)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		trigger,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<QuizFormValues>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			military: '',
			birthDate: '',
			health: '',
			spec: '',
			customSpec: '',
			interest: '',
			priority: '',
			name: '',
			phone: '',
			agree: false,
		},
	})

	const borderProps = useMemo(
		() => ({
			strokeWidth: 2,
			dashArray: '2.5 2.5',
			radius: 4,
		}),
		[],
	)

	const currentStep = useMemo<Step | undefined>(
		() => STEPS.find(s => s.id === step),
		[step],
	)

	const meta = useMemo(() => {
		if (isContacts) {
			return {
				counter: '',
				title: 'Оставьте контакты, что бы специалист связался с вами',
				artemText:
					'Спасибо! На основании ваших ответов мы подготовим для вас индивидуальные условия',
			}
		}
		return currentStep
	}, [isContacts, currentStep])

	const optionsLabelMap = useMemo(() => makeOptionsLabelMap(STEPS), [])

	// watch
	const birthDate = watch('birthDate')
	const name = watch('name')
	const phone = watch('phone')
	const agree = watch('agree')
	const customSpec = watch('customSpec')

	// picked value для текущего шага
	const stepField = currentStep?.field
	const pickedValue = stepField ? watch(stepField) : watch('military')

	const canNextQuiz = useMemo(() => {
		if (!currentStep) return false

		// шаг с датой рождения
		if (currentStep.id === 2) {
			return Boolean(pickedValue) && isValidBirthDate(birthDate)
		}

		// кастомная специальность
		if (currentStep.field === 'spec' && pickedValue === 'custom') {
			return Boolean((customSpec || '').trim())
		}

		return Boolean(pickedValue)
	}, [currentStep, birthDate, pickedValue, customSpec])

	const canSubmit = useMemo(() => {
		return (
			Boolean((name || '').trim()) && isValidRuPhone(phone) && Boolean(agree)
		)
	}, [name, phone, agree])

	const goNext = async () => {
		if (isContacts) return
		if (!currentStep) return

		// обычные шаги
		if (step !== LAST_STEP_ID) {
			if (currentStep.id === 2) {
				const ok = await trigger('birthDate')
				if (!ok) return
			}

			if (canNextQuiz) {
				setStep(prev => {
					const next = (Number(prev) + 1) as StepId
					return next
				})
			}
			return
		}

		// последний шаг -> контакты
		if (canNextQuiz) setIsContacts(true)
	}

	const goBack = () => {
		if (isContacts) {
			setIsContacts(false)
			return
		}
		if (step !== FIRST_STEP_ID) {
			setStep(prev => {
				const next = (Number(prev) - 1) as StepId
				return next
			})
		}
	}

	const pickOption = (id: string) => {
		if (!currentStep) return
		const field = currentStep.field as StepField

		setValue(field, id as never, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		})
	}

	const toggleAgree = async () => {
		const next = !getValues('agree')
		setValue('agree', next, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		})
		await trigger('agree')
	}

	const onSubmit = async (raw: QuizFormValues) => {
		const now = Date.now()
		if (now - lastSentAtRef.current < 15_000) return
		if (isSending) return

		const custom = (raw.customSpec || '').trim()
		const hasCustomSpec = custom.length > 0

		const specForSend =
			raw.spec === 'custom' || hasCustomSpec
				? custom
				: optionsLabelMap.spec?.[raw.spec] || raw.spec

		const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

		const payload = {
			...raw,
			military: optionsLabelMap.military?.[raw.military] || raw.military,
			health: optionsLabelMap.health?.[raw.health] || raw.health,
			spec: specForSend,
			interest: optionsLabelMap.interest?.[raw.interest] || raw.interest,
			priority: optionsLabelMap.priority?.[raw.priority] || raw.priority,
			specSelected:
				raw.spec === 'custom'
					? 'Свой вариант'
					: optionsLabelMap.spec?.[raw.spec] || raw.spec,
			pageUrl,
		}

		setIsSending(true)
		try {
			const res = await fetch('/api/lead/bid', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			})

			if (!res.ok) return

			lastSentAtRef.current = now
			okPopup.open()
			okPopup.success()

			reset()
			setStep(FIRST_STEP_ID as StepId)
			setIsContacts(false)
		} catch (e) {
			console.error('Submit error:', e)
		} finally {
			setIsSending(false)
		}
	}

	// важно: чтобы trigger('birthDate') работал корректно,
	// birthDate поле должно иметь register с validate
	// (обычно это делает BirthDateField внутри LeftColumn, но если нет — мы передаём валидатор)
	const birthDateValidate = useMemo(() => isValidBirthDate, [])

	return (
		<section className='relative pb-5 pt-5 lg:py-[30px] xl:pb-[40px]'>
			<div className='absolute inset-0 left-1/2 -translate-x-1/2 w-screen bg-[#1d1e21] -z-10' />

			<div className='flex w-full flex-col gap-5 px-2.5 lg:gap-7.5 lg:px-5'>
				<Header />

				<div className='flex flex-col gap-5 md:flex-row'>
					<RightColumn
						artemText={meta?.artemText}
						step={step}
						isContacts={isContacts}
						canNextQuiz={canNextQuiz}
						canSubmit={canSubmit && !isSending}
						isSubmitting={isSubmitting || isSending}
						onBack={goBack}
						onNext={goNext}
					/>

					<LeftColumn
						borderProps={borderProps}
						meta={meta ?? { counter: '', title: '' }}
						isContacts={isContacts}
						currentStep={currentStep}
						pickedValue={String(pickedValue ?? '')}
						onPick={pickOption}
						register={register}
						errors={errors}
						agree={agree}
						onToggleAgree={toggleAgree}
						onContactsSubmit={handleSubmit(onSubmit)}
						birthDateValidate={birthDateValidate}
					/>
				</div>
			</div>

			<Modal isOpen={okPopup.isOpen} onClose={okPopup.close}>
				<Popupok onClose={okPopup.close} />
			</Modal>
		</section>
	)
}
