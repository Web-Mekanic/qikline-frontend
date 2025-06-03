import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/admin/app-sidebar'
import React from 'react'
import SearchBox from '@/components/admin/searchBox';
import { Settings, Users, Calendar, Bell } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MdAddCard } from 'react-icons/md';


const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
		<SidebarProvider>
			<AppSidebar />
			<main className=' w-full'>
				{/* <SidebarTrigger color='blue' /> */}
				<div className='flex items-center justify-between w-full p-6 pb-10 border-b border-gray-200'>
					<SearchBox placeholder='Search ' />
					<div className='flex items-center gap-x-4'>
						<Settings
							size={24}
							className='text-gray-400'
						/>
						<Bell
							size={24}
							className='text-gray-400'
						/>
					</div>
				</div>{' '}
				<div className=''>
					<div className='flex items-center justify-between p-6'>
						<div className='space-y-2 w-xs'>
							<h4 className='text-2xl font-bold'>Dashboard</h4>
							<p className='text-gray-500'>
								Manage your appointments and business operations
							</p>
						</div>
						<Button
							className='bg-blue-700 text-white hover:bg-blue-800 w-xs h-12'
							size='lg'
						>
							<MdAddCard size={24} />
							<span>New Appointment</span>
						</Button>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 border-b border-gray-200 pb-10 p-6'>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Total Appointments
								</h5>
								<Calendar
									size={30}
									className='text-gray-400'
								/>
							</div>

							<div>
								<p className='text-lg font-semibold'>1000</p>
								<p className='text-gray-500'>
									+8% from last month
								</p>
							</div>
						</div>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Total Revenue
								</h5>
								<Image
									src='/admin/icons/waterfall.svg'
									alt='money'
									width={30}
									height={30}
									className='text-gray-400'
								/>
							</div>

							<div>
								<p className='text-lg font-semibold'>
									N 100,000
								</p>
								<p className='text-gray-500'>
									+32.5% from last month
								</p>
							</div>
						</div>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Staff on Duty
								</h5>
								<Image
									src='/admin/icons/user-group.svg'
									alt='staff'
									width={30}
									height={30}
									className='text-gray-400'
								/>
							</div>
							<div>
								<p className='text-lg font-semibold'>24</p>
								<p className='text-gray-500'>
									2 more staff needed
								</p>
							</div>
						</div>
						<div className='bg-white p-8 px-4 rounded-lg  space-y-4 border border-gray-200'>
							<div className='flex items-center justify-between'>
								<h5 className='text-lg font-semibold text-gray-800'>
									Average wait time
								</h5>
								<Users
									size={30}
									className='text-gray-400'
								/>
							</div>
							<div>
								<p className='text-lg font-semibold'>14 mins</p>
								<p className='text-gray-500'>
									-20% from last week
								</p>
							</div>
						</div>
					</div>
				</div>
				{children}
			</main>
		</SidebarProvider>
  );
}


export default layout