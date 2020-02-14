  <script>
    import { onMount } from "svelte";
    import Eyeball from './Eyeball.svelte';
    export let data, container;

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

    onMount(() => init());
    
    export let activePalette = 0;
    
    const init = () => {
      cyclePalette()
    }

    const getCol = (variant) => {
      return palettes[activePalette][variant];
    }

    const cyclePalette = () => {
      activePalette = activePalette +1 >= palettes.length ? 0 : activePalette+1;
      container.style.setProperty('--col-base', getCol(VARIANTS.BASE));
      container.style.setProperty('--col-darker', getCol(VARIANTS.DARKER));
      container.style.setProperty('--col-lighter', getCol(VARIANTS.LIGHTER));
    }

</script>

<div class="spark" bind:this={container} on:click={cyclePalette}>
  <div>
    <section id="oracle">
      <Eyeball />
    </section>
    <section id="message">
      <p>{data.content}</p>
    </section>
    <section id="brand">
      Royals  
    </section>
  </div>
</div>

<style>

  /* .spark {
    --col-base: #999;
    --col-darker: #333;
    --col-lighter: #efefef;
    max-width: 400px;
  } */

 .spark > div {
   height: 100%;
   display: grid;
   grid-template-areas: 'oracle' 'message' 'brand';
   grid-template-rows: auto 1fr auto;
   
   /* padding: 2em; */
   color: var(--col-lighter);
   background-color: var(--col-lighter);
 }

 #oracle {
   color: var(--col-base);
   max-width: 400px;
   /* padding: 5%; */
 }

 #message { 
   background-color: var(--col-darker);
   /* padding: 1.5em 5%; */
 }

 #brand {
  color: var(--col-darker);
  text-align: center;
  text-transform: uppercase;
  font-size: .8em;
 }

</style>