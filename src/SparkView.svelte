<script>
  import Spark from "./model/Spark";
  export let data = new Spark();
  // const data = new Spark();
  // const obj = {
  //   title: "TITLE",
  //   content: "Content of the spark",
  //   // tags: ["1", "2", "3"],
  //   actions: ["2", "3"]
  // };
  // data.parse(obj);
</script>

<div class="spark">
  <h1>{data.title}</h1>
  <ul data-actions>
    {#each data.actions as action}
      <li>{action}</li>
    {/each}

  </ul>
  <p>{data.content}</p>
  <ul data-tags>
    {#each data.tags as tag}
      <li>{tag}</li>
    {/each}
  </ul>
</div>
