<script>
  import Modal, { getModal } from "$lib/Modal.svelte";
  import { dataStore } from "$lib/stores.js";
  import Tinymce from "$lib/components/tinymce.svelte";
  import Editor from "@tinymce/tinymce-svelte";

  let conf = {
    promotion: false,
    menubar: false,
    toolbar: 'undo redo |fontsize|' + 'removeformat',
    branding: false,
    height: '50vh',
    content_style:
      'p { margin: 0;font-size:3.5vw }body { background: #000000; color: #d3d3d3;}',
    font_size_formats: 'Very\u00A0Small=2vw Small=3vw Normal=3.5vw Big=4vw Very\u00A0Big=5vw',
    setup: function (ed) {
      ed.on("init", function () {
        this.getBody().style.fontSize = "3.5vw";
        this.getBody().style.color = "#d3d3d3";
      });
      ed.on('input', function () {
        let defaultSize;
        let computStyle = window.getComputedStyle(this.getBody());

        if (computStyle) {
          defaultSize = parseInt(computStyle.getPropertyValue('font-size'));
        }

        let paragraphs = this.getBody().children;
        for (let i = 0; i < paragraphs.length; i++) {
          let p = paragraphs[i];
          let size = 0;
          for (let j = 0; j < p.childNodes.length; j++) {
            let elt = p.childNodes[j];
            if (elt.nodeType !== 3) {
              // text node : https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType
              let eltSize = elt.style['font-size'];
              if (eltSize) size = Math.max(size, parseInt(eltSize));
              else size = defaultSize;
            } else {
              size = defaultSize;
            }
          }
          p.style['font-size'] = size < defaultSize ? size + 'px' : '';
        }
      });
    },
  }
</script>

<Modal>
  <form style="display:flex; flex-direction: row;  align-items: flex-start; width: 100%;">
    <div style="flex-grow: 1">
      <p style="padding-bottom: 5px;">Exam Information:</p>
      <Editor
        scriptSrc="tinymce/tinymce.min.js"
        {conf}
        bind:value={$dataStore.title}
      />
    </div>

    <div style="flex-grow: 0.66">
      <div
        style="display:flex; flex-direction: row;  align-items: flex-start; width: 100%; justify-content: space-between;"
      >
        <label style="padding-bottom: 5px;" for="amendsXtend">Amendments:</label>
        <div style="align-items: flex-end">
          <label for="amendsXtend">Larger Amendment Area &nbsp;</label>
          <label class="switch">
            <input type="checkbox" bind:checked={$dataStore.amendsXtend} id="amendsXtend" />
            <span class="slider round" />
          </label>
        </div>
      </div>
      <Tinymce />
    </div>
  </form>
  <div style="text-align: center;">
    <button
      on:click={() => {
        getModal().close();
        localStorage.data = JSON.stringify($dataStore);
      }}
      class="modalSave"
    >
      Save and Close
    </button>
    <button
      on:click={() => {
        $dataStore = {
          title: "",
          amends: "",
          amendsXtend: false,
        };
        localStorage.data = JSON.stringify($dataStore);
      }}
      class="modalSave"
    >
      Reset
    </button>
    <div>
      <span class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20"
          ><path
            d="M414.8 40.79L286.8 488.8C281.9 505.8 264.2 515.6 247.2 510.8C230.2 505.9 220.4 488.2 225.2 471.2L353.2 23.21C358.1 6.216 375.8-3.624 392.8 1.232C409.8 6.087 419.6 23.8 414.8 40.79H414.8zM518.6 121.4L630.6 233.4C643.1 245.9 643.1 266.1 630.6 278.6L518.6 390.6C506.1 403.1 485.9 403.1 473.4 390.6C460.9 378.1 460.9 357.9 473.4 345.4L562.7 256L473.4 166.6C460.9 154.1 460.9 133.9 473.4 121.4C485.9 108.9 506.1 108.9 518.6 121.4V121.4zM166.6 166.6L77.25 256L166.6 345.4C179.1 357.9 179.1 378.1 166.6 390.6C154.1 403.1 133.9 403.1 121.4 390.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4L121.4 121.4C133.9 108.9 154.1 108.9 166.6 121.4C179.1 133.9 179.1 154.1 166.6 166.6V166.6z"
          /></svg
        >
      </span>
      <span class="text">&nbsp;by Jong Yuk Wan (2023 Graduate)</span>
    </div>
  </div>
</Modal>

<style>
  form {
    color: black;
    font-size: 3vmin;
  }

  .modalSave {
    font-size: 2vh;
    line-height: 1.3;
    margin: 1vh;
    padding: 1vh;
    text-decoration: none;
    border: 1px solid #808080;
    border-radius: 10px;
    max-width: 400px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
  }

  .icon,
  .text {
    vertical-align: middle;
    display: inline-block;
    color: black;
    font-size: 20px;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: translate 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    translate: 26px 0;
    transition: translate 0.4s;
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
