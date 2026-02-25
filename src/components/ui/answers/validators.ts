export function isValidRuPhone(v: unknown): boolean {
	const digits = String(v ?? '').replace(/\D/g, '')
	// принимаем +7 / 8 и ровно 11 цифр
	return (
		digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))
	)
}
