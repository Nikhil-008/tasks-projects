<script lang="ts">
  import type { SubscriptionPlan } from '$lib/types';
  export let plan: SubscriptionPlan;

  // Temporary SVG arrow icons
  const arrowRightGreen = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2301bf62'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M14 5l7 7m0 0l-7 7m7-7H3'/%3E%3C/svg%3E`;
  const arrowRight = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M14 5l7 7m0 0l-7 7m7-7H3'/%3E%3C/svg%3E`;
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
      <a href={`/meal-plan/${plan.product.slug}`} class="flex items-center gap-2 text-[#225043]">
        <span class="text-sm font-semibold">Learn More</span>
        <img class="h-4 w-5 object-cover" src={arrowRightGreen} alt="Arrow" />
      </a>
    </div>
    <div class="flex flex-col gap-[6px] md:flex-row md:items-center md:justify-between">
      <!-- {#if plan.product.variants[0] && plan.product.variants[0].media?.length > 0}
        <p class="text-xs/5 md:text-base/6 text-[#26332F]">
          Starts from <span class="font-semibold">₹400</span>/meal
        </p>
      {/if} -->
      <a
        href={`/meal-plan/${plan.product.slug}`}
        class="flex items-center justify-center gap-2 rounded-lg bg-[#225043] py-2 md:px-3 md:py-2 hover:bg-[#225043]/90"
      >
        <span class="text-sm font-semibold text-white">Subscribe</span>
        <img class="h-4 w-5 object-cover" src={arrowRight} alt="Arrow" />
      </a>
    </div>
  </div>
</div>