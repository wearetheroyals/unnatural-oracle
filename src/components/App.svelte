<style src="../scss/app.scss"></style>
<script>
  import { onMount } from "svelte";
  import ServerlessFuncs from "../data/ServerlessFuncs";
  import { randomRangeInt } from "../util/randomRange.js";
  
  import View from "./CubeView.svelte";

  let useMock = false;
  let isLoading = false;
  let sparkIndex = [];
  let currentSpark;
  let serverlessFuncs;

  onMount(() => init());

  const init = async () => {
    serverlessFuncs = new ServerlessFuncs({ useMock });
    isLoading = true;
    try {
      sparkIndex = await serverlessFuncs.fetchSparkIndex();
    } catch (e) {
      handleAPIError(e);
    }

    getRandomSpark();
  };

  const getRandomSpark = async () => {
    try {
      const count = sparkIndex.length;

      if (!Boolean(count)) {
        throw Error("No records found");
      }
      isLoading = true;
      const index = randomRangeInt(0, count - 1);
      currentSpark = await serverlessFuncs.fetchSpark(sparkIndex[index].id);
    } catch (e) {
      handleAPIError(e);
    } finally {
      isLoading = false;
    }
  };

  const handleBtnClick = e => {
    e.preventDefault();
    getRandomSpark();
  };

  const handleAPIError = e => {
    console.error(e);
    isLoading = false;
  };
</script>

<main>
  {#if isLoading}
    <p>...loading...</p>
  {:else if currentSpark != null}
    <View data={currentSpark.fields || null} />
    <!-- <a class="btn" on:click={handleBtnClick} href="/">☞</a> -->
  {/if}
</main>
