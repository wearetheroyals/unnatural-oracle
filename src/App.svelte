<script>
  import { onMount } from "svelte";
  import Query from "./airtable/Query";
  import SparkView from "./SparkView.svelte";

  let sparks = [];
  let currentSpark = {};
  let isLoading = false;

  const defaultQuery = {
    table: "Spark",
    maxRecords: 500,
    fields: ["title", "content"]
  };

  const loadSparks = () => {
    return new Promise(async (resolve, reject) => {
      isLoading = true;

      const query = new Query(defaultQuery);
      const res = await fetch("/api/recordIdList", {
        method: "POST",
        body: JSON.stringify(query)
      });

      const result = await res.text();
      const data = JSON.parse(result);
      isLoading = false;
      resolve(data);
    });
  };

  const getRandomSpark = async () => {
    if (sparks.length < 1) {
      sparks = await loadSparks();
    }
    const rnd = Math.round(Math.random() * (sparks.length - 1));
    currentSpark = { ...sparks[rnd] };
  };

  onMount(async () => {
    await loadSparks();
    getRandomSpark();
  });
</script>

<main>
  {#if isLoading}
    <p>...loading...</p>
  {:else}
    <div class="card">
      <h1>{currentSpark.title}</h1>
      <p>{currentSpark.content}</p>
      <a
        class="btn"
        on:click={e => {
          e.preventDefault();
          getRandomSpark();
        }}
        href="/">
        ☞
      </a>
    </div>
  {/if}
</main>
