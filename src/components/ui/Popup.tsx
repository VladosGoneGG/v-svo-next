'use client'

import { useRuPhoneInput } from '@/hooks/useRuPhoneInput'
import { motion } from 'motion/react'
import { useState } from 'react'
import { useController, useForm } from 'react-hook-form'

type FormValues = {
	name: string
	phone: string
	agree: boolean
}

type PopupProps = {
	onSuccess?: () => void
}

const Popup = ({ onSuccess }: PopupProps) => {
	const { registerOptions: phoneRules, inputProps: phoneInputProps } =
		useRuPhoneInput()

	const [isSending, setIsSending] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormValues>({
		defaultValues: { name: '', phone: '', agree: false },
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	})

	const { field: agreeField } = useController({
		name: 'agree',
		control,
		rules: { required: true },
	})

	const onSubmit = async (data: FormValues) => {
		if (isSending) return
		setIsSending(true)

		const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

		try {
			const apiOrigin =
				process.env.NEXT_PUBLIC_API_ORIGIN?.replace(/\/$/, '') ||
				'https://v-svo.ru'

			const res = await fetch(`${apiOrigin}/api/lead/bid`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: data.name,
					phone: data.phone,
					pageUrl,
				}),
			})

			if (!res.ok) return

			onSuccess?.()
		} finally {
			setIsSending(false)
		}
	}

	return (
		<div className='w-full flex flex-col justify-center items-center gap-[15px] max-w-[700px] bg-[#F9F9F9] rounded-[30px] p-5 md:px-15 md:py-10 xl:px-20 md:gap-[25px]'>
			<div className='flex flex-col gap-5 justify-center items-center font-golos'>
				<p className='font-semibold text-contrast text-[24px] md:text-[30px] lg:text-[40px]'>
					Заявка на консультацию
				</p>
				<p className='font-normal text-[16px] lg:text-[21px] text-center'>
					Оставьте заявку ниже и в течение 10 минут с вами свяжется наш
					специалист и ответит на все вопросы
				</p>
			</div>

			<div className='w-full md:flex md:justify-end'>
				<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
					<div className='flex flex-col justify-center gap-[15px]'>
						<label htmlFor='popup-name' className='sr-only'>
							Ваше имя
						</label>
						<input
							id='popup-name'
							type='text'
							placeholder='Ваше имя'
							className={`w-full rounded-[15px] px-[15px] py-[15px] font-inter text-black cursor-pointer placeholder:text-[#9aa0ab] placeholder:text-[14px] placeholder:font-semibold placeholder:opacity-100 hover:placeholder:opacity-50 focus:placeholder:opacity-0 outline-none focus:outline-none ring-0 focus:ring-0 transition-colors duration-200 ${
								errors.name ? 'bg-[#FFB4B4]' : 'bg-[#E6E8ED]'
							}`}
							{...register('name', { required: true })}
						/>

						<label htmlFor='popup-phone' className='sr-only'>
							Телефон
						</label>
						<input
							id='popup-phone'
							{...phoneInputProps}
							placeholder='+7 (000) 000-00-00'
							className={`w-full rounded-[15px] px-[15px] py-[15px] font-inter text-black cursor-pointer placeholder:text-[#9aa0ab] placeholder:text-[14px] placeholder:font-semibold placeholder:opacity-100 hover:placeholder:opacity-50 focus:placeholder:opacity-0 outline-none focus:outline-none ring-0 focus:ring-0 transition-colors duration-200 ${
								errors.phone ? 'bg-[#FFB4B4]' : 'bg-[#E6E8ED]'
							}`}
							{...register('phone', phoneRules)}
						/>

						<motion.button
							type='submit'
							disabled={isSending}
							className={`mt-2 w-full h-[49px] rounded-[15px]
                bg-contrast/90 hover:bg-contrast active:bg-contrast/70 shadow-item text-white font-inter font-bold text-[18px] uppercase active:scale-[0.99]
                transition-colors duration-150 ease-in-out
                ${isSending ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
							whileTap={isSending ? undefined : { scale: 0.97, y: 1 }}
							transition={{ duration: 0.15, ease: 'easeInOut' }}
						>
							получить консультацию
						</motion.button>

						<motion.div
							className='h-5 pl-[8px] inline-flex justify-center items-center gap-2.5 select-none'
							whileHover={{ y: -1 }}
							whileTap={{ scale: 0.99, y: 0 }}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 20,
								mass: 0.6,
							}}
						>
							<button
								type='button'
								className='inline-flex items-center gap-2.5 cursor-pointer group select-none'
								onClick={e => {
									e.preventDefault()
									agreeField.onChange(!agreeField.value)
								}}
							>
								<input
									type='checkbox'
									className='peer sr-only'
									checked={!!agreeField.value}
									readOnly
									name={agreeField.name}
									ref={agreeField.ref}
								/>

								<span className='inline-flex items-center gap-2.5 peer-checked:[&_.dot]:opacity-100 group-hover:[&_.dot]:!opacity-50'>
									<span className='w-5 h-5 relative'>
										<span className='absolute inset-0 rounded-full border border-middle-grey' />
										<span className='dot absolute left-[4px] top-[4px] w-3 h-3 rounded-full bg-contrast opacity-0 transition-opacity' />
									</span>

									<span className='font-inter font-semibold text-[12px] min-[770px]:text-[14px] text-[#1d1e21] leading-5'>
										Я принимаю
									</span>
								</span>
							</button>

							<a
								href='/privacy'
								className='font-inter font-semibold text-[12px] text-[#1d1e21] min-[770px]:text-[14px] leading-5 underline'
							>
								Условия передачи информации
							</a>
						</motion.div>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Popup
