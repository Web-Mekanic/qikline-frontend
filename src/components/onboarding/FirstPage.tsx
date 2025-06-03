import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const FirstPage = () => {
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
				src={'/onboarding/first.svg'}
				width={700}
				height={500}
				alt=''
			/>
			<div className='pt-14 flex flex-col items-center max-w-[500px] space-y-4'>
				<h2 className='font-semibold text-2xl'>
					Book appointments in secconds.
				</h2>
				<p className='text-lg text-center'>
					Say goodbye to endless waiting. QikLine is here to
					revolutionize the way you queue
				</p>
			</div>
		</motion.div>
	);
};

export default FirstPage;
