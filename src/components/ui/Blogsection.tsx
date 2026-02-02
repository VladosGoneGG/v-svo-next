import Fullbleed from '@/components/ui/Fullbleed'

type BlogPost = {
	title?: string | null
	text?: string | null
	note?: string | null
}

type BlogsectionProps = {
	data?: unknown
	bgClassName?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getPostIndex(key: string): number | null {
	const m = String(key).match(/^post(\d+)$/)
	return m ? Number(m[1]) : null
}

function toBlogPost(value: unknown): BlogPost | null {
	if (!isRecord(value)) return null

	const title = typeof value.title === 'string' ? value.title : null
	const text = typeof value.text === 'string' ? value.text : null
	const note = typeof value.note === 'string' ? value.note : null

	// если вообще пусто — не считаем постом
	if (!title && !text && !note) return null

	return { title, text, note }
}

export default function Blogsection({
	data,
	bgClassName = 'bg-white',
}: BlogsectionProps) {
	if (!isRecord(data)) return null

	// Собираем все postN, сортируем по N
	const posts = Object.entries(data)
		.map(([key, value]) => ({ n: getPostIndex(key), value }))
		.filter((x): x is { n: number; value: unknown } => typeof x.n === 'number')
		.sort((a, b) => a.n - b.n)
		.map(x => toBlogPost(x.value))
		.filter((p): p is BlogPost => Boolean(p))

	// На случай если вдруг прилетит одиночный пост формата {title,text,note}
	const single = toBlogPost(data)
	const finalPosts = posts.length > 0 ? posts : single ? [single] : []

	if (!finalPosts.length) return null

	return (
		<>
			{finalPosts.map((post, idx) => {
				const sectionBg =
					idx % 2 === 1 ? 'bg-[#F9F9F9]' : confirmBg(bgClassName)

				return (
					<section
						key={`${post.title ?? 'post'}-${idx}`}
						className='relative py-5 lg:py-[30px] xl:py-[40px]'
					>
						<Fullbleed className={sectionBg} />

						<div className='w-full flex flex-col gap-5 lg:gap-7.5 px-2.5 min-[1199px]:px-[20px]'>
							{post.title ? (
								<h2 className='w-full font-golos font-semibold text-[20px] md:text-[24px] lg:text-[30px] xl:text-[40px] text-contrast'>
									{post.title}
								</h2>
							) : null}

							<div className='w-full flex flex-col gap-5 font-golos'>
								{post.text ? (
									<p className='text-[16px] lg:text-[21px] font-normal'>
										{post.text}
									</p>
								) : null}

								{post.note ? (
									<p className='text-[16px] lg:text-[21px] text-[#797c85]'>
										{post.note}
									</p>
								) : null}
							</div>
						</div>
					</section>
				)
			})}
		</>
	)
}

/**
 * На всякий случай: если передадут пустую строку — не ломаем фон,
 * возвращаем дефолт.
 */
function confirmBg(bg: string) {
	const s = String(bg ?? '').trim()
	return s ? s : 'bg-white'
}
