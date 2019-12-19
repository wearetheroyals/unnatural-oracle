<script>
  import { onMount } from "svelte";
  // import fitty from "fitty";
  // import textFit from "textFit";
  import fitText from "FitText-UMD";
  import Spark from "../data/Spark";
  export let data = new Spark();

  onMount(() => init());

  let title;

  const init = () => {
    fitText(title, 0.7);
  };
</script>

<style src="card.scss">

</style>

<div class="card">

  <header>
    <h1 id="fit" bind:this={title}>{data.title}</h1>
    <!-- <h1 id="fit" bind:this={title}>
      A fairly long one that might need to wrap
    </h1> -->
  </header>

  <section class="content">
    <p>{data.content}</p>
  </section>

  <footer>
    <h5>Actions</h5>
    <ul data-actions>
      {#each data.actions as action}
        <li>{action}</li>
      {/each}

    </ul>
    <h5>Tags</h5>
    <ul data-tags>
      {#each data.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>
  </footer>

</div>
