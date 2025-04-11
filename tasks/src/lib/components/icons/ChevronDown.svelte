<script lang="ts">
	export let size = 16;
	export let color = '#225043';
	export let direction: 'down' | 'left' = 'down';

	const rotations = {
		down: '0',
		left: '90'
	};
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 16 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style="transform: rotate({rotations[direction]}deg)"
>
	<path
		d="M12 6L8 10L4 6"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
