import Link from 'next/link';
import Logo from './Logo';
import React from 'react'
import { Button } from './ui/button';

const Header = () => {
  return (
		<div className='max-w-5xl mx-auto mt-10 flex justify-between items-center shadow-md p-5 rounded-lg'>
			<Logo />
			<ul className='flex items-center gap-x-10'>
				<li className='font-medium text-gray-700 hover:text-blue-700 transition-all duration-300'>
					<Link href='/'>How it Works</Link>
				</li>
				<li className='font-medium text-gray-700 hover:text-blue-700 transition-all duration-300'>
					<Link href='/'>For Business</Link>
				</li>
				<li className='font-medium text-gray-700  hover:text-blue-700 transition-all duration-300'>
					<Link href='/'>For Customers</Link>
				</li>
			</ul>
			<Button
				variant='outline'
				className='font-medium   transition-all duration-300 hover:bg-blue-700 hover:text-white border border-gray-700'
				size='lg'
			>
				Try QikLine for Free
			</Button>
		</div>
  );
}

export default Header