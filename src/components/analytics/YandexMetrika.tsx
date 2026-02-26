'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

declare global {
	interface Window {
		ym?: (...args: any[]) => void
	}
}

type Props = {
	id: number
	enabled?: boolean
}

export default function YandexMetrika({ id, enabled = true }: Props) {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	// SPA hits on route change
	useEffect(() => {
		if (!enabled) return
		if (typeof window === 'undefined') return

		const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '')

		// If metrika hasn't loaded yet — no-op
		if (typeof window.ym !== 'function') return

		window.ym(id, 'hit', url)
	}, [enabled, id, pathname, searchParams])

	if (!enabled) return null

	return (
		<>
			<Script
				id='yandex-metrika-loader'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
						(function(m,e,t,r,i,k,a){
							m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
							m[i].l=1*new Date();
							for (var j = 0; j < document.scripts.length; j++) {
								if (document.scripts[j].src === r) { return; }
							}
							k=e.createElement(t),a=e.getElementsByTagName(t)[0],
							k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
						})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

						ym(${id}, 'init', {
							ssr:true,
							webvisor:true,
							clickmap:true,
							ecommerce:"dataLayer",
							referrer: document.referrer,
							url: location.href,
							accurateTrackBounce:true,
							trackLinks:true
						});
					`,
				}}
			/>
			<noscript>
				<div>
					<img
						src={`https://mc.yandex.ru/watch/${id}`}
						style={{ position: 'absolute', left: '-9999px' }}
						alt=''
					/>
				</div>
			</noscript>
		</>
	)
}
