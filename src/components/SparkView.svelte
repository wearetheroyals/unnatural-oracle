<script>
  import Spark from "../data/Spark";
  export let data = new Spark();
</script>

<style lang="css">
  .spark {
    background-color: #dedede;

    max-width: 580px;
    min-width: 300px;
    margin-right: 5px;
  }
  h1 {
    font-size: calc(20px + 6 * ((100vw - 320px) / 680));
  }
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
