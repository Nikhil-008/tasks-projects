import type { PageLoad } from './$types';
import type { SubscriptionPlan } from '$lib/types';
import plans from '$lib/data/subscription-data.json';

export const load = (async ({ params }) => {
	const plan = plans.find((p) => p.product.slug === params.id) as SubscriptionPlan;

	if (!plan) {
		throw new Error('Plan not found');
	}

	return {
		id: params.id,
		plan,
		meta: {
			title: `${plan.name} | Meal Plan`,
			description: plan.product.content.summary
		}
	};
}) satisfies PageLoad;
