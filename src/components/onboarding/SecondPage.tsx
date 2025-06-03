import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
const SecondPage = () => {
    	const containerVariants = {
			hidden: { opacity: 0, x: 50 },
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
				src={'/onboarding/second.svg'}
				width={300}
				height={500}
				alt=''
			/>
			<div className='pt-14 flex flex-col items-center max-w-[500px] space-y-4'>
				<h2 className='font-semibold text-2xl'>Tired of Long Line?</h2>
				<p className='text-lg text-center'>
					Choose a service, pick a time, and reserve your spot—all in
					just a few taps.
				</p>
			</div>
		</motion.div>
  );
}

export default SecondPage