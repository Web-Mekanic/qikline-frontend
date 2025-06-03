import React from 'react'
import { Calendar, MoreHorizontal, ChevronDown,  Users } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MdAddCard } from 'react-icons/md';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import AppointmentTableState from '@/components/admin/Appointment-table-state'
const page = () => {
  return (
		<>
			<div className='p-6'>
				<h3 className='text-xl font-semibold text-gray-800'>
					Appointments
				</h3>
				<div className='mt-6 flex items-center justify-between'>
					<Tabs
						defaultValue='upcoming'
						className='w-full  '
					>
						<div className='flex items-center gap-x-4 w-full justify-between'>
							<TabsList className='h-13 bg-gray-100 px-2 rounded-md w-[500px]'>
								<TabsTrigger
									value='upcoming'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									upcoming
								</TabsTrigger>
								<TabsTrigger
									value='today'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Today
								</TabsTrigger>
								<TabsTrigger
									value='completed'
									className='data-[state=active]:bg-blue-700 data-[state=active]:text-white h-10'
								>
									Completed
								</TabsTrigger>
							</TabsList>
							<div className='flex items-center gap-x-4'>
								<Button
									variant='outline'
									className='bg-white h-12 text-gray-800'
								>
									View All Appointments
								</Button>
								<Button
									variant='outline'
									className='bg-white h-12 text-gray-800 w-[200px]'
								>
									<Calendar
										size={24}
										className='text-gray-400'
									/>
									View calendar
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<div className='flex items-center gap-x-2 bg-white h-12 text-gray-800 px-5 rounded-md cursor-pointer border border-gray-200'>
											Filter{' '}
											<ChevronDown
												size={24}
												className='text-gray-400'
											/>
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side='bottom'
										align='end'
									>
										<DropdownMenuItem>
											View calendar
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
						<TabsContent value='upcoming'>
							<Table className='mt-6 pl-6 w-full'>
								<TableHeader className='bg-gray-100 py-2  h-12'>
									<TableRow>
										<TableHead className='pl-12'>
											Client
										</TableHead>
										<TableHead>Service</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Time</TableHead>
										<TableHead>Staff</TableHead>
										<TableHead>Action</TableHead>
									</TableRow>
								</TableHeader>
								 <TableBody className='space-y-2 '>
					<TableRow className='h-12 mt-4'>
						<TableCell className='font-medium flex items-center gap-x-2 pl-12'>
							<Avatar className='w-10 h-10'>
								<AvatarImage src='https://github.com/shadcn.png' />
								<AvatarFallback>
									JD
								</AvatarFallback>
							</Avatar>
							John Doe
						</TableCell>
						<TableCell>Haircut</TableCell>
						<TableCell>2025-01-01</TableCell>
						<TableCell>10:00 AM</TableCell>
						<TableCell>Sponge Bob</TableCell>
						<TableCell className=''>
							<MoreHorizontal size={24} />
						</TableCell>
					</TableRow>
                    <TableRow className='h-12 mt-4'>
                        <TableCell className='font-medium flex items-center gap-x-2 pl-12'>
                            <Avatar className='w-10 h-10'>
                                <AvatarImage src='https://github.com/shadcn.png' />
                                <AvatarFallback>
                                    JF
                                </AvatarFallback>
                            </Avatar>
                            Jane Fray
                        </TableCell>
                        <TableCell>Tinting</TableCell>
                        <TableCell>2025-01-01</TableCell>
                        <TableCell>10:00 AM</TableCell>
                        <TableCell>Patrick Star</TableCell>
                        <TableCell className=''>
                            <MoreHorizontal size={24} />
                        </TableCell>
                    </TableRow>
				</TableBody>  
							</Table>
						</TabsContent>
						<TabsContent value='today'>
							Change your password here.
						</TabsContent>
						<TabsContent value='completed'>
							Change your password here.
						</TabsContent>
					</Tabs>
				</div>
			</div>

			<AppointmentTableState
				title='No appointments yet'
				description="You haven't received any appointments just yet. Once customers start booking, they'll appear here for you to manage."
				buttonText='Set Up Services'
			/>
		</>
  );
}

export default page;