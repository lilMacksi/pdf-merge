<template>
  <div>
    <Navigation />
    <router-view/>
    <footer class="footer footer--compact footer--light" style="height: 80px; bottom: 0; position: fixed; width: 100%">
      <div class="container">
        <a href="javascript:void(0);" class="logo" tabindex="-1">
          <span class="logo-lifeform" aria-label="Swisscom Logo"></span>
        </a>
        <ul class="nav-items">
          <li class="nav-item">
            <a href="mailto:maximilian.scheuber@swisscom.com" class="nav-link">Feedback</a>
          </li>
          <li class="nav-item">
            <small>by Maximilian Scheuber</small>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
<script>
import Navigation from "@/components/Navigation";
export default {
  name: 'App',
  components: {
    Navigation,
  }
}
</script>
<style>
body {
  height: 100%;
}
@media only screen and (max-width: 767px) {
  footer {
    display: none;
  }
}

</style>
