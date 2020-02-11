<style src="../scss/cubeView.scss"></style>

<script>
  import { afterUpdate, onMount } from "svelte";
  import Zdog from 'zdog';
  import Spark from "../data/Spark";

  let data = new Spark();
  const baseSize = {width: window.innerWidth, height: window.innerHeight};
  let boxSize = (baseSize.height/2.2);

  const TAU = Zdog.TAU;
  let canvas, illo, w, h;

  onMount(() => {
    
    illo = createIllustration(canvas);
    
    const anchor = new Zdog.Anchor({
      addTo: illo,
      translate: { x:0, y:-boxSize/2, z:0 },
      rotate: { x: -TAU/70, y: -TAU/80 }
    })

    const topBox = getBox(boxSize,'#000')
    const bottomBox = getBox(boxSize,'#efefef')

    anchor.addChild(topBox)
    bottomBox.translate.y = boxSize;
    anchor.addChild(bottomBox);
    
    animate();

  })

  const createIllustration = (parentElement) => {
    return new Zdog.Illustration({
      dragRotate: false,
      element: parentElement,
      resize: true,
      centered: true,
      onResize: function (width, height) { resizeIllo(this, width, height)}
    });
  }

  const resizeIllo = (illo, width, height) =>{ 
    const hZoom = height/baseSize.height;
    const wZoom = width/baseSize.width;
    illo.zoom = Math.min(hZoom, wZoom);
  }


  const getBox = (size, color) => {
    return new Zdog.Box({
      width: size,
      height: size,
      depth: size,
      stroke: 1,
      color: '#999', // default face color
      topFace:"#aaa",
      bottomFace:"#aaa",
      frontFace:color,
      rearFace:color
    })
  }

  const animate = () => {
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
  }

</script>

<div class="spark">
  <canvas class="cube" bind:this={canvas} width=200 height=300></canvas>
</div>