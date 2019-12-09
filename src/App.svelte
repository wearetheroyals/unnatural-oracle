<script>
  import { onMount } from "svelte";
  import { SPARK } from "./data/tables";
  import Query from "./data/Query";
  import Spark from "./data/Spark";
  import SparkView from "./SparkView.svelte";
  import fetchRecords from "./db/fetchRecords";

  let sparks = [];
  let currentSpark;
  let isLoading = false;

  const defaultQuery = {
    table: SPARK.NAME,
    maxRecords: 500,
    fields: [
      SPARK.FIELDS.TITLE,
      SPARK.FIELDS.CONTENT,
      SPARK.FIELDS.TAGS,
      SPARK.FIELDS.ACTIONS
    ]
    // filterByFormula: `{${SPARK.FIELDS.IS_PUBLISHED}}`
  };

  const getRandomSpark = async () => {
    if (sparks.length > 0) {
      const rnd = Math.round(Math.random() * (sparks.length - 1));
      currentSpark = sparks[rnd].clone();
    } else {
      console.log("Can't display random spark :: No records available");
    }
  };

  const getTimeDiff = (startTime, endTime) => {
    return ((endTime - startTime) / 1000).toFixed(2);
  };

  onMount(async () => {
    isLoading = true;
    const query = new Query(defaultQuery);

    const fStart = performance.now();
    const dbcontent = await fetchRecords(query);
    const fEnd = performance.now();
    console.log(
      `Time to fetch Airtable records: ${getTimeDiff(fStart, fEnd)} seconds.`
    );

    sparks = dbcontent.map(sparkData => new Spark().parse(sparkData));
    isLoading = false;
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
