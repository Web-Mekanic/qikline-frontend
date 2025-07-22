'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	debugStorage,
	setTokens,
	getAccessToken,
	getRefreshToken,
	removeTokens,
	testTokenStorage,
} from '@/utils/token';

export default function DebugStoragePage() {
	const [storageStatus, setStorageStatus] = useState<any>(null);
	const [testResult, setTestResult] = useState<string>('');
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		console.log('Debug page: Component mounted');
		setIsClient(true);
		checkStorage();
	}, []);

	const checkStorage = () => {
		console.log('Debug page: checkStorage called');
		console.log('Debug page: isClient state:', isClient);
		console.log(
			'Debug page: window available:',
			typeof window !== 'undefined'
		);

		const status = {
			localStorage: typeof localStorage !== 'undefined',
			document: typeof document !== 'undefined',
			cookies:
				typeof document !== 'undefined' &&
				typeof document.cookie !== 'undefined',
			window: typeof window !== 'undefined',
			isClient: isClient,
		};
		console.log('Debug page: Storage status:', status);
		setStorageStatus(status);
		debugStorage();
	};

	const testSetTokens = () => {
		console.log('Debug page: testSetTokens called');
		try {
			setTokens('test-access-token', 'test-refresh-token');
			setTestResult('Tokens set successfully');
			setTimeout(() => {
				console.log(
					'Debug page: Checking storage after setting tokens'
				);
				debugStorage();
			}, 100);
		} catch (error) {
			console.error('Debug page: Error setting tokens:', error);
			setTestResult(`Error setting tokens: ${error}`);
		}
	};

	const testGetTokens = () => {
		console.log('Debug page: testGetTokens called');
		try {
			const accessToken = getAccessToken();
			const refreshToken = getRefreshToken();
			console.log('Debug page: Retrieved tokens:', {
				accessToken,
				refreshToken,
			});
			setTestResult(
				`Access token: ${accessToken}, Refresh token: ${refreshToken}`
			);
		} catch (error) {
			console.error('Debug page: Error getting tokens:', error);
			setTestResult(`Error getting tokens: ${error}`);
		}
	};

	const testRemoveTokens = () => {
		console.log('Debug page: testRemoveTokens called');
		try {
			removeTokens();
			setTestResult('Tokens removed successfully');
			setTimeout(() => {
				console.log(
					'Debug page: Checking storage after removing tokens'
				);
				debugStorage();
			}, 100);
		} catch (error) {
			console.error('Debug page: Error removing tokens:', error);
			setTestResult(`Error removing tokens: ${error}`);
		}
	};

	const testTokenStorageFunction = () => {
		console.log('Debug page: testTokenStorageFunction called');
		try {
			testTokenStorage();
			setTestResult(
				'Token storage test completed - check console for results'
			);
		} catch (error) {
			console.error('Debug page: Error testing token storage:', error);
			setTestResult(`Error testing token storage: ${error}`);
		}
	};

	const testApiEndpoint = async () => {
		console.log('Debug page: testApiEndpoint called');
		try {
			const API_URL =
				process.env.NEXT_PUBLIC_API_URL ||
				'https://qikline-backend.onrender.com/api/v1';
			console.log(
				'Debug page: Testing API endpoint:',
				`${API_URL}/business-owners/login/`
			);

			const response = await fetch(`${API_URL}/business-owners/login/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: 'test@example.com',
					password: 'testpassword',
				}),
			});

			const data = await response.json();
			console.log('Debug page: API test response:', {
				status: response.status,
				statusText: response.statusText,
				data: data,
			});

			setTestResult(
				`API test completed - Status: ${response.status}, Check console for details`
			);
		} catch (error) {
			console.error('Debug page: API test error:', error);
			setTestResult(`API test error: ${error}`);
		}
	};

	const testEnvironmentVariables = () => {
		console.log('Debug page: testEnvironmentVariables called');
		const envVars = {
			NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
			NODE_ENV: process.env.NODE_ENV,
			hasNextPublicApiUrl: !!process.env.NEXT_PUBLIC_API_URL,
		};
		console.log('Debug page: Environment variables:', envVars);
		setTestResult(
			`Environment variables: ${JSON.stringify(envVars, null, 2)}`
		);
	};

	const testLocalStorage = () => {
		console.log('Debug page: testLocalStorage called');
		try {
			if (
				typeof window !== 'undefined' &&
				typeof localStorage !== 'undefined'
			) {
				localStorage.setItem('test-key', 'test-value');
				const value = localStorage.getItem('test-key');
				console.log('Debug page: localStorage test result:', value);
				setTestResult(`localStorage test: ${value}`);
			} else {
				setTestResult('localStorage not available');
			}
		} catch (error) {
			console.error('Debug page: localStorage test error:', error);
			setTestResult(`localStorage test error: ${error}`);
		}
	};

	const comprehensiveTest = () => {
		console.log('Debug page: comprehensiveTest called');
		let results = [];

		// Test window object
		results.push(`Window: ${typeof window !== 'undefined'}`);

		// Test document object
		results.push(`Document: ${typeof document !== 'undefined'}`);

		// Test localStorage
		if (
			typeof window !== 'undefined' &&
			typeof localStorage !== 'undefined'
		) {
			try {
				localStorage.setItem('comprehensive-test', 'test-value');
				const value = localStorage.getItem('comprehensive-test');
				results.push(
					`localStorage: ${
						value === 'test-value' ? 'WORKING' : 'FAILED'
					}`
				);
			} catch (error) {
				results.push(
					`localStorage: ERROR - ${
						error instanceof Error ? error.message : String(error)
					}`
				);
			}
		} else {
			results.push('localStorage: NOT AVAILABLE');
		}

		// Test cookies
		if (
			typeof document !== 'undefined' &&
			typeof document.cookie !== 'undefined'
		) {
			try {
				document.cookie = 'comprehensive-test=test-value; path=/';
				const hasCookie = document.cookie.includes(
					'comprehensive-test=test-value'
				);
				results.push(`Cookies: ${hasCookie ? 'WORKING' : 'FAILED'}`);
			} catch (error) {
				results.push(
					`Cookies: ERROR - ${
						error instanceof Error ? error.message : String(error)
					}`
				);
			}
		} else {
			results.push('Cookies: NOT AVAILABLE');
		}

		// Test our token functions
		try {
			setTokens('test-access', 'test-refresh');
			const accessToken = getAccessToken();
			const refreshToken = getRefreshToken();
			results.push(
				`Token functions: ${
					accessToken && refreshToken ? 'WORKING' : 'FAILED'
				}`
			);
		} catch (error) {
			results.push(
				`Token functions: ERROR - ${
					error instanceof Error ? error.message : String(error)
				}`
			);
		}

		const resultString = results.join('\n');
		console.log('Debug page: Comprehensive test results:', results);
		setTestResult(resultString);
	};

	const browserEnvironmentTest = () => {
		console.log('Debug page: browserEnvironmentTest called');
		let results = [];

		// Check if we're in private/incognito mode
		const isPrivateMode = () => {
			if (
				typeof window === 'undefined' ||
				typeof localStorage === 'undefined'
			) {
				return 'NOT AVAILABLE';
			}
			try {
				localStorage.setItem('test', 'test');
				localStorage.removeItem('test');
				return false;
			} catch (e) {
				return true;
			}
		};

		// Check browser features
		results.push(`Private/Incognito: ${isPrivateMode()}`);

		if (typeof navigator !== 'undefined') {
			results.push(`User Agent: ${navigator.userAgent}`);
			results.push(`Platform: ${navigator.platform}`);
			results.push(`Cookie Enabled: ${navigator.cookieEnabled}`);
			results.push(`OnLine: ${navigator.onLine}`);
		} else {
			results.push('Navigator: NOT AVAILABLE');
		}

		// Check for common privacy extensions
		const hasAdBlocker = () => {
			if (typeof document === 'undefined') {
				return Promise.resolve('NOT AVAILABLE');
			}

			return new Promise((resolve) => {
				const testAd = document.createElement('div');
				testAd.innerHTML = '&nbsp;';
				testAd.className = 'adsbox';
				document.body.appendChild(testAd);
				setTimeout(() => {
					const isBlocked = testAd.offsetHeight === 0;
					document.body.removeChild(testAd);
					resolve(isBlocked);
				}, 100);
			});
		};

		hasAdBlocker().then((blocked) => {
			results.push(`Ad Blocker Detected: ${blocked}`);
			const resultString = results.join('\n');
			setTestResult(resultString);
		});

		console.log('Debug page: Browser environment test results:', results);
	};

	return (
		<div className='min-h-screen p-8'>
			<h1 className='text-2xl font-bold mb-6'>Storage Debug Page</h1>

			<div className='space-y-6'>
				<div className='bg-gray-100 p-4 rounded-lg'>
					<h2 className='text-lg font-semibold mb-2'>
						Browser Environment
					</h2>
					<pre className='text-sm'>
						{JSON.stringify(storageStatus, null, 2)}
					</pre>
				</div>

				<div className='space-y-4'>
					<h2 className='text-lg font-semibold'>Test Functions</h2>

					<div className='space-y-2'>
						<Button
							onClick={checkStorage}
							className='mr-2'
						>
							Check Storage Status
						</Button>
						<Button
							onClick={testSetTokens}
							className='mr-2'
						>
							Test Set Tokens
						</Button>
						<Button
							onClick={testGetTokens}
							className='mr-2'
						>
							Test Get Tokens
						</Button>
						<Button
							onClick={testRemoveTokens}
							className='mr-2'
						>
							Test Remove Tokens
						</Button>
						<Button
							onClick={testTokenStorageFunction}
							className='mr-2'
						>
							Test Token Storage
						</Button>
						<Button
							onClick={testApiEndpoint}
							className='mr-2'
						>
							Test API Endpoint
						</Button>
						<Button
							onClick={testEnvironmentVariables}
							className='mr-2'
						>
							Test Environment Variables
						</Button>
						<Button
							onClick={testLocalStorage}
							className='mr-2'
						>
							Test Local Storage
						</Button>
						<Button
							onClick={comprehensiveTest}
							className='mr-2'
						>
							Comprehensive Test
						</Button>
						<Button
							onClick={browserEnvironmentTest}
							className='mr-2'
						>
							Browser Environment Test
						</Button>
					</div>

					{testResult && (
						<div className='bg-blue-100 p-4 rounded-lg'>
							<h3 className='font-semibold'>Test Result:</h3>
							<p className='text-sm'>{testResult}</p>
						</div>
					)}
				</div>

				<div className='bg-yellow-100 p-4 rounded-lg'>
					<h2 className='text-lg font-semibold mb-2'>Instructions</h2>
					<ol className='list-decimal list-inside space-y-1 text-sm'>
						<li>Open browser developer tools (F12)</li>
						<li>Go to Console tab</li>
						<li>
							Click "Check Storage Status" to see current state
						</li>
						<li>Click "Test Set Tokens" to test setting tokens</li>
						<li>Check console for detailed debug information</li>
						<li>
							Check Application tab → Storage → Local Storage and
							Cookies
						</li>
					</ol>
				</div>
			</div>
		</div>
	);
}
