'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useGoHome() {
	const pathname = usePathname()
	const router = useRouter()

	return useCallback(() => {
		if (pathname !== '/') {
			router.push('/')
			return
		}

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [pathname, router])
}
