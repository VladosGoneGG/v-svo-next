'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	useEffect(() => {
		if (!isOpen) return

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', onKeyDown)

		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = prevOverflow
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					className='fixed inset-0 z-[1000] flex items-center justify-center px-2.5'
					onMouseDown={onClose}
					role='dialog'
					aria-modal='true'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.18 }}
				>
					<motion.div
						className='absolute inset-0 bg-black/50'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.18 }}
					/>

					<motion.div
						className='relative z-[1001] w-full flex justify-center'
						onMouseDown={e => e.stopPropagation()}
						initial={{ opacity: 0, y: 18, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 14, scale: 0.98 }}
						transition={{
							type: 'spring',
							stiffness: 320,
							damping: 26,
							mass: 0.9,
						}}
					>
						{children}
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}

export default Modal
