import { sveltekit } from '@sveltejs/kit/vite';
import copy from 'rollup-plugin-copy'
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(),copy({
    targets: [
      { src: 'node_modules/tinymce/*', dest: 'static/tinymce' }
    ]
  })]
};

export default config;
