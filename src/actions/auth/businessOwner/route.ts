'use server';

import axios from 'axios';
import {
	adminSchema,
	forgotPasswordSchema,
	loginSchema,
	resetPasswordSchema,
	verifySchema,
} from '../../../../schema/schema';

export const signup = async (formData: FormData) => {
	const validatedFields = adminSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		phone: formData.get('phone'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	});

	try {
		if (!validatedFields.success) {
			return {
				status: false,
				error: validatedFields.error.flatten().fieldErrors,
			};
		}
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
			{
				full_name: validatedFields.data.name,
				email: validatedFields.data.email,
				password: validatedFields.data.password,
				confirm_password: validatedFields.data.confirmPassword,
				phone_number: validatedFields.data.phone,
				role: 'BUSINESS_OWNER',
			}
		);
		console.log(response.data.message || response.data.error);
		if (response.status === 200) {
			return {
				status: true,
				message: 'Business owner signed up successfully',
			};
		} else {
			return {
				status: false,
				message: response.data.message,
			};
		}
	} catch (error: any) {
		console.log('Signup error:', error?.response?.data);
		return {
			status: false,
			message:
				error?.response?.data?.errors?.email?.[0] ||
				error?.response?.data?.message ||
				'Failed to sign up. Please try again.',
		};
	}
};

export const login = async (email: string, password: string) => {
	const validatedFields = loginSchema.safeParse({
		email,
		password,
	});
	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}
	
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
			{
				email: validatedFields.data.email,
				password: validatedFields.data.password,	
			}
		);

		if (response.data.success) {
			return {
				status: true,
				message: 'Login successful',
				data: {
					access_token: response.data.data.access,
					refresh_token: response.data.data.refresh,
				},
			};
		} else {
			return {
				status: false,
				message: 'Invalid response from server',
			};
		}
	} catch (error: any) {
		console.log('Login error:', error?.response?.data);
		return {
			status: false,
			message:
				error?.response?.data?.errors?.non_field_errors?.[0] ||
				'Login failed. Please try again.',
		};
	}
};

export const verifyEmail = async (token: string, email: string) => {
	const validatedFields = verifySchema.safeParse({
		token,
		email,
	});

	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/`,
			{
				email: validatedFields.data.email,
				otp: validatedFields.data.token,
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				message: 'Email verified successfully',
			};
		} else {
			return {
				status: false,
				message: response.data.message,
			};
		}
	} catch (error: any) {
		console.log('Verify email error:', error);
		return {
			status: false,
			message:
				error?.response?.data?.message ||
				'Failed to verify email. Please try again.',
		};
	}
};

export const resetPassword = async (formData: FormData) => {
	const validatedFields = resetPasswordSchema.safeParse({
		token: formData.get('token'),
		password: formData.get('password'),
		confirmPassword: formData.get('confirmPassword'),
	});

	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}

	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/`,
			{
				token: validatedFields.data.token,
				password: validatedFields.data.password,
				confirm_password: validatedFields.data.confirmPassword,
			}
		);
		if (response.status === 200) {
			return {
				status: true,
				message: 'Password reset successfully',
			};
		} else {
			return {
				status: false,
				message: response.data.message,
			};
		}
	} catch (error: any) {
		console.log('Reset password error:', error);
		return {
			status: false,
			message:
				error?.response?.data?.message ||
				'Failed to reset password. Please try again.',
		};
	}
};

export const sendRequestPassword = async (formData: FormData) => {
	const validatedFields = forgotPasswordSchema.safeParse({
		email: formData.get('email'),
	});
	if (!validatedFields.success) {
		return {
			status: false,
			message: validatedFields.error.flatten().fieldErrors,
		};
	}
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/`,
			{
				email: validatedFields.data.email,
			}
		);
		console.log(response.data, 'hello');
		if (response.status === 200) {
			return {
				status: true,
				message: 'Request password sent successfully',
			};
		} else {
			return {
				status: false,
				message: response.data.message,
			};
		}
	} catch (error: any) {
		console.log('Request password error:', error);
		return {
			status: false,
			message:
				error?.response?.data?.message ||
				'Failed to send request password. Please try again.',
		};
	}
};

export const resendOTP = async (email: string) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp/`,
			{
				email: email,
			}
		);
		if (response.status === 200) {
			return { status: true, message: 'OTP sent successfully' };
		} else {
			return { status: false, message: response.data.errors.email[0] };
		}
	} catch (error: any) {
		return {
			status: false,
			message:
				error.response.data.errors.email[0] || 'Failed to send OTP',
		};
	}
};

export const verifyOTP = async () => {};
