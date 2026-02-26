'use client'

import Link from 'next/link'
import type { UseFormRegister } from 'react-hook-form'
import type { QuizFormValues } from './types'

type AgreeRowProps = {
	agree: boolean
	onToggle: () => void | Promise<void>
	register: UseFormRegister<QuizFormValues>
}

export default function AgreeRow({ agree, onToggle, register }: AgreeRowProps) {
	return (
		<div className='mt-2.5 inline-flex items-center justify-center gap-2.5'>
			<button
				type='button'
				onClick={onToggle}
				className='group inline-flex cursor-pointer select-none items-center gap-2.5'
			>
				<input
					type='checkbox'
					{...register('agree', { required: true })}
					className='sr-only'
				/>

				<span className='inline-flex items-center gap-2.5 group-hover:[&_.dot]:opacity-50'>
					<span className='relative h-5 w-5'>
						<span className='absolute inset-0 rounded-full border border-middle-grey' />
						<span
							className={[
								'dot absolute left-[4px] top-[4px] h-3 w-3 rounded-full bg-contrast transition-opacity',
								agree ? 'opacity-100' : 'opacity-0',
							].join(' ')}
						/>
					</span>

					<span className='font-inter text-[14px] font-semibold leading-5 text-white'>
						Я принимаю
					</span>
				</span>
			</button>

			<Link
				href='/privacy'
				target='_blank'
				rel='noopener noreferrer'
				className='font-inter text-[14px] font-semibold leading-5 text-white underline underline-offset-2'
				onClick={e => e.stopPropagation()}
			>
				Условия передачи информации
			</Link>
		</div>
	)
}
