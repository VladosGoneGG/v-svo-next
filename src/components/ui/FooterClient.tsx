'use client'

import type { CityItem, SpecAndProfItem, UnitItem } from '@/lib/footerLinks'
import { useGoHome } from '@hooks/useGoHome'
import { usePopupFlow } from '@hooks/usePopupFlow'
import Modal from '@ui/Modal'
import Popup from '@ui/Popup'
import Popupok from '@ui/Popupok'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

type Props = {
	specAndProf: SpecAndProfItem[]
	units: UnitItem[]
	cities: CityItem[]
}

export default function FooterClient({ specAndProf, units, cities }: Props) {
	const callPopup = usePopupFlow()
	const goHome = useGoHome()
	const router = useRouter()
	const pathname = usePathname()

	const toHashHref = (hash: string) => (pathname === '/' ? hash : `/${hash}`)

	const onHashClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
			const el = document.querySelector(hash)
			if (el) {
				e.preventDefault()
				el.scrollIntoView({ behavior: 'smooth', block: 'start' })
				return
			}
			e.preventDefault()
			router.push(`/${hash}`)
		},
		[router],
	)

	return (
		<>
			{/* LEFT */}
			<div className='flex flex-col items-start gap-2.5 w-full min-[426px]:max-w-75 min-[1200px]:gap-5'>
				<a
					href='/'
					onClick={e => {
						e.preventDefault()
						goHome()
					}}
					className='cursor-pointer'
					aria-label='На главную'
				>
					<img src='/logo.png' alt='Логотип' />
				</a>

				<div className='flex items-center gap-2.5'>
					<a
						href='tel:+79334380810'
						className='font-golos font-medium text-[14px] hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
					>
						+7 (933) 438-08-10
					</a>

					<a
						href='https://t.me/+79334380810'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Telegram'
						className='flex items-center justify-center shrink-0 w-7.5 h-7.5 rounded-[10px] cursor-pointer hover:opacity-90 active:opacity-70'
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

				<motion.button
					type='button'
					onClick={callPopup.open}
					className='w-full max-w-[250px] h-[49px] rounded-[10px] text-white bg-contrast/90 hover:bg-contrast active:bg-contrast/70 font-inter font-bold text-[18px] cursor-pointer shadow-btn transition-colors duration-150 ease-in-out'
					whileTap={{ scale: 0.97, y: 1 }}
					transition={{ duration: 0.15, ease: 'easeInOut' }}
				>
					Обратный звонок
				</motion.button>
			</div>

			{/* RIGHT */}
			<div className='w-full min-w-0 flex justify-start min-[426px]:justify-center'>
				<div className='grid w-full max-w-86.25 grid-cols-2 gap-6 min-[960px]:max-w-209.75 min-[960px]:flex min-[960px]:justify-evenly'>
					{/* Специализации / Профессии */}
					<div>
						<h4 className='font-inter font-semibold text-[14px] min-[569px]:text-[18px] mb-2'>
							Специализации
						</h4>

						<ul className='flex flex-col gap-1.5 font-golos font-medium text-[12px] min-[569px]:text-[14px]'>
							{specAndProf.map(item => {
								const to =
									item.type === 'profession'
										? `/profession/${item.slug}`
										: `/specialization/${item.slug}`

								return (
									<li key={`${item.type}-${item.slug}`}>
										<Link
											href={to}
											className='cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
										>
											{item.label}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>

					{/* Войска */}
					<div>
						<h4 className='font-inter font-semibold text-[14px] min-[569px]:text-[18px] mb-2'>
							Войска
						</h4>

						<ul className='flex flex-col gap-1.5 font-golos font-medium text-[12px] min-[569px]:text-[14px]'>
							{units.map(item => (
								<li key={`unit-${item.slug}`}>
									<Link
										href={`/unit/${item.slug}`}
										className='cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='col-span-2 h-px bg-white rounded min-[960px]:hidden' />

					{/* Города */}
					<div>
						<h4 className='font-inter font-semibold text-[14px] min-[569px]:text-[18px] mb-2'>
							Города
						</h4>

						<ul className='flex flex-col gap-1.5 font-golos font-medium text-[12px] min-[569px]:text-[14px]'>
							{cities.map(item => (
								<li key={`city-${item.slug}`}>
									<Link
										href={`/city/${item.slug}`}
										className='cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Меню */}
					<div>
						<h4 className='font-inter font-semibold text-[14px] min-[569px]:text-[18px] mb-2'>
							Меню
						</h4>

						<ul className='flex flex-col gap-1.5 font-golos font-medium text-[12px] min-[569px]:text-[14px]'>
							<li>
								<a
									href='/'
									className='cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
									onClick={e => {
										e.preventDefault()
										goHome()
									}}
								>
									Главная
								</a>
							</li>

							{[
								['#payments', 'Выплаты'],
								['#benefits', 'Льготы'],
								['#requirements', 'Требования'],
								['#documents', 'Документы'],
								['#foreigners', 'Мигрантам'],
							].map(([hash, label]) => (
								<li key={hash}>
									<a
										href={toHashHref(hash)}
										className='cursor-pointer hover:text-contrast active:text-contrast/70 transition-colors duration-150 ease-in-out'
										onClick={e => onHashClick(e, hash)}
									>
										{label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* MODAL */}
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
