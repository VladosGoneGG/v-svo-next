'use client'

import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useGoHome } from '@/hooks/useGoHome'
import { usePopupFlow } from '@/hooks/usePopupFlow'

import Modal from '@/components/ui/Modal'
import Popup from '@/components/ui/Popup'
import Popupok from '@/components/ui/Popupok'

const NAV = [
	{ label: 'Выплаты', href: '#payments', type: 'hash' as const },
	{ label: 'Льготы', href: '#benefits', type: 'hash' as const },
	{ label: 'Требования', href: '#requirements', type: 'hash' as const },
	{ label: 'Документы', href: '#documents', type: 'hash' as const },
	{ label: 'Специализации', href: '#specializations', type: 'hash' as const },
	{ label: 'Блог', href: '/blog', type: 'route' as const },
] as const

type BurgerProps = {
	open: boolean
	onClose?: () => void
}

function isDynamicSectionPage(pathname: string): boolean {
	return (
		pathname === '/' ||
		pathname.startsWith('/city/') ||
		pathname.startsWith('/unit/') ||
		pathname.startsWith('/profession/') ||
		pathname.startsWith('/specialization/') ||
		pathname === '/blog' ||
		pathname.startsWith('/blog/')
	)
}

function localHashHref(pathname: string, hash: string): string {
	return `${pathname}${hash}`
}

export default function Burger({ open, onClose }: BurgerProps) {
	const callPopup = usePopupFlow()
	const goHome = useGoHome()
	const router = useRouter()
	const pathname = usePathname()

	const handleHashClick = useCallback(
		(hash: `#${string}`) => {
			onClose?.()

			// ждём закрытие меню
			setTimeout(() => {
				// Если НЕ страница с секциями — ведём на главную
				if (!isDynamicSectionPage(pathname)) {
					router.push(`/${hash}`)
					return
				}

				// Мы на странице с секциями -> пробуем локальный скролл
				const el = document.querySelector(hash)
				if (el) {
					router.replace(localHashHref(pathname, hash), { scroll: false })
					el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					return
				}

				// секции ещё нет -> обновим URL с hash, HashScroll доскроллит
				router.push(localHashHref(pathname, hash), { scroll: false })
			}, 220)
		},
		[onClose, pathname, router],
	)

	const handleGoHome = useCallback(() => {
		onClose?.()
		setTimeout(() => {
			goHome()
		}, 220)
	}, [onClose, goHome])

	const handleCallClick = useCallback(() => {
		onClose?.()
		setTimeout(() => {
			callPopup.open()
		}, 220)
	}, [onClose, callPopup])

	return (
		<>
			<AnimatePresence>
				{open && (
					<motion.div
						className='fixed inset-0 z-50'
						initial='hidden'
						animate='show'
						exit='hidden'
					>
						{/* BACKDROP */}
						<motion.button
							type='button'
							aria-label='Закрыть меню'
							onClick={onClose}
							className='absolute inset-0 bg-[#ECECEC]'
							variants={{
								hidden: { opacity: 0 },
								show: { opacity: 1 },
							}}
							transition={{ duration: 0.18, ease: 'easeOut' }}
						/>

						{/* PANEL */}
						<motion.div
							className='relative w-full min-h-dvh flex flex-col px-5'
							variants={{
								hidden: { opacity: 0, y: 10 },
								show: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.22, ease: 'easeOut' }}
						>
							{/* TOP */}
							<div className='flex items-start justify-between'>
								<a
									href='/'
									onClick={e => {
										e.preventDefault()
										handleGoHome()
									}}
									aria-label='На главную'
								>
									<img src='/logo.png' alt='Логотип' />
								</a>

								<button
									type='button'
									onClick={onClose}
									aria-label='Закрыть меню'
									className='w-10 h-10 flex items-center justify-center cursor-pointer'
								>
									<span className='text-[34px] leading-none text-black'>×</span>
								</button>
							</div>

							{/* MIDDLE */}
							<div className='flex-1 flex flex-col gap-5'>
								<nav className='mt-5'>
									<ul
										className='
                      flex flex-col gap-2.5
                      font-golos font-medium
                      text-[14px] min-[500px]:text-[20px] min-[600px]:text-[26px]
                      text-black
                    '
									>
										{NAV.map(item => (
											<li key={item.label}>
												{item.type === 'hash' ? (
													<a
														href={
															isDynamicSectionPage(pathname)
																? localHashHref(pathname, item.href)
																: `/${item.href}`
														}
														onClick={e => {
															e.preventDefault()
															handleHashClick(item.href)
														}}
														className='inline-block'
													>
														{item.label}
													</a>
												) : (
													<Link
														href={item.href}
														onClick={onClose}
														className='inline-block'
													>
														{item.label}
													</Link>
												)}
											</li>
										))}
									</ul>
								</nav>

								{/* CONTACT */}
								<div className='flex items-center gap-5'>
									<a
										href='tel:+79998887766'
										className='font-golos font-medium text-[14px] min-[500px]:text-[20px] min-[600px]:text-[26px] text-black'
									>
										+7 (999) 888-77-66
									</a>

									<a
										href='https://t.me/+79998887766'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center justify-center shrink-0 w-7.5 h-7.5 rounded-[10px] cursor-pointer hover:opacity-90 active:opacity-70'
										aria-label='Telegram'
									>
										<img src='/images/telegrami.png' alt='Телеграм' />
									</a>
									<a
										href='https://max.ru/u/f9LHodD0cOKkXAR5ED7Vblvs1dPUil-OukIWJ7j3xfm77KaPK8fxbwEPxhI'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Telegram'
									>
										<img
											src='/icons/maxicon.svg'
											alt='Макс'
											className='cursor-pointer hover:opacity-90 active:opacity-70'
										/>
									</a>
								</div>

								{/* BOTTOM */}
								<div className='w-full flex flex-col items-center gap-2.5 mt-[75px]'>
									<button
										type='button'
										onClick={handleCallClick}
										className='
                      w-full max-w-[250px] h-[49px]
                      bg-contrast/90 hover:bg-contrast active:bg-contrast/70 font-inter
                      text-[14px] min-[500px]:text-[20px] min-[500px]:max-w-[350px] min-[500px]:h-[62px]
                      font-semibold text-white
                      rounded-[10px] flex items-center justify-center cursor-pointer shadow-btn
                    '
									>
										Обратный звонок
									</button>

									<div className='flex flex-col items-center gap-2'>
										<Link
											href='/privacy'
											target='_blank'
											rel='noopener noreferrer'
											className='font-golos text-[14px] min-[500px]:text-[18px] text-black underline underline-offset-4'
											onClick={onClose}
										>
											Политика конфиденциальности
										</Link>

										<p className='font-golos text-[14px] min-[500px]:text-[18px] text-black'>
											2022 - 2025 г.
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<Modal isOpen={callPopup.isOpen} onClose={callPopup.close}>
				{callPopup.isSuccess ? (
					<Popupok onClose={callPopup.close} />
				) : (
					<Popup onSuccess={callPopup.success} onClose={callPopup.close} />
				)}
			</Modal>
		</>
	)
}
