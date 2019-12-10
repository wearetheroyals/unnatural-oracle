<script>
  import { onMount } from "svelte";
  import TABLE from "./data/tables";
  import Query from "./data/Query";
  import Spark from "./data/Spark";
  import SparkView from "./SparkView.svelte";
  import fetchRecord from "./db/fetchRecord";
  import fetchRecordIndex from "./db/fetchRecordIndex";

  let sparks = [];
  let currentSpark;
  let isLoading = false;

  const getRandomSpark = async () => {
    if (sparks.length > 0) {
      const rnd = Math.round(Math.random() * (sparks.length - 1));
      const id = sparks[rnd];

      console.log(`loading spark ${id}`);

      const query = new Query({
        method: `/spark/${id}`,
        fields: [
          TABLE.SPARK.FIELDS.TITLE,
          TABLE.SPARK.FIELDS.CONTENT,
          TABLE.SPARK.FIELDS.TAGS,
          TABLE.SPARK.FIELDS.ACTIONS
        ]
      });

      try {
        isLoading = true;
        const { records, message, error } = await fetchRecord(query);
        currentSpark = records[0];
      } catch (e) {
        console.log(e);
      }
      isLoading = false;
    } else {
      console.log("Can't display random spark :: No records available");
    }
  };

  const getTimeDiff = (startTime, endTime) => {
    return ((endTime - startTime) / 1000).toFixed(2);
  };

  onMount(async () => {
    isLoading = true;

    const fStart = performance.now();
    const { records, message, error } = await fetchRecordIndex();
    const fEnd = performance.now();
    isLoading = false;

    console.log(
      `Time to fetch IDs for ${records.length} Airtable records: ${getTimeDiff(
        fStart,
        fEnd
      )} seconds.`
    );

    if (records.length > 0) {
      sparks = records.map(record => record);
      getRandomSpark();
    } else {
      console.log(`No records returned.`);
      if (error) {
        console.log(`  > ${message}`);
      }
    }
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
