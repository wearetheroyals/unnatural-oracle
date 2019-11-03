<script>
  import { onMount } from "svelte";
  let titles;

  const defaultQuery = {
    maxRecords: 3,
    view: "default"
  };

  onMount(async () => {
    // const res = await fetch("/api/date");
    const res = await fetch("/api/recordIdList", {
      method: "POST",
      body: JSON.stringify(defaultQuery)
    });
    titles = await res.text();
  });
</script>

<main>
  <h2>Titles of first three records:</h2>
  <p>{titles ? titles : 'Loading titles...'}</p>
</main>
