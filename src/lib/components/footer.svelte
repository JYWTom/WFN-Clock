<script lang="ts">
  import { getModal } from "$lib/Modal.svelte";
  export let idleState: boolean;
  function requestFullscreen(element: Element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen(element.ALLOW_KEYBOARD_INPUT);
    }
  }
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
</script>

<footer style="z-index: 1;position: relative">
  <button on:click={() => getModal().open()}>Settings</button>
  <button on:click={() => requestFullscreen(document.getElementsByTagName("body")[0])}
    >Fullscreen</button
  >
  <button on:click={() => closeFullscreen()} class:hidden={idleState} class="exit">Exit</button>
</footer>

<style>
  footer {
    max-height: 10vh;
    margin-top: -10vh;
    padding-right: 4vw;
    text-align: right;
  }
  button {
    font-size: 3vh;
    line-height: 1.5;
    margin: 1vh;
    padding: 1vh;
    text-align: left;
    text-decoration: none;
    border: 1px solid gray;
    border-radius: 10px;
    max-width: 400px;
    cursor: pointer;
    color: #000000;
  }
  .exit {
    display: none;
  }
  .hidden {
    display: none !important;
  }
  :global(:fullscreen button) {
    display: none;
  }
  :global(:fullscreen .exit) {
    display: initial;
  }
</style>
