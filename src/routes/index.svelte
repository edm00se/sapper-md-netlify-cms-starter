<style>
	.main {
		text-align: center;
	}
</style>

<script context="module">
	import { siteTitle } from '../stores/_config.js';
	export async function preload() {

		const res = await this.fetch(`undefined.json`);
		const article = await res.json();

		return { article, siteTitle };
	}
</script>

<script>
	export let article;
	export let siteTitle;
</script>

<svelte:head>
	<title>{siteTitle}</title>
</svelte:head>

<div class="main">
	{@html article.html}
</div>
