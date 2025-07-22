'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '../../../schema/schema';
import { Form, FormField, FormLabel, FormControl, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { resetPassword } from '@/actions/auth/businessOwner/route';
import { toast } from 'sonner';

const ResetPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token: '',
			password: '',
			confirmPassword: '',
		},
	});
	const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        const formData = new FormData();
        formData.append('token', data.token);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
		try {
			const response = await resetPassword(formData);
			if (response?.status) {
				toast.success(response?.message || 'Password reset successfully', {
					duration: 3000,
					className: 'bg-green-50 text-green-700',
					icon: '🎉',
					position: 'top-right',
				});
			} else {
				toast.error(response?.message || 'Failed to reset password', {
					duration: 3000,
					className: 'bg-destructive text-destructive-foreground',
					icon: '🚨',
					position: 'top-right',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='w-full px-10 md:px-0'>
			<h2 className='text-2xl font-semibold mb-2 text-center '>
				Establish a Strong, Secure Password
			</h2>
			<p className='text-gray-500 mb-8 text-center text-base font-medium'>
				Generate a new password for your business dashboard ensure it’s
				robust yet memorable for you.
			</p>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 w-full'
			>
				<Form {...form}>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-base'>
									New Password
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='Enter your new password'
											{...field}
											type={
												showPassword
													? 'text'
													: 'password'
											}
											className='w-full h-12 rounded-md'
										/>
										<button
											type='button'
											onClick={() =>
												setShowPassword(!showPassword)
											}
											className='absolute right-3 top-1/2 -translate-y-1/2'
										>
											{showPassword ? (
												<EyeOff className='h-6 w-6 text-gray-500 cursor-pointer' />
											) : (
												<Eye className='h-6 w-6 text-gray-500 cursor-pointer' />
											)}
										</button>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-base'>
									Confirm Password
								</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='Confirm your new password'
											{...field}
											type={
												showConfirmPassword
													? 'text'
													: 'password'
											}
											className='w-full h-12 rounded-md'
										/>
										<button
											type='button'
											onClick={() =>
												setShowConfirmPassword(
													!showConfirmPassword
												)
											}
											className='absolute right-3 top-1/2 -translate-y-1/2'
										>
											{showConfirmPassword ? (
												<EyeOff className='h-6 w-6 text-gray-500 cursor-pointer' />
											) : (
												<Eye className='h-6 w-6 text-gray-500 cursor-pointer' />
											)}
										</button>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className='flex justify-center flex-col items-center gap-y-6'>
						<Button
							disabled={
								form.formState.isSubmitting ||
								!form.formState.isValid
							}
							type='submit'
							className='w-xs h-12 font-semibold text-base rounded-md hover:bg-blue-800 bg-blue-700 text-white'
						>
							Reset Password
						</Button>
						<p className='text-gray-500 text-center'>
							Remember your password?{' '}
							<Link href='/login' className='text-blue-700'>
								Login
							</Link>
						</p>
					</div>
				</Form>
			</form>
		</div>
	);
};

export default ResetPassword;
