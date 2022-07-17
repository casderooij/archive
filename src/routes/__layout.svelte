<script lang="ts">
	import Navigation from '../components/Navigation.svelte'
	import '../styles/app.css'
</script>

<Navigation />

<main>
	<slot />
</main>

<style>
	main {
		margin-inline: 2rem;
	}
</style>
