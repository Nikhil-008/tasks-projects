<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import PlanModal from './PlanModal.svelte';

	// Props
	export let plan: any;

	// Form state
	let selectedDeliveryDays = '';
	let selectedDays: string[] = [];
	let showAddonModal = false;

	// Constants
	const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	// Form validation state
	let formErrors = {
		deliverySlots: '',
		selectedDays: '',
		deliveryDuration: ''
	};

	// Computed values
	$: availableSlots = plan.slots.map((slot: { name: any }) => slot.name);
	$: durations = calculateDurations(plan.durations);

	// Helper functions
	function calculateDurations(planDurations: any[]) {
		return planDurations.map((d: { interval: string; frequency: number }) => {
			const price = d.interval === 'week' ? 600 - d.frequency * 55 : 500 - d.frequency * 50;
			return {
				value: `${d.frequency} ${d.interval}${d.frequency > 1 ? 's' : ''}`,
				display: `${d.frequency} ${d.interval}${d.frequency > 1 ? 's' : ''} - ₹${price} per meal`
			};
		});
	}

	// Form handling functions
	function handleDeliveryDaysChange(value: string) {
		selectedDeliveryDays = value;
		selectedDays = getSelectedDaysForOption(value);
	}

	function getSelectedDaysForOption(option: string): string[] {
		switch (option) {
			case 'weekdays':
				return allDays.slice(0, 5);
			case 'everyday':
				return [...allDays];
			case 'custom':
				return [];
			default:
				return [];
		}
	}

	function toggleDay(day: string) {
		if (selectedDays.includes(day)) {
			selectedDays = selectedDays.filter((d) => d !== day);
		} else {
			selectedDays = [...selectedDays, day];
		}
	}

	$: {
		if (
			selectedDays.length === 5 &&
			allDays.slice(0, 5).every((day) => selectedDays.includes(day))
		) {
			selectedDeliveryDays = 'weekdays';
		} else if (selectedDays.length === 7 && allDays.every((day) => selectedDays.includes(day))) {
			selectedDeliveryDays = 'everyday';
		} else if (selectedDeliveryDays !== 'custom' && selectedDays.length > 0) {
			selectedDeliveryDays = 'custom';
		}
	}

	function validateForm(formData: FormData) {
		const errors = { ...formErrors };
		let isValid = true;

		const slots = formData.getAll('deliverySlot');
		if (slots.length === 0) {
			errors.deliverySlots = 'Please select at least one delivery slot';
			isValid = false;
		}

		if (selectedDays.length === 0) {
			errors.selectedDays = 'Please select delivery days';
			isValid = false;
		}

		const duration = formData.get('deliveryDuration');
		if (!duration) {
			errors.deliveryDuration = 'Please select a delivery duration';
			isValid = false;
		}

		formErrors = errors;
		return isValid;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		if (!validateForm(formData)) {
			return;
		}

		const data = {
			planId: plan.id,
			deliverySlots: formData.getAll('deliverySlot') as string[],
			deliveryDays: selectedDeliveryDays,
			selectedDays,
			deliveryDuration: formData.get('deliveryDuration') as string
		};

		localStorage.setItem('checkoutFormData', JSON.stringify(data));
		showAddonModal = true;
	}

	// Modal handling functions
	function handleModalClose() {
		showAddonModal = false;
	}

	function handleModalConfirm(event: CustomEvent) {
		const formData = JSON.parse(localStorage.getItem('checkoutFormData') || '{}');
		const checkoutData = {
			...formData,
			selectedAddons: event.detail.selectedAddons
		};

		localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
		localStorage.removeItem('checkoutFormData');
		goto('/checkout');
	}

	function handleModalSkip() {
		const formData = JSON.parse(localStorage.getItem('checkoutFormData') || '{}');
		localStorage.setItem('checkoutData', JSON.stringify(formData));
		localStorage.removeItem('checkoutFormData');
		goto('/checkout');
	}

	// Lifecycle
	onMount(() => {
		loadSavedFormData();
	});

	function loadSavedFormData() {
		try {
			// First check for checkout data
			const checkoutData = localStorage.getItem('checkoutData');
			if (checkoutData) {
				const parsedData = JSON.parse(checkoutData);
				if (parsedData.planId === plan.id) {
					restoreFormState(parsedData);
					return;
				}
			}

			// Fall back to plan-specific form data
			const savedData = localStorage.getItem(`${plan.product.slug}-form`);
			if (savedData) {
				const parsedData = JSON.parse(savedData);
				restoreFormState(parsedData);
			}
		} catch (error) {
			console.error('Error loading saved form data:', error);
		}
	}

	function restoreFormState(data: {
		deliverySlots: string[];
		deliveryDays: string;
		selectedDays: string[];
		deliveryDuration: string;
	}) {
		// Restore delivery slots
		if (data.deliverySlots) {
			// Use setTimeout to ensure DOM is ready
			setTimeout(() => {
				data.deliverySlots.forEach((slot: string) => {
					const checkbox = document.querySelector(
						`input[name="deliverySlot"][value="${slot}"]`
					) as HTMLInputElement | null;
					if (checkbox) checkbox.checked = true;
				});
			}, 0);
		}

		// Restore delivery days
		if (data.deliveryDays) {
			selectedDeliveryDays = data.deliveryDays;
			handleDeliveryDaysChange(data.deliveryDays);
		}

		// Restore selected days
		if (data.selectedDays) {
			selectedDays = data.selectedDays;
		}

		// Restore duration
		if (data.deliveryDuration) {
			// Use setTimeout to ensure DOM is ready
			setTimeout(() => {
				const select = document.getElementById('deliveryDuration') as HTMLSelectElement | null;
				if (select) select.value = data.deliveryDuration;
			}, 0);
		}
	}
