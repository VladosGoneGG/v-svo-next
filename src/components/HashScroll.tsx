'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function scrollToHash() {
	const hash = window.location.hash
	if (!hash) return

	const el = document.querySelector(hash)
	if (!el) return

	// небольшой timeout — чтобы DOM гарантированно отрендерился
	setTimeout(() => {
		el.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}, 0)
}

export function HashScroll() {
	const pathname = usePathname()

	// 1️⃣ при смене страницы
	useEffect(() => {
		scrollToHash()
	}, [pathname])

	// 2️⃣ при смене hash на той же странице
	useEffect(() => {
		const onHashChange = () => scrollToHash()

		window.addEventListener('hashchange', onHashChange)
		return () => window.removeEventListener('hashchange', onHashChange)
	}, [])

	return null
}
