<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; // Import goto for navigation
  import PlanModal from './PlanModal.svelte';
  export let plan: any;

  let selectedDeliveryDays = '';
  const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  let selectedDays: string[] = [];
  let showAddonModal = false;

  function handleDeliveryDaysChange(value: string) {
    selectedDeliveryDays = value;
    if (value === 'weekdays') {
      selectedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    } else if (value === 'everyday') {
      selectedDays = [...allDays];
    } else if (value === 'custom') {
      selectedDays = [];
    }
  }

  function toggleDay(day: string) {
    if (selectedDays.includes(day)) {
      selectedDays = selectedDays.filter(d => d !== day);
    } else {
      selectedDays = [...selectedDays, day];
    }
  }

  $: {
    if (selectedDays.length === 5 && allDays.slice(0, 5).every(day => selectedDays.includes(day))) {
      selectedDeliveryDays = 'weekdays';
    } else if (selectedDays.length === 7 && allDays.every(day => selectedDays.includes(day))) {
      selectedDeliveryDays = 'everyday';
    } else if (selectedDays !== 'custom' && selectedDays.length > 0) {
      selectedDeliveryDays = 'custom';
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const deliverySlots = formData.getAll('deliverySlot') as string[];
    const deliveryDuration = formData.get('deliveryDuration') as string;

    const data = {
      deliverySlots,
      deliveryDays: selectedDeliveryDays,
      selectedDays,
      deliveryDuration,
      planId: plan.id
    };

    localStorage.setItem(`${plan.product.slug}-form`, JSON.stringify(data));
    console.log('Saved:', data);
    showAddonModal = true; // Show addon modal after form submission
  }

  function handleModalClose() {
    showAddonModal = false;
  }

  function handleModalConfirm(event: CustomEvent) {
    const selectedAddons = event.detail.selectedAddons;
    console.log('Selected addons:', selectedAddons);
    showAddonModal = false;
    // Navigate to checkout page
    const formData = JSON.parse(localStorage.getItem(`${plan.product.slug}-form`) || '{}');
    localStorage.setItem('checkoutData', JSON.stringify({ ...formData, selectedAddons }));
    goto('/checkout');
  }

  function handleModalSkip() {
    showAddonModal = false;
    // Navigate to checkout page without addons
    const formData = JSON.parse(localStorage.getItem(`${plan.product.slug}-form`) || '{}');
    localStorage.setItem('checkoutData', JSON.stringify(formData));
    goto('/checkout');
  }

  onMount(() => {
    try {
      const savedData = localStorage.getItem(`${plan.product.slug}-form`);
      if (!savedData) return;
      
      const parsedData = JSON.parse(savedData);
      if (parsedData.deliverySlots) {
        parsedData.deliverySlots.forEach((slot: string) => {
          const checkbox = document.querySelector(`input[name="deliverySlot"][value="${slot}"]`) as HTMLInputElement | null;
          if (checkbox) checkbox.checked = true;
        });
      }
      if (parsedData.deliveryDays) {
        selectedDeliveryDays = parsedData.deliveryDays;
        handleDeliveryDaysChange(parsedData.deliveryDays);
      }
      if (parsedData.selectedDays) {
        selectedDays = parsedData.selectedDays;
      }
      if (parsedData.deliveryDuration) {
        const select = document.getElementById('deliveryDuration') as HTMLSelectElement | null;
        if (select) select.value = parsedData.deliveryDuration;
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  });

  // Dynamic durations from JSON (placeholder prices)
  const durations = plan.durations.map(d => {
    const price = d.interval === 'week' ? 600 - d.frequency * 55 : 500 - d.frequency * 50; // Placeholder logic
    return `${d.frequency} ${d.interval}${d.frequency > 1 ? 's' : ''} - ₹${price} per meal`;
  });

  // Get available slots from plan.slots
  $: availableSlots = plan.slots.map(slot => slot.name);
</script>

<form id="mealPlanForm" class="space-y-6 max-w-[420px]" on:submit={handleSubmit} novalidate>
  <fieldset class="space-y-4">
    <legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Slot:</legend>
    <div class="flex justify-start gap-4 md:gap-8">
      {#each availableSlots as slot}
        <label for="slot-{slot}" class="flex items-center justify-center px-4 py-2 border border-[#B5C4C0] rounded-[8px] cursor-pointer gap-2 has-[:checked]:bg-[#22504314] has-[:checked]:border-[#225043]">
          <input
            type="checkbox"
            id="slot-{slot}"
            name="deliverySlot"
            value={slot}
            class="appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded cursor-pointer bg-white checked:border-[#225043] relative checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
          />
          <span class="capitalize">{slot}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset class="space-y-4">
    <legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Days:</legend>
    <div class="flex border border-[#225043] rounded-[8px] overflow-hidden flex-wrap">
      {#each ['weekdays', 'everyday', 'custom'] as option}
        <label for="delivery-{option}" class="flex-1 flex items-center justify-center px-4 py-2 cursor-pointer border-r border-[#225043] has-[:checked]:bg-[#22504314] last:border-r-0">
          <input
            type="radio"
            id="delivery-{option}"
            name="deliveryDays"
            value={option}
            class="hidden"
            bind:group={selectedDeliveryDays}
            on:change={() => handleDeliveryDaysChange(option)}
          />
          <span class="capitalize">{option}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset>
    <legend class="text-base font-normal text-[#26332F]">Select Your Delivery Days:</legend>
    <div class="flex flex-wrap gap-3 mt-4">
      {#each allDays as day}
        <label for="day-{day}" class="flex items-center justify-center px-4 py-2 border border-[#B5C4C0] rounded-[8px] cursor-pointer gap-2 has-[:checked]:bg-[#22504314] has-[:checked]:border-[#225043]">
          <input
            type="checkbox"
            id="day-{day}"
            value={day}
            checked={selectedDays.includes(day)}
            on:change={() => toggleDay(day)}
            class="appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded cursor-pointer bg-white checked:border-[#225043] relative checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
          />
          <span class="capitalize">{day}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <fieldset>
    <legend class="text-base font-normal text-[#26332F]">Choose Your Delivery Duration:</legend>
    <select
      id="deliveryDuration"
      name="deliveryDuration"
      class="block w-full mt-2 px-4 py-2 border-1 border-[#225043] rounded-[8px] cursor-pointer bg-white text-[#26332F] focus:border-[#225043] focus:ring-1 focus:outline-none"
    >
      {#each durations as duration}
        <option value={duration}>{duration}</option>
      {/each}
    </select>
  </fieldset>

  <div class="flex space-x-4 mt-12">
    <button type="button" class="px-7 md:px-15 py-3 bg-white text-[#225043] font-medium rounded-full shadow-md hover:bg-[#22504314] border border-[#22504366]">Trial</button>
    <button type="submit" class="px-7 md:px-15 py-3 bg-[#225043] text-white font-medium rounded-full hover:bg-[#225043]/90">Subscribe Now</button>
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