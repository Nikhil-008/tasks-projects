import type { PageLoad } from './$types';
import plans from '$lib/data/subscription-data.json';

export const load = (async () => {
	return {
		plans,
		meta: {
			title: 'Home | Meal Plans',
			description: 'Choose from our variety of meal plans'
		}
	};
}) satisfies PageLoad;
