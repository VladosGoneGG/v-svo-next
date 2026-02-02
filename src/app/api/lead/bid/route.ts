import { NextResponse } from 'next/server'

type Json = null | boolean | number | string | Json[] | { [key: string]: Json }

type TgError = {
	ok: false
	error_code: number
	description?: string
	parameters?: {
		migrate_to_chat_id?: number
	}
}

function mustEnv(name: string): string {
	const v = process.env[name]
	if (!v) throw new Error(`Missing env: ${name}`)
	return v
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asString(v: Json | undefined): string {
	return typeof v === 'string' ? v.trim() : ''
}

function formatQuizMessage(
	payload: Record<string, Json>,
	meta: { pageUrl?: string },
): string {
	const lines: string[] = []

	lines.push('Квиз-заявка')

	const pageUrl = meta.pageUrl?.trim()
	if (pageUrl) {
		lines.push(`🌐 Страница: ${pageUrl}`)
	}

	lines.push('')

	const military = asString(payload.military)
	const birthDate = asString(payload.birthDate)
	const health = asString(payload.health)

	// спец: если пришёл "custom" и есть customSpec — используем его
	const specRaw = asString(payload.spec)
	const customSpec = asString(payload.customSpec)
	const spec =
		specRaw === 'custom' ? customSpec || 'Свой вариант' : specRaw || customSpec

	const interest = asString(payload.interest)
	const priority = asString(payload.priority)

	if (military) lines.push(`🪖 Военный билет: ${military}`)
	if (birthDate) lines.push(`🎂 Дата рождения: ${birthDate}`)
	if (health) lines.push(`❤️ Здоровье: ${health}`)
	if (spec) lines.push(`🎯 Специальность: ${spec}`)
	if (interest) lines.push(`⭐️ Интерес: ${interest}`)
	if (priority) lines.push(`🚀 Приоритет: ${priority}`)

	lines.push('')

	const name = asString(payload.name)
	const phone = asString(payload.phone)

	if (name) lines.push(`👤 ФИО: ${name}`)
	if (phone) lines.push(`📞 Телефон: ${phone}`)

	// на всякий: если вообще ничего не пришло
	if (lines.length <= 3) {
		lines.push('⚠️ Пустая заявка (проверь payload)')
	}

	return lines.join('\n')
}

async function readTelegramError(resp: Response): Promise<TgError | null> {
	const raw = await resp.text().catch(() => '')
	if (!raw) return null
	try {
		return JSON.parse(raw) as TgError
	} catch {
		return null
	}
}

export async function POST(req: Request) {
	try {
		const raw = (await req.json()) as unknown

		if (!isRecord(raw)) {
			return NextResponse.json(
				{ ok: false, error: 'payload must be an object' },
				{ status: 400 },
			)
		}

		// Json-safe payload
		const payload: Record<string, Json> = {}
		for (const [k, v] of Object.entries(raw)) {
			payload[k] = (v as Json) ?? null
		}

		const botToken = mustEnv('TELEGRAM_BOT_TOKEN')
		const chatId = mustEnv('TELEGRAM_CHAT_ID')

		const pageUrl =
			typeof payload.pageUrl === 'string'
				? payload.pageUrl
				: (req.headers.get('referer') ?? undefined)

		const text = formatQuizMessage(payload, { pageUrl })

		const sendToTelegram = async (chat: string) => {
			return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: chat,
					text,
					disable_web_page_preview: true,
				}),
			})
		}

		let tgRes = await sendToTelegram(chatId)

		if (!tgRes.ok) {
			const parsed = await readTelegramError(tgRes)
			const migratedId = parsed?.parameters?.migrate_to_chat_id

			if (typeof migratedId === 'number') {
				tgRes = await sendToTelegram(String(migratedId))

				if (tgRes.ok) {
					return NextResponse.json({
						ok: true,
						warn: 'chat_id migrated, update TELEGRAM_CHAT_ID',
						migrate_to_chat_id: migratedId,
					})
				}

				const details2 = await tgRes.text().catch(() => '')
				return NextResponse.json(
					{ ok: false, error: 'telegram failed', details: details2 },
					{ status: 502 },
				)
			}

			const details = parsed
				? JSON.stringify(parsed)
				: await tgRes.text().catch(() => '')
			return NextResponse.json(
				{ ok: false, error: 'telegram failed', details },
				{ status: 502 },
			)
		}

		return NextResponse.json({ ok: true })
	} catch (e) {
		const message = e instanceof Error ? e.message : 'unknown error'
		return NextResponse.json({ ok: false, error: message }, { status: 500 })
	}
}
