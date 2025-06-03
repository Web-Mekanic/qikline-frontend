import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
const ThirdPage = () => {
    	const containerVariants = {
			hidden: { opacity: 0, x: -50 },
			visible: {
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.5,
					ease: 'easeOut',
				},
			},
		};
  return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={containerVariants}
			className='pt-10 flex flex-col items-center'
		>
			<Image
				src={'/onboarding/third.svg'}
				width={400}
				height={500}
				alt=''
			/>
			<div className='pt-14 flex flex-col items-center max-w-[500px] space-y-4'>
				<h2 className='font-semibold text-2xl'>
					Smarter scheduling for your buiness
				</h2>
				<p className='text-lg text-center'>
					Easily manage bookings, staff schedules, and walk-ins with
					one powerful app.
				</p>
			</div>
		</motion.div>
  );
}

export default ThirdPage