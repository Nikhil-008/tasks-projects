<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Props
	export let plan: any;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// State
	let selectedAddons: string[] = [];
	let selectedSlots = new Set<string>();

	// Computed values
	$: totalAddonPrice = calculateTotalAddonPrice(selectedAddons);

	// Helper functions
	function calculateTotalAddonPrice(addonIds: string[]): number {
		return addonIds.reduce((total, addonId) => {
			const addon = plan.slots
				.flatMap((s: { addons: any }) => s.addons)
				.find((a: { id: string }) => a.id === addonId);
			return total + (addon?.price || 0);
		}, 0);
	}

	// Slot management
	function toggleSlot(slotName: string) {
		if (selectedSlots.has(slotName)) {
			deselectSlot(slotName);
		} else {
			selectSlot(slotName);
		}
	}

	function selectSlot(slotName: string) {
		selectedSlots.add(slotName);
		selectedSlots = selectedSlots; // Trigger reactivity
	}

	function deselectSlot(slotName: string) {
		selectedSlots.delete(slotName);
		// Remove all addons from this slot
		const slotAddons = plan.slots.find((s: { name: string }) => s.name === slotName)?.addons || [];
		selectedAddons = selectedAddons.filter(
			(id) => !slotAddons.some((a: { id: string }) => a.id === id)
		);
	}

	// Event handlers
	function close() {
		dispatch('close');
	}

	function handleConfirm() {
		// Get the full addon objects for selected IDs
		const selectedAddonObjects = plan.slots.flatMap((slot: { addons: any[] }) =>
			slot.addons.filter((addon: { id: string }) => selectedAddons.includes(addon.id))
		);

		dispatch('confirm', { selectedAddons: selectedAddonObjects });
	}

	function handleSkip() {
		// Move temp data to checkout data without addons
		const tempFormData = JSON.parse(localStorage.getItem('tempFormData') || '{}');
		localStorage.setItem('checkoutData', JSON.stringify(tempFormData));
		localStorage.removeItem('tempFormData');

		dispatch('skip');
	}
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
	<div class="relative max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-2xl bg-white p-6">
		<!-- Close button -->
		<button on:click={close} class="absolute top-4 right-4 text-[#26332F] hover:text-[#225043]">
			X
		</button>

		<h2 class="mb-6 text-xl font-semibold text-[#26332F]">{plan.name} - Add-ons</h2>

		<div class="space-y-6">
			{#each plan.slots as slot}
				<div class="space-y-4 rounded-lg bg-[#F5F7F6] p-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-medium text-[#26332F] capitalize">{slot.name}</h3>
						<button class="text-sm text-[#225043]" on:click={() => toggleSlot(slot.name)}>
							{selectedSlots.has(slot.name) ? 'Deselect All' : 'Select All'}
						</button>
					</div>
					<div class="flex flex-wrap gap-3">
						{#each slot.addons as addon}
							<label
								class="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#B5C4C0] px-4 py-2 has-[:checked]:border-[#225043] has-[:checked]:bg-[#22504314]"
							>
								<input
									type="checkbox"
									value={addon.id}
									bind:group={selectedAddons}
									class="relative h-5 w-5 cursor-pointer appearance-none rounded border-2 border-[#B5C4C0] bg-white checked:border-[#225043] checked:after:absolute checked:after:top-[2px] checked:after:left-[6px] checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-r-2 checked:after:border-b-2 checked:after:border-[#225043] checked:after:content-['']"
								/>
								<span class="flex flex-col">
									<span class="capitalize">{addon.name}</span>
									<span class="text-sm text-[#26332F]/80">₹{addon.price}</span>
								</span>
							</label>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-4 border-t border-[#B5C4C0] pt-4">
			<p class="text-sm text-[#26332F]">Total Add-ons: ₹{totalAddonPrice}</p>
		</div>

		<div class="mt-8 flex justify-end gap-4">
			<button
				on:click={handleSkip}
				class="rounded-full border border-[#225043] px-6 py-2 text-[#225043] hover:bg-[#22504314]"
			>
				Skip
			</button>
			<button
				on:click={handleConfirm}
				class="rounded-full bg-[#225043] px-6 py-2 text-white hover:bg-[#225043]/90"
			>
				Confirm
			</button>
		</div>
	</div>
</div>
