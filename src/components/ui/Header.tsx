'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import Burger from '@/components/ui/Burger'
import Modal from '@/components/ui/Modal'
import Popup from '@/components/ui/Popup'
import Popupok from '@/components/ui/Popupok'
import { usePopupFlow } from '@/hooks/usePopupFlow'

type NavItem = readonly [hash: `#${string}`, label: string]

const NAV: readonly NavItem[] = [
	['#payments', 'Выплаты'],
	['#benefits', 'Льготы'],
	['#requirements', 'Требования'],
	['#documents', 'Документы'],
	['#specializations', 'Специализации'],
] as const

function isDynamicSectionPage(pathname: string): boolean {
	// страницы, где есть эти секции и якоря должны работать "локально"
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
function getLocalHashHref(pathname: string, hash: string): string {
	// на текущей странице
	return `${pathname}${hash}`
}

export default function Header() {
	const [isBurgerOpen, setIsBurgerOpen] = useState(false)

	const pathname = usePathname()
	const router = useRouter()

	const callPopup = usePopupFlow()

	const handleNavClick = useCallback(
		(hash: `#${string}`) => {
			// 1) Если это НЕ страница с секциями — ведём на главную с якорем
			if (!isDynamicSectionPage(pathname)) {
				router.push(`/${hash}`)
				setIsBurgerOpen(false)
				return
			}

			// 2) Мы на странице с секциями: пытаемся найти элемент и проскроллить сразу
			const el = document.querySelector(hash)
			if (el) {
				// обновим URL, но без прыжка браузера (мы сами делаем smooth scroll)
				router.replace(getLocalHashHref(pathname, hash), { scroll: false })
				el.scrollIntoView({ behavior: 'smooth', block: 'start' })
				setIsBurgerOpen(false)
				return
			}

			// 3) Если секции ещё нет (рендер/гидрация/ленивая часть) — просто пушим hash
			// HashScroll потом доскроллит
			router.push(getLocalHashHref(pathname, hash), { scroll: false })
			setIsBurgerOpen(false)
		},
		[pathname, router],
	)

	useEffect(() => {
		if (!isBurgerOpen) return
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsBurgerOpen(false)
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [isBurgerOpen])

	useEffect(() => {
		document.body.style.overflow = isBurgerOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isBurgerOpen])

	return (
		<header
			className='
        sticky top-0 z-40
        min-[960px]:static
        bg-[#eee]
        max-w-106.25 h-[76px] min-[426px]:max-w-239.75 min-[960px]:max-w-300
      '
		>
			<div className='flex items-center justify-between px-2.5 py-[5px] lg:px-5 lg:py-[10px]'>
				<Link href='/' aria-label='На главную'>
					<img src='/logo.png' alt='Логотип' />
				</Link>

				<ul className='hidden font-golos font-medium text-[14px] w-123.25 h-6.75 min-[960px]:flex items-center justify-between min-[1200px]:text-[16px] min-[1200px]:w-137.75 min-[1200px]:h-7.25 '>
					{NAV.map(([hash, label]) => (
						<li key={hash}>
							<a
								href={
									isDynamicSectionPage(pathname)
										? getLocalHashHref(pathname, hash)
										: `/${hash}`
								}
								className='cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
								onClick={e => {
									e.preventDefault()
									handleNavClick(hash)
								}}
							>
								{label}
							</a>
						</li>
					))}
				</ul>

				<div className='flex xl:gap-[50px] items-center'>
					<div className='hidden min-[426px]:flex items-center gap-2.5 mr-3.75 min-[960px]:mr-0 min-[1200px]:mr-3.75'>
						<a
							href='tel:+79334380810'
							className='font-golos font-medium text-[14px] cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
						>
							+7 (933) 438-08-10
						</a>
						<a
							href='https://t.me/+79334380810'
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Telegram'
						>
							<img
								src='/icons/telegram.svg'
								alt='Телеграм'
								className='cursor-pointer hover:opacity-90 active:opacity-70'
							/>
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

					<motion.button
						type='button'
						onClick={callPopup.open}
						className='hidden w-38.5 h-9.25 bg-contrast/90 hover:bg-contrast active:bg-contrast/70 font-inter text-[14px] font-semibold text-white shadow-btn rounded-[10px] min-[1200px]:flex items-center justify-center cursor-pointer transition-colors duration-150 ease-in-out'
						whileTap={{ scale: 0.97, y: 1 }}
						transition={{ duration: 0.15, ease: 'easeInOut' }}
					>
						Обратный звонок
					</motion.button>

					<button
						type='button'
						onClick={() => setIsBurgerOpen(true)}
						aria-label='Открыть меню'
						className='w-13.5 h-11 rounded-[10px] bg-contrast/90 hover:bg-contrast active:bg-contrast/70 flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-btn min-[960px]:hidden'
					>
						<span className='w-4.5 h-0.5 bg-white rounded-full'></span>
						<span className='w-4.5 h-0.5 bg-white rounded-full'></span>
						<span className='w-4.5 h-0.5 bg-white rounded-full'></span>
					</button>
				</div>
			</div>

			<Burger open={isBurgerOpen} onClose={() => setIsBurgerOpen(false)} />

			<Modal isOpen={callPopup.isOpen} onClose={callPopup.close}>
				{callPopup.isSuccess ? (
					<Popupok onClose={callPopup.close} />
				) : (
					<Popup onSuccess={callPopup.success} onClose={callPopup.close} />
				)}
			</Modal>
		</header>
	)
}
