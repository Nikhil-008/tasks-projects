<script lang="ts">
	import MealCard from '$lib/components/MealCard.svelte';

	export let data;
	const { plans } = data;
</script>

<main class="max-w-8xl mx-auto mt-10 flex flex-wrap gap-y-12 p-6">
	{#each plans as plan}
		<MealCard {plan} />
	{/each}
</main>
