<script>
  import { onMount } from "svelte";
  import Query from "./airtable/Query";
  import SparkView from "./SparkView.svelte";
  import Spark from "./model/Spark";

  let sparks = [];
  let currentSpark;
  let isLoading = false;

  const defaultQuery = {
    table: "spark",
    maxRecords: 500,
    fields: ["title", "content", "tags", "actions"],
    filterByFormula: "{published}"
  };

  const fetchSparks = () => {
    return new Promise(async (resolve, reject) => {
      isLoading = true;
      const query = new Query(defaultQuery);
      const res = await fetch("/api/recordIdList", {
        method: "POST",
        body: JSON.stringify(query)
      });
      const result = await res.text();
      const data = JSON.parse(result);
      console.log(`Retreived ${data.length} records.`);
      isLoading = false;
      resolve(data);
    });
  };

  const getRandomSpark = async () => {
    if (sparks.length > 0) {
      const rnd = Math.round(Math.random() * (sparks.length - 1));
      currentSpark = sparks[rnd].clone();
    } else {
      console.log("Can't display random spark :: No records available");
    }
  };

  onMount(async () => {
    const dbcontent = await fetchSparks();
    sparks = dbcontent.map(sparkData => new Spark().parse(sparkData));
    getRandomSpark();
  });

  const handleBtnClick = e => {
    e.preventDefault();
    getRandomSpark();
  };
</script>

<main>
  {#if isLoading}
    <p>...loading...</p>
  {:else if currentSpark != null}
    <div class="card">
      <SparkView data={currentSpark || null} />
      <a class="btn" on:click={handleBtnClick} href="/">☞</a>
    </div>
  {/if}
</main>
