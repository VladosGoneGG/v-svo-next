'use client'

import AgreeRow from '@/components/ui/answers/AgreeRow'
import { useRuPhoneInput } from '@/hooks/useRuPhoneInput'

import type { ContactsFormProps } from './types'

export default function ContactsForm({
	register,
	errors,
	agree,
	onToggleAgree,
	onSubmit,
}: ContactsFormProps) {
	const { registerOptions: phoneRules, inputProps: phoneInputProps } =
		useRuPhoneInput()

	return (
		<form
			id='contactsForm'
			onSubmit={onSubmit}
			className='flex flex-col gap-2.5 p-2.5'
		>
			<input
				{...register('name', {
					required: true,
					validate: v => String(v ?? '').trim().length >= 2 || 'Введите ФИО',
				})}
				placeholder='ФИО'
				className={[
					'w-full h-[54px] rounded-[14px] px-4 bg-white font-inter font-semibold text-[14px] text-black outline-none placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer placeholder:opacity-100 transition-[color,opacity] duration-150 hover:placeholder:opacity-50 focus:placeholder:opacity-0',
					errors.name ? '!bg-[#FFB4B4]' : '',
				].join(' ')}
			/>

			<input
				{...phoneInputProps}
				{...register('phone', phoneRules)}
				placeholder='+7 (000) 000-00-00'
				className={[
					'w-full h-[54px] rounded-[14px] px-4 bg-white font-inter font-semibold text-[14px] text-black outline-none placeholder:text-[14px] focus:outline-none focus:ring-0 focus:border-transparent cursor-pointer placeholder:opacity-100 transition-[color,opacity] duration-150 hover:placeholder:opacity-50 focus:placeholder:opacity-0',
					errors.phone ? '!bg-[#FFB4B4]' : '',
				].join(' ')}
			/>

			<AgreeRow agree={agree} onToggle={onToggleAgree} register={register} />
		</form>
	)
}
