const DEFAULTS = {
	title:
		'Контрактная служба СВО по специальностям — возможность выбрать направление и получить обучение',
	subtitle:
		'Контрактная служба позволяет добровольцам поступить в выбранные подразделения и работать по специальности.',
	text: 'Кандидату предоставляется обучение, экипировка, денежное довольствие и возможность служить в тех войсках, где его навыки наиболее востребованы: РЭБ, артиллерия, ВДВ, Африканский корпус, ракетные войска, морская пехота, мотострелковые части, водители категорий C/D/E, операторы БПЛА и другие направления',
} as const

export type SpecialtiesProps = {
	title?: string
	subtitle?: string
	text?: string
}

export default function Specialties(props: SpecialtiesProps) {
	const finalTitle = props.title ?? DEFAULTS.title
	const finalSubtitle = props.subtitle ?? DEFAULTS.subtitle
	const finalText = props.text ?? DEFAULTS.text

	return (
		<section className='py-5 lg:py-[30px] xl:py-[40px]'>
			<div className='flex w-full flex-col gap-5 px-2.5 min-[1199px]:px-[20px]'>
				<h2 className='w-full font-golos text-[20px] font-semibold text-contrast md:text-[24px] lg:text-[30px] xl:text-[40px]'>
					{finalTitle}
				</h2>

				<div className='flex w-full flex-col gap-5 font-golos'>
					<p className='text-[16px] font-normal lg:text-[21px]'>
						{finalSubtitle}
					</p>

					<p className='text-[16px] font-normal text-[#797c85] lg:text-[21px]'>
						{finalText}
					</p>

					<div>
						<p className='text-[16px] font-semibold lg:text-[21px]'>
							Кого приглашают на службу:
						</p>
						<ul className='mt-2.5 list-disc pl-7 font-golos text-[16px] font-normal text-[#797c85] lg:text-[21px]'>
							<li>Набор ведётся для граждан из всех регионов России</li>
							<li>
								Кандидатам доступны направления как с опытом службы, так и с
								нулевой подготовкой — предусмотрено обучение под руководством
								опытных инструкторов
							</li>
						</ul>
					</div>

					<div>
						<p className='text-[16px] font-semibold lg:text-[21px]'>
							Что получает контрактник:
						</p>
						<ul className='mt-2.5 list-disc pl-7 font-golos text-[16px] font-normal text-[#797c85] lg:text-[21px]'>
							<li>Полный комплект современной экипировки и снаряжения</li>
							<li>Обучение от инструкторов, имеющих боевой опыт</li>
							<li>
								Денежное довольствие от 210 000 ₽ + дополнительные выплаты
							</li>
							<li>
								Возможность поступить в конкретное подразделение при
								соответствии требованиям
							</li>
							<li>Официальное оформление, сопровождение, поддержка</li>
						</ul>
					</div>

					<div className='flex flex-col gap-2.5'>
						<p className='text-[16px] font-semibold lg:text-[21px]'>
							Выплаты и поддержка
						</p>
						<p className='text-[16px] text-contrast lg:text-[21px]'>
							По региональным и федеральным программам предусмотрены
							единовременные выплаты, ежемесячное довольствие, компенсации, а
							также социальная и медицинская поддержка
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
