import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { QuizStep } from './steps'

export type QuizFormValues = {
	military: string
	health: string
	spec: string
	interest: string
	priority: string
	name: string
	phone: string
	agree: boolean
}

export type QuizMeta = {
	counter: string
	title: string
	artemText?: string
}

export type LeftColumnProps = {
	borderProps?: DashedBorderProps

	meta: QuizMeta
	isContacts: boolean
	currentStep?: QuizStep
	pickedValue: string
	onPick: (id: string) => void

	register: UseFormRegister<QuizFormValues>
	errors: FieldErrors<QuizFormValues>

	agree: boolean
	onToggleAgree: () => void | Promise<void>
	onContactsSubmit: () => void
}

export type RightColumnProps = {
	artemText?: string
	step: number
	isContacts: boolean
	canNextQuiz: boolean
	canSubmit: boolean
	isSubmitting: boolean
	onBack: () => void
	onNext: () => void | Promise<void>
}

export type NavButtonsProps = {
	step: number
	isContacts: boolean
	canNextQuiz: boolean
	canSubmit: boolean
	isSubmitting: boolean
	onBack: () => void
	onNext: () => void | Promise<void>
}

export type QuizContentProps = {
	currentStep?: QuizStep
	pickedValue: string
	onPick: (id: string) => void
	register: UseFormRegister<QuizFormValues>
	errors: FieldErrors<QuizFormValues>
}

export type ContactsFormProps = {
	register: UseFormRegister<QuizFormValues>
	errors: FieldErrors<QuizFormValues>
	agree: boolean
	onToggleAgree: () => void | Promise<void>
	onSubmit: () => void
}

export type DashedBorderProps = {
	strokeWidth?: number
	dashArray?: string
	radius?: number
	inset?: number
	stroke?: string
	className?: string
}
