'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
	CircleCheck,
	CircleX,
	Clock,
	MoreVertical,
	Pencil,
	Plus,
	Trash,
	X,
} from 'lucide-react';
import SearchBox from '@/components/admin/searchBox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NairaSign from '@/components/ui/naira-sign';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Add from '@/components/forms/services/Add';
import { getBusinessServices } from '@/actions/admin/businessService/route';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';
type Service = {
	id: string;
	name: string;
	description: string;
	price: number;
	duration: number;
	category: string;
	category_display: string;
	is_active: boolean;
	created_at: string;
	updated_at: string;
};
const page = () => {
    const [open,setOpen] = useState(false)
	const [services, setServices] = useState<Service[]>([]);
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		startTransition(async () => {
			const response = await getBusinessServices('45678');
			if (response.status) {
				setServices(response.data);
			} else {
				toast.error(response.message,{
					duration: 3000,
					icon: <X className='w-4 h-4' />,
					position: 'bottom-right',
					className: 'bg-red-500 text-white',
					style: {
						backgroundColor: '#f87171',
						color: 'white',
					},
				});
			}
		});
		return () => {
			setServices([]);
		};
	}, []);

	return (
		<>
            {open && <Add open setOpen={setOpen}/>}
			<div className='flex flex-col md:flex-row md:items-center justify-between mt-6 px-6 gap-y-4'>
				<div className='flex flex-col gap-y-1'>
					<h2 className=' text-xl font-semibold text-gray-800 capitalize'>
						Services Management
					</h2>
					<p className='text-gray-500 text-base max-w-[350px] '>
						Manage your business services,prices and availability
					</p>
				</div>
				<div className='flex items-center gap-x-2 w-full md:w-auto justify-end'>
					<Button
						variant='outline'
						className='text-lg font-medium h-12 md:w-xs gap-x-2 bg-blue-700 text-white hover:bg-blue-700 hover:text-white'
                        onClick={() => setOpen(true)}
					>
						<Plus size={24} />
						Add Service
					</Button>
				</div>
			</div>
			<div className='p-6'>
				<div className='hidden md:flex items-center gap-x-5 mb-6'>
					<SearchBox placeholder='Search' />
				</div>

				<h2 className='text-gray-800 text-lg font-medium md:mt-10 mb-4'>
					Services ({services.length})
				</h2>
				<Tabs defaultValue='active'>
					<TabsList className='w-full md:w-[400px] h-12 bg-gray-50 rounded-md'>
						<TabsTrigger
							value='active'
							className='w-full'
						>
							Active services ({services.filter((service) => service.is_active).length})
						</TabsTrigger>
						<TabsTrigger
							value='inactive'
							className='w-full'
						>
							Inactive services ({services.filter((service) => !service.is_active).length})
						</TabsTrigger>
					</TabsList>
					<TabsContent value='active'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
							{services.map((service) => (
								service.is_active && (
							<div key={service.id} className='bg-white p-4 rounded-md border border-gray-200 flex flex-col gap-y-2 hover:shadow-md transition-all duration-300 cursor-pointer group space-y-4 hover:border-blue-500'>
								<div className='flex items-center justify-between'>
									<div>
										<h2 className='text-gray-800 text-lg font-medium'>
											{service.name}
										</h2>
										<p className='text-gray-500 text-sm max-w-[200px] '>
											{service.description}
										</p>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger className='bg-gray-100 h-10 w-10 text-gray-800  rounded-full flex items-center justify-center  hover:bg-gray-200 cursor-pointer border border-gray-200 group '>
											<MoreVertical
												size={24}
												className='text-gray-400 group-hover:text-gray-800'
											/>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											side='bottom'
											align='end'
										>
											<DropdownMenuItem className='flex items-center gap-x-2'>
												<Pencil size={24} />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem className='flex items-center gap-x-2 text-red-500'>
												<Trash size={24} />
												Delete
											</DropdownMenuItem>
											<DropdownMenuItem className='flex items-center gap-x-2 text-gray-500'>
												<CircleX
													className='text-gray-500'
													size={24}
												/>
												Deactivate
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className='flex items-center gap-x-2'>
									<span className='text-blue-800 text-sm font-medium border border-blue-500 rounded-full px-4 py-1'>
										Active
									</span>
									<span className='text-gray-500 text-sm'>
										Last updated {formatDate(service.updated_at)}
									</span>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-x-2'>
										<span className='text-gray-800 text-lg font-medium'>
											<NairaSign /> {service.price}
										</span>
										<span className='text-gray-500 text-sm'>
											per session
										</span>
									</div>
									<div className='flex items-center gap-x-2'>
										<Clock
											size={20}
											className='text-gray-500'
										/>
										<span className='text-gray-500 text-sm'>
											{service.duration} mins
										</span>
									</div>
								</div>
							</div>
							)
							))}

						</div>{' '}
					</TabsContent>
					<TabsContent value='inactive'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
							{services.map((service) => (
								!service.is_active && (
							<div className='bg-white p-4 rounded-md border border-gray-200 flex flex-col gap-y-2 hover:shadow-md transition-all duration-300 cursor-pointer group space-y-4 hover:border-red-500/50 opacity-60'>
								<div className='flex items-center justify-between'>
									<div>
										<h2 className='text-gray-800 text-lg font-medium'>
											{service.name}
										</h2>
										<p className='text-gray-500 text-sm max-w-[200px] '>
											{service.description}
										</p>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger className='bg-gray-100 h-10 w-10 text-gray-800  rounded-full flex items-center justify-center  hover:bg-gray-200 cursor-pointer border border-gray-200 group '>
											<MoreVertical
												size={24}
												className='text-gray-400 group-hover:text-gray-800'
											/>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											side='bottom'
											align='end'
										>
											<DropdownMenuItem className='flex items-center gap-x-2'>
												<Pencil size={24} />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem className='flex items-center gap-x-2 text-red-500'>
												<Trash size={24} />
												Delete
											</DropdownMenuItem>
											<DropdownMenuItem className='flex items-center gap-x-2 text-green-500'>
												<CircleCheck
													className='text-green-500'
													size={24}
												/>
												Reactivate
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className='flex items-center gap-x-2'>
									<span className='text-red-500 text-sm font-medium border border-red-500 rounded-full px-4 py-1'>
										Inactive
									</span>
									<span className='text-gray-500 text-sm'>
										Last updated {formatDate(service.updated_at)}
									</span>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-x-2'>
										<span className='text-gray-800 text-lg font-medium'>
											<NairaSign /> {service.price}
										</span>
									</div>
									<div className='flex items-center gap-x-2'>
										<Clock
											size={20}
											className='text-gray-500'
										/>
										<span className='text-gray-500 text-sm'>
											{service.duration} mins
										</span>
									</div>
								</div>
							</div>
							)
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
};

export default page;
