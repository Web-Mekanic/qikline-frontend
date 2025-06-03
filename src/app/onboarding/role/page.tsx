'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, User2, Users, Users2, Users2Icon } from 'lucide-react';
const page = () => {
    const [role, setRole] = useState('');
    const [ative,setActive] = useState(false);
    const router = useRouter();
const handleSelection = (role:string) =>{
    setRole(role);
    setActive(true);
}

const handleContinue = () => {
    if(role == 'user'){
        router.push('/register')
    }else if(role == 'staff'){
        router.push('/staff')
    }else{
        router.push('/admin')
    }
}
  return (
		<div className='h-screen w-screen bg-white pt-20 flex flex-col items-center text-gray-700'>
			<Image
				src={'/onboarding/first.svg'}
				width={500}
				height={500}
				alt=''
			/>
			<div className='mt-13 flex flex-col items-center gap-5 '>
				<h2 className='text-black text-2xl font-medium'>
					What would you like to do today?
				</h2>
				<ul className='w-[500px] border border-gray-100 rounded-2xl p-7 space-y-6'>
					<li
						className={`${
							role == 'user' ? 'bg-blue-700/10 rounded-md' : ''
						} transition-all duration-500 ease-in-out flex items-start gap-x-4 p-2`}
						onClick={() => handleSelection('user')}
					>
						<User2
							color='blue'
							size={24}
						/>
						<div>
							<h3 className='text-black font-medium text-lg'>
								Book an appointment or join a Queue
							</h3>
							<p className='text-sm'>
								"I am a customer looking to schedule or wait
								remotely"
							</p>
						</div>
					</li>
					<li
						className={`${
							role == 'business'
								? 'bg-blue-700/10 rounded-md'
								: ''
						} transition-all duration-500 ease-in-out flex items-start gap-x-4 p-2`}
						onClick={() => handleSelection('business')}
					>
                        <Image src={'/onboarding/bank.svg'} width={24} height={24} alt=''/>
						<div>
							<h3 className='text-black font-medium text-lg'>
								Register My Business on QikLine
							</h3>
							<p className='text-sm'>
								“I own or manage a business and want to set up
								my space.”
							</p>
						</div>
					</li>
					<li
						className={`${
							role == 'staff' ? 'bg-blue-700/10 rounded-md' : ''
						} transition-all duration-500 ease-in-out flex items-start gap-x-4 p-2`}
						onClick={() => handleSelection('staff')}
					>
						<Users2Icon
							size={24}
							color='blue'
						/>
						<div>
							<h3 className='text-black font-medium text-lg'>
								I work for a business
							</h3>
							<p className='text-sm'>
								“I’m a staff member invited to manage bookings.”
							</p>
						</div>
					</li>
				</ul>
				<button
					className={`${
						role == '' ? 'bg-blue-700/50' : 'bg-blue-700'
					} w-[300px] mt-5 capitalize text-center text-2xl font-[600] py-3 text-white rounded-xl`}
					onClick={handleContinue}
				>
					continue
				</button>
			</div>
		</div>
  );
}

export default page