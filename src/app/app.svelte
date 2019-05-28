<script>
  import Home from '../containers/Home';
  import Header from '../components/Header';
</script>


<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
    :global(*) {
        outline: 0;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Source Code Pro', monospace;
    }
    .main-wrapper {
        max-width: 768px;
        margin: 0 auto;
        padding: 10px;
    }
</style>

<Header />
<main class="main-wrapper">
    <Home />
</main>
