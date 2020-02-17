<style src="../scss/app.scss"></style>
<script>
  
  import { onMount } from "svelte";
  import APIConn from '../APIConn.js';
  import { randomRangeInt } from "../util/randomRange.js";
  import { isLoading, useMockData } from '../store.js';  
  

  import Eyeball from "./Eyeball.svelte";
  import Loading from "./Loading.svelte";


  let currentSpark;
  let apiConn;
  let container
  let activePalette = 0;
  
  useMockData.set(false);

  onMount(() => init());

  const init = async () => {
    // apiConn = new APIConn();
    // try {
    //   await apiConn.fetchContentIndex();
    //   fetchRandomItem();
    // } catch (e) {
    //   handleApiError(e)
    // }

    console.log("hello")
  };


  const fetchRandomItem = async () => {
    try {
      currentSpark = await apiConn.fetchItem();
      cyclePalette(container);
    } catch (e) {
      handleApiError(e)
    }
  }

  const handleBtnClick = e => {
    e.preventDefault();
    fetchRandomItem();
  };

  const handleApiError = (e) => {
    console.error(e);
  }


  // ****************************

  const VARIANTS = {
      BASE: 'base',
      DARKER: 'darker',
      LIGHTER: 'lighter'
    }

    const palettes = [
      {
      // blue
      [VARIANTS.BASE]: '#217afa',
      [VARIANTS.DARKER]: '#002070',
      [VARIANTS.LIGHTER]: '#d0f0ff',
    },
    {
      // green
      [VARIANTS.BASE]: '#20a050',
      [VARIANTS.DARKER]: '#107030',
      [VARIANTS.LIGHTER]: '#c0e0c0',
    },
    {
      // yellow
      [VARIANTS.BASE]: '#ffe040',
      [VARIANTS.DARKER]: '#ffc000',
      [VARIANTS.LIGHTER]: '#fff0c0',
    },
    {
      // red
      [VARIANTS.BASE]: '#ff4020',
      [VARIANTS.DARKER]: '#d02030',
      [VARIANTS.LIGHTER]: '#ffd0de',
    },
    ]


    const getCol = (variant) => {
      return palettes[activePalette][variant];
    }

    const cyclePalette = (el) => {
      activePalette = activePalette +1 >= palettes.length ? 0 : activePalette+1;
      el.style.setProperty('--col-base', getCol(VARIANTS.BASE));
      el.style.setProperty('--col-darker', getCol(VARIANTS.DARKER));
      el.style.setProperty('--col-lighter', getCol(VARIANTS.LIGHTER));
    }



</script>

<main>
    <div class="ratio">
    <div id='spark' bind:this={container} on:click={fetchRandomItem}>
      <section class="oracle">
        <Eyeball />
      </section>
      <section class="{$isLoading ? 'loading' : 'content'}">
        {#if $isLoading}     
          <Loading />
        {:else}
          {#if currentSpark != null}
          <p>{currentSpark.fields.content}</p>
          {/if}
        {/if}
      </section>
      <section class="brand">
        Royals
      </section>
    </div>
    </div>
</main>
