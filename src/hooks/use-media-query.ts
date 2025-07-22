'use client';
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		// Check if window is available (client-side only)
		if (typeof window === 'undefined') {
			return;
		}

		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => setMatches(media.matches);
		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [matches, query]);

	return matches;
}
