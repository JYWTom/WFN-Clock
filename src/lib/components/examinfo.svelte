<script>
  import { dataStore } from "$lib/stores.js";
</script>

<div
  class="exam-info"
  style={$dataStore.amendsXtend ? "height:40vh;text-align:center;width:35vw;font-size:3vw" : ""}
>
  <p>
    {@html $dataStore.title}
  </p>
</div>

<style>
  .exam-info {
    min-height: 10vh;
    font-size: 3.5vw;
    line-height: 1.3;
    font-weight: 700;
    width: 30vw;
    transform: scale(1.33, 1.33);
    transform-origin: left top;
  }
</style>
