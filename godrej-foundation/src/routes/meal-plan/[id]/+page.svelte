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
  <button 
    on:click={goBack} 
    class="flex items-center text-[#225043] mb-4 ml-6 mt-6"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="#225043" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="ml-2 text-base font-normal">Back</span>
  </button>

  {#if plan}
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
  {:else}
    <div class="max-w-6xl mx-auto p-6 mt-10">
      <p class="text-[#26332F]">Plan not found</p>
    </div>
  {/if}
</main>