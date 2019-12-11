<script>
  import { onMount } from "svelte";
  import TABLE from "./data/tables";
  import Query from "./data/Query";
  import Spark from "./data/Spark";
  import SparkView from "./SparkView.svelte";
  import fetchRecord from "./db/fetchRecord";
  import fetchIndex from "./db/fetchIndex";

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

  const loadIndex = async () => {
    isLoading = true;
    const { records, message, error } = await fetchIndex();
    isLoading = false;

    if (error || records.length == 0) {
      logIndexLoadError(error);
    }
    if (records.length > 0) {
      sparks = records.map(record => record);
      getRandomSpark();
    }
  };

  const logIndexLoadError = (error = null) => {
    const msg =
      "Error loading record index." + (error ? `\n > ${error}` : null);
    console.log(msg);
  };

  onMount(() => {
    loadIndex();
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
