<script lang="ts">
	import { goto } from '$app/navigation';
	import MealForm from '$lib/components/MealForm.svelte';

	export let data;
	const { plan } = data;

	function goBack() {
		goto('/home');
	}
</script>

<main>
	<button on:click={goBack} class="mt-6 mb-4 ml-6 flex items-center text-[#225043]">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M15 18L9 12L15 6"
				stroke="#225043"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<span class="ml-2 text-base font-normal">Back</span>
	</button>

	{#if plan}
		<div class="mx-auto mt-10 flex max-w-6xl flex-col items-center p-6 lg:flex-row">
			<!-- Left Section -->
			<section class="w-full space-y-6 lg:max-w-[532px]">
				<div>
					<h1 class="font-playfair text-[24px] font-bold text-[#225043] md:text-[28px]">
						{plan.name}
					</h1>
					<p class="mt-2 text-sm font-normal text-[#26332F] md:text-base">
						{plan.product.content.summary}
					</p>
				</div>
				<!-- MealForm handles all modal logic -->
				<MealForm {plan} />
			</section>

			<!-- Right Section -->
			<section class="mt-10 md:max-w-[500px] lg:mt-0">
				{#if plan.product.variants[0]?.media?.length > 0}
					<img
						src={plan.product.variants[0].media[0].url}
						alt={plan.name}
						class="w-full rounded-lg object-cover"
						loading="lazy"
					/>
				{/if}
			</section>
		</div>
	{:else}
		<div class="mx-auto mt-10 max-w-6xl p-6">
			<p class="text-[#26332F]">Plan not found</p>
		</div>
	{/if}
</main>
