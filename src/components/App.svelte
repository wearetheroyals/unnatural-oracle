<style src="../scss/app.scss"></style>
<script>
  
  import { onMount } from "svelte";
  import APIConn, {EVENTS} from '../APIConn.js';
  import { randomRangeInt } from "../util/randomRange.js";
  import { isLoading, useMockData } from '../store.js';  
  
  // import View from "./OracleView.svelte";
  import Eyeball from "./Eyeball.svelte";
  // import View from "./OracleView.svelte";

  let currentSpark;
  let apiConn;
  
  useMockData.set(true);

  onMount(() => init());

  const init = async () => {
    apiConn = new APIConn();
    try {
      await apiConn.fetchContentIndex();
      fetchRandomItem();
    } catch (e) {
      handleApiError(e)
    }
  };


  const fetchRandomItem = async () => {
    try {
      currentSpark = await apiConn.fetchItem();
    } catch (e) {
      handleApiError(e)
    }
  }

  const handleBtnClick = e => {
    e.preventDefault();
    fetchRandomItem();
  };

  const handleApiError = (e) => {
    console.error(e);
  }

</script>

<main>
  {#if $isLoading}
    <p>...loading...</p>
  {:else if currentSpark != null}
    <div class="ratio">
    <div id='spark'>
      <section class="oracle">
        <Eyeball />
      </section>
      <section class="content">
        <p>{currentSpark.fields.content}</p>
      </section>
      <section class="brand">
        Royals
      </section>
    </div>
    </div>
  {/if}
</main>
