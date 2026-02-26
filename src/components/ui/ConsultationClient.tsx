'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { usePopupFlow } from '@/hooks/usePopupFlow'
import { useRuPhoneInput } from '@/hooks/useRuPhoneInput'

import Fullbleed from '@/components/ui/Fullbleed'
import Modal from '@/components/ui/Modal'
import Popupok from '@/components/ui/Popupok'

type FormValues = {
	name: string
	phone: string
	agree: boolean
}

type QuestionItem = {
	n: number
	title: string
	sub: string
}

const QUESTIONS: QuestionItem[] = [
	{
		n: 1,
		title: 'В какие части и специализации вы можете\nпоступить',
		sub: '— с учётом вашего опыта и состояния здоровья',
	},
	{
		n: 2,
		title: 'Какие выплаты, льготы и компенсации вам\nположены',
		sub: 'согласно законодательству',
	},
	{
		n: 3,
		title: 'Какие документы необходимо подготовить для\nподписания контракта',
		sub: '',
	},
	{
		n: 4,
		title:
			'Как проходит оформление, ВВК и сколько времени\nзанимает весь процесс',
		sub: '',
	},
]

declare global {
	interface Window {
		ym?: (...args: any[]) => void
	}
}

const YM_ID = 107015573

function reachFormsGoal() {
	if (typeof window === 'undefined') return
	if (typeof window.ym !== 'function') return
	window.ym(YM_ID, 'reachGoal', 'forms')
}

