<!-- <style src="../scss/oracleView.scss"></style> -->

<script>
  export let data;
</script>

<div class="spark">

  
    <h1 class="fittext">{data.title}</h1>
  

  <section class="content">
    <p>{data.content}</p>
  </section>

  
    <ul data-tags class="labels">
      {#each data.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>

</div>
