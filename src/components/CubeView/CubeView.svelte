<style src="../../scss/cubeView.scss"></style>

<script>
  import { afterUpdate, onMount } from "svelte";
  import Spark from "../../data/Spark";
  import { getIllustration, getAnchor, getBox, TAU, getVector, Size3d } from './zdog';

  const boxes = [
    new Size3d({width: 1, height: 1, depth: 1}),
    new Size3d({width: 1, height: 1, depth: 1}),
    new Size3d({width: 1, height: 1, depth: 1})
  ]


  const getBoxDimSum = (dim='height') => {
    return boxes.reduce((total, box) => total + box[dim], 0);
  }

  const getWindowSize = (paddingTopBottom, paddingLeftRight) => {
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    return {
      w:iw - ((iw/100)*paddingLeftRight),
      h: ih - ((ih/100)*paddingTopBottom)
    }
  }


  const windowBaseSize = getWindowSize(20, 0); //{width: iw, height: ih};
  const boxBaseHeight = Math.floor(windowBaseSize.h/getBoxDimSum('height'));
  
  const sceneConfig = {
      dragRotate: false,
      resize: true,
      centered: true,
      onResize: function (width, height) { resizeScene(this, width, height)}
    }
  const anchorConfig = {
      translate: getVector({y:-boxBaseHeight}),
      rotate: getVector({ x: -TAU/70, y: -TAU/80 }),
    };



  let data = new Spark();
  let canvas, scene, w, h;
  let yPos = 0;

  onMount(() => {
    
    scene = getIllustration(canvas, sceneConfig);
    const anchor = getAnchor(scene, anchorConfig);
    
    var baseCol = 0xefefef;
    var tintCol = 0xcdcdcd;
    for (var i=0; i<boxes.length; i++) {
      var darkenBase = baseCol - (0x333333*i);
      var darkenTint = Math.max(tintCol - (0x333333*i), 0);
      var bCol = `#${darkenBase.toString(16)}`;
      var tCol = `#${darkenTint.toString(16)}`;
      var size = new Size3d(
        {
          height:Math.round(boxBaseHeight * boxes[i].height),
          width: Math.round(boxBaseHeight * boxes[i].width),
          depth: Math.round(boxBaseHeight * boxes[i].depth)
        }
      )
      
      const box = getBox(size, bCol,tCol );
      box.translate = box.translate.add(getVector({y:yPos}));
      
      anchor.addChild(box);
      
      yPos += box.height;
    }
    
    render();

  })

  const resizeScene = (scene, width, height) =>{ 
    const hZoom = height/windowBaseSize.h;
    const wZoom = width/windowBaseSize.w;
    scene.zoom = Math.min(hZoom, wZoom);
  }

  const render = () => {
    scene.updateRenderGraph();
    requestAnimationFrame( render );
  }

</script>

<div class="spark">
  <canvas class="cube" bind:this={canvas} width=200 height=300></canvas>
</div>