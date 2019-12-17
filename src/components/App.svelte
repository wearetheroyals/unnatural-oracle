<script>
  import { onMount } from "svelte";
  import ServerlessFuncs from "../data/ServerlessFuncs";
  import { randomRangeInt } from "../util/randomRange.js";
  import SparkView from "./SparkView.svelte";

  let sparks = [];
  let currentSpark;
  let isLoading = false;
  let serverlessFuncs;

  onMount(async () => init());

  const init = async () => {
    serverlessFuncs = new ServerlessFuncs({ useMock: true });

    try {
      isLoading = true;
      sparks = await serverlessFuncs.fetchSparkIndex();
      getRandomSpark();
    } catch (e) {
      console.error(e);
    } finally {
      //isLoading = false;
    }
  };

  const getRandomSpark = async () => {
    try {
      const count = sparks.length;
      if (!count) {
        throw Error("No records found");
      }
      isLoading = true;
      const index = randomRangeInt(0, count - 1);
      currentSpark = await serverlessFuncs.fetchSpark(sparks[index].id);
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
