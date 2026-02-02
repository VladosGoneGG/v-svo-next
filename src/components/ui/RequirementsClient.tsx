'use client'

import { usePopupFlow } from '@/hooks/usePopupFlow'
import { motion } from 'motion/react'

import Fullbleed from '@/components/ui/Fullbleed'
import Modal from '@/components/ui/Modal'
import Popup from '@/components/ui/Popup'
import Popupok from '@/components/ui/Popupok'

type RequirementsClientProps = {
	title: string
	text: string
}

export default function RequirementsClient({
	title,
	text,
}: RequirementsClientProps) {
	const popup = usePopupFlow()

	return (
		<section
			id='requirements'
			className='relative flex flex-col items-start justify-center pb-5 pt-5 scroll-mt-20 lg:py-[30px] xl:py-[40px]'
		>
			{/* Fullbleed заменяем на простой фон, чтобы не тянуть server-компонент в client */}
			<Fullbleed className='bg-white' />

			<div className='flex w-full flex-col items-start justify-center gap-5 px-2.5 md:flex-row md:items-center md:gap-10 lg:px-5'>
				{/* Левая колонка */}
				<div className='flex w-full flex-col justify-start gap-5 md:h-[580px] md:max-w-[350px] md:justify-between lg:max-w-[400px] xl:max-w-[580px]'>
					<h2 className='w-full font-golos text-[20px] font-semibold text-contrast md:text-[24px] lg:text-[30px] xl:max-w-[508px] xl:text-[40px]'>
						{title}
					</h2>

					<p className='w-full font-golos text-[14px] font-normal md:text-[16px] lg:text-[21px] xl:max-w-[508px]'>
						{text}
					</p>

					<div className='flex w-full flex-col gap-5 md:items-end'>
						<div className='flex w-full flex-row items-start justify-between rounded-bl-[10px] rounded-t-[10px] bg-[#ebebeb] xl:max-w-[470px] lg:min-h-[133px] xl:min-h-[115px] xl:justify-end'>
							<div className='mb-2.5 flex w-full flex-col gap-2.5 py-2.5 pl-[15px] pr-2.5'>
								<p className='font-golos text-[22px] font-semibold'>Артем</p>
								<p className='font-golos text-[16px] font-normal'>
									Оставьте заявку для консультации о вашей годности к
									контрактной службе
								</p>
							</div>

							<div
								className='mr-2.5 mt-2.5 flex h-[95px] w-[95px] shrink-0 items-center justify-center rounded-[10px] bg-white'
								aria-label='Герб'
							>
								<img src='/images/gerb.png' alt='Герб' />
							</div>
						</div>

						<motion.button
							type='button'
							onClick={popup.open}
							className='h-[62px] w-full cursor-pointer items-center justify-center rounded-[15px] bg-contrast/90 px-7.5 font-inter text-[18px] font-semibold text-white shadow-btn transition-colors duration-150 ease-in-out hover:bg-contrast active:bg-contrast/70 md:flex md:max-w-[350px] xl:ml-auto xl:max-w-[310px]'
							whileTap={{ scale: 0.97, y: 1 }}
							transition={{ duration: 0.15, ease: 'easeInOut' }}
						>
							Задать вопрос
						</motion.button>
					</div>
				</div>

				{/* Правая колонка */}
				<div className='flex h-full flex-col gap-7.5 md:h-[570px] md:justify-between xl:max-h-[580px]'>
					<ReqItem
						n='01'
						title='Возраст'
						text='От 18 до 63 лет включительно. Образование — не ниже 9 класса. Преимущество имеют кандидаты с опытом службы или профильной подготовкой'
					/>
					<ReqItem
						n='02'
						title='Гражданство'
						text={
							<>
								Граждане Российской Федерации, а также иностранные граждане,
								<br />
								имеющие необходимые документы
							</>
						}
					/>
					<ReqItem
						n='03'
						title='Отсутствие судимости по статьям'
						text={
							<>
								Кандидат не должен иметь непогашенной судимости по тяжким и
								<br />
								особо тяжким статьям. Проверка проводится официально по базам
								МВД
							</>
						}
					/>
					<ReqItem
						n='04'
						title='Категория здоровья'
						text='Категория годности A, Б или В по итогам военно-врачебной комиссии. Отсутствие противопоказаний, препятствующих службе'
					/>
				</div>
			</div>

			<Modal isOpen={popup.isOpen} onClose={popup.close}>
				{popup.isSuccess ? (
					<Popupok onClose={popup.close} />
				) : (
					<Popup onSuccess={popup.success} />
				)}
			</Modal>
		</section>
	)
}

type ReqItemProps = {
	n: string
	title: string
	text: React.ReactNode
}

function ReqItem({ n, title, text }: ReqItemProps) {
	return (
		<div className='flex items-start gap-4'>
			<div className='flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#6f7176]'>
				<span className='font-inter text-[14px] font-semibold text-white'>
					{n}
				</span>
			</div>

			<div className='flex w-full max-w-[320px] flex-col gap-2.5 sm:max-w-[500px] md:max-w-none lg:max-w-[615px]'>
				<p className='font-golos text-[20px] font-semibold text-contrast'>
					{title}
				</p>
				<p className='font-golos text-[14px] font-medium leading-5 text-[#222]'>
					{text}
				</p>
			</div>
		</div>
	)
}
