<script>
  import { onMount } from "svelte";
  import APIError from "../APIError.js";
  import TABLE from "../data/tables";
  import Query from "../data/Query";
  import Spark from "../data/Spark";

  import SparkView from "./SparkView.svelte";

  let sparks = [];
  let currentSpark;
  let isLoading = false;

  const getRandomSpark = async () => {
    if (sparks.length == 0) {
      console.log("Can't display random spark :: No records available");
      return false;
    }

    const rnd = Math.round(Math.random() * (sparks.length - 1));
    const id = sparks[rnd].id;

    const endpoint = `/spark`;
    const params = {
      fields: [
        TABLE.SPARK.FIELDS.TITLE,
        TABLE.SPARK.FIELDS.CONTENT,
        TABLE.SPARK.FIELDS.TAGS
      ],
      filterByFormula: `{id}=${id}`
    };

    const query = new Query(endpoint, params);

    try {
      isLoading = true;

      // Hit the serverless endpoint
      const response = await fetch("/api/queryAirtable", {
        method: "POST",
        body: JSON.stringify(query),
        headers: { "content-type": "application/json" }
      });

      // request data via the serverless function
      let { records, message, error } = await response.json();

      console.log("Record retreived via getRandomSpark:");
      console.log(records);
      currentSpark = records[0];
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
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

      console.log(JSON.stringify(query));

      try {
        // request data via the serverless function
        const response = await fetch("/api/queryAirtable", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(query)
        });

        let { records, message, error } = await response.json();
        if (error) {
          // Convert error messages in the payload into Error objects
          throw new APIError(message);
        }
        console.log("Finished loading index");
        resolve(records);
      } catch (e) {
        reject(e);
      } finally {
        isLoading = false;
      }
    });
  };

  onMount(async () => {
    try {
      const records = await loadIndex();
      console.log("Spark Indexes:");
      console.log(records);
      sparks = records;
      getRandomSpark();
    } catch (e) {
      console.error(e);
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
