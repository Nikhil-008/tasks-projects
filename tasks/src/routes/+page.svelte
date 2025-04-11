<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StoryHeader from '$lib/components/StoryHeader.svelte';
	import StoryHero from '$lib/components/StoryHero.svelte';
	import StoryContent from '$lib/components/StoryContent.svelte';
	import RelatedStories from '$lib/components/RelatedStories.svelte';
	import CollaborateSection from '$lib/components/CollaborateSection.svelte';
</script>

<main>
	<Nav />
	<StoryHeader />
	<StoryHero />
	<StoryContent />
	<RelatedStories />
	<CollaborateSection />
	<Footer />
</main>
