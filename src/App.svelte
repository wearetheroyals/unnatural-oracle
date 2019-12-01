<script>
  import { onMount } from "svelte";
  import Query from "./airtable/Query";
  import SparkView from "./SparkView.svelte";

  let sparks = [];
  let currentSpark = {};
  let isLoading = false;

  const defaultQuery = {
    table: "spark",
    maxRecords: 500,
    fields: ["title", "content"]
  };

  const fetchSparks = () => {
    return new Promise(async (resolve, reject) => {
      isLoading = true;

      const query = new Query(defaultQuery);
      console.log(query);
      const res = await fetch("/api/recordIdList", {
        method: "POST",
        body: JSON.stringify(query)
      });

      const result = await res.text();
      const data = JSON.parse(result);
      console.log(data);
      isLoading = false;
      resolve(data);
    });
  };

  const getRandomSpark = async () => {
    const rnd = Math.round(Math.random() * (sparks.length - 1));
    currentSpark = { ...sparks[rnd] };
  };

  onMount(async () => {
    sparks = await fetchSparks();
    getRandomSpark();
  });
</script>

<main>
  {#if isLoading}
    <p>...loading...</p>
  {:else}
    <div class="card">
      <h1>{currentSpark.title || 'Thoughtstarter'}</h1>
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
