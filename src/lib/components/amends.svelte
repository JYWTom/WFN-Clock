<script>
  import { dataStore } from "$lib/stores.js";
</script>

{#if $dataStore.amends && $dataStore.amends !== "<p><br></p>"}
  <div class="amends" style={$dataStore.amendsXtend ? "" : "padding-top: 5vh"}>
    <b>Amendments:</b>
  </div>
{/if}
<div style="" class="amends-content">{@html $dataStore.amends}</div>

<style>
  .amends {
    color: inherit;
    font-size: 3.5vw;
    line-height: 1.3;
    font-weight: 700;
    width: 50vw;
  }
  .amends-content {
    font-weight: lighter;
    transform: scale(1.5, 1.5);
    width: 25vw;
    transform-origin: left top;
    font-size: 1.75vw;
  }
</style>
