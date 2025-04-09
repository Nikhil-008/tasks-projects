<script lang="ts">
  import MealCard from '$lib/components/MealCard.svelte';
  import plans from '$lib/data/subscription-data.json';
</script>

<main class="max-w-8xl mx-auto p-6 mt-10 flex flex-wrap gap-y-12">
  {#each plans as plan}
    <MealCard {plan} />
  {/each}
</main>