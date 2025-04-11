<script>
	let isMobileMenuOpen = false;
</script>

<nav class="nav-container">
	<div class="mx-auto max-w-7xl">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<div class="max-w-[140px] md:max-w-[200px]">
				<a href="/"><img src="/images/logo.png" alt="Logo" /></a>
			</div>

			<!-- Mobile Menu Button (visible only on mobile) -->
			<div class="md:hidden">
				<button on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)} class="nav-button">
					{#if isMobileMenuOpen}
						( CLOSE )
					{:else}
						( MENU )
					{/if}
				</button>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden flex-1 text-center md:block">
				<button on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)} class="nav-button">
					{#if isMobileMenuOpen}
						( CLOSE )
					{:else}
						( MENU )
					{/if}
				</button>

				{#if isMobileMenuOpen}
					<div class="nav-menu-container">
						<div class="flex flex-col space-y-4">
							<a href="/home" class="nav-link">home</a>
							<a href="/services" class="nav-link">Services</a>
						</div>
					</div>
				{/if}
			</div>

			<!-- Right Section -->
			<div class="hidden items-center space-x-4 md:flex">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="search-button">
					<img src="/icons/search.svg" alt="Search Icon" />
				</button>
				<a href="/contact" class="contact-button"> Contact Us </a>
			</div>
		</div>

		<!--  Menu (visible when toggled) -->
		{#if isMobileMenuOpen}
			<div class="nav-menu-container">
				<div class="flex flex-col items-center space-y-4">
					<!-- <a href="/" class="nav-link">Home</a> -->
					<a href="/home" class="nav-link">home</a>
					<a href="/services" class="nav-link">Services</a>
				</div>
			</div>
		{/if}
	</div>
</nav>
