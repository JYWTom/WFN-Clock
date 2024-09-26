<script lang="ts">
  import Editor from "@tinymce/tinymce-svelte";
  import { dataStore } from "$lib/stores.js";
  let defaultImg = false;
  const conf = {
    promotion: false,
    content_style: "p { margin: 0;font-size:2.33vw }body { background: #000000; color: #d3d3d3;}",
    plugins: "image",
    // menubar: false,
    skin: "oxide",
    height: "50vh",
    branding: false,
    toolbar: "undo redo |fontsize|backcolor forecolor| bold italic strikethrough |  image",
    font_size_formats:
      "Very\u00A0Small=1.33vw Small=2vw Normal=2.33vw Big=2.66vw Very\u00A0Big=3.33vw",
    setup: function (ed) {
      ed.on("init", function () {
        this.getBody().style.fontSize = "2.33vw";
        this.getBody().style.color = "#d3d3d3";
      });
      ed.on("nodeChange", function (e) {
        if (e && e.element.nodeName.toLowerCase() == "img") {
          if (!defaultImg) {
            let width = e.element.width;
            let height = e.element.height;
            if (width >= 600) {
              height = height / (width / 600);
              width = 600;
            }
            if (height >= 400) {
              width = width / (height / 400);
              height = 400;
            }
            this.dom.setAttribs(e.element, { width: width, height: height });
            defaultImg = true;
          }
        }
      });
      ed.on("input", function () {
        let defaultSize;
        let computStyle = window.getComputedStyle(this.getBody());

        if (computStyle) {
          defaultSize = parseInt(computStyle.getPropertyValue("font-size"));
        }

        let paragraphs = this.getBody().children;
        for (let i = 0; i < paragraphs.length; i++) {
          let p = paragraphs[i];
          let size = 0;
          for (let j = 0; j < p.childNodes.length; j++) {
            let elt = p.childNodes[j];
            if (elt.nodeType !== 3) {
              // text node : https://developer.mozilla.org/fr/docs/Web/API/Node/nodeType
              let eltSize = elt.style["font-size"];
              if (eltSize) size = Math.max(size, parseInt(eltSize));
              else size = defaultSize;
            } else {
              size = defaultSize;
            }
          }
          p.style["font-size"] = size < defaultSize ? size + "px" : "";
        }
      });
    },
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.addEventListener("change", (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
          */
          const id = "blobid" + new Date().getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          /* call the callback and populate the Title field with the file name */
          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      });
      defaultImg = false;
      input.click();
    },
  };
</script>

<Editor scriptSrc="tinymce/tinymce.min.js" {conf} bind:value={$dataStore.amends} />