export default function ConsultationClient() {
	const popup = usePopupFlow()
	const { registerOptions: phoneRules, inputProps: phoneInputProps } =
		useRuPhoneInput()

	const [isSending, setIsSending] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<FormValues>({
		defaultValues: { name: '', phone: '', agree: false },
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	})

	const agree = watch('agree')

	const onSubmit = async (data: FormValues) => {
		if (isSending) return
		setIsSending(true)

		const pageUrl = window.location.href

		try {
			const res = await fetch('/api/lead/bid', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: data.name,
					phone: data.phone,
					pageUrl,
				}),
			})

			if (!res.ok) return

			reachFormsGoal()

			popup.open()
			popup.success()
			reset()
		} finally {
			setIsSending(false)
		}
	}

	return (
		<section className='relative py-2.5 lg:py-[30px] xl:py-[40px]'>
			<Fullbleed className='bg-white' />

			<div className='w-full px-2.5 min-[1199px]:px-[20px]'>
				<div className='rounded-[30px] bg-[#c3c6d0] px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8'>
					<h2 className='font-golos text-[20px] font-semibold text-[#E05A1A] md:text-[24px] lg:text-[30px] xl:text-[40px]'>
						Ответим на Ваши вопросы и поможем разобраться в оформлении контракта
					</h2>

					<div className='mt-5 flex justify-center'>
						<img
							src='/images/gerbmd.webp'
							alt='Герб'
							className='h-auto w-[160px] select-none sm:w-[190px] md:w-[220px] lg:w-[240px]'
							loading='lazy'
							decoding='async'
						/>
					</div>

					<div className='mt-5 flex flex-col items-start gap-5 md:flex-row'>
						{/* Левая колонка */}
						<div className='font-golos text-[#1d1e21]'>
							<h3 className='text-[18px] font-semibold sm:text-[22px] md:text-[24px] xl:text-[30px]'>
								На консультации наш специалист ответит на вопросы:
							</h3>

							<ul className='mt-4 flex flex-col gap-5'>
								{QUESTIONS.map(q => (
									<li key={q.n} className='flex items-center gap-4'>
										<div className='flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-white md:h-[30px] md:w-[30px]'>
											<span className='font-golos text-[14px] font-semibold text-[#1d1e21]'>
												{q.n}
											</span>
										</div>

										<div className='leading-[1.2]'>
											<p className='whitespace-pre-line text-[14px] font-semibold md:text-[16px] lg:text-[21px]'>
												{q.title}
											</p>
											{q.sub ? (
												<p className='mt-1 text-[14px] text-[#2b2c30] md:text-[16px] lg:text-[21px]'>
													{q.sub}
												</p>
											) : null}
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Правая колонка */}
						<div className='w-full max-w-[410px] md:flex md:justify-end'>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='w-full md:max-w-[460px] md:pt-[45px]'
							>
								<div className='flex flex-col px-5'>
									<label htmlFor='consultation-name' className='sr-only'>
										Ваше имя
									</label>
									<input
										id='consultation-name'
										type='text'
										placeholder='Ваше имя'
										className={[
											'w-full rounded-[16px] px-[15px] py-[15px]',
											'font-golos text-[14px] font-semibold text-black cursor-pointer',
											'placeholder:text-[#9aa0ab] placeholder:text-[14px] placeholder:font-semibold placeholder:opacity-100',
											'transition-[color,opacity] duration-150 hover:placeholder:opacity-50 focus:placeholder:opacity-50',
											'outline-none focus:outline-none ring-0 focus:ring-0 transition-colors duration-200',
											errors.name ? 'bg-[#FFB4B4]' : 'bg-[#E6E8ED]',
										].join(' ')}
										{...register('name', { required: true })}
									/>

									<label htmlFor='consultation-phone' className='sr-only'>
										Телефон
									</label>
									<input
										id='consultation-phone'
										placeholder='+7 (000) 000-00-00'
										className={[
											'mt-2.5 w-full rounded-[16px] px-[15px] py-[15px]',
											'font-golos text-[14px] font-semibold text-black cursor-pointer',
											'placeholder:text-[#9aa0ab] placeholder:text-[14px] placeholder:font-semibold placeholder:opacity-100',
											'transition-[color,opacity] duration-150 hover:placeholder:opacity-50 focus:placeholder:opacity-50',
											'outline-none focus:outline-none ring-0 focus:ring-0 transition-colors duration-200',
											errors.phone ? 'bg-[#FFB4B4]' : 'bg-[#E6E8ED]',
										].join(' ')}
										{...phoneInputProps}
										{...register('phone', phoneRules)}
									/>

									<motion.div
										className='mt-5 inline-flex h-5 select-none items-center gap-2.5 pl-[5px]'
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
											className='group inline-flex cursor-pointer select-none items-center gap-2.5'
											onClick={e => {
												e.preventDefault()
												setValue('agree', !agree, {
													shouldValidate: true,
													shouldDirty: true,
												})
											}}
										>
											<label htmlFor='checkbox-agreed' className='sr-only'>
												Я принимаю Условия передачи информации
											</label>

											<input
												id='checkbox-agreed'
												type='checkbox'
												className='peer sr-only'
												{...register('agree', { required: true })}
												checked={agree}
												readOnly
											/>

											<span className='inline-flex items-center gap-2.5 peer-checked:[&_.dot]:opacity-100 group-hover:[&_.dot]:!opacity-50'>
												<span className='relative h-5 w-5'>
													<span className='absolute inset-0 rounded-full border border-middle-grey' />
													<span className='dot absolute left-[4px] top-[4px] h-3 w-3 rounded-full bg-contrast opacity-0 transition-opacity' />
												</span>

												<span className='font-inter text-[12px] font-semibold leading-5 text-[#1d1e21] min-[770px]:text-[14px]'>
													Я принимаю
												</span>
											</span>
										</button>

										<Link
											href='/privacy'
											target='_blank'
											rel='noopener noreferrer'
											className='font-inter text-[12px] font-semibold leading-5 text-[#1d1e21] underline min-[770px]:text-[14px]'
											onClick={e => e.stopPropagation()}
										>
											Условия передачи информации
										</Link>
									</motion.div>

									<motion.button
										type='submit'
										disabled={isSending}
										className={[
											'mt-5 h-[62px] w-full rounded-[15px]',
											'bg-contrast/90 hover:bg-contrast active:bg-contrast/70',
											'shadow-item py-4 font-inter text-[18px] font-bold uppercase text-white',
											'transition-colors duration-150 ease-in-out active:scale-[0.99]',
											isSending
												? 'cursor-not-allowed opacity-60'
												: 'cursor-pointer',
										].join(' ')}
										whileTap={isSending ? undefined : { scale: 0.97, y: 1 }}
										transition={{ duration: 0.15, ease: 'easeInOut' }}
									>
										получить консультацию
									</motion.button>

									<p className='mt-5 pl-2.5 text-left font-inter text-[14px] font-semibold text-[#797c85]'>
										Консультация бесплатная. Звонок не обязывает вас подписывать
										контракт
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<Modal isOpen={popup.isOpen} onClose={popup.close}>
				<Popupok onClose={popup.close} />
			</Modal>
		</section>
	)
}
