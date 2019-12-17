<script>
  import { onMount } from "svelte";
  import { fetchSparkIndex, fetchSpark } from "../IO/get";
  import { randomRangeInt } from "../util/randomRange.js";
  import SparkView from "./SparkView.svelte";

  let sparks = [];
  let currentSpark;
  let isLoading = false;

  onMount(async () => init());

  const init = async () => {
    try {
      isLoading = true;
      sparks = await fetchSparkIndex();
      getRandomSpark();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  };

  const getRandomSpark = async () => {
    isLoading = true;

    if (sparks.length == 0) {
      console.log("No records found");
      return false;
    }

    try {
      const index = randomRangeInt(0, sparks.length - 1);
      currentSpark = await fetchSpark(sparks[index].id);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  };

  const handleBtnClick = e => {
    e.preventDefault();
    getRandomSpark();
  };
</script>

<style lang="scss">
  :global(body) {
    --body-background: #fff;
    --body-font-col: #333344;
    --body-font-family: "Arial", "sans";
    --body-line-height: 1.55em;
    --body-font-size: calc(16px+1vw);
  }
</style>

<main>
  {#if isLoading}
    <p>...loading...</p>
  {:else if currentSpark != null}
    <SparkView data={currentSpark.fields || null} />
    <a class="btn" on:click={handleBtnClick} href="/">☞</a>
  {/if}
</main>