</script>

<form id="mealPlanForm" class="max-w-[420px] space-y-6" on:submit={handleSubmit} novalidate>
	<fieldset class="space-y-4">
		<legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Slot:</legend>
		<div class="flex justify-start gap-4 md:gap-8">
			{#each availableSlots as slot}
				<label
					for="slot-{slot}"
					class="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#B5C4C0] px-4 py-2 has-[:checked]:border-[#225043] has-[:checked]:bg-[#22504314] capitalize"
				>
					<input
						type="checkbox"
						id="slot-{slot}"
						name="deliverySlot"
						value={slot}
						class="relative h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#B5C4C0] bg-white checked:border-[#225043] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-[#225043] checked:after:content-['']"
					/>
					{slot}
				</label>
			{/each}
		</div>
		{#if formErrors.deliverySlots}
			<p class="mt-1 text-sm text-red-500">{formErrors.deliverySlots}</p>
		{/if}
	</fieldset>

	<fieldset class="space-y-4">
		<legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Days:</legend>
		<div class="flex flex-wrap overflow-hidden rounded-[8px] border border-[#225043]">
			{#each ['weekdays', 'everyday', 'custom'] as option}
				<label
					for="delivery-{option}"
					class="flex flex-1 cursor-pointer items-center justify-center border-r border-[#225043] px-4 py-2 last:border-r-0 has-[:checked]:bg-[#22504314] capitalize"
				>
					<input
						type="radio"
						id="delivery-{option}"
						name="deliveryDays"
						value={option}
						class="hidden"
						bind:group={selectedDeliveryDays}
						on:change={() => handleDeliveryDaysChange(option)}
					/>
					{option}
				</label>
			{/each}
		</div>
	</fieldset>

	<fieldset>
		<legend class="text-base font-normal text-[#26332F]">Select Your Delivery Days:</legend>
		<div class="mt-4 flex flex-wrap gap-3">
			{#each allDays as day}
				<label
					for="day-{day}"
					class="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#B5C4C0] px-4 py-2 has-[:checked]:border-[#225043] has-[:checked]:bg-[#22504314] capitalize"
				>
					<input
						type="checkbox"
						id="day-{day}"
						value={day}
						checked={selectedDays.includes(day)}
						on:change={() => toggleDay(day)}
						class="relative h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#B5C4C0] bg-white checked:border-[#225043] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-[#225043] checked:after:content-['']"
					/>
					{day}
				</label>
			{/each}
		</div>
		{#if formErrors.selectedDays}
			<p class="mt-1 text-sm text-red-500">{formErrors.selectedDays}</p>
		{/if}
	</fieldset>

	<fieldset>
		<legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Duration:</legend>
		<select
			id="deliveryDuration"
			name="deliveryDuration"
			class="mt-2 block w-full cursor-pointer rounded-[8px] border-1 border-[#225043] bg-white px-4 py-2 text-[#26332F] focus:border-[#225043] focus:ring-1 focus:outline-none"
		>
			<!-- <option value="">Select duration</option> -->
			{#each durations as duration}
				<option value={duration.value}>{duration.display}</option>
			{/each}
		</select>
	</fieldset>

	<div class="mt-12 flex space-x-4">
		<button
			type="button"
			class="rounded-full border border-[#22504366] bg-white px-7 py-3 font-medium text-[#225043] shadow-md hover:bg-[#22504314] md:px-15"
			>Trial</button
		>
		<button
			type="submit"
			class="rounded-full bg-[#225043] px-7 py-3 font-medium text-white hover:bg-[#225043]/90 md:px-15"
			>Subscribe Now</button
		>
	</div>
</form>

{#if showAddonModal}
	<PlanModal
		{plan}
		on:close={handleModalClose}
		on:confirm={handleModalConfirm}
		on:skip={handleModalSkip}
	/>
{/if}
