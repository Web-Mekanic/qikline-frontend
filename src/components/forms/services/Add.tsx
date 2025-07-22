import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { serviceSchema } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const Add = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const form = useForm({
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			duration: 0,
			category: '',
		},
		resolver: zodResolver(serviceSchema),
	});

	return (
		<motion.div
			onClick={(e) => {
				setOpen(false);
				e.stopPropagation();
			}}
		
			className='fixed top-0 left-0 z-50 bg-black/20 h-screen w-screen p-4   flex items-center justify-center gap-y-2 hover:shadow-md transition-all duration-300 cursor-pointer group space-y-4 hover:border-blue-500'
		>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				initial={{ opacity: 0, y: 100, scale: 0.9 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 100, scale: 0.9 }}
				transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
				viewport={{ once: true, amount: 0.5 }}
				className='bg-white w-[90%] md:w-[700px] p-10 rounded-md border border-gray-200 flex flex-col gap-y-2 shadow-md transition-all duration-300 cursor-pointer group space-y-4'
			>
				<div className='flex items-center justify-between'>
					<h2 className='text-gray-800 text-lg font-medium'>
						Add new service
					</h2>
					<X
						size={24}
						className='text-gray-800 cursor-pointer'
						onClick={() => setOpen(false)}
					/>
				</div>
				<Form {...form}>
					<form className='space-y-6'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Service Name <span className='text-red-500'>*</span></FormLabel>
									<FormControl>
										<Input
											placeholder='Enter service name'
											{...field}
											className='h-12'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter service description'
											{...field}
											className='h-12'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-2 items-center gap-x-5 w-full '>
							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price (NGN) <span className='text-red-500'>*</span></FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Enter price'
												{...field}
												className='h-12'
												
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='duration'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Duration (minutes) <span className='text-red-500'>*</span></FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Enter duration'
												{...field}
												className='h-12 w-full'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter category'
											{...field}
											className='h-12'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex gap-x-5 items-center justify-center'>
							<Button
								variant={'outline'}
								size={'lg'}
                                className=' md:w-[18rem] h-12'
							>
								Cancel
							</Button>
							<Button
								type='submit'
								className=' md:w-[18rem] h-12 bg-blue-700 hover:bg-blue-800'
                                size={'lg'}
							>
								Add Service
							</Button>
						</div>
					</form>
				</Form>
			</motion.div>
		</motion.div>
	);
};

export default Add;
