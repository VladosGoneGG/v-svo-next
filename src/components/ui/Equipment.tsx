export default function Equipment() {
	return (
		<section className='relative py-7.5 pt-5 lg:py-[40px]'>
			<div className='absolute inset-0 -left-[50vw] left-1/2 w-screen -translate-x-1/2 -z-10' />

			<div className='w-full px-2.5 lg:px-[20px]'>
				<div className='flex flex-col items-start gap-5 px-5 md:flex-row md:items-stretch md:gap-0 lg:px-12.5'>
					{/* Левая колонка */}
					<div className='flex-1 min-w-0 max-w-[510px] font-golos'>
						<div className='max-w-[355px] sm:max-w-[550px] md:max-w-[900px] lg:max-w-[550px]'>
							<h3 className='text-[20px] font-semibold md:text-[24px] lg:text-[30px] xl:text-[40px]'>
								Получите современную экипировку от Министерства обороны
							</h3>

							<p className='text-[18px] text-contrast md:text-[22px] xl:text-[35px]'>
								— всё необходимое для службы и выполнения задач
							</p>
						</div>

						<div className='mt-5 flex flex-col gap-5 font-inter text-[14px] md:text-[16px] lg:text-[21px] xl:mt-[30px]'>
							<div>
								<p className='font-semibold'>Одежда и костюмы:</p>
								<ul className='mt-2.5 list-disc pl-7 font-golos text-[#797c85]'>
									<li>Экипировка по сезону</li>
									<li>Демисезонный тактический костюм</li>
									<li>Тёплая тактическая кофта (флис)</li>
									<li>Термобельё</li>
								</ul>
							</div>

							<div>
								<p className='font-semibold'>Обувь и защита:</p>
								<ul className='mt-2.5 list-disc pl-7 font-golos text-[#797c85]'>
									<li>Тактические ботинки</li>
									<li>Спецперчатки</li>
									<li>Коврик термоизоляционный</li>
								</ul>
							</div>

							<div>
								<p className='font-semibold'>Спальное снаряжение:</p>
								<ul className='mt-2.5 list-disc pl-7 font-golos text-[#797c85]'>
									<li>Спальный мешок</li>
									<li>Непромокаемый вещмешок</li>
								</ul>
							</div>

							<div>
								<p className='font-semibold'>Предметы личного пользования:</p>
								<ul className='mt-2.5 list-disc pl-7 font-golos text-[#797c85]'>
									<li>Набор в подсумке / средства личной гигиены</li>
								</ul>
							</div>

							<div>
								<p className='font-semibold'>Медицинское обеспечение:</p>
								<ul className='mt-2.5 list-disc pl-7 font-golos text-[#797c85]'>
									<li>Тактическая медицинская аптечка в сборе</li>
								</ul>
							</div>

							<p className='font-golos font-semibold text-contrast'>
								Вся экипировка — новая, соответствует установленным нормам
								обеспечения и предоставляется бесплатно государством
							</p>
						</div>
					</div>

					{/* Правая колонка */}
					<div className='flex flex-1 min-w-0 justify-center md:justify-end md:self-stretch'>
						<img
							src='/images/solder.webp'
							alt='Солдат'
							className='hidden h-full w-full rounded-[30px] object-cover md:block'
							loading='lazy'
							decoding='async'
						/>
						<img
							src='/images/soliderm.webp'
							alt='Солдат'
							className='h-full w-full rounded-[30px] object-cover md:hidden'
							loading='lazy'
							decoding='async'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
