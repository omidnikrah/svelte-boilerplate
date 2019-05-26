import App from './app.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'World'
  }
});

window.app = app;
