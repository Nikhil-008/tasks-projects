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

	<label
	for="choose-me"
	class="border-grey-4 text-grey-8 peer-checked:bg-light-indigo peer-checked:text-medium-indigo peer-checked:border-medium-indigo flex w-fit items-center
justify-evenly rounded-md border-2 p-3 peer-checked:border-[#000000] peer-checked:bg-[#000000] peer-checked:text-[#ffffff]"
>
	<input type="checkbox" id="choose-me" class="peer mr-3" />
	Check me
</label>

	<Nav />
	<StoryHeader />
	<StoryHero />
	<StoryContent />
	<RelatedStories />
	<CollaborateSection />
	<Footer />
</main>
