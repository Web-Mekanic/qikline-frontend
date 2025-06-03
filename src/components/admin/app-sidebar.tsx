'use client';
import { LogOut, Bell, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import Logo from '../Logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type MenuItem = {
	title: string;
	url: string;
	icon: React.ReactNode;
};

// Menu items.
const items: MenuItem[] = [
	{
		title: 'Appointments',
		url: '/admin/dashboard',
		icon: (
			<HiOutlineCalendarDays
				size={24}
			
			/>
		),
	},
	{
		title: 'Payments',
		url: '/admin/dashboard/payments',
		icon: (
			<Image
				src={'/admin/icons/credit-card.svg'}
				alt='inbox'
				width={24}
				height={24}
			/>
		),
	},
	{
		title: 'Staff',
		url: '/admin/dashboard/staff',
		icon: (
			<Image
				src={'/admin/icons/user-group.svg'}
				alt='inbox'
				width={24}
				height={24}
			/>
		),
	},
	{
		title: 'Analytics',
		url: '/admin/dashboard/analytics',
		icon: (
			<Image
				src={'/admin/icons/waterfall.svg'}
				alt='inbox'
				width={24}
				height={24}
			/>
		),
	},
	{
		title: 'Settings',
		url: '/admin/dashboard/settings',
		icon: (

					<Settings
						size={24}
					/>
				
		),
	},
	{
		title: 'Notifications',
		url: '/admin/dashboard/notification',
		icon: (
			<Bell
				size={24}
			/>
		),
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	return (
		<Sidebar>
			<SidebarContent className=' p-4 text-gray-700'>
				<SidebarGroup className='flex flex-col justify-between h-full'>
					<div>
						<SidebarGroupLabel className='mb-5'>
							<Logo />
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className='space-y-3 mt-10'>
								{items.map((item) => (
									<SidebarMenuItem
										key={item.title}
										className={cn(
											'  hover:bg-blue-700/10 p-2 rounded-md',
											pathname === item.url &&
												'bg-blue-700/10 text-blue-700'
										)}
									>
										<Link
											href={item.url}
											className={cn(
												' flex items-center gap-x-2'
											)}
										>
											<span className={cn('text-gray-400 hover:text-blue-700',pathname=== item.url? 'text-blue-700':'')}>
												{item.icon}
											</span>

											<span>{item.title}</span>
										</Link>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</div>
					<SidebarFooter className=''>
						<Link
							href='/admin/logout'
							className='flex items-center gap-x-2'
						>
							<LogOut
								size={24}
								className='text-gray-400'
							/>
							<span className='text-gray-700'>Logout</span>
						</Link>
					</SidebarFooter>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
