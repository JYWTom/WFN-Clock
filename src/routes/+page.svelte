<script lang="ts">
  import { dataStore } from "$lib/stores";
  import Badge from "$lib/components/badge.svelte";
  import Amends from "$lib/components/amends.svelte";
  import Footer from "$lib/components/footer.svelte";
  import Modal from "$lib/components/modal.svelte";
  import Time from "$lib/components/clock.svelte";
  import Examinfo from "$lib/components/examinfo.svelte";
  let idleTimer = null;
  let idleState = false;

  if (localStorage.data) {
    let saved = JSON.parse(localStorage.data);
    if ("amendsXtend" in saved) {
      dataStore.set(saved);
    }
  }
  function hideMouse() {
    clearTimeout(idleTimer);
    idleState = false;
    idleTimer = setTimeout(function () {
      idleState = true;
    }, 3000);
  }
</script>

<main class:noMouse={idleState} on:mousemove={hideMouse}>
  <Time />
  {#if !$dataStore.amendsXtend}
    <Badge />
  {/if}
  <Examinfo />
  <Amends />
</main>
<Footer {idleState} />

<Modal />

<style>
  :root {
    font-family: Helvetica, Arial, sans-serif;
    background-color: black;
    margin: 0;
    color: #d3d3d3;
    user-select: none;
  }

  :-webkit-full-screen {
    background-color: black;
  }

  .noMouse {
    cursor: none;
  }

  @supports (height: 100svh) {
    main {
      max-height: 90svh;
    }
  }

  main {
    padding: 4vh 4vh 4vh 3vw;
    flex: 1 1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 90vh;
  }
  :global(body) {
    margin: 0;
  }

  :global(p) {
    margin-block-start: 0;
    margin-block-end: 0;
  }
</style>
