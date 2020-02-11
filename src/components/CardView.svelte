<style src="../scss/cardView.scss"></style>

<script>
  import {slab} from '../lib/slabber.js';
  import { afterUpdate } from "svelte";
  import Spark from "../data/Spark";

  export let data = new Spark();
  
  const containers = {};

</script>

<div class="spark">

  <header bind:this={containers.title}>
    <h1 class="fittext">{data.title}</h1>
  </header>

  <section bind:this={containers.content} class="content">
    <p class="">{data.content}</p>
  </section>

  <section class="meta">
    <ul data-tags class="labels">
      {#each data.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>
  </section>

</div>
