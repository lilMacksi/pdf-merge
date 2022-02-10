<template>
  <nav  id="top-nav">
  <ul class="bg-sc-white">
    <li><h1 style="margin-bottom: 0;" class="sc-navy">Swisscom PDF</h1></li>
  </ul>
  </nav>
</template>
<script>
export default {
  name: 'Navigation',
}
</script>
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li h1 {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>