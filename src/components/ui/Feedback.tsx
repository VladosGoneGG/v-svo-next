import Fullbleed from '@/components/ui/Fullbleed'

type FeedbackItem = {
	name: string
	text: string
	stars: 4 | 5
}

const FEEDBACKS: FeedbackItem[] = [
	{
		name: 'Семен Тимофеев',
		text: 'Обращался за помощью в подборе части по своей специальности. Получил консультацию, объяснили все условия и помогли пройти оформление. В итоге служу в артиллерии — всё прошло организованно и без лишних вопросов',
		stars: 5,
	},
	{
		name: 'Евгений Павлов',
		text: 'Нужна была консультация по документам и порядку оформления. Разъяснили нюансы, помогли подготовиться и пройти все этапы. Сейчас служу по контракту, доволен сопровождением',
		stars: 4,
	},
	{
		name: 'Марат Власов',
		text: 'Хотел попасть в морскую пехоту, но сомневался, что подойду по требованиям. Кураторы всё проверили заранее, подсказали по подготовке и помогли оформить контракт. Спасибо за поддержку',
		stars: 5,
	},
	{
		name: 'Петр Тереньтев',
		text: 'Рассматривал несколько вариантов службы. Специалисты объяснили, какие части подходят моему опыту и где условия лучше. Помогли организовать оформление и решить вопросы с документами',
		stars: 5,
	},
	{
		name: 'Евгений Большаков',
		text: 'Не служил срочную, переживал из-за ВВК и требований. Получил подробную консультацию, подсказали по подготовке и сопровождали на всех этапах. В итоге всё прошло спокойно',
		stars: 4,
	},
	{
		name: 'Ярослав Горшков',
		text: 'Искал надежную организацию для консультации и подбора части. Помогли с выбором подходящего направления и прохождением оформления. Профессиональный подход, всё прозрачно',
		stars: 5,
	},
]

export default function Feedback() {
	return (
		<section className='relative py-5 lg:py-[30px] xl:py-[40px]'>
			{/* ФОН */}
			<Fullbleed className='bg-white' />

			{/* КОНТЕНТ */}
			<div className='relative z-10 flex w-full flex-col items-center gap-5 px-2.5 min-[1199px]:px-[20px] md:gap-7.5'>
				<h2 className='w-full px-5 font-inter text-[20px] font-semibold text-contrast md:text-[24px] lg:text-[30px] xl:text-[40px]'>
					Отзывы людей, которым мы помогли
				</h2>

				<ul className='grid w-full grid-cols-1 gap-2.5 font-golos md:grid-cols-2'>
					{FEEDBACKS.map(f => (
						<li
							key={f.name}
							className='flex flex-col justify-center items-start gap-2.5 rounded-[20px] bg-[#ebebeb] px-7.5 py-5'
						>
							<p className='text-[20px] font-semibold'>{f.name}</p>
							<p className='text-[14px] font-medium'>{f.text}</p>

							<img
								src={f.stars === 5 ? '/icons/5star.svg' : '/icons/4star.svg'}
								alt={`${f.stars} из 5`}
								className='h-[24px] w-auto'
								loading='lazy'
								decoding='async'
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
