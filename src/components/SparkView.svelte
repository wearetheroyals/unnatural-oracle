<script>
  import { onMount } from "svelte";
  import { afterUpdate } from "svelte";

  import fitText from "FitText-UMD";
  import Spark from "../data/Spark";

  export let data = new Spark();
  const slabber = require('./slabber');
  const containers = {};
  let contentLines = [];

  // onMount(() => init());
  afterUpdate(() => {
    fitText(containers.title.childNodes[0], 0.8);
    fitText(containers.content.childNodes[0], 0.7);
  });
</script>

<style src="card.scss">

</style>

<div class="card">

  <header bind:this={containers.title}>
    <h1 class="fittext">{data.title}</h1>
  </header>

  <section bind:this={containers.content} class="content">
    <p class="fittext">{data.content}</p>
  </section>

  <section class="meta">

    <!-- <h5>Actions</h5>
    <ul data-actions class="labels">
      {#each data.actions as action}
        <li>{action}</li>
      {/each}
    </ul> -->

    <!-- <h5>Tags</h5> -->
    <ul data-tags class="labels">
      {#each data.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>

  </section>

</div>
