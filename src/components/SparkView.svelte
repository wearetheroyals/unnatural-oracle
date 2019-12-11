<script>
  import Spark from "../data/Spark";
  export let data = new Spark();
</script>

<style>

</style>

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
