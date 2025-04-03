<script lang="ts">
	import StoryHeader from '$lib/components/StoryHeader.svelte';
	import StoryHero from '$lib/components/StoryHero.svelte';
	import StoryContent from '$lib/components/StoryContent.svelte';
	import StoryQuote from '$lib/components/StoryQuote.svelte';
	import StoryBody from '$lib/components/StoryBody.svelte';
	import RelatedStories from '$lib/components/RelatedStories.svelte';
	import CollaborateSection from '$lib/components/CollaborateSection.svelte';
</script>

<main>
	<StoryHeader />
	<StoryHero />
	<StoryContent />
	<!-- <StoryQuote /> -->
	<!-- <StoryBody /> -->
	<RelatedStories />
	<CollaborateSection />
</main>
