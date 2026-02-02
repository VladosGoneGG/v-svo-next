type VacancyRowProps = {
	title: string
	tags: readonly string[]
}

const vacancyItemCls =
	'flex items-center justify-between bg-[#f9f9f9] rounded-[12px] p-4'
const vacancyTitleCls = 'font-golos font-semibold text-[18px]'
const vacancyTagsRowCls =
	'font-golos text-contrast font-medium text-[14px] flex flex-wrap gap-3 leading-none'
const vacancyTagsWrapCls =
	'font-golos text-contrast font-medium text-[14px] flex flex-wrap gap-x-3 gap-y-1 leading-none'

export default function VacancyRow({ title, tags }: VacancyRowProps) {
	const tagsClass = tags.length > 2 ? vacancyTagsWrapCls : vacancyTagsRowCls

	return (
		<div className={vacancyItemCls}>
			<div className='flex min-w-0 flex-col'>
				<p className={vacancyTitleCls}>{title}</p>

				<div className={tagsClass}>
					{tags.map(tag => (
						<span key={tag}>{tag}</span>
					))}
				</div>
			</div>

			<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white'>
				<img src='/icons/hi-1.svg' alt='' className='h-5 w-5' />
			</div>
		</div>
	)
}
