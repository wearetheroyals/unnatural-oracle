<style>

div {
    fill: var(--col-text-body);
    fill: var(--fill-color);
}



#image {
    position:relative;
    width: 100%;
    height: 0;
    padding-top: 50%;
    
    display: flex;
    align-items: center;
    justify-items: center;
}

#inner {
    width: auto;
    height: auto;
    top:0;
    left:0;
}

#pupil, #eye {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
}


</style>
<script>
    import { onMount } from "svelte";
    import Eyeball from '../assets/eye.svg';
    import Pupil from '../assets/pupil.svg';

    let eyeElement, pupilElement;

    onMount(() => init());
    const init = () => {
        eyeElement.style.setProperty('fill', 0x336699);
        pupilElement.style.setProperty('--fill-color', 0x003366);
    }
    
</script>


<!-- {@html Eyeball} -->
<div id="image">
    <div id="inner">
    <section id="eye" bind:this={eyeElement}>
        {@html Eyeball}
    </section>
    <section id="pupil" bind:this={pupilElement}>
        {@html Pupil}
    </section>
    </div>
</div>