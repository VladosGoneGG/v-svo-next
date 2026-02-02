'use client'

import { AnimatePresence, motion } from 'motion/react'

type ArtemCardProps = {
	text?: string
}

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1]
const DURATION = 0.3

const swap = {
	initial: { opacity: 0, y: 6 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -6 },
} as const

export default function ArtemCard({ text }: ArtemCardProps) {
	return (
		<div className='flex justify-between rounded-bl-[20px] rounded-t-[20px] bg-[#ebebeb]'>
			<div className='flex w-full flex-col gap-2.5 py-2.5 pl-[15px] pr-2.5'>
				<p className='font-golos text-[22px] font-semibold'>Артем</p>

				{/* Плавная смена текста + плавная высота */}
				<motion.div layout transition={{ duration: DURATION, ease: EASE }}>
					<AnimatePresence mode='wait' initial={false}>
						<motion.p
							key={text ?? 'empty'}
							layout
							variants={swap}
							initial='initial'
							animate='animate'
							exit='exit'
							transition={{ duration: DURATION, ease: EASE }}
							className='font-golos text-[16px]'
						>
							{text ?? ''}
						</motion.p>
					</AnimatePresence>
				</motion.div>
			</div>

			<div className='my-2.5 mr-2.5 flex h-[95px] w-[95px] shrink-0 items-center justify-center rounded-[10px] bg-white'>
				<img
					src='/images/gerb.png'
					alt='Герб'
					className='max-h-full max-w-full object-contain'
				/>
			</div>
		</div>
	)
}
