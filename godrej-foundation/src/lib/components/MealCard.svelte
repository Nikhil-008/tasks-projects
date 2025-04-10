<script lang="ts">
  import type { SubscriptionPlan } from '$lib/types';
  import PlanModal from './PlanModal.svelte';
  
  export let plan: SubscriptionPlan;
  let showModal = false;

  function handleSubscribe() {
    showModal = true;
  }

  function handleModalClose() {
    showModal = false;
  }

  function handleModalConfirm(event: CustomEvent) {
    const selectedAddons = event.detail.selectedAddons;
    console.log('Selected addons:', selectedAddons);
    showModal = false;
    // Navigate to next step or handle form submission
  }

  function handleModalSkip() {
    showModal = false;
    // Navigate to next step without addons
  }
</script>

<div
  class="mx-auto flex min-h-[204px] max-w-[342px] gap-3 overflow-hidden rounded-2xl border border-[#B5C4C0] bg-white p-3 shadow-[0px_10.462px_24.41px_0px_rgba(0,_0,_0,_0.08)] md:max-w-[340px] md:flex-col md:rounded-[20px] md:p-0"
>
  {#if plan.product.variants[0] && plan.product.variants[0].media?.length > 0}
    <img
      src={plan.product.variants[0].media[0].url}
      alt={plan.name}
      class="rounded-lg overflow-hidden w-[150px] max-w-[150px] md:w-full h-[180px] flex-none md:max-w-full md:h-[280px] md:rounded-none object-cover object-center"
    />
  {/if}
  <div
    class="flex w-full flex-col justify-between gap-3 md:h-full md:w-auto md:gap-5 md:p-4 md:pb-5"
  >
    <div class="flex flex-col gap-1">
      <p class="text-sm font-semibold md:text-xl text-[#26332F]">{plan.name}</p>
      {#if plan.product.content?.summary}
        <p class="font-figtree text-xs font-normal md:text-sm text-[#26332F]">{plan.product.content.summary}</p>
      {/if}
      <!-- <a href={`/meal-plan/${plan.product.slug}`} class="flex items-center gap-2 text-[#225043] underline">
        <span class="text-sm font-semibold">Learn More</span>
      </a> -->
    </div>
    <div class="flex flex-col gap-[6px] md:flex-row md:items-center md:justify-between">
      <a
        href={`/meal-plan/${plan.product.slug}`}
        class="flex items-center justify-center gap-2 rounded-lg bg-[#225043] py-2 md:px-3 md:py-2 hover:bg-[#225043]/90"
      >
        <span class="text-sm font-semibold text-white">Learn More</span>
      </a>
    </div>
  </div>
</div>

{#if showModal}
  <PlanModal
    {plan}
    on:close={handleModalClose}
    on:confirm={handleModalConfirm}
    on:skip={handleModalSkip}
  />
{/if}