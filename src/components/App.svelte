<script>
  import { onMount } from "svelte";
  import TABLE from "../data/tables";
  import Query from "../data/Query";
  import Spark from "../data/Spark";
  import sendQuery from "../db/sendQuery";
  import fetchIndex from "../db/fetchIndex";

  import SparkView from "./SparkView.svelte";

  let sparks = [];
  let currentSpark;
  let isLoading = false;

  const getRandomSpark = async () => {
    if (sparks.length > 0) {
      const rnd = Math.round(Math.random() * (sparks.length - 1));
      const id = sparks[rnd];

      const endpoint = `/spark/${id}`;
      const params = {
        fields: [
          TABLE.SPARK.FIELDS.TITLE,
          TABLE.SPARK.FIELDS.CONTENT,
          TABLE.SPARK.FIELDS.TAGS,
          TABLE.SPARK.FIELDS.ACTIONS
        ]
      };

      const query = new Query(endpoint, params);

      try {
        isLoading = true;
        const { records, message, error } = await sendQuery(query);
        currentSpark = records[0];
      } catch (e) {
        console.log(e);
      }
      isLoading = false;
    } else {
      console.log("Can't display random spark :: No records available");
    }
  };

  const loadIndex = () => {
    return new Promise(async (resolve, reject) => {
      isLoading = true;

      // Build the query
      const endpoint = `/spark`;
      const params = {
        fields: [TABLE.SPARK.FIELDS.ID],
        filterByFormula: `{${TABLE.SPARK.FIELDS.IS_PUBLISHED}}`
      };

      const query = new Query(endpoint, params);

      // Hit the serverless endpoint
      const response = await fetch("/api/queryAirtable", {
        method: "POST",
        body: JSON.stringify(query),
        headers: { "content-type": "application/json" }
      });

      // request data via the serverless function
      let { records, message, error } = await response.json();
      isLoading = false;

      // resolvce with records, or reject with error
      error ? reject(message) : resolve(records);
    });
  };

  onMount(async () => {
    try {
      const recordsIndex = await loadIndex();
      console.log(recordsIndex);
      sparks = recordsIndex;
      // getRandomSpark();
    } catch (e) {
      console.log(`Error loading index.\n > ${e}`);
    }
  });

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
    <SparkView data={currentSpark || null} />
    <a class="btn" on:click={handleBtnClick} href="/">☞</a>
  {/if}
</main>
