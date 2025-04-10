<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SubscriptionPlan } from '$lib/types';
  
  export let plan: SubscriptionPlan;
  const dispatch = createEventDispatcher();

  let selectedAddons: string[] = [];

  function close() {
    dispatch('close');
  }

  function handleConfirm() {
    // Get the full addon objects for selected IDs
    const selectedAddonObjects = plan.slots.flatMap(slot => 
      slot.addons.filter(addon => selectedAddons.includes(addon.id))
    );

    // Save selected addons to localStorage
    localStorage.setItem(`${plan.product.slug}-addons`, JSON.stringify(selectedAddonObjects));
    
    dispatch('confirm', { selectedAddons: selectedAddonObjects });
  }

  function handleSkip() {
    dispatch('skip');
  }
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl w-full max-w-[500px] p-6 relative">
    <!-- Close button -->
    <button
      on:click={close}
      class="absolute right-4 top-4 text-[#26332F] hover:text-[#225043]"
    >
      X
    </button>

    <h2 class="text-xl font-semibold text-[#26332F] mb-6">{plan.name} - Add-ons</h2>

    <div class="space-y-6">
      {#each plan.slots as slot}
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-[#26332F] capitalize">{slot.name}</h3>
          <div class="flex flex-wrap gap-3">
            {#each slot.addons as addon}
              <label 
                class="flex items-center justify-center px-4 py-2 border border-[#B5C4C0] rounded-[8px] cursor-pointer gap-2 has-[:checked]:bg-[#22504314] has-[:checked]:border-[#225043]"
              >
                <input
                  type="checkbox"
                  value={addon.id}
                  bind:group={selectedAddons}
                  class="appearance-none w-5 h-5 border-2 border-[#B5C4C0] rounded cursor-pointer bg-white checked:border-[#225043] relative checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[10px] checked:after:border-[#225043] checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45"
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

    <div class="flex justify-end gap-4 mt-8">
      <button
        on:click={handleSkip}
        class="px-6 py-2 text-[#225043] border border-[#225043] rounded-full hover:bg-[#22504314]"
      >
        Skip
      </button>
      <button
        on:click={handleConfirm}
        class="px-6 py-2 bg-[#225043] text-white rounded-full hover:bg-[#225043]/90"
      >
        Confirm
      </button>
    </div>
  </div>
</div>
