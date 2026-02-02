'use client'

import { motion } from 'motion/react'

export default function VacanciesButton() {
	return (
		<motion.button
			type='button'
			className='
        hidden sm:flex
        w-full sm:w-[350px] h-[62px]
        items-center justify-center
        px-7.5
        bg-contrast/90 hover:bg-contrast active:bg-contrast/70
        text-white shadow-btn
        rounded-[15px]
        font-inter font-semibold text-[18px]
        cursor-pointer
        transition-colors duration-150 ease-in-out
      '
			whileTap={{ scale: 0.97, y: 1 }}
			transition={{ duration: 0.15, ease: 'easeInOut' }}
		>
			Все вакансии на СВО
		</motion.button>
	)
}
