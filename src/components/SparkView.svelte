<style src="../scss/card.scss"></style>
<script>
  import { afterUpdate } from "svelte";
  import {slab} from './slabber.js';
  import Spark from "../data/Spark";

  export let data = new Spark();
  
  const containers = {};
  let contentLines = [];

  afterUpdate(() => {
    slab('.fittext');
  });
</script>



<div class="card">

  <header bind:this={containers.title}>
    <h1 class="fittext">{data.title}</h1>
  </header>

  <section bind:this={containers.content} class="content">
    <p class="fittext">{data.content}</p>
  </section>

  <section class="meta">
    <ul data-tags class="labels">
      {#each data.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>

  </section>

</div>
