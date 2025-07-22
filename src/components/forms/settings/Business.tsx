import { zodResolver } from '@hookform/resolvers/zod';

import { createBusinessSchema } from '../../../../schema/schema';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Pencil, X } from 'lucide-react';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createBusiness } from '@/actions/admin/businessMgt/route';
import { getAccessToken } from '@/utils/token';
import { toast } from 'sonner';
import { useTransition, useState } from 'react';
export const Business = () => {
	const [isEditing, setIsEditing] = useState(false);
	const form = useForm({
		defaultValues: {
			name: '',
			category: '',
			description: '',
			address: '',
			city: '',
			state: '',
			country: '',
			phone_number: '',
			email: '',
			website: '',
			banner: [],
			is_active: true,
		},
		resolver: zodResolver(createBusinessSchema),
	});
	const [isPending, startTransition] = useTransition();
	const onSubmit = async (data: any) => {
		if (
			data.name === '' ||
			data.category === '' ||
			data.description === '' ||
			data.address === '' ||
			data.city === '' ||
			data.state === '' ||
			data.country === '' ||
			data.phone_number === '' ||
			data.email === ''
		) {
			toast.error('Please fill in all required fields', {
				duration: 3000,
				className: 'bg-red-500 text-white',
				icon: <X className='w-4 h-4' />,
				style: {
					backgroundColor: '#f87171',
					color: '#fff',
				},
				position: 'top-right',
			});
			return;
		}
		startTransition(async () => {
			try {
				const response = await createBusiness(
					data,
					getAccessToken() || ''
				);

				if (response.status) {
					toast.success(response.message);
					form.reset();
				} else {
					toast.error(response.message, {
						duration: 3000,
						className: 'bg-red-500 text-white',
						icon: <X className='w-4 h-4' />,
						style: {
							backgroundColor: '#f87171',
							color: '#fff',
						},
						position: 'top-right',
					});
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	return (
		<Form {...form}>
			<div className='p-4 px-8 border border-gray-200 rounded-lg max-w-[1000px] mb-10'>
				<div className='flex items-center justify-between my-6'>
					<h4 className='text-lg font-semibold text-gray-800'>
						Business Information
					</h4>
				
					<Button
						variant='outline'
						className={`${isEditing ? 'text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100'}`}
						onClick={() => setIsEditing(!isEditing)}
					>
						<Pencil className='w-4 h-4' />
							Edit
						</Button>
					
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='pt-8 space-y-8 '>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Business Name{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter business name'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='category'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Category{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter category'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Description{' '}
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='h-20 resize-none'
											placeholder='Enter description'
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Separator className='my-8 bg-gray-200' />
						<h4 className='text-lg font-semibold text-gray-800 mb-10'>
							Address Information
						</h4>
						<div className='space-y-8'>
							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Street Address{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter street address'
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='city'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												City{' '}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='h-12'
													placeholder='Enter city'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='state'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												State{' '}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='h-12'
													placeholder='Enter state'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='country'
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Country{' '}
											<span className='text-red-500'>
												*
											</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='h-12'
												placeholder='Enter country'
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Separator className='my-8 bg-gray-200' />
						<h4 className='text-lg font-semibold text-gray-800 mb-10'>
							Contact Information
						</h4>
						<div className='space-y-8'>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='phone_number'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Phone Number{' '}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='h-12'
													placeholder='Enter phone number'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Email Address{' '}
												<span className='text-red-500'>
													*
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													className='h-12'
													placeholder='Enter your email adddress '
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value || ''}
												className='h-12'
												placeholder='www.mybusiness.com '
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<Separator className='my-8 bg-gray-200' />
						<h4 className='text-lg font-semibold text-gray-800 mb-10'>
							Business Images
						</h4>
						<div className='grid grid-cols-3 gap-4 pb-3'>
							<Image
								src='/admin/images/1.jpg'
								alt='Business Image'
								width={300}
								height={300}
								className='rounded-lg h-40'
							/>
							<Image
								src='/admin/images/2.jpg'
								alt='Business Image'
								width={300}
								height={300}
								className='rounded-lg h-40'
							/>
							<Image
								src='/admin/images/3.jpg'
								alt='Business Image'
								width={300}
								height={300}
								className='rounded-lg h-40'
							/>
						</div>
						<div className='flex justify-center gap-4 mb-10'>
							<Button
								variant={'outline'}
								className='w-[200px] md:w-xs h-12 text-[16px] text-gray-600 hover:bg-gray-100'
								onClick={() => form.reset()}
							>
								Cancel
							</Button>
							<Button
								className=' w-[200px] md:w-xs h-12 bg-blue-700 text-white text-[16px] hover:bg-blue-800 font-semibold'
								type='submit'
								disabled={
									form.formState.isSubmitting ||
									!form.formState.isValid
								}
							>
								{isPending ? 'Saving...' : 'Save Changes'}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</Form>
	);
};
