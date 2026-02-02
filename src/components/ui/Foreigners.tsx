const DEFAULT_TITLE = 'Приём иностранных граждан на службу по контракту'

export type ForeignersProps = {
	title?: string
}

export default function Foreigners({ title }: ForeignersProps) {
	const finalTitle = title ?? DEFAULT_TITLE

	return (
		<section
			id='foreigners'
			className='scroll-mt-20 py-5 lg:py-[30px] xl:py-[40px]'
		>
			<div className='flex w-full flex-col gap-5 px-2.5 font-golos min-[1199px]:px-[20px] lg:gap-7.5'>
				<h2 className='w-full font-golos text-[20px] font-semibold text-contrast md:text-[24px] lg:text-[30px] xl:text-[40px]'>
					{finalTitle}
				</h2>

				<div className='flex w-full flex-col gap-5 font-golos'>
					<p className='text-[16px] font-normal lg:text-[21px]'>
						В Российской Федерации действует установленный порядок, позволяющий
						иностранным гражданам заключить контракт о прохождении военной
						службы. Набор ведётся в определённые воинские части, при соблюдении
						установленных требований и наличии законного статуса пребывания в РФ
					</p>

					<div>
						<p className='text-[16px] font-semibold text-contrast lg:text-[21px]'>
							Требования к иностранным гражданнам:
						</p>
						<ul className='mt-2.5 list-disc pl-7 font-golos text-[16px] font-normal lg:text-[21px]'>
							<li>
								Вы гражданин одной из стран СНГ либо иного государства, законно
								находящийся на территории России
							</li>
							<li>У вас есть действующий паспорт</li>
							<li>
								У вас есть миграционная карта (исключение — граждане Республики
								Беларусь)
							</li>
						</ul>
					</div>

					<div>
						<p className='text-[16px] font-semibold text-contrast lg:text-[21px]'>
							Документы, которые ускоряют оформление контракта:
						</p>
						<ul className='mt-2.5 list-disc pl-7 font-golos text-[16px] font-normal lg:text-[21px]'>
							<li>Разрешение на временное проживание (РВП)</li>
							<li>Вид на жительство (ВНЖ)</li>
							<li>Наличие СНИЛС</li>
							<li>Наличие ИНН</li>
							<li>Временная регистрация по месту пребывания</li>
						</ul>
					</div>

					<div>
						<p className='text-[16px] text-[#797c85] lg:text-[21px]'>
							Если каких-то документов нет, утеряны или требуют перевода — мы
							подскажем, что необходимо восстановить или оформить, и поможем
							пройти все этапы без задержек
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
