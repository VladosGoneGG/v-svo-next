export function isValidRuPhone(v: unknown): boolean {
	const digits = String(v ?? '').replace(/\D/g, '')
	// принимаем +7 / 8 и ровно 11 цифр
	return (
		digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))
	)
}

export function isValidBirthDate(v: unknown): boolean {
	const s = String(v ?? '').trim()
	if (!s) return false

	let d: Date | null = null

	// yyyy-mm-dd (input type="date")
	const m1 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
	if (m1) d = new Date(Number(m1[1]), Number(m1[2]) - 1, Number(m1[3]))

	// dd.mm.yyyy
	const m2 = s.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
	if (!d && m2) d = new Date(Number(m2[3]), Number(m2[2]) - 1, Number(m2[1]))

	if (!d || Number.isNaN(d.getTime())) return false

	// возраст: 16–80 лет
	const now = new Date()
	const hadBirthdayThisYear =
		now >= new Date(now.getFullYear(), d.getMonth(), d.getDate())

	const age =
		now.getFullYear() - d.getFullYear() - (hadBirthdayThisYear ? 0 : 1)

	return age >= 16 && age <= 80
}
