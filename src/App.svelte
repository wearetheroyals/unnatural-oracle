<script>
  import { onMount } from "svelte";
  import Query from "./airtable/Query";
  let titles;

  const defaultQuery = {
    table: "Spark",
    maxRecords: 3,
    fields: ["Title", "Content", "Tags", "Contributor"]
  };

  onMount(async () => {
    const query = new Query(defaultQuery);
    const res = await fetch("/api/recordIdList", {
      method: "POST",
      body: JSON.stringify(query)
    });
    titles = await res.text();
  });
</script>

<main>
  <h2>Titles of first three records:</h2>
  <p>{titles ? titles : 'Loading titles...'}</p>
</main>
