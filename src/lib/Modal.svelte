<script context="module" lang="ts">
  let onTop; //keeping track of which open modal.svelte is on top
  const modals = {}; //all modals get registered here for easy future access
  // 	returns an object for the modal.svelte specified by `id`, which contains the API functions (`open` and `close` )
  export function getModal(id = "") {
    return modals[id];
  }
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  let topDiv;
  let visible = false;
  let prevOnTop;
  let closeCallback;
  export let id = "";
  function keyPress(ev) {
    //only respond if the current modal.svelte is the top one
    if (ev.key == "Escape" && onTop == topDiv) close(null); //ESC
  }
  /**  API **/
  function open(callback) {
    closeCallback = callback;
    if (visible) return;
    prevOnTop = onTop;
    onTop = topDiv;
    window.addEventListener("keydown", keyPress);
    //this prevents scrolling of the main window on larger screens
    document.body.style.overflow = "hidden";
    visible = true;
    //Move the modal.svelte in the DOM to be the last child of <BODY> so that it can be on top of everything
    //document.body.appendChild(topDiv);
  }
  function close(retVal) {
    if (!visible) return;
    window.removeEventListener("keydown", keyPress);
    onTop = prevOnTop;
    if (onTop == null) document.body.style.overflow = "";
    visible = false;
    if (closeCallback) closeCallback(retVal);
  }
  //expose the API
  modals[id] = { open, close };
  onDestroy(() => {
    delete modals[id];
    window.removeEventListener("keydown", keyPress);
  });
</script>

<div
  id="topModal"
  class:visible
  bind:this={topDiv}
  on:click={() => close(null)}
  on:keypress={() => {
    /* do nothing.*/
  }}
>
  <div
    id="modal"
    on:click|stopPropagation={() => {
      /* do nothing.*/
    }}
    on:keypress={() => {
      /* do nothing.*/
    }}
  >
    <div id="modal-content">
      <slot />
    </div>
  </div>
</div>

<style>
  #topModal {
    visibility: hidden;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #4448;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #modal {
    position: relative;
    border-radius: 6px;
    background: white;
    border: 2px solid #000;
    filter: drop-shadow(5px 5px 5px #555);
    padding: 1em;
    width: 75vw;
  }
  .visible {
    visibility: visible !important;
  }
  #modal-content {
    max-width: calc(75vw - 20px);
    max-height: 80vh;
    overflow: auto;
  }
</style>
