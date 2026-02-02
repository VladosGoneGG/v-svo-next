'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { StepOption } from './steps'

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1]
const DURATION = 0.3

type OptionButtonProps = {
	opt: StepOption
	checked: boolean
	onPick: (id: string) => void
	animateLabel?: boolean
}

export default function OptionButton({
	opt,
	checked,
	onPick,
	animateLabel = false,
}: OptionButtonProps) {
	return (
		<motion.button
			type='button'
			onClick={() => onPick(opt.id)}
			className='group w-full cursor-pointer will-change-transform rounded-[14px] bg-[#d1d3d8] max-[426px]:p-3 p-4 flex gap-2.5'
			layout
			animate={{ backgroundColor: checked ? '#ffffff' : '#d1d3d8' }}
			whileHover={{ backgroundColor: '#ffffff', y: -1 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: DURATION, ease: EASE }}
		>
			<span className='relative h-5 w-5 shrink-0 cursor-pointer'>
				<span className='absolute inset-0 rounded-full border border-middle-grey' />
				<span
					className={[
						'absolute left-[4px] top-[4px] h-3 w-3 rounded-full',
						'transition-all duration-300 ease-[cubic-bezier(0.42,0,0.58,1)]',
						checked
							? 'bg-contrast opacity-100 scale-100 group-hover:!bg-[#e8612b82] group-hover:scale-[1.12]'
							: 'bg-contrast opacity-0 scale-[0.85] group-hover:!opacity-50 group-hover:scale-[0.95]',
					].join(' ')}
				/>
			</span>

			{animateLabel ? (
				<span className='relative cursor-pointer font-inter text-[14px] font-semibold text-[#1d1e21] max-[426px]:text-[12px]'>
					<AnimatePresence mode='wait' initial={false}>
						<motion.span
							key={opt.label}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: DURATION, ease: EASE }}
							className='inline-block'
						>
							{opt.label}
						</motion.span>
					</AnimatePresence>
				</span>
			) : (
				<span className='cursor-pointer font-inter text-[14px] font-semibold text-[#1d1e21] max-[426px]:text-[12px]'>
					{opt.label}
				</span>
			)}
		</motion.button>
	)
}
