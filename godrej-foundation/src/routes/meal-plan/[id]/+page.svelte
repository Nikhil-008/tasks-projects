<script lang="ts">
  import MealForm from '$lib/components/MealForm.svelte';
  import plans from '$lib/data/subscription-data.json';
  export let data: { id: string }; // SvelteKit passes params as data

  // Find plan by slug
  const plan = plans.find(p => p.product.slug === data.id);
  if (!plan) throw new Error('Plan not found');
</script>

<main>
  <div class="flex flex-col lg:flex-row items-center max-w-6xl mx-auto p-6 mt-10">
    <!-- Left Section -->
    <section class="w-full lg:max-w-[532px] space-y-6">
      <div>
        <h1 class="text-[24px] md:text-[28px] font-bold text-[#225043] font-playfair">{plan.name}</h1>
        <!-- <p class="mt-2 text-[#26332F] text-base font-medium">Your Gateway to Healthy Eating</p> -->
        <p class="mt-2 text-[#26332F] text-sm md:text-base font-normal">
          {plan.product.content.summary}
        </p>
        <!-- <p class="mt-4 text-base font-normal text-[#26332F] hidden md:block">
          Starting from <span class="font-bold">₹400</span> per meal
        </p> -->
      </div>
      <MealForm {plan} />
    </section>

    <!-- Right Section -->
    <section class="md:max-w-[500px] mt-10 lg:mt-0">
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
</main>