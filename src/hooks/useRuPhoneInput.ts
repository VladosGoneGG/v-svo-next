'use client'

import { useCallback } from 'react'

const formatPhoneRU = (value: unknown) => {
	const digits = String(value ?? '').replace(/\D/g, '')

	// если начали с 8 → нормализуем к 7
	const normalized = digits[0] === '8' ? '7' + digits.slice(1) : digits

	if (normalized.length === 0) return ''
	if (normalized.length === 1) return `+${normalized}`

	// всегда приводим к +7 ...
	const n = normalized[0] === '7' ? normalized : '7' + normalized.slice(1)

	let result = '+7'

	// (XXX
	if (n.length > 1) result += ` (${n.slice(1, 4)}`
	// ) XXX
	if (n.length >= 5) result += `) ${n.slice(4, 7)}`
	// -XX
	if (n.length >= 8) result += `-${n.slice(7, 9)}`
	// -XX
	if (n.length >= 10) result += `-${n.slice(9, 11)}`

	return result
}

const isValidRuPhone = (value: unknown) => {
	const digits = String(value ?? '').replace(/\D/g, '')
	return digits.length === 11
}

/**
 * Хук для телефона РФ:
 * - форматирует в +7 (XXX) XXX-XX-XX
 * - чистит ввод
 * - возвращает register options + input props
 */
export function useRuPhoneInput() {
	const onInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		const el = e.currentTarget
		el.value = formatPhoneRU(el.value)
	}, [])

	const registerOptions = {
		required: true,
		validate: (value: unknown) => isValidRuPhone(value),
	}

	const inputProps = {
		type: 'tel' as const,
		inputMode: 'tel' as const,
		autoComplete: 'tel' as const,
		onInput,
	}

	return { registerOptions, inputProps, formatPhoneRU, isValidRuPhone }
}
