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
    padding: 0.5em 2em;
  }
  h1 {
    font-size: calc(20px + 6 * ((100vw - 320px) / 680));
  }

  h5 {
    margin-top: 1em;
  }

  p {
    margin: 1.5em 0;
  }

  [data-tags] li,
  [data-actions] li {
    display: inline-block;
    font-size: 0.8em;
    border: 1px dashed #999;
    margin-right: 10px;
    padding: 0.1em 0.8em 0.1em;
  }

  [data-tags]:last-child,
  [data-actions]:last-child {
    margin-right: none;
  }
</style>

<div class="spark">
  <h1>{data.title}</h1>
  <h5>Actions</h5>
  <ul data-actions>
    {#each data.actions as action}
      <li>{action}</li>
    {/each}

  </ul>
  <p>{data.content}</p>
  <h5>Tags</h5>
  <ul data-tags>
    {#each data.tags as tag}
      <li>{tag}</li>
    {/each}
  </ul>
</div>
