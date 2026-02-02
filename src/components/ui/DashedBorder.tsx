'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react'

const clamp = (v: number, min: number, max: number) =>
	Math.max(min, Math.min(max, v))

type DashedBorderProps = {
	className?: string
	stroke?: string
	strokeWidth?: number
	dashArray?: string
	/** пиксели, как в CSS */
	radius?: number
	/** пиксели */
	inset?: number
}

export default function DashedBorder({
	className = '',
	stroke = '#D14E15',
	strokeWidth = 2,
	dashArray = '3 3',
	radius = 10,
	inset = 1,
}: DashedBorderProps) {
	const ref = useRef<HTMLDivElement | null>(null)
	const [size, setSize] = useState({ w: 0, h: 0 })

	useLayoutEffect(() => {
		const el = ref.current
		if (!el) return

		const ro = new ResizeObserver(entries => {
			const cr = entries[0]?.contentRect
			if (!cr) return
			setSize({
				w: Math.round(cr.width),
				h: Math.round(cr.height),
			})
		})

		ro.observe(el)
		return () => ro.disconnect()
	}, [])

	const d = useMemo(() => {
		const w = size.w || 0
		const h = size.h || 0
		if (w <= 0 || h <= 0) return ''

		const i = clamp(Number(inset) || 0, 0, 1000)

		const minX = i
		const minY = i
		const maxX = w - i
		const maxY = h - i

		const innerW = Math.max(0, maxX - minX)
		const innerH = Math.max(0, maxY - minY)

		const maxR = Math.floor(Math.min(innerW, innerH) / 2)
		const r = clamp(Number(radius) || 0, 0, maxR)

		return `
      M ${minX + r} ${minY}
      H ${maxX - r}
      A ${r} ${r} 0 0 1 ${maxX} ${minY + r}
      V ${maxY - r}
      A ${r} ${r} 0 0 1 ${maxX - r} ${maxY}
      H ${minX + r}
      A ${r} ${r} 0 0 1 ${minX} ${maxY - r}
      V ${minY + r}
      A ${r} ${r} 0 0 1 ${minX + r} ${minY}
      Z
    `
	}, [size.w, size.h, inset, radius])

	return (
		<div
			ref={ref}
			className={[
				'pointer-events-none absolute inset-0 z-0 h-full w-full',
				className,
			].join(' ')}
		>
			<svg
				className='absolute inset-0 h-full w-full'
				xmlns='http://www.w3.org/2000/svg'
				viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
				preserveAspectRatio='none'
				fill='none'
				aria-hidden='true'
			>
				{d ? (
					<path
						d={d}
						stroke={stroke}
						strokeWidth={strokeWidth}
						strokeDasharray={dashArray}
						strokeLinecap='round'
						strokeLinejoin='round'
						vectorEffect='non-scaling-stroke'
					/>
				) : null}
			</svg>
		</div>
	)
}
