import { Button } from '@/components/ui/button';
import { Clock, Pencil, X } from 'lucide-react';
import { useState, useTransition } from 'react';
import { TimePickerModal } from '@/components/ui/time-picker-modal';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { authService } from '@/services/auth';
import { getAccessToken } from '@/utils/token';

interface DayHours {
	day: string;
	openingTime: string;
	closingTime: string;
	isOpen: boolean;
}

export const HourSetting = () => {
	const [timePickerOpen, setTimePickerOpen] = useState(false);
	const [selectedTimeType, setSelectedTimeType] = useState<
		'opening' | 'closing'
	>('opening');
	const [selectedDay, setSelectedDay] = useState<string>('');
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [businessHours, setBusinessHours] = useState<DayHours[]>([
		{
			day: 'Monday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: true,
		},
		{
			day: 'Tuesday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: true,
		},
		{
			day: 'Wednesday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: true,
		},
		{
			day: 'Thursday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: true,
		},
		{
			day: 'Friday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: true,
		},
		{
			day: 'Saturday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: true,
		},
		{
			day: 'Sunday',
			openingTime: '09:00 AM',
			closingTime: '05:00 PM',
			isOpen: false,
		},
	]);

	const handleTimeClick = (day: string, timeType: 'opening' | 'closing') => {
		setSelectedDay(day);
		setSelectedTimeType(timeType);
		setTimePickerOpen(true);
	};

	const handleTimeSelect = (time: string) => {
		setBusinessHours((prev) =>
			prev.map((day) =>
				day.day === selectedDay
					? {
							...day,
							[selectedTimeType === 'opening'
								? 'openingTime'
								: 'closingTime']: time,
					  }
					: day
			)
		);
	};

	const getCurrentTime = () => {
		const day = businessHours.find((d) => d.day === selectedDay);
		if (!day) return '09:00 AM';
		return selectedTimeType === 'opening'
			? day.openingTime
			: day.closingTime;
	};

	const handleSave = () => {
		startTransition(async () => {
			setIsEditing(false);

			try {
				// Convert to the expected format
				const formattedHours = businessHours.map((day, index) => ({
					day: index, // 0-6 for Monday-Sunday
					opening_time: day.openingTime,
					closing_time: day.closingTime,
					is_closed: !day.isOpen,
				}));

				// TODO: Get actual business ID from context or props
				const businessId = '45678'; // Replace with actual business ID

				const formData = new FormData();
				formattedHours.forEach((hoursEntry, index) => {
					formData.append(
						`business_hours[${index}][day]`,
						hoursEntry.day.toString()
					);
					formData.append(
						`business_hours[${index}][opening_time]`,
						hoursEntry.opening_time
					);
					formData.append(
						`business_hours[${index}][closing_time]`,
						hoursEntry.closing_time
					);
					formData.append(
						`business_hours[${index}][is_closed]`,
						hoursEntry.is_closed.toString()
					);
				});

				const response = await authService
					.getAxiosInstance()
					.post(
						`${process.env.NEXT_PUBLIC_API_URL}/businesses/${businessId}/hours/`,
						formData,
						{
							headers: {
								Authorization: `Bearer ${getAccessToken()}`,
								'Content-Type': 'multipart/form-data',
							},
						}
					);

				toast.success('Business hours updated successfully', {
					duration: 3000,
					position: 'top-right',
					className: 'bg-green-500 text-white',
					
					style: {
						backgroundColor: 'green',
						color: 'white',
					},
				});
			} catch (error: any) {
				toast.error('Failed to update business hours', {
					duration: 3000,
					position: 'top-right',
					icon: <X className='w-4 h-4' />,
					className: 'bg-red-500 text-white',
					style: {
						backgroundColor: '#f87171',
						color: 'white',
					},
				});
			}
		});
	};

	return (
		<div className='p-4 px-8 border border-gray-200 rounded-lg max-w-[1000px] mb-10'>
			<div className='flex items-center justify-between my-6'>
				<h4 className='text-lg font-semibold text-gray-800'>
					Business Hours
				</h4>
				<Button
					variant='outline'
					className={`${
						isEditing
							? 'text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white'
							: 'text-gray-500 hover:bg-gray-100'
					}`}
					onClick={() => setIsEditing(!isEditing)}
				>
					<Pencil className='w-4 h-4' />
					Edit
				</Button>
			</div>
			<div className='pt-8 space-y-4 '>
				{businessHours.map((day) => (
					<div
						key={day.day}
						className='flex items-center justify-between border p-4 rounded-lg border-gray-200 pb-4'
					>
						<h4 className='text-lg text-gray-600 max-w-[10px]'>
							{day.day}
						</h4>
						<div className='flex items-center gap-2'>
							<Switch
								checked={day.isOpen}
								onCheckedChange={() =>
									setBusinessHours((prev) =>
										prev.map((d) =>
											d.day === day.day
												? { ...d, isOpen: !d.isOpen }
												: d
										)
									)
								}
							/>
							<span className='capitalize text-gray-500'>
								{day.isOpen ? 'open' : 'closed'}
							</span>
						</div>
						{day.isOpen ? (
							<div className='flex items-center gap-5'>
								<div
									className='flex items-center gap-2 text-gray-500 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors'
									onClick={() =>
										handleTimeClick(day.day, 'opening')
									}
								>
									{day.openingTime}{' '}
									<Clock className='w-4 h-4' />
								</div>
								<span className='text-gray-500'>to</span>
								<div
									className='flex items-center gap-2 text-gray-500 border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors'
									onClick={() =>
										handleTimeClick(day.day, 'closing')
									}
								>
									{day.closingTime}{' '}
									<Clock className='w-4 h-4' />
								</div>
							</div>
						) : (
							<div className='flex items-center justify-end gap-5 min-w-[300px]'>
								<span className='text-red-500 text-xl'>
									closed
								</span>
							</div>
						)}
					</div>
				))}
				<div className='flex justify-center gap-4 my-10'>
					<Button
						onClick={() => {
							setIsEditing(false);
						}}
						variant={'outline'}
						className='md:w-xs w-[200px] h-12 text-[16px] text-gray-600 hover:bg-gray-100'
					>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						className='md:w-xs w-[200px] h-12 bg-blue-700 text-white text-[16px] hover:bg-blue-800 font-semibold'
					>
						Save Changes
					</Button>
				</div>
			</div>

			<TimePickerModal
				open={timePickerOpen}
				setOpen={setTimePickerOpen}
				onTimeSelect={handleTimeSelect}
				currentTime={getCurrentTime()}
			/>
		</div>
	);
};
