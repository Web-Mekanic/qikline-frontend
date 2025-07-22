import { authService } from '@/services/auth';
import {
	createBusinessServiceSchema,
	updateBusinessServiceSchema,
} from '../../../../schema/schema';
import { z } from 'zod';

export const getBusinessServices = async (businessId: string) => {
	try {
		const response = await authService
			.getAxiosInstance()
			.get(
				`${process.env.NEXT_PUBLIC_API_URL}/businesses/${businessId}/services/`
			);
		return {
			status: true,
			message: 'Business services fetched successfully',
			data: response.data,
		};
	} catch (error) {
		return {
			status: false,
			message: 'Failed to fetch business services',
			data: null,
		};
	}
};

export const createBusinessService = async (
	businessId: string,
	data: z.infer<typeof createBusinessServiceSchema>
) => {
	const validatedData = createBusinessServiceSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append('name', validatedData.name);
	formData.append('description', validatedData.description);
	formData.append('price', validatedData.price.toString());
	formData.append('duration', validatedData.duration.toString());
	formData.append('category', validatedData.category);
	formData.append('is_active', 'true');

	try {
		const response = await authService
			.getAxiosInstance()
			.post(
				`${process.env.NEXT_PUBLIC_API_URL}/businesses/${businessId}/services/`,
				formData
			);
		return {
			status: true,
			message: 'Business service created successfully',
			data: response.data,
		};
	} catch (error) {
		return {
			status: false,
			message: 'Failed to create business service',
			data: null,
		};
	}
};

export const updateBusinessService = async (
	id: string,
	serviceId: string,
	data: z.infer<typeof updateBusinessServiceSchema>
) => {
	const validatedData = updateBusinessServiceSchema.parse(data);
	if (!validatedData) {
		return {
			status: false,
			message: 'Invalid data',
		};
	}
	const formData = new FormData();
	formData.append('name', validatedData.name);
	formData.append('description', validatedData.description);
	formData.append('price', validatedData.price.toString());
	formData.append('duration', validatedData.duration.toString());
	formData.append('category', validatedData.category);
	formData.append('is_active', 'true');

	try {
		const response = await authService
			.getAxiosInstance()
			.put(
				`${process.env.NEXT_PUBLIC_API_URL}/businesses/${id}/services/${serviceId}/`,
				formData
			);
		return {
			status: true,
			message: 'Business service updated successfully',
			data: response.data,
		};
	} catch (error) {
		return {
			status: false,
			message: 'Failed to update business service',
			data: null,
		};
	}
};

export const deleteBusinessService = async (id: string, serviceId: string) => {
	try {
		const response = await authService
			.getAxiosInstance()
			.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/businesses/${id}/services/${serviceId}/`
			);
		return {
			status: true,
			message: 'Business service deleted successfully',
			data: response.data,
		};
	} catch (error) {
		return {
			status: false,
			message: 'Failed to delete business service',
			data: null,
		};
	}
};
