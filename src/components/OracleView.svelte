<!-- <style src="../scss/oracleView.scss"></style> -->

<script>
  export let data;
</script>

<div class="spark">

  
    <h1>{data.title}</h1>
  

  <section>
    <p>{data.content}</p>
  </section>

  
    <ul>
      {#each data.tags as tag}
        <li>{tag}</li>
      {/each}
    </ul>

</div>
