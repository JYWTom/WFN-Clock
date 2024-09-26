<script lang="ts">
  import { onMount } from "svelte";
  let time = new Date();
  $: hours = time.getHours();
  $: minutes = time.getMinutes();
  $: seconds = time.getSeconds();
  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1);
    return () => {
      clearInterval(interval);
    };
  });
  function addZero(inputval: number): string {
    if (inputval < 10) {
      return "0" + inputval;
    }
    return String(inputval);
  }
</script>

<div class="clock">
  <p class="time">
    <span>{addZero(hours)}</span>:<span>{addZero(minutes)}</span>:<span>{addZero(seconds)}</span>
  </p>

  <p class="date">
    {time.getFullYear()}-{time.getMonth() + 1}-{time.getDate()}
  </p>
  <p class="school-name">
    TWGHs Wong Fut Nam College<br />東華三院黃笏南中學
  </p>
</div>

<style>
  .clock {
    text-align: center;
    width: 35vw;
    height: 45vh;
    padding-bottom: 2vh;
  }
  .time span {
    width: 2ch;
    display: inline-block;
  }
  .time {
    font-size: 8.5vw;
    line-height: 15vh;
    font-weight: 700;
  }

  .date {
    font-size: 5vw;
  }
  .school-name {
    padding-top: 5vh;
    font-size: 2.4vw;
  }
  @supports (height: 100svh) {
    .clock {
      max-height: 45svh;
    }
  }
</style>
